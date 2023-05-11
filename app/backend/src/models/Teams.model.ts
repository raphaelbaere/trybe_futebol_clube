import Team from '../database/models/TeamsModel';

export default class TeamModel {
  constructor(private _db = Team) {}

  findAllTeams = async () => this._db.findAll();

  getTeamById = async (id: string) => this._db.findByPk(id);
}
