# Production Exceptions — Frontend

React + TypeScript dashboard for production shortfall exceptions.

## Stack

- **React 19** + **Vite**
- **TypeScript**
- **Tailwind CSS v4**
- **Redux Toolkit** + **RTK Query**
- **React Router**
- **Recharts** (7-day planned vs actual trend)

## Feature-based structure

```
src/
  app/                 # store, router, providers
  pages/               # route-level pages
  features/
    exceptions/        # list, filters, detail panel, status mutations
    dashboard/         # summary cards
  shared/              # UI primitives, layout, types, API base
```

## Run locally

```bash
# from repo root — start backend on :3000 first
cd backend && npm run dev

# frontend (proxies /excetions and /dashboard → :3000)
cd frontend && npm install && npm run dev
```

Open [http://localhost:5173/dashboard](http://localhost:5173/dashboard).

## API notes

The backend mounts exceptions at **`/excetions`** (spelling in server). The Vite dev proxy and RTK Query client use that path as-is. No backend changes required.
