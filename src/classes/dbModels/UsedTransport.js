import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';

class UsedTransport extends Model {

}

UsedTransport.initialize({ tableName: 'used_transports', dbClient, withTimeStamps: true });

export default UsedTransport;