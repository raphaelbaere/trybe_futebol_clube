import TeamLeaderboard from './TeamLeaderBoard';
import TeamsModel from './Teams.model';
import MatchModel from './Matches.model';

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

export default class LeaderboardModel {
  constructor(private _matchdb = new MatchModel(), private _teamdb = new TeamsModel()) {}

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
      });
    return pointsObj;
  };

  getAwayInfo = (team: TeamInterface, matches: MatchInterface[]) => {
    const pointsObj = new TeamLeaderboard(team.teamName);
    matches
      .filter((match) => match.awayTeamId === team.id)
      .forEach((m) => {
        const points = this.calcPoints(m.awayTeamGoals, m.homeTeamGoals);
        pointsObj.totalPoints += points.totalPoints;
        pointsObj.totalVictories += points.totalVictories;
        pointsObj.totalDraws += points.totalDraws;
        pointsObj.totalLosses += points.totalLosses;
        pointsObj.totalGames += 1;
        pointsObj.goalsFavor += m.homeTeamGoals;
        pointsObj.goalsOwn += m.awayTeamGoals;
      });
    return pointsObj;
  };

  getLeaderboard = async () => {
    const teams = await this._teamdb.findAllTeams();
    const matches = await this._matchdb.getActiveMatches(false);
    const leaderboard = teams.map((team) => this.getHomeInfo(team, matches));
    return leaderboard;
  };
}
