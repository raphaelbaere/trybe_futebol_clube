import { NextFunction, Request, Response } from 'express';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'All fields must be filled' });
  }

  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!regexEmail.test(email)) {
    res.status(401).json({ message: 'Invalid email or password' });
  }

  if (password.length <= 6) {
    res.status(401).json({ message: 'Password must have more than 6 characters' });
  }

  next();
};

export default validateLogin;
