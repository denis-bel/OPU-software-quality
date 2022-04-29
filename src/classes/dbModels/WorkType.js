import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';

class WorkType extends Model {

}

WorkType.initialize({ tableName: 'work_types', dbClient, withTimeStamps: true });

export default WorkType;