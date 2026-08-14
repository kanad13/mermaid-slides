# Testing

## Why this file exists

The automated suite mocks Mermaid entirely (`src/test/setup.ts` replaces `mermaid.render` with a stub
returning `<svg>test</svg>`). It covers parsing, hooks and component structure well, and covers no
integration path at all — nothing that involves a real diagram reaching the DOM. The checklist below
is therefore not a supplement to the test suite. For rendering, layout and distribution behaviour it
_is_ the test suite.

---

## Per commit

Fast gate. All three must pass before anything is committed.

```bash
npx tsc --noEmit -p config/tsconfig.json && npm run lint && npm run test:run
```

## Per branch, before merge

Merging to `master` publishes: it deploys to GitHub Pages, cuts a GitHub release and pushes to Docker
Hub in a single workflow run. There is no staging environment between a merge and production, so the
full matrix below runs before the merge, not after.

### 1. Development server

```bash
npm run dev
```

Run the smoke checklist. Note that the dev server is the _least_ representative environment — see the
traps section.

### 2. Production build

```bash
npm run build && npm run preview
```

Run the smoke checklist again. This is the build that reaches mermaid-slides.com.

### 3. Offline package

```bash
npm run build:offline
cd offline-package
python3 start-server.py --no-browser        # then, separately:
node start-server.js --no-browser
./start-server.sh
```

Assets are referenced relatively here (`base: './'`), so this catches path problems the web build
cannot. `start-server.bat` needs a Windows host; if none is available, say so in the merge notes
rather than marking it passed. Confirm the served page loads with no console errors and that the
examples directory is present.

### 4. Docker

```bash
npm run build:offline
docker build -t mermaid-slides:test .
docker run --rm -p 3000:3000 mermaid-slides:test
```

Run the smoke checklist against `http://localhost:3000`.

### 5. Repository validators

```bash
npm run validate:all
```

### 6. Continuous integration

Push the branch and confirm the validation workflow passes before opening the merge.

---

## Smoke checklist

Run against whichever environment is under test. Every line is a path the automated suite does not
reach.

**Loading content**

- [ ] Load Sample renders the sample deck
- [ ] Choose File accepts a `.md` file
- [ ] Drag and drop a `.md` file onto the drop zone
- [ ] Paste markdown directly into the textarea
- [ ] Clear Input empties the editor
- [ ] A file with no diagrams shows the "no diagrams found" message

**Presenting**

- [ ] Start Slideshow enters the viewer
- [ ] Arrow keys, Home and End navigate; navigation wraps at both ends
- [ ] Escape returns to the editor
- [ ] The progress bar and slide counter track the current slide
- [ ] Grid view opens, shows every slide, and clicking one jumps to it

**Rendering**

- [ ] Each diagram type in the sample renders: flowchart, sequence, ER
- [ ] A markdown image renders, and a broken image path shows the error card
- [ ] Malformed Mermaid syntax shows the error card rather than a blank slide
- [ ] Markdown headers appear as slide titles

**Settings**

- [ ] Show Titles toggles titles on and off
- [ ] Auto-hide Header hides the header after inactivity and restores it on movement
- [ ] About opens the repository in a new tab

**Legal**

- [ ] Privacy Policy opens, scrolls, and closes by both the button and the backdrop
- [ ] Legal Notice does the same

**Viewport**

- [ ] At 375px wide the header controls are all reachable
- [ ] At 1280px the diagram fills the available area without the page scrolling

**Console**

- [ ] No errors in the browser console in any of the above

---

## Traps

Two failure modes pass locally and break in production. Both have bitten this project.

**Content-Security-Policy behaves differently in development.** Vite injects inline scripts for hot
module replacement, so a policy with `script-src 'self'` breaks `npm run dev` while the production
build is unaffected. Validate any CSP change against the production build and the offline package.
A CSP that only ever ran against the dev server has not been tested.

**The offline package uses relative asset paths.** A change that works on GitHub Pages can still break
the offline zip and the Docker image, because they resolve assets differently. Steps 3 and 4 above are
not optional for any change that touches the build, `index.html`, or asset references.
