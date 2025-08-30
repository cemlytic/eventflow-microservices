import { Sequelize } from 'sequelize';
import { env } from './env.js';

export const sequelize = new Sequelize(
  env.MYSQL_DB,
  env.MYSQL_USER,
  env.MYSQL_PASSWORD,
  {
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

export async function connectDB() {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log('MySQL connected');
}
