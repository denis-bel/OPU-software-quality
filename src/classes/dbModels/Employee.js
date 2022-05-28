import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';
import Query from '@classes/Query';

class Employee extends Model {
	static query = {
		withBrigadeName: `
        SELECT employees.id,
               employees."fullName",
               employees.address,
               employees.phone,
               employees.email,
               "brigadeId",
               employees."createdAt",
               employees."updatedAt",
               b."name" AS "brigadeName"
        FROM employees
                 LEFT JOIN brigades b ON b.id = "brigadeId"
		`
	};
	
	static async findWithBrigadeName(filter = {}) {
		const query = new Query();
		query.add(this.query.withBrigadeName);
		this._addWhere(query, filter.where);
		const { rows } = await this._dbClient.query(query.query, query.values);
		return rows;
	}
	
	static async findWithBrigadeNameByFullName(fullName) {
		const query = new Query();
		query.add(this.query.withBrigadeName);
		query.add(`WHERE "fullName" LIKE ${query.nextIndex}`, ['%' + fullName + '%']);
		console.log(query.query, query.values);
		const { rows } = await this._dbClient.query(query.query, query.values);
		return rows;
	}
}

Object.freeze(Employee.query);

Employee.initialize({ tableName: 'employees', dbClient, withTimeStamps: true });

export default Employee;