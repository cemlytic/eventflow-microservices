import { ApiError, HTTP } from '@eventflow/shared';
import { userContact } from '../models/userContact.model.js';

export const upsertMyEmail = async (req, res) => {
  const { email } = req.body || {};
  if (!email) throw new ApiError(HTTP.BAD_REQUEST, 'Email is required');

  await userContact.upsert({ userId: String(req.user.id), email });
  return res.status(HTTP.OK).json({ email });
};

export const getMyEmail = async (req, res) => {
  const row = await userContact.findByPk(String(req.user.id), { raw: true });
  return res.json({ email: row?.email || null });
};
