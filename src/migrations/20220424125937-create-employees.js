const tableName = 'employees';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(tableName, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			fullName: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			address: {
				type: Sequelize.STRING(100)
			},
			phone: {
				type: Sequelize.STRING(30)
			},
			email: {
				type: Sequelize.STRING(50)
			},
			brigadeId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'SET NULL',
				references: {
					model: 'brigades',
					key: 'id'
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			}
		});
	},
	async down(queryInterface) {
		await queryInterface.dropTable(tableName);
	}
};