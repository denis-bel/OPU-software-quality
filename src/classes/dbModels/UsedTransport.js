import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';
import Query from '@classes/Query';

class UsedTransport extends Model {
	static async findWithName(filter) {
		const query = new Query();
		query.add(`
			SELECT used_transports.id, count , "transportId", used_transports."createdAt", used_transports."updatedAt", name FROM used_transports
			INNER JOIN transports ON used_transports."transportId" = transports.id
			`);
		this._addWhere(query, filter.where);
		const { rows } = await this._dbClient.query(query.query, query.values);
		return rows;
	}
}

UsedTransport.initialize({ tableName: 'used_transports', dbClient, withTimeStamps: true });

export default UsedTransport;