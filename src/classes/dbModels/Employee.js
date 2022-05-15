import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';
import Query from '@classes/Query';

class Employee extends Model {
	static async findWithBrigadeName(filter = {}) {
		const query = new Query();
		query.add(`
			SELECT employees.id, employees."fullName", employees.address, employees.phone,
			employees.email, "brigadeId", employees."createdAt", employees."updatedAt", b."name" AS "brigadeName"
			FROM employees
			LEFT JOIN brigades b ON b.id = "brigadeId";
			`);
		this._addWhere(query, filter.where);
		const { rows } = await this._dbClient.query(query.query, query.values);
		return rows;
	}
}

Employee.initialize({ tableName: 'employees', dbClient, withTimeStamps: true });

export default Employee;