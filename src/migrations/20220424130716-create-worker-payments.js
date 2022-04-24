const tableName = 'worker-payments';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(tableName, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			sum: {
				type: Sequelize.FLOAT,
				allowNull: false
			},
			workerId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				references: {
					model: 'workers',
					key: 'id'
				}
			},
			date: {
				type: Sequelize.DATE,
				allowNull: false
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