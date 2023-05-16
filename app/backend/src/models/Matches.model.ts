import Matches from '../database/models/Matchs.model';
import Team from '../database/models/TeamsModel';

export interface NewMatch {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default class MatchMod {
  constructor(private _db = Matches) {}

  findAllMatches = async () => {
    const matches = await this._db.findAll({
      include: [
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  };

  getActiveMatches = async (inProgress: boolean) => {
    const matches = await this._db.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  };

  endMatch = async (id: number) => {
    const [updatedRows] = await this._db.update({ inProgress: false }, { where: { id } });

    return updatedRows;
  };

  updateMatch = async (id: number, awayTeamGoals: number, homeTeamGoals: number) => {
    const [updatedRows] = await this._db.update(
      { awayTeamGoals, homeTeamGoals },
      { where: { id } },
    );
    return updatedRows;
  };

  createMatch = async (newMatch: NewMatch) => {
    const match = await this._db.create({
      ...newMatch,
      inProgress: true,
    });

    return match;
  };
}
