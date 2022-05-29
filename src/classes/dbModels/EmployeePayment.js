import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';
import Query from '@classes/Query';

class EmployeePayment extends Model {
	static async findInRange(minSum, maxSum) {
		const query = new Query();
		query.add(`SELECT *
               FROM ${this._tableName}
               WHERE sum BETWEEN ${query.nextIndex} AND ${query.nextIndex}`, [minSum, maxSum]);
		const { rows } = await this._dbClient.query(query.query, query.values);
		return rows;
	}
}

EmployeePayment.initialize({ tableName: 'employee_payments', dbClient, withTimeStamps: true });

export default EmployeePayment;