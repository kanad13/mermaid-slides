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

## Budget Breakdown

Distribution of project costs:

\`\`\`mermaid
pie
    "Development" : 45
    "Design" : 20
    "Testing" : 15
    "Infrastructure" : 12
    "Marketing" : 8
\`\`\`

## Git Workflow

Our branching strategy and workflow:

\`\`\`mermaid
gitGraph
   commit
   commit
   branch develop
   checkout develop
   commit
   commit
   checkout main
   merge develop
   commit
   commit

\`\`\`

## System Architecture

High-level application architecture:

\`\`\`mermaid
graph TB
    subgraph "Frontend"
        A[React App] --> B[API Client]
    end

    subgraph "Backend"
        C[API Gateway] --> D[User Service]
        C --> E[Data Service]
        D --> F[User DB]
        E --> G[Main DB]
    end

    subgraph "External"
        H[Authentication]
        I[File Storage]
    end

    B --> C
    D --> H
    E --> I

    style A fill:#e1f5fe
    style C fill:#e8f5e8
    style H fill:#fff3e0
\`\`\`

## Network Architecture

With icons:

\`\`\`mermaid
architecture-beta
    group api(cloud)[API]

    service db(database)[Database] in api
    service disk1(disk)[Storage] in api
    service disk2(disk)[Storage] in api
    service server(server)[Server] in api

    db:L -- R:server
    disk1:T -- B:server
    disk2:T -- B:db
\`\`\`

## Display not just diagrams, but also images

Image taken from https://en.wikipedia.org/wiki/File:THE_VIEW_(Virtual_Reality).jpg

![Virtual Reality](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/THE_VIEW_%28Virtual_Reality%29.jpg/960px-THE_VIEW_%28Virtual_Reality%29.jpg)`;
