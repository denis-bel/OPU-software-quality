class Query {
	_values;
	_query;
	_lastIndex;
	
	constructor() {
		this._query = '';
		this._values = [];
		this._lastIndex = 0;
	}
	
	add(query, values) {
		this._query += query;
		this._values.push(...values);
		if (this._lastIndex !== this._values.length) {
			throw new Error(`Query values length mismatch, lastIndex: ${this._lastIndex}, values length: ${this._values.length}`);
		}
		
	}
	
	get nextIndex() {
		this._lastIndex++;
		return `$${this._lastIndex}`;
	}
	
	get query() {
		return this._query;
	}
	
	get values() {
		return this._values;
	}
}