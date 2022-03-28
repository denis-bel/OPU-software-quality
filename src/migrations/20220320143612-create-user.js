const { USER_ROLE_ADMIN, USER_ROLE_USER, USER_ROLE_SUPER_ADMIN } = require('@constants/User');

const tableName = 'users'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM(USER_ROLE_ADMIN, USER_ROLE_USER, USER_ROLE_SUPER_ADMIN),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    /* eslint-disable no-useless-escape */
    await queryInterface.sequelize.query(`
      ALTER TABLE ${tableName} ADD constraint proper_login CHECK (login ~* '^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$');
      `);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(tableName);
  }
};