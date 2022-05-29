import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';
import Query from '@classes/Query';

class EmployeePayment extends Model {
	static async findInRange(minSum, maxSum) {
		const query = new Query();
		query.add(
			`SELECT ep.id,
              ep.sum,
              ep."date",
              e."fullName"
       FROM employee_payments ep
                INNER JOIN employees e ON e.id = ep."employeeId"
       WHERE sum BETWEEN ${query.nextIndex} AND ${query.nextIndex}`, [minSum, maxSum]);
		const { rows } = await this._dbClient.query(query.query, query.values);
		return rows;
	}
	
	static async getPaymentCount(employeeId) {
		const query = new Query();
		query.add(
			`SELECT COUNT(*)
       FROM employee_payments
                INNER JOIN employees ON "employeeId" = employees.id
       WHERE employees.id = ${query.nextIndex}
			`, [employeeId]);
		const { rows } = await this._dbClient.query(query.query, query.values);
		return Number(rows[0].count);
	}
}

EmployeePayment.initialize({ tableName: 'employee_payments', dbClient, withTimeStamps: true });

export default EmployeePayment;