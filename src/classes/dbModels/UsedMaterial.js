import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';
import Query from '@classes/Query';

class UsedMaterial extends Model {
	static async findWithName(filter) {
		const query = new Query();
		query.add(`
			SELECT used_materials.id, used_materials."unitFee", name AS "materialName", count, "activityId", "materialId" FROM used_materials
			INNER JOIN materials ON "materialId" = materials.id
			`);
		this._addWhere(query, filter.where);
		const { rows } = await this._dbClient.query(query.query, query.values);
		return rows;
	}
}

UsedMaterial.initialize({ tableName: 'used_materials', dbClient, withTimeStamps: true });

export default UsedMaterial;