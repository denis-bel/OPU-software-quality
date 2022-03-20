class Model {
	static _tableName;
	static _dbClient;
	
	static initialize(tableName, dbClient) {
		this._tableName = tableName;
		this._dbClient = dbClient;
	}
	
	static async findALl() {
		const query = `SELECT * FROM "${this._tableName}"`;
		const { rows } = await this._dbClient.query(query);
		return rows;
	}
	
	static async create(attributes) {
		const { attributeKeys, attributeValueParams, attributeValues } = this._attributeArrays(attributes);
		const query = `
			INSERT INTO "${this._tableName}"(${attributeKeys.join(', ')})
			VALUES(${attributeValueParams.join(', ')})
			RETURNING *
			`;
		const { rows } = await this._dbClient.query(query, attributeValues);
		return rows;
	}
	
	static _attributeArrays(attributes) {
		const attributeKeys = [];
		const attributeValueParams = [];
		const attributeValues = [];
		
		const attributeEntries = Object.entries(attributes);
		attributeEntries.forEach(([key, value], index) => {
			attributeValueParams.push(`$${index + 1}`);
			attributeKeys.push(`"${key}"`);
			attributeValues.push(value);
		});
		
		return { attributeKeys, attributeValues, attributeValueParams };
	}
}

export default Model;