import TeamsModel from '../models/Teams.model';

export default class TeamsService {
  constructor(private teamModel = new TeamsModel()) {}

  findAllTeams = async () => {
    const teams = await this.teamModel.findAllTeams();
    return teams;
  };

  getTeamById = async (id: string) => {
    const team = await this.teamModel.getTeamById(id);
    return team;
  };
}
