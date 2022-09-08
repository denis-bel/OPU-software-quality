import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';
import Query from '@classes/Query';

class Activity extends Model {
	static async findWithInclude(filter) {
		const query = new Query();
		query.add(`
			SELECT "startDate", "finishDate", "brigadeId", "roadObjectId", activities.id, brigades."name" AS "brigadeName",
			road_objects.name AS "roadObjectName", brigades.number AS "brigadeNumber", address AS "roadObjectAddress",
			road_objects."number" AS "roadObjectNumber"
			FROM activities
			INNER JOIN brigades ON "brigadeId" = brigades.id
			INNER JOIN road_objects ON "roadObjectId" = road_objects.id
			`);
		this._addWhereClause(query, filter.where);
		const { rows } = await this._dbClient.query(query.query, query.values);
		return rows;
	}
}

Activity.initialize({ tableName: 'activities', dbClient, withTimeStamps: true });

export default Activity;