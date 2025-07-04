# Mermaid Slides Extension Demo

This is a test file to demonstrate the VS Code extension functionality.

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
sequenceDiagram
    participant User
    participant VSCode
    participant Extension
    participant MermaidSlides
    
    User->>VSCode: Open markdown file
    VSCode->>Extension: Activate extension
    Extension->>MermaidSlides: Parse diagrams
    MermaidSlides-->>Extension: Return slides
    Extension-->>User: Display preview
```

## Test Instructions

1. Open this file in VS Code with the extension installed
2. Look for the "Preview Mermaid Slides" button in the tab bar
3. Click it to open the preview
4. Navigate through the slides using arrow keys or navigation controls