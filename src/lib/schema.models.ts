/**
 * Human readable data types
 */
type DataType = 'string' | 'char' | 'int' | 'float' | 'boolean' | 'time' | 'datetime' | 'date';

/**
 * Typscript model from a json object
 */

export interface Type {
	name: 'string' | 'number' | 'boolean' | 'date' | 'object' | 'array';
	precision: DataType | 'object' | 'array' | Definition[];
}

export interface Definition {
	key: string;
	type: Type;
}

/**
 * Typescript model from a json object
 *
 * @param table name of the table
 * @param definitions list of columns
 * @param path path to the file ('data.results')
 */
export interface Schema {
	table: string;
	definitions: Definition[];
	path: string;
}
