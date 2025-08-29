import { hash, verifyPassword } from '../utils/password.js';
import { ApiError, HTTP, ROLES } from '@eventflow/shared';
import { User } from '../models/user.model.js';
import { signToken } from '../utils/jwt.js';
import { sanitizeUser } from '../utils/sanitizeUser.js';
import { audit } from '../utils/audit.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body || {};
  if (!username || !email || !password)
    throw new ApiError(HTTP.BAD_REQUEST, 'All fields are required');

  const emailExists = await User.findOne({ email });
  if (emailExists) throw new ApiError(HTTP.CONFLICT, 'Email already in use');

  const hashed = await hash(password);
  const user = await User.create({ username, email, password: hashed });
  res.status(HTTP.CREATED).json({ user: sanitizeUser(user) });
};

export const login = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password)
    throw new ApiError(HTTP.BAD_REQUEST, 'All fields are required');

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(HTTP.UNAUTHORIZED, 'Invalid credentials');

  const isPassword = await verifyPassword(password, user.password);
  if (!isPassword) throw new ApiError(HTTP.UNAUTHORIZED, 'Invalid credentials');

  const token = signToken({ id: user._id, role: user.role });
  res.json({
    token,
    user: sanitizeUser(user),
  });
};

export const updateRole = async (req, res) => {
  const { role } = req.body || {};
  const allowed = Object.values(ROLES);
  if (!allowed.includes(role))
    throw new ApiError(HTTP.BAD_REQUEST, 'Invalid role');

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  );
  if (!user) throw new ApiError(HTTP.NOT_FOUND, 'User not found');

  audit('role_update', { by: req.user.id, target: user._id, newRole: role });
  res.json({ user: sanitizeUser(user) });
};
