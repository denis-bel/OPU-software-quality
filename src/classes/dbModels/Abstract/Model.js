class Model {
	static _tableName;
	static _dbClient;
	
	static initialize(tableName, dbClient) {
		this._tableName = tableName;
		this._dbClient = dbClient;
	}
	
	static async findALl() {
		const query = `SELECT * FROM ${this._tableName}`;
		const { rows } = await this._dbClient.query(query);
		return rows;
	}
}

export default Model;