import { Router } from 'express';
import { register, login } from '../controllers/auth.controllers.js';
import logger from '#config/logger.js';

const router = Router();

router.route('/register').post(register);

router.route('/login').post(login);

export default router;
