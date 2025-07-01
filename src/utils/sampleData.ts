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
\`\`\``;