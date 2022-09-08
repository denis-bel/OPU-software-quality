import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';
import Query from '@classes/Query';

class UsedTool extends Model {
	static async findWithName(filter) {
		const query = new Query();
		query.add(`
			SELECT used_tools.id, count, "activityId", "toolId", name AS "toolName" FROM used_tools
			INNER JOIN tools ON "toolId" = tools.id
			`);
		this._addWhereClause(query, filter.where);
		const { rows } = await this._dbClient.query(query.query, query.values);
		return rows;
	}
}

UsedTool.initialize({ tableName: 'used_tools', dbClient, withTimeStamps: true });

export default UsedTool;