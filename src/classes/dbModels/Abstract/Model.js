import Query from '@classes/Query';
import keyValues from '@lib/keyValues';

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
	 * If true, createdAt and updatedAt fields will be updated automatically
	 * @type {Boolean}
	 * @protected
	 */
	static _withTimeStamps = false;
	
	/**
	 * This method initializes database table model
	 * @param {Object} data
	 * @param {String} data.tableName - table mane
	 * @param {Pool} data.dbClient - client to execute database query
	 * @param {Boolean} data.withTimeStamps - if true, model will have createdAt and updatedAt fields
	 */
	static initialize({ tableName, dbClient, withTimeStamps = false }) {
		this._tableName = tableName;
		this._dbClient = dbClient;
		this._withTimeStamps = withTimeStamps;
	}
	
	/**
	 * This method finds all table rows.
	 * @param {String[]} [attributes] - attributes to select
	 * @return {Promise<Object[]>}
	 */
	static async findAll(attributes) {
		const query = `SELECT ${this._buildAttributesQuery(attributes)} FROM "${this._tableName}"`;
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
	 * @param {String[]} [attributes] - attributes to select
	 * @return {Promise<Object[]>}
	 */
	static async find(filter, attributes) {
		const query = new Query();
		query.add(`SELECT ${this._buildAttributesQuery(attributes)} FROM "${this._tableName}"`);
		query.addWhere(filter.where);
		const { rows } = await this._dbClient.query(query.query, query.values);
		return rows;
	}
	
	/**
	 * This method return first found table row with provided filter
	 * @param {Filter} filter - filter
	 * @param {String[]} [attributes] - attributes to select
	 * @return {Promise<Object|null>}
	 */
	static async findOne(filter, attributes) {
		const query = new Query();
		query.add(`SELECT ${this._buildAttributesQuery(attributes)} FROM "${this._tableName}"`);
		query.addWhere(filter.where);
		query.add('LIMIT 1');
		const { rows } = await this._dbClient.query(query.query, query.values);
		if (rows.length) {
			return rows[0];
		}
		return null;
	}
	
	/**
	 * This method finds table row by id field
	 * @param {String|Number} id - row id
	 * @param {String[]} [attributes] - attributes to select
	 * @return {Promise<Object|null>}
	 */
	static async findById(id, attributes) {
		const query = `SELECT ${this._buildAttributesQuery(attributes)} FROM "${this._tableName}" WHERE id = $1`;
		const { rows } = await this._dbClient.query(query, [id]);
		if (rows.length) {
			return rows[0];
		}
		return null;
		
	}
	
	/**
	 * This method created the table row with provided attributes and returns created row.
	 * @param {Object} attributes - attributes
	 * @return {Promise<Object|null>}
	 */
	static async create(attributes) {
		if (this._withTimeStamps) {
			attributes.createdAt = new Date();
			attributes.updatedAt = new Date();
		}
		const { keys, values } = keyValues(attributes);
		const attributeNames = keys.map(key => `"${key}"`);
		const query = new Query();
		query.add(`
			INSERT INTO "${this._tableName}"(${attributeNames.join(', ')})
			VALUES(${values.map(() => query.nextIndex).join(', ')})
			RETURNING *
			`, values);
		const { rows } = await this._dbClient.query(query.query, query.values);
		if (rows.length) {
			return rows[0];
		}
		return null;
	}
	
	/**
	 * This method update the table row by the id and returns the updated row.
	 * @param {Object} attributes - attributes
	 * @param {Number|String} id - row id
	 * @return {Promise<Object>}
	 */
	static async updateById(attributes, id) {
		if (this._withTimeStamps) {
			attributes.updatedAt = new Date();
		}
		const query = new Query();
		const { keys, values } = keyValues(attributes);
		const keyValueQueries = [];
		keys.forEach((key) => {
			keyValueQueries.push(`"${key}" = ${query.nextIndex}`);
		});
		query.add(`
			UPDATE "${this._tableName}"
			SET ${keyValueQueries.join(', ')}
			WHERE id = ${query.nextIndex}
			RETURNING *
			`, [...values, id]);
		const { rows } = await this._dbClient.query(query.query, query.values);
		return rows[0];
	}
	
	/**
	 * This method delete the table row by id
	 * @param {String|Number} id
	 * @return {Promise<Boolean>} - true if row was deleted
	 */
	static async deleteById(id) {
		const query = `DELETE FROM ${this._tableName} WHERE id = $1`;
		const { rowCount } = await this._dbClient.query(query, [id]);
		return rowCount !== 0;
	}
	
	static _buildAttributesQuery(attributes) {
		return attributes ? attributes.map(attr => `"${attr}"`).join(', ') : '*';
	}
}

export default Model;