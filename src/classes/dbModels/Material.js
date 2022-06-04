import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';

class Material extends Model {
	static async updateMostUsed() {
		await this._dbClient.query(`UPDATE materials
                                SET "extraInfo" = NULL`);
		const query = `UPDATE materials
                   SET "extraInfo" = 'Most used'
                   WHERE id IN (SELECT "materialId"
                                FROM used_materials
                                GROUP BY "materialId"
                                HAVING SUM(count) >= (SELECT MAX(sum)
                                                      FROM (SELECT SUM(count),
                                                                   "materialId"
                                                            FROM used_materials
                                                            GROUP BY "materialId") AS A))`;
		await this._dbClient.query(query);
	}
}

Material.initialize({ tableName: 'materials', dbClient, withTimeStamps: true });

export default Material;