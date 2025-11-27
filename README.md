# Full-Stack Notes App (JWT) — Quick Start

## What it is
A minimal full-stack notes app:
- Backend: Node.js + Express + MongoDB (Mongoose)
- Auth: JWT (POST /auth/login)
- Protected Notes CRUD: POST/GET/PUT/DELETE /notes (user-scoped)
- Frontend: React + Redux Toolkit (login + notes UI)

## Project structure
See repo tree in root — backend and frontend folders.

## Run Backend
1. cd backend
2. npm install
3. Copy `.env.example` → `.env` and set:
   - MONGO_URI (e.g. mongodb://localhost:27017/notesapp)
   - JWT_SECRET (a random string)
4. Seed a test user:
   - npm run seed
   - (creates user@example.com / password123)
5. Start server:
   - npm run dev    (or `npm start`)

API base: http://localhost:5000

## Run Frontend
1. cd frontend
2. npm install
3. npm run dev
4. Open http://localhost:5173 (vite) — if different, terminal will show URL

## Login (test credentials)
- email: user@example.com
- password: password123

## Notes API
- POST /auth/login  -> { token }
- GET /notes        -> list (requires Authorization: Bearer <token>)
- POST /notes       -> create { title, content }
- PUT /notes/:id    -> update
- DELETE /notes/:id -> delete

## Bonus tips
- Frontend stores token in Redux (in-memory). For persistence add localStorage.
- To change ports, update .env (backend PORT) and frontend API URLs in `src/features/*` or centralize base URL.


