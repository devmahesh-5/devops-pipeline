import { jwt_token } from '#utils/jwt.js';
const checkAuthMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      req.user = null;
    }
    const payload = jwt_token.verify(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
