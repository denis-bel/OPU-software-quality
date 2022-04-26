import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';

class UserLog extends Model {

}

UserLog.initialize({ tableName: 'user_logs', dbClient, withTimeStamps: true });

export default UserLog;