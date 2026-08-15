# Flowchart diagram

```mermaid
flowchart TD
    Start([Start]) --> Choice{Continue?}
    Choice -->|Yes| Finish([Finish])
    Choice -->|No| Start
```

# Duplicate sequence one

```mermaid
sequenceDiagram
    participant Browser
    participant Renderer
    Browser->>Renderer: Render fixture
    Renderer-->>Browser: Return SVG
```

# Duplicate sequence two

```mermaid
sequenceDiagram
    participant Browser
    participant Renderer
    Browser->>Renderer: Render fixture
    Renderer-->>Browser: Return SVG
```

# Entity relationship diagram

```mermaid
erDiagram
    AUTHOR ||--o{ DOCUMENT : writes
    DOCUMENT ||--|{ SECTION : contains
    AUTHOR {
        string name
        string email
    }
    DOCUMENT {
        string title
        date created
    }
```

# Class diagram

```mermaid
classDiagram
    class Deck {
        +string title
        +render()
    }
    class Slide {
        +string source
    }
    Deck "1" *-- "many" Slide
```

# State diagram

```mermaid
stateDiagram-v2
    [*] --> Editing
    Editing --> Presenting: open viewer
    Presenting --> Editing: close viewer
    Presenting --> [*]
```

# Gantt diagram

```mermaid
gantt
    title Deterministic release plan
    dateFormat YYYY-MM-DD
    section Foundation
    Contract tests :done, contract, 2026-01-01, 1d
    Browser tests :active, browser, after contract, 2d
```

# Pie diagram

```mermaid
pie showData
    title Fixture distribution
    "Diagrams" : 8
    "Images" : 4
    "Errors" : 3
```

# Git graph diagram

```mermaid
gitGraph
    commit id: "foundation"
    branch fixture
    checkout fixture
    commit id: "contract"
    checkout main
    merge fixture id: "verified"
```

# Tiny diagram

```mermaid
flowchart TD
    A --> B
```

# Tall diagram

```mermaid
flowchart TD
    T01[Step 01] --> T02[Step 02]
    T02 --> T03[Step 03]
    T03 --> T04[Step 04]
    T04 --> T05[Step 05]
    T05 --> T06[Step 06]
    T06 --> T07[Step 07]
    T07 --> T08[Step 08]
    T08 --> T09[Step 09]
    T09 --> T10[Step 10]
    T10 --> T11[Step 11]
    T11 --> T12[Step 12]
    T12 --> T13[Step 13]
    T13 --> T14[Step 14]
    T14 --> T15[Step 15]
    T15 --> T16[Step 16]
    T16 --> T17[Step 17]
    T17 --> T18[Step 18]
    T18 --> T19[Step 19]
    T19 --> T20[Step 20]
```

# Wide diagram

```mermaid
flowchart LR
    N1 --> N2 --> N3 --> N4 --> N5 --> N6 --> N7 --> N8
    N8 --> N9 --> N10 --> N11 --> N12
```

# Large diagram

