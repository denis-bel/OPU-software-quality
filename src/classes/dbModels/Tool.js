import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';

class Tool extends Model {

}

Tool.initialize({ tableName: 'tools', dbClient, withTimeStamps: true });

export default Tool;