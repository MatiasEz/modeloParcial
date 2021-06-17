import { Router, Request, Response } from 'express';
import { createPool } from 'mysql2/promise';

class IndexRoutes {
	public router: Router = Router();
	constructor() {
		this.config();
	}
	config(): void {
		//    this.router.get('/',(req:Request,res:Response)=> res.send('Hola Mundo!!!'));
		this.router.get('/', (req: Request, res: Response) => {
			// res.send('Hola MUndo!');
			req.session.auth = false;
			req.session.user = {};
			req.session.carrito = [];
			req.session.total = 0;
			req.session.rolAdmin = false;
			res.render("partials/principal");
		});


		this.router.get('/test', async (req: Request, res: Response) => {
			const db = await createPool({
				// host: 'localhost',
				// port: 33060,
				// user: 'ifts11',
				// password: 'ifts11',
				// database: 'pedidost3',
				// connectionLimit: 10
				host: 'localhost',
				user: 'root',
				password: '',
				database: 'pedidost3',
				connectionLimit: 10
			});
			const result = (await db.query("SELECT * FROM usuarios"))[0];
			console.log(result);
			res.send("Test OK!!! Revisar filas en consola del servidor");
		});
	}

}

//Exportamos el enrutador con 

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;