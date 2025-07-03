export const sampleMarkdown: string = `# Project Documentation

This is some regular markdown content.

\`\`\`mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]
\`\`\`

## Database Schema

Here's our database structure:

\`\`\`mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER {
        string name
        string email
        int id
    }
    ORDER ||--|{ ORDER_ITEM : contains
    ORDER {
        int id
        datetime created_at
        string status
    }
    ORDER_ITEM {
        int quantity
        decimal price
    }
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    PRODUCT {
        string name
        decimal price
        string description
    }
\`\`\`

## Process Flow

The following shows our deployment process:

\`\`\`mermaid
sequenceDiagram
    participant Dev as Developer
    participant Git as Git Repository
    participant CI as CI/CD Pipeline
    participant Prod as Production

    Dev->>Git: Push code
    Git->>CI: Trigger build
    CI->>CI: Run tests
    CI->>CI: Build application
    CI->>Prod: Deploy if tests pass
    Prod->>Dev: Notify deployment status
\`\`\`

## Complex System Architecture

This is a large, complex diagram to test rendering of big content:

\`\`\`mermaid
graph TB
    subgraph "Frontend Layer"
        A[React App] --> B[Component Library]
        A --> C[State Management]
        A --> D[Router]
        B --> E[UI Components]
        B --> F[Form Components]
        B --> G[Chart Components]
        C --> H[Redux Store]
        C --> I[Context API]
        C --> J[Local Storage]
    end

    subgraph "API Gateway Layer"
        K[Load Balancer] --> L[API Gateway 1]
        K --> M[API Gateway 2]
        K --> N[API Gateway 3]
        L --> O[Rate Limiter]
        M --> P[Authentication]
        N --> Q[Request Logging]
    end

    subgraph "Microservices Layer"
        R[User Service] --> S[User Database]
        T[Product Service] --> U[Product Database]
        V[Order Service] --> W[Order Database]
        X[Payment Service] --> Y[Payment Database]
        Z[Notification Service] --> AA[Message Queue]
        BB[Analytics Service] --> CC[Data Warehouse]

        R --> DD[Redis Cache]
        T --> DD
        V --> DD
        X --> DD
    end

    subgraph "External Services"
        EE[Payment Gateway]
        FF[Email Service]
        GG[SMS Service]
        HH[CDN]
        II[Third-party APIs]
    end

    subgraph "Infrastructure"
        JJ[Kubernetes Cluster]
        KK[Docker Containers]
        LL[Monitoring]
        MM[Logging]
        NN[Backup System]
        OO[Security Scanner]
    end

    A --> K
    O --> R
    P --> R
    Q --> T
    O --> V
    P --> X
    Q --> Z

    X --> EE
    Z --> FF
    Z --> GG
    A --> HH

    R --> II
    T --> II

    JJ --> KK
    LL --> MM
    MM --> NN
    OO --> JJ

    style A fill:#e1f5fe
    style K fill:#f3e5f5
    style R fill:#e8f5e8
    style EE fill:#fff3e0
    style JJ fill:#fce4ec
\`\`\`

## Visual Examples

Here are some example images to demonstrate the image rendering functionality:

![Small image - should be centered](https://kanad13.github.io/mermaid-slides/examples/assets/673×1024-pixels.jpg)

![Large image - should be centered](https://kanad13.github.io/mermaid-slides/examples/assets/2560×1707-pixels.jpg)`;
