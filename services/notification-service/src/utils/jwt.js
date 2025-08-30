import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';


export const verifyToken = async (token) => jwt.verify(token, env.JWT_SECRET);
