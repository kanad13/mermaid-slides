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

## Current workflow

`.github/workflows/deploy.yml` currently runs for pushes to `main` or `master` and for manual workflow
dispatch. A successful run:

1. installs dependencies;
2. runs tests, lint, builds, and compatibility validation;
3. deploys `dist/` to GitHub Pages;
4. creates a GitHub release and uploads the offline zip plus checksum;
5. builds and pushes multi-architecture Docker images;
6. updates the Docker Hub description and writes a deployment summary.

A push to `master` therefore publishes. Do not merge or push `master` unless publication is intended.
The active engineering milestone changes this to validated tag-only publishing.

The workflow requires:

- GitHub Pages configured for GitHub Actions;
- `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets;
- repository permissions for Pages, releases, and the OIDC token used by Pages.

## Release operation

Until tag-only publishing is implemented, follow the current workflow trigger above and treat a
default-branch push as a release action.

Before publication:

1. choose an unused semantic version;
2. update `package.json` and its lockfile together;
3. run the release gate defined in [TESTING.md](TESTING.md#release-evidence);
4. review the complete diff and generated web/offline artefacts;
5. confirm Docker credentials and Pages configuration;
6. obtain explicit approval to publish.

Never reuse a Git tag. Never publish from an unreviewed feature-branch commit.

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
