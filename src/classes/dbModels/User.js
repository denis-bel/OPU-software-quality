import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';

class User extends Model {

}

User.initialize('users', dbClient);

export default User;