import { Router } from 'express';
import authRoutes from './subroutes/authRoutes.js';
import sessionRoutes from './subroutes/sessionRoutes.js';
import billingRoutes from './subroutes/billingRoutes.js';
import subscriptionRoutes from './subroutes/subscriptionRoutes.js';

const prefix = process.env.API_PREFIX ?? '';
const router = Router();

router.use('/auth', authRoutes);
router.use('/sessions', sessionRoutes);
router.use('/billing', billingRoutes);
router.use('/subscriptions', subscriptionRoutes);

const appRouter = prefix
  ? (() => {
      const main = Router();
      main.use(prefix, router);
      return main;
    })()
  : router;

export default appRouter;
