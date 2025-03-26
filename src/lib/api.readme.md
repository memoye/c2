## USAGE FLOW

```bash
        A[Request Fails with 401] --> B{Is Refreshing?}
        B -->|No| C[Start Refresh Process]
        B -->|Yes| D[Queue Request]
        C --> E{User Authenticated?}
        E -->|Yes| F[Silent Renew]
        E -->|No| G[Fetch Guest Token]
        F --> H[Update User State]
        G --> I[Update Guest State]
        H --> J[Process Queue]
        I --> J
        J --> K[Retry Original Request]
```
