import { Request, Response } from 'express';
import UsersService from '../services/Users.service';
import { genToken } from '../utils/auth';

export default class UsersController {
  constructor(private usersService = new UsersService()) {}

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userId = await this.usersService.login(email, password);

    if (!userId) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const payload = { userId, email };
    const token = genToken(payload);

    return res.status(200).json({ token });
  };
}
