# Sample Markdown Document 2

This document demonstrates advanced Mermaid diagrams and real-world scenarios.

## CI/CD Pipeline

```mermaid
graph LR
    A[Developer] --> B[Git Commit]
    B --> C[CI Pipeline]
    C --> D{Tests Pass?}
    D -->|Yes| E[Build & Deploy]
    D -->|No| F[Notify Developer]
    E --> G[Production]
    F --> A
    
    style A fill:#e1f5fe
    style G fill:#c8e6c9
    style F fill:#ffcdd2
```

## Project Timeline

```mermaid
gantt
    title Project Development Timeline
    dateFormat  YYYY-MM-DD
    section Analysis
    Requirements    :done,    req, 2024-01-01, 2024-01-15
    Architecture    :done,    arch, after req, 10d
    section Development
    Backend API     :active,  backend, 2024-01-25, 30d
    Frontend UI     :         frontend, after arch, 25d
    Integration     :         integration, after backend, 10d
    section Testing
    Unit Tests      :         unit, after frontend, 10d
    E2E Tests       :         e2e, after integration, 5d
    section Deployment
    Staging         :         staging, after e2e, 3d
    Production      :         prod, after staging, 2d
```

## Class Hierarchy

```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
        +move()
    }
    
    class Dog {
        +String breed
        +bark()
        +wagTail()
    }
    
    class Cat {
        +String color
        +meow()
        +purr()
    }
    
    class Bird {
        +int wingspan
        +fly()
        +chirp()
    }
    
    Animal <|-- Dog
    Animal <|-- Cat
    Animal <|-- Bird
```

## System Architecture

```mermaid
graph TB
    subgraph "Frontend"
        A[React App]
        B[Component Library]
        C[State Management]
    end
    
    subgraph "Backend Services"
        D[API Gateway]
        E[User Service]
        F[Data Service]
        G[Auth Service]
    end
    
    subgraph "Data Layer"
        H[(PostgreSQL)]
        I[(Redis Cache)]
        J[(File Storage)]
    end
    
    A --> D
    B --> A
    C --> A
    D --> E
    D --> F
    D --> G
    E --> H
    F --> H
    G --> I
    F --> J
    
    classDef frontend fill:#e3f2fd
    classDef backend fill:#f3e5f5
    classDef data fill:#e8f5e8
    
    class A,B,C frontend
    class D,E,F,G backend
    class H,I,J data
```

This document demonstrates **4 advanced mermaid diagrams** including Gantt charts, class diagrams, and styled flowcharts.
