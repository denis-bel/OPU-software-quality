import Model from '@classes/dbModels/Abstract/Model';
import dbClient from '@lib/dbClient';

class Material extends Model {

}

Material.initialize({ tableName: 'materials', dbClient, withTimeStamps: true });

export default Material;