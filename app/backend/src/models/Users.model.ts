import Users from '../database/models/UsersModel';

export default class UserModel {
  constructor(private _db = Users) {}

  login = async (email: string) => {
    const userId = await this._db.findOne({
      where: {
        email,
      },
    });

    return userId;
  };
}
