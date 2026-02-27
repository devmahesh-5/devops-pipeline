import aj from '#config/arc_jet.js';
import { slidingWindow } from '@arcjet/node';
import logger from '#config/logger.js';

const securityMiddleware = async (req, res, next) => {
  try {
    const role = req.user?.role || 'guest';

    let limit, message;
    switch (role) {
      case 'admin':
        limit = 20;
        message = 'Admin limit exceeded';
        break;
      case 'user':
        limit = 10;
        message = 'User limit exceeded';
        break;
      default:
        limit = 5;
        message = 'Guest limit exceeded';
        break;
    }

    const client = aj.withRule(
      slidingWindow({ mode: 'LIVE', interval: '1m', max: limit, name: message })
    );
    const decision = await client.protect(req, res);

    if (decision.isDenied() && decision.reason.isBot()) {
      logger.warn('Bot detected', {
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        path: req.path,
      });
      res
        .status(403)
        .json({ message: 'Bot detected.Automated request are not allowed' });
    }

    if (decision.isDenied() && decision.reason.isShield()) {
      logger.warn('Shield blocked request', {
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        path: req.path,
        method: req.method,
      });
      res
        .status(403)
        .json({ message: 'Bot detected.Automated request are not allowed' });
    }

    if (decision.isDenied() && decision.reason.isRateLimit()) {
      logger.warn('Rate limit exceeded', {
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        path: req.path,
        method: req.method,
      });
      res
        .status(403)
        .json({ message: 'Bot detected.Automated request are not allowed' });
    }

    next();
  } catch (error) {
    console.log('arcjet error', error);
    res.status(500).json({ message: error.message });
  }
};

export default securityMiddleware;
