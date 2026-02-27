import { jwt_token } from '#utils/jwt.js';
import { cookie } from '#utils/cookies.js';
import { formatValidationError } from '#utils/format.js';
import logger from '#config/logger.js';
import { createUser, loginUser } from '#services/auth.services.js';
import { registerSchema, loginSchema } from '#validations/auth.validation.js';

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const errors = registerSchema.safeParse({ name, email, password, role });

    if (!errors.success) {
      const formattedErrors = formatValidationError(errors.error);
      return res.status(400).json({ message: formattedErrors });
    }

    await createUser(name, email, password, role);
    logger.info('User registered successfully');
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = loginSchema.safeParse({ email, password });

    if (!errors.success) {
      const formattedErrors = formatValidationError(errors.error);
      return res.status(400).json({ message: formattedErrors });
    }

    const token = loginUser(email, password);
    if (!token) {
      throw new Error('User not found');
    }

    cookie.set(res, 'token', token);

    logger.info('User logged in successfully');
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { register, login };
