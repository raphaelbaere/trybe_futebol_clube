import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  getHomeLeaderboard = async (req: Request, res: Response) => {
    const homeLeaderboard = await this.leaderboardService.getHomeLeaderboard();
    return res.status(200).json(homeLeaderboard);
  };
}
