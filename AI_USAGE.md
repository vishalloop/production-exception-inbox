# AI Usage Report

## Tools Used

### ChatGPT (GPT-5.5)

ChatGPT was my primary development assistant throughout the backend development. I used it to:

- Learn SQLite and Prisma from scratch, as I previously had experience only with MongoDB.
- Design the backend architecture using Repository → Service → Controller → Route layers.
- Design the database schema, including raw tables, normalized tables, and materialized exception tables.
- Build the ETL pipeline for importing CSV files, validating records, normalizing data, and generating exceptions.
- Generate backend boilerplate code for Express, Prisma, repositories, services, controllers, and routes.
- Debug TypeScript, Prisma, and Express issues.
- Explain backend concepts and generated code line by line so I could understand and modify the implementation rather than simply copying it.

### Grok Build

Grok Build was used primarily for frontend scaffolding and UI generation.

It was used to:

- Generate the initial React application structure.
- Create an industry-style feature-based folder structure.
- Scaffold the dashboard page.
- Generate the timeline-based exception inbox UI.
- Create collapsible daily groups.
- Implement filters, badges, and Redux Toolkit state management.
- Scaffold the exception detail panel with a 7-day trend chart.
- Generate the initial TailwindCSS component structure.

The generated frontend code was reviewed and integrated with my backend APIs manually.

---

# Most Important Prompts

## Prompt 1

> "i have did the basic express server setup, after this can you telll me one thing that why we are using postgresql, i mean we can use sqlLite too ,give proper explaination, besides in the project data that i shared they also saying sqlLite many times???"

### Result

ChatGPT explained the differences between PostgreSQL and SQLite, including their trade-offs, and helped me decide to use SQLite because it matched the assignment requirements. It also explained how Prisma works with SQLite and how the overall backend architecture would change compared to MongoDB.

---

## Prompt 2

> "yeah ,I am using the lastest version, and now everything is fine, but can yu tell me do i need to paste the csv files in data folder, also, can you explain what happenned in the previous files step by step, as i previously used mongodb, so exlain me accordingly, like you are explaining to a dumb"

### Result

Instead of simply generating code, ChatGPT explained the complete backend setup step by step, including:

- How Prisma generates the database client.
- How SQLite differs from MongoDB.
- Why `schema.prisma`, `prisma.config.ts`, and `prisma.ts` exist.
- How Prisma connects to the database.
- Where the CSV files should be stored.
- How the backend would eventually process those CSV files.

This gave me enough understanding to continue building the project instead of only copying code.

---

## Prompt 3

> "now lets read the both csv, validate it, and them insert into our empty tables, give me the code all at once, but make sure to follow the structure"

### Result

Generated the complete ETL import pipeline, including:

- Reading both CSV files.
- Parsing CSV records.
- Validating every row.
- Logging invalid records.
- Skipping corrupted rows.
- Importing valid rows into raw database tables.
- Displaying import statistics (total, imported, skipped).

This became the foundation of the data ingestion process.

---

## Prompt 4

> "see basically i have created till, import-actual-production.ts, and import-production-plan.ts, and then i believe next part is to upload these, to the database, and then verify it, tell me industry production-grade step, to do this"

### Result

ChatGPT explained the overall ETL workflow used in production systems and guided me through:

- Importing raw CSV data.
- Verifying imported records.
- Creating normalized tables.
- Transforming raw data into clean production data.
- Generating materialized exception records.

It also explained why each stage exists and how data flows through the pipeline.

---

## Prompt 5

> "man i am confused now, see i guess here the database operation is happening, but i believe it was done in dao folder, most importantly i am still not able to figure out what the hell is happening after i write import-production.ts and import-actual-production.ts, can you explain it, like i believe that now the logic to import raw databases is ready, we should import these two csvs, and then after this focus on buikding another tables like productionplan, and actualproduction and exception and all that, am i write, and if i am, then why in the world are you even confusing me??"

### Result

Rather than simply answering the question, ChatGPT clarified the complete backend architecture and responsibilities of each layer.

It explained:

- The ETL pipeline (Raw → Clean → Exceptions).
- Why import scripts are separate from repositories.
- The purpose of Repository, Service, Controller, and Route layers.
- How database operations flow through the application.
- Why exceptions should be materialized in a separate table instead of being calculated by the frontend.

These explanations helped me understand the architecture well enough to continue implementing the remaining backend features.

---

## Prompt 6 (Grok Build)

> "See the backend is completed, i want you to not do anything in backend whatsoever, i want you to create frontend inside the frontend folder, using React, together with TailwindCSS, Redux Toolkit, TypeScript, with industry graded, feature based folder structure, everything separate and clean, where there is a /dashboard page where all the exceptions must be listed within each day, each day must be collapsible group, showing that day's exceptions. Besides Severity badges + filters (by product, by severity) that work across the timeline. After this i want you to create the exception detail panel, where when we click an exception it appears showing the numbers and 7-day trend using the best chart package you prefer, together with a button to acknowledge or resolve the exception that updates the UI without a full page reload."

### Result

Generated the initial frontend architecture, including:

- Feature-based React folder structure.
- React + TypeScript + TailwindCSS setup.
- Redux Toolkit state management.
- Dashboard timeline layout.
- Collapsible day groups.
- Product and severity filters.
- Exception detail panel.
- Interactive 7-day trend chart.
- Status update workflow integrated with backend APIs.

The generated frontend was then reviewed, connected to the backend endpoints, and refined where necessary.

---

# Where AI Was Wrong & How I Caught It

One issue occurred during the Prisma setup.

Initially, the generated code assumed the default Prisma client configuration:

```ts
import { PrismaClient } from "@prisma/client";
```

However, my project was using the latest Prisma generator configuration:

```prisma
generator client {
    provider = "prisma-client"
    output = "../generated/prisma"
}
```

This resulted in TypeScript errors because the generated client was located in a different directory. I compared the generated code with the Prisma documentation, verified my generator configuration, and updated the imports accordingly.

Another issue appeared during CSV import.

The generated code initially assumed that every CSV row contained valid values. While testing, the validator detected two rows where `planned_units` was missing. Instead of inserting invalid records, I modified the validation logic to reject those rows, log the row numbers, continue importing the remaining valid data, and report the skipped records. This matched the assignment requirement of inspecting and handling data quality issues.

---

# AI vs Hand-Written Split

Approximate contribution:

- **AI-generated (initial implementation and boilerplate): 70%**
- **Heavily edited, debugged, tested, and manually integrated: 30%**

AI accelerated development by generating architecture ideas, boilerplate code, and explanations. However, significant manual effort was spent on understanding the generated code, debugging Prisma configuration issues, validating imported data, integrating different components, testing APIs, and refining the final implementation to satisfy the assignment requirements.