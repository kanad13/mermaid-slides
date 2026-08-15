# Build and Deployment

Mermaid Slides ships the same application through three channels.

| Channel | Build/output | Published to |
| --- | --- | --- |
| Web | `npm run build` → `dist/` | GitHub Pages at [mermaid-slides.com](https://mermaid-slides.com/) |
| Offline | `npm run build:offline` → `offline-package/` | Versioned zip in GitHub Releases |
| Docker | Dockerfile plus generated `offline-package/` | `kunalpathak13/mermaid-slides` on Docker Hub |

`package.json` owns the application version. A release must build all channels from the same commit
and version.

## Local builds

Use a Node version allowed by `package.json` and install from the lockfile:

```bash
npm ci
npm run build
npm run build:offline
```

The web build uses root-relative assets. The offline build uses relative assets and then copies the
launchers, offline README, and examples into `offline-package/`.

The Dockerfile expects `offline-package/` to exist:

```bash
npm run build:offline
docker build -t mermaid-slides:local .
docker run --rm -p 3000:3000 mermaid-slides:local
```

Open `http://localhost:3000`.

## Validation and publishing workflow

`.github/workflows/deploy.yml` validates every branch push and pull request, including pushes to
`master`. These runs install from the lockfile, run the unit and lint gates, check workflow invariants
with actionlint, build the web and offline distributions, and run compatibility and documentation
continuity checks. Branch and pull-request runs do not upload release artefacts or reach a publishing
job.

Publishing starts only for a pushed `v*` tag. Before any channel can publish, the workflow checks
that:

- the tag is exactly `v` followed by the version in `package.json`;
- the tagged commit is contained in `origin/master` history;
- the normal validation and both production builds pass.

The publishing jobs then deploy `dist/` to GitHub Pages, create a GitHub release with generated notes
and a checksummed offline zip, and push `latest` plus the package version to Docker Hub. Actions are
pinned to immutable commits. Workflow permissions default to read-only; only the Pages job receives
Pages and OIDC write access, and only the GitHub release job receives repository-content write
access.

The workflow requires GitHub Pages configured for GitHub Actions and the `DOCKER_USERNAME` and
`DOCKER_PASSWORD` secrets.

## Release operation

Before publication:

1. choose an unused semantic version;
2. update `package.json` and its lockfile together;
3. run the release gate defined in [TESTING.md](TESTING.md#release-evidence);
4. review the complete diff and generated web/offline artefacts;
5. merge the reviewed release commit into `master`;
6. confirm Docker credentials and Pages configuration;
7. obtain explicit approval to publish;
8. create the matching `v<package-version>` tag on that commit and push only that tag.

Pushing the tag is the release operation. A branch push, pull request, or push to `master` only
validates. Never reuse a Git tag or tag an unreviewed commit.

## Post-release checks

After the workflow completes:

- open the live web application and load the shared fixture deck;
- download the offline zip, verify its checksum, extract it, and test both Python and Node launchers;
- pull the versioned Docker tag and confirm the application is served;
- compare displayed version information across channels;
- record any channel or platform not checked.

## Offline and container safety

The bundled launchers are convenience static-file servers, not public web servers. Their current
network behavior and precautions are documented in
[`public/offline-template/README.md`](../public/offline-template/README.md). Do not expose them to an
untrusted network.
