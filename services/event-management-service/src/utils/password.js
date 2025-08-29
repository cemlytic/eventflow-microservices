import bcrypt from 'bcryptjs';

export const hash = async (plain) => bcrypt.hash(plain, 10);
export const verifyPassword = async (plain, hashed) => bcrypt.compare(plain, hashed);
