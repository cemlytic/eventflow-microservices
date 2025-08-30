import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Subscription = sequelize.define(
  'Subscription',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { type: DataTypes.STRING(64), allowNull: false },
    eventId: { type: DataTypes.STRING(64), allowNull: false },
  },
  {
    tableName: 'subscriptions',
    indexes: [
      { unique: true, fields: ['userId', 'eventId'], name: 'uniq_user_event' },
      { fields: ['eventId'] },
    ],
  }
);
