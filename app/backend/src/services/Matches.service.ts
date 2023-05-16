import MatchesModel, { NewMatch } from '../models/Matches.model';

export default class MatchesService {
  constructor(private matchModel = new MatchesModel()) {}

  findAllMatches = async () => {
    const matches = await this.matchModel.findAllMatches();
    return matches;
  };

  getActiveMatches = async (inProgress: boolean) => {
    const matches = await this.matchModel.getActiveMatches(inProgress);
    return matches;
  };

  endMatch = async (matchId: number) => {
    const updatedRows = await this.matchModel.endMatch(matchId);
    return updatedRows;
  };

  updateMatch = async (matchId: number, awayTeamGoals: number, homeTeamGoals: number) => {
    const updatedRows = await this.matchModel.updateMatch(matchId, awayTeamGoals, homeTeamGoals);
    return updatedRows;
  };

  createMatch = async (newMatch: NewMatch) => {
    const match = await this.matchModel.createMatch(newMatch);
    return match;
  };
}
