# Easyghar Backend

Node.js (Express) API for Easyghar.

## Setup

1. Copy `.env.example` to `.env` and set your values.
2. `npm install`
3. Run SQL scripts in `database/` against your MySQL (easyghar) if needed.
4. `node server.js`

## Env

Use a single `.env` file (from `.env.example`). Do not commit `.env`.

For **admin dashboard**: set `ADMIN_API_KEY` in backend `.env`. In frontend, set `REACT_APP_ADMIN_SECRET` to the same value, or enter the key when the admin dashboard asks for it.

## Scripts

- `node server.js` — start server (default port 5000)
