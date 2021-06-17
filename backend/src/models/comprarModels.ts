import { createPool } from 'mysql2/promise';

class ComprarModel {
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
	//grabarPedido: grabar: calle, altura y total
	async grabarTablaPedidos(tablaPedidos: object) {
		console.log(tablaPedidos);
		//const result=true;
		const result = (await this.db.query('INSERT INTO pedidos SET ?', [tablaPedidos]))[0].insertId;
		console.log(result);
		return result;
	}
	// grabartablaPedidosArticulos
	async grabartablaPedidosArticulos(tablaPedidosArticulos: object) {
		console.log(tablaPedidosArticulos);
		const result = (await this.db.query('INSERT INTO pedidos_articulos SET ?', [tablaPedidosArticulos]))[0].affectedRows;
		console.log(result);
		return result;
	}
	// FIN PARCIAL
}

//Exportamos el enrutador con 

const comprarModel: ComprarModel = new ComprarModel();
export default comprarModel;