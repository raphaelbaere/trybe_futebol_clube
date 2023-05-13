import { compareSync } from 'bcryptjs';
import UsersModel from '../models/Users.model';

export default class UsersService {
  constructor(private userModel = new UsersModel()) {}

  login = async (email: string, password: string) => {
    const user = await this.userModel.login(email);

    if (!user) {
      return null;
    }

    if (!UsersService.compareHash(password, user.password)) {
      return null;
    }

    return user.id;
  };

  private static compareHash(password: string, hash: string) {
    return compareSync(password, hash);
  }
}
