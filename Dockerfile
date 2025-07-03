# Dockerfile for Mermaid Slides Offline Testing
# Creates an isolated environment to test offline package functionality

FROM python:3.11-alpine

# Install Node.js for alternative server testing
RUN apk add --no-cache nodejs npm

# Create app directory
WORKDIR /app

# Copy the offline package
COPY offline-package/ .

# Expose the default port
EXPOSE 3000

# Test both Python and Node.js servers
RUN echo "Testing Python server availability..." && \
    python3 --version && \
    echo "Testing Node.js server availability..." && \
    node --version

# Default command runs the Python server
CMD ["python3", "start-server.py"]