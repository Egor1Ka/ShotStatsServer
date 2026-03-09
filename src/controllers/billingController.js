import { created, ok, httpResponseError } from '../utils/http/httpResponse.js';
import { httpStatus } from '../utils/http/httpStatus.js';
import * as billingService from '../services/billingService.js';

const getUserId = (req) => req.user?.id;

const respondUnauthorized = (res) => {
  res.status(httpStatus.UNAUTHORIZED).json({ error: 'Unauthorized' });
};

export async function getStatus(req, res) {
  try {
    const userId = getUserId(req);
    if (!userId) {
      respondUnauthorized(res);
      return;
    }
    const status = await billingService.getBillingStatus(userId);
    ok(res, status);
  } catch (error) {
    httpResponseError(res, error);
  }
}

export async function postPurchase(req, res) {
  try {
    const userId = getUserId(req);
    if (!userId) {
      respondUnauthorized(res);
      return;
    }
    const payload = req.body ?? {};
    const subscription = await billingService.purchaseSubscription(userId, payload);
    created(res, subscription);
  } catch (error) {
    httpResponseError(res, error);
  }
}
