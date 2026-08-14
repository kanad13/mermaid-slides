# Production image for Mermaid Slides.
#
# Serves the pre-built offline package using the small Python server bundled
# inside it. `offline-package/` must exist before building — run
# `npm run build:offline` first, which is what both the release and the
# validation workflows do.
#
# The image contains static files and a standard-library HTTP server. There is
# no application state, nothing writes to disk at runtime, and no network call
# is made from inside the container, so it is safe to run with
# `--read-only --cap-drop=ALL`.

# Pinned by digest as well as tag: a tag can be repointed at different content,
# a digest cannot. Refresh both together when moving to a newer base.
FROM python:3.11-alpine@sha256:7f201c3e6b89833ce66d0e623b3d3c89417d0e02284041611ef2139b45e6e79e

# Serving as root buys nothing here. Port 3000 is above 1024, so binding it
# needs no privilege.
RUN addgroup -S mermaid && adduser -S -G mermaid mermaid

WORKDIR /app

COPY --chown=mermaid:mermaid offline-package/ ./

USER mermaid

EXPOSE 3000

# Uses the interpreter that is already present rather than adding curl or wget
# to the image purely to check on itself.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD python3 -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:3000/', timeout=2).read(1)" \
    || exit 1

# --no-browser because there is no browser to open in a container; without it
# the server tries and fails on startup for no reason.
CMD ["python3", "start-server.py", "--no-browser"]
