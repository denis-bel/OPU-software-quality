import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';

class Brigade extends Model {

}

Brigade.initialize({ tableName: 'brigades', dbClient, withTimeStamps: true });

export default Brigade;