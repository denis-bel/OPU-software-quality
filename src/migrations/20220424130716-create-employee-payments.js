const tableName = 'employee_payments';

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
				type: 'decimal(12,2)',
				allowNull: false
			},
			employeeId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				references: {
					model: 'employees',
					key: 'id'
				}
			},
			date: {
				type: 'DATE',
				allowNull: false
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