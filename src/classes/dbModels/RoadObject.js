import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';

class Employee extends Model {

}

Employee.initialize({ tableName: 'road_objects', dbClient, withTimeStamps: true });

export default Employee;