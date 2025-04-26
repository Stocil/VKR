import 'dotenv/config';
import { SignOptions } from 'jsonwebtoken';

// Настройки сервера
export const FRONTEND_URL = process.env.FRONTEND_URL as string;
export const PORT = process.env.PORT;

// JWT
export const SECRET = process.env.SECRET_KEY as string;
export const ACCESS_EXP_IN = process.env
  .ACCESS_EXP_IN as SignOptions['expiresIn'];
export const REFRESH_EXP_IN = process.env
  .REFRESH_EXP_IN as SignOptions['expiresIn'];
