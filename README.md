# Verz

AI-powered car marketplace built with a Django REST API and a Next.js frontend.

## Stack

- Backend: Python, Django, Django REST Framework
- Database: PostgreSQL, with SQLite fallback for local bring-up
- Frontend: Next.js and React
- Photos: Cloudflare R2 later
- Background jobs: Celery and Redis later
- Hosting target: DigitalOcean App Platform for the Django API

## Current Scope

The scaffold includes core marketplace entities for dealerships, listings, listing photos, buyer leads, and appointments. Listings expose an AI-assist payload with generated description copy, missing listing items, photo checklist state, quality score, and price suggestion range.

## Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

API routes start at `http://localhost:8000/api/`.

## Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

The web app runs at `http://localhost:3000/`.

## Next Product Steps

1. Add authenticated seller and dealer accounts.
2. Connect VIN decode to a provider and persist decoded vehicle attributes.
3. Add OpenAI-backed listing description generation.
4. Add Cloudflare R2 signed uploads for listing photos.
5. Build dealer lead inbox and appointment workflows.
