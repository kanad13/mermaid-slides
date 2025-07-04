# Test Mermaid Slides Extension

This is a test markdown file to verify the VS Code extension works correctly.

## Sample Mermaid Diagram

```mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]
```

## Another Diagram

```mermaid
flowchart LR
    A[Extension] --> B[React App]
    B --> C[Mermaid Slides]
    C --> D[Presentation]
```

## Test Complete

If you can see this content in the extension preview, the embedding is working correctly!