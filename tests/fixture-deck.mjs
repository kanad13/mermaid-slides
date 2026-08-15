import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const deckPath = join(repositoryRoot, 'tests/fixtures/shared-deck.md');
const publicRoot = join(repositoryRoot, 'public');

const readDeck = () => readFileSync(deckPath, 'utf8');

const extractSlides = (markdown) => {
    const slides = [];
    const lines = markdown.split('\n');
    let title;

    for (let index = 0; index < lines.length; index += 1) {
        const heading = lines[index].match(/^#{1,6}\s+(.+)$/);
        if (heading) {
            title = heading[1].trim();
            continue;
        }

        if (lines[index].trim() === '```mermaid') {
            const endIndex = lines.findIndex(
                (line, candidateIndex) => candidateIndex > index && line.trim() === '```',
            );
            assert.notEqual(endIndex, -1, `unclosed Mermaid fence after line ${index + 1}`);
            slides.push({
                code: lines.slice(index + 1, endIndex).join('\n').trim(),
                kind: 'diagram',
                title,
            });
            title = undefined;
            index = endIndex;
            continue;
        }

        const image = lines[index].match(/!\[([^\]]*)\]\(([^)]+)\)/);
        if (image) {
            slides.push({
                alt: image[1],
                kind: 'image',
                src: image[2],
                title,
            });
            title = undefined;
        }
    }

    return slides;
};

const getSlides = () => extractSlides(readDeck());
const byTitle = (slides, title) => {
    const slide = slides.find((candidate) => candidate.title === title);
    assert.ok(slide, `missing fixture slide: ${title}`);
    return slide;
};

test('the shared deck and its bundled image assets exist', () => {
    assert.equal(existsSync(deckPath), true, 'missing shared fixture deck');
    assert.equal(
        existsSync(join(publicRoot, 'test-fixtures/fixture-image.svg')),
        true,
        'missing normal image fixture',
    );
    assert.equal(
        existsSync(join(publicRoot, 'test-fixtures/delayed-image.svg')),
        true,
        'missing delayed image fixture',
    );
});

test('the deck covers every required Mermaid diagram family', () => {
    const codes = getSlides()
        .filter((slide) => slide.kind === 'diagram')
        .map((slide) => slide.code);
    const requiredStarts = [
        'flowchart ',
        'sequenceDiagram',
        'erDiagram',
        'classDiagram',
        'stateDiagram-v2',
        'gantt',
        'pie ',
        'gitGraph',
    ];

    for (const start of requiredStarts) {
        assert.ok(codes.some((code) => code.startsWith(start)), `missing ${start.trim()} fixture`);
    }
});

test('the deck contains byte-identical sequence diagrams as independent slides', () => {
    const slides = getSlides();
    const first = byTitle(slides, 'Duplicate sequence one');
    const second = byTitle(slides, 'Duplicate sequence two');

    assert.equal(first.kind, 'diagram');
    assert.equal(second.kind, 'diagram');
    assert.ok(first.code.startsWith('sequenceDiagram'));
    assert.equal(second.code, first.code);
});

test('the size fixtures encode tiny, tall, wide, and large geometry', () => {
    const slides = getSlides();
    const tiny = byTitle(slides, 'Tiny diagram');
    const tall = byTitle(slides, 'Tall diagram');
    const wide = byTitle(slides, 'Wide diagram');
    const large = byTitle(slides, 'Large diagram');

    assert.equal(tiny.code, 'flowchart TD\n    A --> B');
    assert.ok(tall.code.startsWith('flowchart TD'));
    assert.ok(tall.code.split('\n').length >= 20);
    assert.ok(wide.code.startsWith('flowchart LR'));
    assert.ok(wide.code.includes('N1 --> N2 --> N3 --> N4 --> N5 --> N6 --> N7 --> N8'));
    assert.ok(large.code.length >= 1_000);
    assert.ok(large.code.split('\n').length >= 35);
});

test('the deck contains empty, malformed, and long malformed source cases', () => {
    const slides = getSlides();
    const empty = byTitle(slides, 'Empty Mermaid input');
    const malformed = byTitle(slides, 'Malformed Mermaid input');
    const longError = byTitle(slides, 'Long Mermaid error source');

    assert.equal(empty.code, '');
    assert.equal(malformed.code, 'flowchart TD\n    A -- definitely not valid -->');
    assert.ok(longError.code.startsWith('flowchart TD'));
    assert.ok(longError.code.length >= 600);
    assert.match(longError.code, /BROKEN_END\s+-->/);
});

test('real Mermaid accepts every valid diagram and rejects every error fixture', async (t) => {
    const dom = new JSDOM('<!doctype html>');
    const previousDocument = globalThis.document;
    const previousWindow = globalThis.window;
    globalThis.document = dom.window.document;
    globalThis.window = dom.window;
    t.after(() => {
        dom.window.close();
        globalThis.document = previousDocument;
        globalThis.window = previousWindow;
    });
    const { default: mermaid } = await import('mermaid');
    const slides = getSlides().filter((slide) => slide.kind === 'diagram');
    const errorTitles = new Set([
        'Empty Mermaid input',
        'Malformed Mermaid input',
        'Long Mermaid error source',
    ]);

    for (const slide of slides) {
        if (errorTitles.has(slide.title)) {
            await assert.rejects(() => mermaid.parse(slide.code), slide.title);
        } else {
            await assert.doesNotReject(() => mermaid.parse(slide.code), slide.title);
        }
    }
});

test('image fixtures cover normal, cached, delayed, and broken loading states locally', () => {
    const slides = getSlides();
    const normal = byTitle(slides, 'Normal local image');
    const cached = byTitle(slides, 'Already-cached local image');
    const delayed = byTitle(slides, 'Delayed local image');
    const broken = byTitle(slides, 'Broken local image');

    assert.equal(normal.src, '/test-fixtures/fixture-image.svg');
    assert.equal(cached.src, normal.src);
    assert.ok(slides.indexOf(normal) < slides.indexOf(cached));
    assert.equal(delayed.src, '/test-fixtures/delayed-image.svg?delay=250');
    assert.equal(broken.src, '/test-fixtures/missing-image.svg');
    assert.equal(existsSync(join(publicRoot, broken.src.slice(1))), false);

    for (const slide of [normal, cached, delayed, broken]) {
        assert.equal(slide.kind, 'image');
        assert.ok(slide.src.startsWith('/test-fixtures/'));
        assert.equal(URL.canParse(slide.src), false, 'fixture image must not use an external URL');
    }
});

test('long and hostile Markdown strings survive as literal fixture values', () => {
    const slides = getSlides();
    const longTitle = slides.find((slide) => slide.title?.startsWith('Long title fixture '));
    const hostileTitle = byTitle(
        slides,
        'Hostile title <script data-fixture="title">window.fixtureAttack=true</script>',
    );
    const hostileImage = byTitle(slides, 'Hostile image alt text');

    assert.ok(longTitle?.title && longTitle.title.length >= 180);
    assert.equal(hostileTitle.kind, 'diagram');
    assert.equal(
        hostileImage.alt,
        '<img src=x onerror="window.fixtureAttack=true"> & <script>fixtureAttack()</script>',
    );
});

test('fixture sources never depend on the external network', () => {
    assert.doesNotMatch(readDeck(), /(?:https?:)?\/\//i);
});
