/**
 * This is abstract class. It represents database table. It provides basic CRUD operations
 */
class Model {
	/**
	 * Name of the table
	 * @type {String}
	 * @protected
	 */
	static _tableName;
	
	/**
	 * Client to execute database query
	 * @type {Pool}
	 * @protected
	 */
	static _dbClient;
	
	/**
	 * This method initializes database table model
	 * @param {String} tableName - table mane
	 * @param {Pool} dbClient - client to execute database query
	 */
	static initialize(tableName, dbClient) {
		this._tableName = tableName;
		this._dbClient = dbClient;
	}
	
	/**
	 * This method finds all table rows.
	 * @return {Promise<Object[]>}
	 */
	static async findAll() {
		const query = `SELECT * FROM "${this._tableName}"`;
		const { rows } = await this._dbClient.query(query);
		return rows;
	}
	
	/**
	 * A filter to search with
	 * @typedef {Object} Filter
	 * @property {Object} where - where clause with attributes exact values
	 */
	
	/**
	 * This method finds table rows with filter
	 * @param {Filter} filter - filter
	 * @return {Promise<Object[]>}
	 */
	static async find(filter) {
		const { query: whereQuery, values } = this._whereQuery(filter.where);
		const query = `
			SELECT * FROM "${this._tableName}"
			${whereQuery}
			`;
		const { rows } = await this._dbClient.query(query, values);
		return rows;
	}
	
	/**
	 * This method return first found table row with provided filter
	 * @param {Filter} filter - filter
	 * @return {Promise<Object|null>}
	 */
	static async findOne(filter) {
		const { query: whereQuery, values } = this._whereQuery(filter.where);
		const query = `
			SELECT * FROM "${this._tableName}"
			${whereQuery}
			LIMIT 1
			`;
		const { rows } = await this._dbClient.query(query, values);
		if (rows.length) {
			return rows[0];
		}
		return null;
	}
	
	/**
	 * This method finds table row by id field
	 * @param {String|Number} id - row id
	 * @return {Promise<Object|null>}
	 */
	static async findById(id) {
		const query = `SELECT * FROM "${this._tableName}" WHERE id = $1`;
		const { rows } = await this._dbClient.query(query, [id]);
		if (rows.length) {
			return rows[0];
		}
		return null;
		
	}
	
	/**
	 * This method created the table row with provided attributes and returns created row.
	 * @param {Object} attributes - attributes
	 * @return {Promise<Object>}
	 */
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
	
	/**
	 * This method update the table row by the id and returns the updated row.
	 * @param {Object} attributes - attributes
	 * @param {Number|String} id - row id
	 * @return {Promise<Object>}
	 */
	static async updateById(attributes, id) {
		const { attributeKeys, attributeValues, attributeValueParams } = this._attributeArrays(attributes);
		const keyValueQueries = [];
		attributeKeys.forEach((key, index) => {
			keyValueQueries.push(`${key} = ${attributeValueParams[index]}`);
		});
		
		const query = `
			UPDATE "${this._tableName}"
			SET ${keyValueQueries.join(', ')}
			WHERE id = $${attributeValues.length + 1}
			RETURNING *
			`;
		const { rows } = await this._dbClient.query(query, [...attributeValues, id]);
		return rows[0];
	}
	
	/**
	 * This method delete the table row by id
	 * @param {String|Number} id
	 * @return {Promise<void>}
	 */
	static async deleteById(id) {
		const query = `DELETE FROM ${this._tableName} WHERE id = $1`;
		await this._dbClient.query(query, [id]);
	}
	
	/**
	 * This method take attribute object and returns arrays with attribute values, keys and
	 * query params (with the same order)
	 * @param {Object} attributes - attributes
	 * @param {Number} [initialIndex=0] - index + 1 from where start parameters indexing
	 * @return {{attributeValues: *[], attributeValueParams: String[], attributeKeys: String[]}}
	 * @protected
	 */
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
	
	/**
	 * This method build 'where' query with provided attributes (with exact equals). It returns query and values
	 * for database client
	 * @param {Object} whereFilter - where filter object
	 * @param {Number} initialIndex - index + 1 from where start parameters indexing
	 * @return {{query: string, values: *[]}}
	 * @protected
	 */
	static _whereQuery(whereFilter, initialIndex = 0) {
		const criteria = {
			AND: []
		};
		const { attributeValues, attributeKeys, attributeValueParams } = this._attributeArrays(whereFilter, initialIndex);
		attributeKeys.forEach((name, index) => {
			criteria.AND.push(`${name} = ${attributeValueParams[index]}`);
		});
		const query = `WHERE ${criteria.AND.join(' AND ')}`;
		return {
			query,
			values: attributeValues
		};
	}
}

export default Model;