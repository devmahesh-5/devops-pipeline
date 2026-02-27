import jwt from 'jsonwebtoken';
import logger from '#config/logger.js';

export const jwt_token = {
  sign: payload => {
    try {
      return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
    } catch (error) {
      logger.error(error);
    }
  },
  verify: token => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      logger.error(error);
    }
  },
};
