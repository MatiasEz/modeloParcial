import { Router, Request, Response } from 'express';
// import userController from '../controller/userController';
import articuloController from '../controller/articuloController';
import {registerSchema} from '../schema/register-schema';
import {validationSingUp} from '../middleware/validationSignUp';
import {signinSchema} from '../schema/signin-schema';
import {validationSingIn} from '../middleware/validationSingIn';
import {TokenValidation} from "../lib/verifyToken";

class ArticuloRoutes{
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
        // FIN PARCIAL:
        
        // Para terminar la Session:
        this.router.get('/salir',articuloController.endSession);
        this.router.get('/error',articuloController.showError);
    }
}

//Exportamos el enrutador con 

const articuloRoutes = new ArticuloRoutes();
export default articuloRoutes.router;