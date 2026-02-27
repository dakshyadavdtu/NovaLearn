import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDb } from './config/db.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import courseRouter from './routes/course.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      process.env.CORS_ORIGIN ||
      'http://localhost:5173',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.type('text/plain').send('LMS API');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/course', courseRouter);

connectDb()
  .catch((err) => {
    console.warn('DB connect failed', err?.message || err);
  })
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
