import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/Teams.service';

const validateNewMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const teamService = new TeamService();
  const home = await teamService.getTeamById(homeTeamId);
  const away = await teamService.getTeamById(awayTeamId);
  if (!home || !away) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export default validateNewMatch;
