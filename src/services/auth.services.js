import { db } from '#config/db.js';
import { users } from '#models/users.models.js';
import { eq } from 'drizzle-orm';
import { jwt_token } from '#utils/jwt.js';
import { cookie } from '#utils/cookies.js';
import logger from '#config/logger.js';
import bcrypt from 'bcrypt';

const encryptPassword = password => {
  try {
    return bcrypt.hash(password, 10);
  } catch (error) {
    throw error;
  }
};

const comparePassword = (password, hashedPassword) => {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw error;
  }
};

const generateToken = user => {
  try {
    return jwt_token.sign(user);
  } catch (error) {
    throw error;
  }
};

const verifyToken = token => {
  try {
    return jwt_token.verify(token); //returns payload
  } catch (error) {
    throw error;
  }
};

const createUser = async (name, email, password, role) => {
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      throw new Error('User already exists');
    }

    const hashedPassword = await encryptPassword(password);
    return await db
      .insert(users)
      .values({ name, email, password: hashedPassword, role });
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length < 1) {
      throw new Error('User not found');
    }

    const isPasswordMatch = await comparePassword(
      password,
      existingUser[0].password
    );

    if (!isPasswordMatch) {
      throw new Error('Invalid password');
    }

    const token = generateToken(existingUser[0]);
    return token;
  } catch (error) {
    throw error;
  }
};

export { createUser, loginUser };
