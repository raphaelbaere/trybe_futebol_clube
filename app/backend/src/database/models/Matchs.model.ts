import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './TeamsModel';

export default class Match extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    homeTeamId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    homeTeamGoals: { type: DataTypes.INTEGER },
    awayTeamId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    awayTeamGoals: { type: DataTypes.INTEGER },
    inProgress: { type: DataTypes.BOOLEAN },
  },
  {
    underscored: true,
    sequelize: db,
    tableName: 'matches',
    timestamps: false,
  },
);

Team.belongsTo(Match, { foreignKey: 'homeTeamId', as: 'idTeam' });
Team.belongsTo(Match, { foreignKey: 'awayTeamId', as: 'idTeam' });
