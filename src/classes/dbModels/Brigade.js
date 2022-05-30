import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';

class Brigade extends Model {
	static async findAllWithEmployeeCount() {
		const query = `SELECT b.id,
                          b."name",
                          b."number",
                          COUNT(e.id) AS "employeeCount",
                          "info"
                   FROM brigades b
                            LEFT JOIN employees e
                                      ON
                                          e."brigadeId" = b.id
                            LEFT JOIN (SELECT brigades.id,
                                              'Maximum activities' AS "info"
                                       FROM brigades
                                                INNER JOIN activities ON
                                           activities."brigadeId" = brigades.id
                                       GROUP BY brigades.id
                                       HAVING COUNT(*) >= ALL (SELECT COUNT(*)
                                                               FROM activities
                                                               GROUP BY "brigadeId")) AS A
                                      ON
                                          a.id = b.id
                   GROUP BY b.id, info;`;
		const { rows } = await this._dbClient.query(query);
		return rows;
	}
}

Brigade.initialize({ tableName: 'brigades', dbClient, withTimeStamps: true });

export default Brigade;