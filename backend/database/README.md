# Easyghar database (MySQL)

**Database name:** `easyghar`

## Schema & data (reference)

- **`schema_easyghar.sql`** – Full reference: tables + your cities + services data.
  - Tables: `cities`, `services`, `users`, `workers`, `worker_services`, `worker_documents`, `customers`.
  - Use when setting up a new DB or to remember the exact structure and seed data.

## Other scripts

- **`add_workers_default_address.sql`** – Adds `default_address` to `workers` (already included in `schema_easyghar.sql`).
- **`check_workers.sql`** – Queries to inspect workers and join with users/cities.
- **`customers_table.sql`** – Standalone `customers` table create.

## Run

```bash
mysql -u USER -p easyghar < database/schema_easyghar.sql
```

Or run parts in your MySQL client (e.g. MySQL Workbench) after `USE easyghar;`.
