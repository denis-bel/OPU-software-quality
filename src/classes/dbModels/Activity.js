import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';

class Activity extends Model {

}

Activity.initialize({ tableName: 'activities', dbClient, withTimeStamps: true });

export default Activity;