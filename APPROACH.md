# Approach

## Problem Breakdown

I approached the assignment by first understanding the complete data flow before writing any application code. Since the application revolves around production planning data, I wanted to separate the work into independent stages instead of directly building APIs.

My implementation followed these phases:

1. **Data Inspection**
   - Inspected both CSV files.
   - Understood available columns and relationships.
   - Identified primary identifiers (date, plant, product).
   - Looked for missing or inconsistent values before importing.

2. **Database Design**
   - Designed a layered database consisting of:
     - Raw import tables
     - Clean normalized tables
     - Materialized exception table
   - Created the schema using Prisma with SQLite.

3. **ETL Pipeline**
   - Imported both CSV files into raw tables.
   - Validated every row before insertion.
   - Logged invalid records while continuing the import process.
   - Normalized the raw data into clean business tables.
   - Generated exception records using the assignment's business rules.

4. **Backend API**
   - Built a layered Express backend using:
     - Repository Layer
     - Service Layer
     - Controller Layer
     - Route Layer
   - Implemented filtering, pagination, dashboard summary, trend generation, and status updates.

5. **Frontend**
   - Built a React application using a feature-based architecture.
   - Implemented a timeline inbox grouped by production date.
   - Added filtering, severity badges, a detail panel, and a 7-day production trend visualization.

---

# Process Flow Diagram

![Architecture](assets/architecture.png)

Overall pipeline:

```text
CSV Files
      │
      ▼
Inspect Data
      │
      ▼
Design Database Schema
      │
      ▼
Create Empty Tables
      │
      ▼
Import CSV → Raw Tables
      │
      ▼
Validate Data
      │
      ▼
Normalize Data
      │
      ▼
Generate Exception Table
      │
      ▼
Repository Layer
      │
      ▼
Service Layer
      │
      ▼
Controller Layer
      │
      ▼
REST API
      │
      ▼
React Dashboard
```

---

# Data Decisions

Before importing the CSV files, I manually inspected the data to understand its structure and quality.

### Observations

- Production Plan contained 1085 rows.
- Actual Production contained 1080 rows.
- Two rows in the Production Plan CSV had missing `planned_units` values.
- Date values required parsing into JavaScript `Date` objects before insertion into SQLite.

### Handling Strategy

Rather than inserting incomplete records into the database, every row passes through a validator.

The validator:

- Ensures required fields are present.
- Converts date strings into valid Date objects.
- Rejects malformed rows.
- Logs skipped rows.
- Continues importing remaining valid records.

As a result:

| Dataset | Imported | Skipped |
|---------|----------:|---------:|
| Production Plan | 1083 | 2 |
| Actual Production | 1080 | 0 |

This keeps the database clean while preserving a resilient import process.

---

# Schema & Why

The database intentionally separates different stages of the ETL pipeline.

### RawProductionPlan

Stores the original production planning data exactly as imported from the CSV.

Reason:

Preserve source data for auditing and possible reprocessing.

---

### RawActualProduction

Stores the original production output exactly as received.

Reason:

Keeps imported data independent from business transformations.

---

### ProductionPlan

Stores validated and normalized production planning records.

Reason:

Provides clean business data for downstream processing.

---

### ActualProduction

Stores validated and normalized production output.

Reason:

Acts as the production-ready dataset for comparison against planning data.

---

### Exception

Stores materialized production deficit records.

Reason:

Instead of recalculating shortages on every frontend request, exceptions are generated once and stored permanently. This significantly simplifies querying, filtering, and dashboard generation.

---

# API Design Notes

The backend follows a layered architecture:

```text
Routes
    ↓
Controllers
    ↓
Services
    ↓
Repositories
    ↓
Prisma ORM
    ↓
SQLite
```

The API exposes four primary endpoints:

- `GET /exceptions`
  - Pagination
  - Product filtering
  - Severity filtering
  - Status filtering
  - Date descending sorting
  - Worst deficit first within each day

- `GET /exceptions/:id`
  - Exception details
  - 7-day production trend

- `PATCH /exceptions/:id`
  - Updates exception status

- `GET /dashboard`
  - Returns aggregated dashboard statistics

Repository methods focus only on database operations, while business rules remain inside the service layer.

---

# Tradeoffs & Shortcuts

Given the scope of the assignment, I made several deliberate tradeoffs.

- SQLite was chosen instead of PostgreSQL because it matched the assignment requirements and simplified local development.
- Exception records are generated during the ETL process rather than recalculated on every request.
- Authentication and authorization were intentionally omitted because they were outside the assignment scope.
- The frontend focuses on functionality rather than extensive visual polish.
- The ETL pipeline currently runs as a manual script (`npm run import`) instead of a scheduled background job.

These choices allowed me to prioritize correctness, maintainability, and the overall architecture.

---

# Next Steps

With additional development time, I would extend the project with:

- Automated ETL scheduling using cron jobs.
- Docker-based deployment.
- Authentication and role-based authorization.
- Unit and integration tests.
- Audit logs for exception status changes.
- Real-time updates using WebSockets.
- Historical analytics dashboards.
- CSV upload through the web interface.
- Background processing queues for large datasets.