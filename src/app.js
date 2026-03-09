import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './db.js';
import passport from './config/passport.js';
import routes from './routes/routes.js';

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(routes);

const port = Number(process.env.PORT ?? 3001);

async function start() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

start().catch((err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});
