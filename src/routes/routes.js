import { Router } from 'express';
import authRoutes from './subroutes/authRoutes.js';
import sessionRoutes from './subroutes/sessionRoutes.js';

const prefix = process.env.API_PREFIX ?? '';
const router = Router();

router.use('/auth', authRoutes);
router.use('/sessions', sessionRoutes);

const appRouter = prefix
  ? (() => {
      const main = Router();
      main.use(prefix, router);
      return main;
    })()
  : router;

export default appRouter;
