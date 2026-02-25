import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDb } from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import courseRoutes from './routes/course.js';

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.CORS_ORIGIN,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) {
        cb(null, true);
        return;
      }
      if (allowedOrigins.includes(origin)) {
        cb(null, origin);
        return;
      }
      cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.type('text/plain').send('OK');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/user', userRoutes);
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/course', courseRoutes);

connectDb()
  .then(() => app.listen(port, () => console.log(`Server on ${port}`)))
  .catch((err) => {
    console.warn('DB connect failed', err?.message || err);
    app.listen(port, () => console.log(`Server on ${port} (no DB)`));
  });
