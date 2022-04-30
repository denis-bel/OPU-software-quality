const tableName = 'activities';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(tableName, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			startDate: {
				type: 'TIMESTAMP'
			},
			finishDate: {
				type: 'TIMESTAMP'
			},
			brigadeId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				references: {
					model: 'brigades',
					key: 'id'
				}
			},
			roadObjectId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				references: {
					model: 'road_objects',
					key: 'id'
				}
			},
			createdAt: {
				allowNull: false,
				type: 'TIMESTAMP',
				defaultValue: Sequelize.fn('NOW')
			},
			updatedAt: {
				allowNull: false,
				type: 'TIMESTAMP',
				defaultValue: Sequelize.fn('NOW')
			}
		});
	},
	async down(queryInterface) {
		await queryInterface.dropTable(tableName);
	}
};