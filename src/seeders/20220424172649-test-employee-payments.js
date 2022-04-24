import Employee from '@classes/dbModels/Employee';

const tableName = 'employee-payments';

const now = () => new Date();

module.exports = {
	up: async queryInterface => {
		const employee1 = await Employee.findOne({
			where: {
				fullName: 'Joshua K. Gunn'
			}
		});
		const employee2 = await Employee.findOne({
			where: {
				fullName: 'David J. Torres'
			}
		});
		
		return await queryInterface.bulkInsert(tableName, [{
			sum: 10000,
			date: now(),
			employeeId: employee1.id
		}, {
			sum: 12000,
			date: new Date(now().setMonth(now().getMonth() - 1)),
			employeeId: employee1.id
		}, {
			sum: 9000,
			date: new Date(now().setMonth(now().getMonth() - 2)),
			employeeId: employee2.id
		}]);
	},
	down: queryInterface => queryInterface.bulkDelete(tableName, null, {})
};