import { Router, Request, Response } from 'express';
// import userController from '../controller/userController';
// import articuloController from '../controller/articuloController';
import adminController from '../controller/adminController';
import {registerSchema} from '../schema/register-schema';
import {validationSingUp} from '../middleware/validationSignUp';
import {signinSchema} from '../schema/signin-schema';
import {validationSingIn} from '../middleware/validationSingIn';
import {TokenValidation} from "../lib/verifyToken";

class AdminRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> {
            res.send('Main!!!');
            //res.render("partials/principal");
        });
        
        // INICIO PARCIAL:

        // /admin/listarpedidos:
        this.router.get('/abmproductos',TokenValidation,adminController.abmproductos);
        this.router.get('/listarpedidos',TokenValidation,adminController.listarpedidos);
        this.router.post('/modificarProductos',TokenValidation,adminController.modificarProductos);
        // this.router.get('/delete/:id',adminController.delete);
        this.router.delete('/delete/:id',TokenValidation,adminController.delete);
        // agregarProductos
        this.router.post('/agregarProductos',TokenValidation,adminController.agregarProductos);
        // FIN PARCIAL.
        
        // Para terminar la Session:
        this.router.get('/salir',adminController.endSession);
    }
}

//Exportamos el enrutador con 

const adminRoutes = new AdminRoutes();
export default adminRoutes.router;