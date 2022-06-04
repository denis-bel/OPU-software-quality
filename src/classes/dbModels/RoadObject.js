import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';

class RoadObject extends Model {
	static async getAllWithoutActivities() {
		const query = `SELECT road_objects.id, road_objects.name, road_objects.number, road_objects.address
                   FROM road_objects
                            LEFT JOIN activities ON activities."roadObjectId" = road_objects.id
                   WHERE activities.id IS NULL
		`;
		const { rows } = await this._dbClient.query(query);
		return rows;
	}
}

RoadObject.initialize({ tableName: 'road_objects', dbClient, withTimeStamps: true });

export default RoadObject;