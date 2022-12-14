const tableName = 'works';

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
			activityId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				references: {
					model: 'activities',
					key: 'id'
				}
			},
			workTypeId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				references: {
					model: 'work_types',
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