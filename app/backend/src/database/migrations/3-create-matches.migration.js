module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('matches', {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER
        },
        home_team_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'teams',
            key: 'id'
          }
        },
        home_team_goals: { type: Sequelize.INTEGER },
        away_team_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'teams',
            key: 'id'
          }
        },
        away_team_goals: { type: Sequelize.INTEGER },
        in_progress: { type: Sequelize.BOOLEAN }
      });
    },
    down: async (queryInterface) => await queryInterface.dropTable('matches')
  };