```mermaid
flowchart TD
    L01[Large fixture node 01 with deterministic descriptive content] --> L02[Large fixture node 02 with deterministic descriptive content]
    L02 --> L03[Large fixture node 03 with deterministic descriptive content]
    L03 --> L04[Large fixture node 04 with deterministic descriptive content]
    L04 --> L05[Large fixture node 05 with deterministic descriptive content]
    L05 --> L06[Large fixture node 06 with deterministic descriptive content]
    L06 --> L07[Large fixture node 07 with deterministic descriptive content]
    L07 --> L08[Large fixture node 08 with deterministic descriptive content]
    L08 --> L09[Large fixture node 09 with deterministic descriptive content]
    L09 --> L10[Large fixture node 10 with deterministic descriptive content]
    L10 --> L11[Large fixture node 11 with deterministic descriptive content]
    L11 --> L12[Large fixture node 12 with deterministic descriptive content]
    L12 --> L13[Large fixture node 13 with deterministic descriptive content]
    L13 --> L14[Large fixture node 14 with deterministic descriptive content]
    L14 --> L15[Large fixture node 15 with deterministic descriptive content]
    L15 --> L16[Large fixture node 16 with deterministic descriptive content]
    L16 --> L17[Large fixture node 17 with deterministic descriptive content]
    L17 --> L18[Large fixture node 18 with deterministic descriptive content]
    L18 --> L19[Large fixture node 19 with deterministic descriptive content]
    L19 --> L20[Large fixture node 20 with deterministic descriptive content]
    L20 --> L21[Large fixture node 21 with deterministic descriptive content]
    L21 --> L22[Large fixture node 22 with deterministic descriptive content]
    L22 --> L23[Large fixture node 23 with deterministic descriptive content]
    L23 --> L24[Large fixture node 24 with deterministic descriptive content]
    L24 --> L25[Large fixture node 25 with deterministic descriptive content]
    L25 --> L26[Large fixture node 26 with deterministic descriptive content]
    L26 --> L27[Large fixture node 27 with deterministic descriptive content]
    L27 --> L28[Large fixture node 28 with deterministic descriptive content]
    L28 --> L29[Large fixture node 29 with deterministic descriptive content]
    L29 --> L30[Large fixture node 30 with deterministic descriptive content]
    L30 --> L31[Large fixture node 31 with deterministic descriptive content]
    L31 --> L32[Large fixture node 32 with deterministic descriptive content]
    L32 --> L33[Large fixture node 33 with deterministic descriptive content]
    L33 --> L34[Large fixture node 34 with deterministic descriptive content]
    L34 --> L35[Large fixture node 35 with deterministic descriptive content]
    L35 --> L36[Large fixture node 36 with deterministic descriptive content]
```

# Empty Mermaid input

```mermaid
```

# Malformed Mermaid input

```mermaid
flowchart TD
    A -- definitely not valid -->
```

# Normal local image

![Normal bundled fixture image](/test-fixtures/fixture-image.svg)

# Already-cached local image

![Repeated bundled fixture image](/test-fixtures/fixture-image.svg)

# Delayed local image

![Delayed bundled fixture image](/test-fixtures/delayed-image.svg?delay=250)

# Broken local image

![Deliberately missing fixture image](/test-fixtures/missing-image.svg)

# Long title fixture with enough deterministic text to exercise wrapping, clipping, navigation labels, grid cards, and later printable headings without relying on generated prose or runtime randomness in any distribution channel

```mermaid
flowchart LR
    LongTitle[Long title] --> Wrapped[Wrapped safely]
```

# Long Mermaid error source

```mermaid
flowchart TD
    E01[Long malformed fixture segment 01] --> E02[Long malformed fixture segment 02]
    E02 --> E03[Long malformed fixture segment 03]
    E03 --> E04[Long malformed fixture segment 04]
    E04 --> E05[Long malformed fixture segment 05]
    E05 --> E06[Long malformed fixture segment 06]
    E06 --> E07[Long malformed fixture segment 07]
    E07 --> E08[Long malformed fixture segment 08]
    E08 --> E09[Long malformed fixture segment 09]
    E09 --> E10[Long malformed fixture segment 10]
    E10 --> E11[Long malformed fixture segment 11]
    E11 --> E12[Long malformed fixture segment 12]
    E12 --> E13[Long malformed fixture segment 13]
    E13 --> E14[Long malformed fixture segment 14]
    E14 --> E15[Long malformed fixture segment 15]
    E15 --> E16[Long malformed fixture segment 16]
    BROKEN_END -->
```

# Hostile title <script data-fixture="title">window.fixtureAttack=true</script>

```mermaid
flowchart TD
    Untrusted[Untrusted title] --> Text[Render as text]
```

# Hostile image alt text

![<img src=x onerror="window.fixtureAttack=true"> & <script>fixtureAttack()</script>](/test-fixtures/fixture-image.svg)
