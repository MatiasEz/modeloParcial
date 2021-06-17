import { Router, Request, Response } from 'express';
// import userController from '../controller/userController';
import comprarController from '../controller/comprarController';
import {registerSchema} from '../schema/register-schema';
import {validationSingUp} from '../middleware/validationSignUp';
import {signinSchema} from '../schema/signin-schema';
import {validationSingIn} from '../middleware/validationSingIn';
import {TokenValidation} from "../lib/verifyToken";

class UserRoutes{
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
        // this.router.get('/verCarrito',comprarController.verCarrito);
        // grabarPedido
        this.router.post('/grabarPedido',TokenValidation,comprarController.grabarPedido); 
        // this.router.get('/agregarCarrito/:id/:cantidad',comprarController.procesarCarrito1);
        // FIN PARCIAL:
        
        // Para terminar la Session:
        this.router.get('/salir',TokenValidation,comprarController.endSession);
    }
}

//Exportamos el enrutador con 
const userRoutes = new UserRoutes();
export default userRoutes.router;