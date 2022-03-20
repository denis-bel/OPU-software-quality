class Model {
	static _tableName;
	static _dbClient;
	
	static initialize(tableName, dbClient) {
		this._tableName = tableName;
		this._dbClient = dbClient;
	}
	
	static async findAll() {
		const query = `SELECT * FROM "${this._tableName}"`;
		const { rows } = await this._dbClient.query(query);
		return rows;
	}
	
	static async find(filter) {
		const { query: whereQuery, values } = this._whereQuery(filter.where);
		const query = `
			SELECT * FROM "${this._tableName}"
			${whereQuery}
			`;
		const { rows } = await this._dbClient.query(query, values);
		return rows;
	}
	
	static async findById(id) {
		const query = `SELECT * FROM "${this._tableName}" WHERE id = $1`;
		const { rows } = await this._dbClient.query(query, [id]);
		if (rows.length) {
			return rows[0];
		} else {
			return null;
		}
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
	
	static async updateById(attributes, id) {
		const { attributeKeys, attributeValues } = this._attributeArrays(attributes);
		const keyValueQueries = [];
		attributeKeys.forEach((key, index) => {
			keyValueQueries.push(`${key} = $${index + 1}`);
		});
		
		const query = `
			UPDATE "${this._tableName}"
			SET ${keyValueQueries.join(', ')}
			WHERE id = $${attributeValues.length + 1}
			RETURNING *
			`;
		const { rows } = await this._dbClient.query(query, [...attributeValues, id]);
		return rows;
	}
	
	static async deleteById(id) {
		const query = `DELETE FROM ${this._tableName} WHERE id = $1`;
		await this._dbClient.query(query, [id]);
	}
	
	static _attributeArrays(attributes, initialIndex = 0) {
		const attributeKeys = [];
		const attributeValueParams = [];
		const attributeValues = [];
		
		const attributeEntries = Object.entries(attributes);
		attributeEntries.forEach(([key, value], index) => {
			attributeValueParams.push(`$${index + 1 + initialIndex}`);
			attributeKeys.push(`"${key}"`);
			attributeValues.push(value);
		});
		
		return { attributeKeys, attributeValues, attributeValueParams };
	}
	
	static _whereQuery(whereFilter, initialIndex = 0) {
		const criteriaANDArray = [];
		const { attributeValues, attributeKeys, attributeValueParams } = this._attributeArrays(whereFilter, initialIndex);
		attributeKeys.forEach((name, index) => {
			criteriaANDArray.push(`${name} = ${attributeValueParams[index]}`);
		});
		const query = `WHERE ${criteriaANDArray.join(' AND ')}`;
		return {
			query,
			values: attributeValues
		};
	}
}

export default Model;