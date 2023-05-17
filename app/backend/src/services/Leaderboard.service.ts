import TeamLeaderboard from '../models/TeamLeaderBoard';
import TeamsModel from '../models/Teams.model';
import MatchModel from '../models/Matches.model';

interface MatchInterface {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  id: number;
  inProgress: boolean;
}

export interface TeamInterface {
  id?: number;
  teamName: string;
}

export default class LeaderboardService {
  constructor(
    private _matchdb = new MatchModel(),
    private _teamdb = new TeamsModel(),
  ) {}

  handleGoalsBalanceDraw = (a: TeamLeaderboard, b: TeamLeaderboard) => b.goalsFavor - a.goalsFavor;

  handleTotalVictoriesDraw = (a: TeamLeaderboard, b: TeamLeaderboard) => {
    if (a.goalsBalance === b.goalsBalance) {
      return this.handleGoalsBalanceDraw(a, b);
    }
    return b.goalsBalance - a.goalsBalance;
  };

  handleTotalPointsDraw = (a: TeamLeaderboard, b: TeamLeaderboard) => {
    if (a.totalVictories === b.totalVictories) {
      return this.handleTotalVictoriesDraw(a, b);
    }
    return b.totalVictories - a.totalVictories;
  };

  getHomeLeaderboard = async () => {
    const teams = await this._teamdb.findAllTeams();
    const matches = await this._matchdb.getActiveMatches(false);
    const homeLeaderboard = teams.map((team) => this.getHomeInfo(team, matches));
    const sortedHomeLeaderBoard = homeLeaderboard.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        return this.handleTotalPointsDraw(a, b);
      }
      return b.totalPoints - a.totalPoints;
    });
    return sortedHomeLeaderBoard;
  };

  calcPoints = (homeTeamGoals: number, awayTeamGoals: number) => {
    const pointsObj = {
      totalPoints: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };

    if (homeTeamGoals > awayTeamGoals) {
      pointsObj.totalPoints += 3;
      pointsObj.totalVictories += 1;
    } else if (homeTeamGoals === awayTeamGoals) {
      pointsObj.totalDraws += 1;
      pointsObj.totalPoints += 1;
    } else {
      pointsObj.totalLosses += 1;
    }

    return pointsObj;
  };

  getHomeInfo = (team: TeamInterface, matches: MatchInterface[]) => {
    const pointsObj = new TeamLeaderboard(team.teamName);
    matches
      .filter((match) => match.homeTeamId === team.id)
      .forEach((m) => {
        const points = this.calcPoints(m.homeTeamGoals, m.awayTeamGoals);
        pointsObj.totalPoints += points.totalPoints;
        pointsObj.totalVictories += points.totalVictories;
        pointsObj.totalDraws += points.totalDraws;
        pointsObj.totalLosses += points.totalLosses;
        pointsObj.totalGames += 1;
        pointsObj.goalsFavor += m.homeTeamGoals;
        pointsObj.goalsOwn += m.awayTeamGoals;
        pointsObj.goalsBalance = pointsObj.goalsFavor - pointsObj.goalsOwn;
        pointsObj.efficiency = (pointsObj.totalPoints / (pointsObj.totalGames * 3)) * 100;
      });
    return pointsObj;
  };
}
