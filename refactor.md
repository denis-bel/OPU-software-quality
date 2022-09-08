## 1
class Model => abstract class Model
## 2
Make private fields
```typescript
	/**
	 * Name of the table
	 */
	private static _tableName: string;
	
	/**
	 * Client to execute database query
	 */
	private static _dbClient: Pool;
	
	/**
	 * If true, createdAt and updatedAt fields will be updated automatically
	 */
	private static _withTimeStamps = false;
```

## 3
Make private method
```typescript
private static _addWhere(query: Query, where?: Object) {
		if (!isObjectEmpty(where)) {
			query.addWhere(_.omitBy(where, _.isUndefined));
		}
	}
```

## 4
Inline method
```typescript
import { HTTP_CODE_BAD_REQUEST } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import Activity from '@classes/dbModels/Activity';
import UserLog from '@classes/dbModels/UserLog';

async function update(req, res) {
	const { id, ...data } = req.body;
	if (!id) {
		return res.status(HTTP_CODE_BAD_REQUEST).json({
			message: 'Missing id'
		});
	}
	const activity = await Activity.updateById(data, id);
	const { user } = req;
	await UserLog.create({ userId: user.id, action: 'Update activity' });
	res.send({ activity });
}

export default [middlewareWrapper(update)];
```