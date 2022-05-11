import bcrypt from 'bcryptjs';

const hashPassword = async (password: string) => {
  const salt = process.env.SALT_ROUNDS as string;
  return bcrypt.hash(password, +salt);
};

export default hashPassword;
