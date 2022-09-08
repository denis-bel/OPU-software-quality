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
		this._addWhereClause(query, filter.where);
		const { rows } = await this._dbClient.query(query.query, query.values);
		return rows;
	}
	
	static async findWithBrigadeNameByFullName(fullName) {
		const query = new Query();
		query.add(this.query.withBrigadeName);
		query.add(`WHERE "fullName" LIKE ${query.nextIndex}`, ['%' + fullName + '%']);
		const { rows } = await this._dbClient.query(query.query, query.values);
		return rows;
	}
	
	static async findMaxAndMinPayment() {
		const query = `SELECT MAX(sum) as "sum",
                          "fullName",
                          'Max payment' AS COMMENT
                   FROM employee_payments
                            INNER JOIN employees ON "employeeId" = employees.id
                   GROUP BY employees.id
                   HAVING MAX(sum) >= (SELECT MAX(sum)
                                       FROM employee_payments
                                                INNER JOIN employees ON "employeeId" = employees.id)
                   UNION ALL
                   SELECT MIN(sum),
                          "fullName",
                          'Min payment' AS COMMENT
                   FROM employee_payments
                            INNER JOIN employees ON "employeeId" = employees.id
                   GROUP BY employees.id
                   HAVING MIN(sum) <= (SELECT MIN(sum)
                                       FROM employee_payments
                                                INNER JOIN employees ON "employeeId" = employees.id)`;
		const { rows } = await this._dbClient.query(query);
		return rows;
	}
}

Object.freeze(Employee.query);

Employee.initialize({ tableName: 'employees', dbClient, withTimeStamps: true });

export default Employee;