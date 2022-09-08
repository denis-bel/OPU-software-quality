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