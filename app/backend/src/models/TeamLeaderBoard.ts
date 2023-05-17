interface LeaderboardInterface {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export default class TeamLeaderboard implements LeaderboardInterface {
  public name: string;
  public totalPoints: number;
  public totalDraws: number;
  public totalGames: number;
  public totalLosses: number;
  public totalVictories: number;
  public goalsFavor: number;
  public goalsOwn: number;
  public goalsBalance: number;
  public efficiency: number;

  constructor(teamName: string) {
    this.name = teamName;
    this.totalDraws = 0;
    this.totalGames = 0;
    this.totalLosses = 0;
    this.totalPoints = 0;
    this.totalVictories = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }
}
