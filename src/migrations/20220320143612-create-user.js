const { USER_ROLE_ADMIN, USER_ROLE_USER, USER_ROLE_SUPER_ADMIN } = require('@constants/User');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
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
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  }
};