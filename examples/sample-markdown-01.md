# Sample Markdown Document 1

This is a sample markdown document demonstrating various Mermaid diagram types for use with Mermaid Slides.

## Simple Flowchart

```mermaid
graph TD
    A[Start] --> B{Decision Point}
    B -->|Yes| C[Process A]
    B -->|No| D[Process B]
    C --> E[End]
    D --> E
```

## User Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant A as App
    participant S as Auth Server
    participant D as Database
    
    U->>A: Login Request
    A->>S: Validate Credentials
    S->>D: Check User
    D-->>S: User Data
    S-->>A: Auth Token
    A-->>U: Login Success
```

## Basic Entity Relationship

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER {
        string name
        string email
        string phone
    }
    ORDER {
        int orderNumber
        date orderDate
        string status
    }
    LINE-ITEM {
        string productCode
        int quantity
        float price
    }
```

## State Machine Example

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Loading : start
    Loading --> Success : data received
    Loading --> Error : network error
    Success --> Idle : reset
    Error --> Idle : retry
    Error --> [*] : give up
```

This document contains **4 mermaid diagrams** that will be extracted and displayed as slides.
