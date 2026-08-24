# @cubekit-cloud/cubekit-sdk-js

Format client for **itaces-crud** HTTP. Same methods for tenant (cookie) and a host without BFF (`baseUrl` + api-key).

```ts
import { createFormatClient, passthroughItemSchema } from '@cubekit-cloud/cubekit-sdk-js';

const api = createFormatClient({
  baseUrl: 'https://orm-data.example.com',
  auth: { type: 'apiKey', value: process.env.API_KEY! },
});

const { items } = await api.search(
  { path: '/api/v1.0/orm-data/Book' },
  passthroughItemSchema,
  { where: [{ column: 'title', value: 'Dune' }] },
  { page: 1, limit: 20 },
);
```

Tenant same-origin: `createFormatClient({ baseUrl: '', auth: { type: 'cookie' } })`. Console: pass `http` from `@cubekit/console-session`.

Do not build this HTTP in the app. `@cubekit/crud-client` is deprecated — use this package.
