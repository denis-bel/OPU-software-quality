import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';
import Query from '@classes/Query';

class Work extends Model {
	static async findWithName(filter) {
		const query = new Query();
		query.add(`
			SELECT "startDate", "finishDate", "activityId", "workTypeId", name AS "workTypeName" FROM works
			INNER JOIN work_types ON work_types.id = "workTypeId"
			`);
		this._addWhere(query, filter.where);
		const { rows } = await this._dbClient.query(query.query, query.values);
		return rows;
	}
}

Work.initialize({ tableName: 'works', dbClient, withTimeStamps: true });

export default Work;