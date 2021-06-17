import { createPool } from 'mysql2/promise';

class AdminModel {
	private db: any;
	constructor() {
		this.config(); //aplicamos la conexion con la BD.
	}

	async config() {//Parametro de conexion con la BD.
		this.db = await createPool({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'pedidost2',
			connectionLimit: 10 
		});
	}

	// INICIO PARCIAL:
	async listarCombustibles() {//Devuelve todas las filas de la tabla usuario
		//const db=this.connection;
		const result = await this.db.query('SELECT * FROM variedades');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return result[0];
	}

	async buscarIdCombustible(id: string) {
		const encontrado: any = await this.db.query('SELECT * FROM variedades WHERE id = ?', [id]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

    async modificarProductos(productos: object, id: string) {
		const result = (await this.db.query('UPDATE variedades SET ? WHERE ID = ?', [productos, id]))[0].affectedRows;
		console.log(result);
		return result;
	}

    async eliminar(id: string) {
		const result = (await this.db.query('DELETE FROM variedades WHERE ID = ?', [id]))[0].affectedRows;
		console.log(result);
		return result;
	}

    async crear(producto: object) {
		const result = (await this.db.query('INSERT INTO variedades SET ?', [producto]))[0].affectedRows;
		console.log('Entre al MODEL de BD')
		console.log(result);
		return result;
	}

    // listaPedidos:
    async listaPedidos() {//Devuelve todas las filas de la tabla usuario
		//const db=this.connection;
		const result = await this.db.query('SELECT * FROM pedidos');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return result[0];
	}

    // FIN PARCIAL
}

//Exportamos el enrutador con 

const adminModel: AdminModel = new AdminModel();
export default adminModel;