# LMS

Copy `frontend/.env.example` and `backend/.env.example` to `.env` in each folder, then:

- **Backend:** `cd backend && npm run dev`
- **Frontend:** `cd frontend && npm run dev`

Frontend talks to the API URL in its env (e.g. `VITE_API_URL`). Backend port and CORS origin are in its `.env`.

Auth is cookie-based: signup, login, and logout live under `/api/auth`. Set `JWT_SECRET` in backend `.env` or those won’t work.
