# LMS

Tiny notes so we remember how this thing boots.

**Apps**
- `frontend/` → Vite + React UI (5173)
- `backend/` → Express API (8000)

**Env**
- Copy `frontend/.env.example` → `frontend/.env` (sets `VITE_API_URL`)
- Copy `backend/.env.example` → `backend/.env` (PORT, `FRONTEND_URL`, `DB_URI`)

**Run local**
- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && npm run dev`
