# Test Mermaid Slides

This is a test file for verifying the Settings panel functionality.

## Diagram 1: Simple Flowchart

```mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
```

## Diagram 2: Sequence Diagram

```mermaid
sequenceDiagram
    participant A as Alice
    participant B as Bob
    A->>B: Hello Bob, how are you?
    B-->>A: Great!
    A-)B: See you later!
```

## Testing Instructions

1. Upload this file to Mermaid Slides
2. Click the **Settings gear icon** (should be where the theme dropdown was)
3. Test theme selection: Default → Dark → Forest → Base → Neutral
4. Try the auto-hide toggle (web only)
5. Click "About Mermaid Slides" to see GitHub link