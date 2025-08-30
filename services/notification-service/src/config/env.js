import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: Number(process.env.PORT || 4002),

  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: Number(process.env.MYSQL_PORT || 3306),
  MYSQL_DB: process.env.MYSQL_DB,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,

  REDIS_URL: process.env.REDIS_URL,

  JWT_SECRET: process.env.JWT_SECRET,

  SOCKET_CORS_ORIGIN: (process.env.SOCKET_CORS_ORIGIN || '*')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),

  NODE_ENV: process.env.NODE_ENV || 'development',
};
