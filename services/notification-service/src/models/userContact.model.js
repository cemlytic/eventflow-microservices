import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const userContact = sequelize.define(
  'UserContact',
  {
    userId: { type: DataTypes.STRING(64), primaryKey: true },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { isEmail: true },
    },
  },
  { tableName: 'user_contacts' }
);
