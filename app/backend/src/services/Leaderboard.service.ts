import LeaderboardModel from '../models/Leaderboard.model';

export default class LeaderboardService {
  constructor(private leaderboardModel = new LeaderboardModel()) {}

  getHomeLeaderboard = async () => {
    const homeLeaderboard = await this.leaderboardModel.getLeaderboard();
    return homeLeaderboard;
  };
}
