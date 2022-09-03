import WorkType from '@classes/dbModels/WorkType';
import dbClient from '@lib/dbClient';

describe('should pass', () => {

  it('should pass', async () => {
    console.log(await WorkType.findAll());
    await dbClient.end()
  });
});