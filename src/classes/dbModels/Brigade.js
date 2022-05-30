import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';

class Brigade extends Model {
	static async findAllWithEmployeeCount() {
		const query = `SELECT b.id, b."name", b."number", COUNT(e.id) AS "employeeCount"
                   FROM brigades b
                            LEFT JOIN employees e
                                      ON e."brigadeId" = b.id
                   GROUP BY b.id;`;
		const { rows } = await this._dbClient.query(query);
		return rows;
	}
}

Brigade.initialize({ tableName: 'brigades', dbClient, withTimeStamps: true });

export default Brigade;