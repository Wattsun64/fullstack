```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: GOTO https://studies.cs.helsinki.fi/exampleapp/spa
    browser->>server: GET spa.html document
    server-->>browser: HTML document
    browser->>server: GET main.css
    server-->>browser: CSS document
    browser->>server: GET spa.js
    server-->>browser: JavaScript document
    browser->>server: GET data.json
    server-->>browser: JSON document
    Note to right of user: Browser executes scripts and runs the xhttp request to retrieve current notes data
    browser-->>user: Application
```
