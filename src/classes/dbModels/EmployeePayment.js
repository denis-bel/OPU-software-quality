import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';

class EmployeePayment extends Model {

}

EmployeePayment.initialize({ tableName: 'employee_payments', dbClient, withTimeStamps: true });

export default EmployeePayment;