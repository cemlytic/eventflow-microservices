export const sanitizeUser = (user) =>
  user ? { id: user._id, email: user.email, role: user.role } : null;
