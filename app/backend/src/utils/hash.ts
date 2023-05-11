import bcrypt = require('bcryptjs');

const hash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const _hash = await bcrypt.hash(password, salt);

  return _hash;
};

const checkHash = (password: string, pwdHash: string) => {
  const result = bcrypt.compare(password, pwdHash);
  return result;
};

export { hash, checkHash };
