import { Request, Response } from 'express';
import TeamsService from '../services/Teams.service';

export default class TeamController {
  constructor(private teamsService = new TeamsService()) {}

  findAllTeams = async (_req: Request, res: Response) => {
    const teams = await this.teamsService.findAllTeams();
    return res.status(200).json(teams);
  };

  getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamsService.getTeamById(id);
    return res.status(200).json(team);
  };
}
