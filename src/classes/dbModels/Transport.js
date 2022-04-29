import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';

class Transport extends Model {

}

Transport.initialize({ tableName: 'transports', dbClient, withTimeStamps: true });

export default Transport;