import { parseAuthToken } from '../utils/http/httpUtils.js';
import * as authService from '../services/authService.js';
import { httpResponse } from '../utils/http/httpResponse.js';
import { httpStatus } from '../utils/http/httpStatus.js';

const ACCESS_COOKIE = 'accessToken';

/**
 * Middleware: read JWT from cookie or Authorization, verify, set req.user.
 * On failure responds with 401 and does not call next().
 */
export function requireAuth(req, res, next) {
  const token = parseAuthToken(req, ACCESS_COOKIE);
  if (!token) {
    res.status(httpStatus.UNAUTHORIZED).json({ error: 'Unauthorized' });
    return;
  }
  try {
    const payload = authService.verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(error.status ?? httpStatus.UNAUTHORIZED).json({ error: error.message ?? 'Unauthorized' });
  }
}
