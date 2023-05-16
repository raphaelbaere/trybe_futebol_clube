import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

export default class MatchController {
  constructor(private matchesService = new MatchesService()) {}

  findAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      this.getActiveMatches(req, res);
      return;
    }
    const matches = await this.matchesService.findAllMatches();
    return res.status(200).json(matches);
  };

  getActiveMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const progressBool = inProgress === 'true';
    const matches = await this.matchesService.getActiveMatches(progressBool);

    return res.status(200).json(matches);
  };

  endMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedRows = await this.matchesService.endMatch(+id);
    if (updatedRows === 0) return res.status(200).end();
    return res.status(200).json({ message: 'Finished' });
  };

  updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { awayTeamGoals, homeTeamGoals } = req.body;
    const updatedRows = await this.matchesService.updateMatch(+id, awayTeamGoals, homeTeamGoals);
    if (updatedRows === 0) return res.status(200).end();
    return res.status(200).json({ message: 'Finished' });
  };

  createMatch = async (req: Request, res: Response) => {
    const match = await this.matchesService.createMatch(req.body);
    return res.status(201).json(match);
  };
}
