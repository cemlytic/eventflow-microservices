import { Op } from 'sequelize';
import { userContact } from '../models/userContact.model.js';

export async function getEmailsForUsers(userIds = []) {
  if (!userIds.length) return [];
  const rows = await userContact.findAll({
    where: { userId: { [Op.in]: userIds.map(String) } },
    attributes: ['email'],
    raw: true,
  });
  return rows.map((r) => r.email).filter(Boolean);
}
