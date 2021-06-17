import { Router, Request, Response } from 'express';
import userController from '../controller/userController';
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
        /*
        this.router.get('/signin',(req:Request,res:Response)=> {
            res.send('Sign In!!!');
            //res.render("partials/principal");
        });
        */

        
        // LOGIN:
        // this.router.post('/signin',userController.login);
        this.router.post('/signin', signinSchema, validationSingIn, userController.login);

        // REGISTRO:
        // this.router.post('/signup',userController.addUser);
        // this.router.post('/signup',registerSchema, validationSingUp, userController.addUser);
        this.router.post('/signup', validationSingUp, userController.addUser);
        //Home del usuario:
		/*
        this.router.get('/home',(req:Request,res:Response)=> {
        res.send('Bienvenido!!!')});
        */


        //CRUD
		this.router.get('/list',TokenValidation,userController.list);
		this.router.get('/find/:id',TokenValidation,userController.find);
        this.router.get('/findOne/:id',TokenValidation,userController.findOne);
		this.router.post('/add',userController.addUser);
		//this.router.put('/update/:id',userController.update);
        this.router.post('/signMod',TokenValidation,userController.signMod);
		this.router.delete('/delete/:id',TokenValidation,userController.delete);

        // Primer Recuepratoio:  this.router.get('/delete/:id',userController.delete);

        this.router.get('/controls',TokenValidation,userController.control);
        // FIN CRUD

        this.router.get('/control',TokenValidation,userController.control);
        this.router.post('/procesar',TokenValidation,userController.procesar);

        // PARCIAL:
        // PARCIAL:
        // PARCIAL:
        /*
        this.router.get('/comprar',userController.comprar);   
        this.router.post('/agregarCarrito',userController.agregarCarrito); 
        // this.router.get('/verCarrito',userController.verCarrito);
        this.router.get('/carrito',userController.verCarrito);
        // grabarPedido
        this.router.post('/grabarPedido',userController.grabarPedido); 
        // this.router.get('/agregarCarrito/:id/:cantidad',userController.procesarCarrito1);
        // agregarCarrito
        // get listar producto
        // post agregar al carito
        // get carrito dibujo
        // post confirmasion     
        */
        // PARCIAL:
        // PARCIAL:
        // PARCIAL:
        
        // Para terminar la Session:
        this.router.get('/salir',userController.endSession);
        this.router.get('/error',userController.showError);

        // TOKEN:
        this.router.get('/list',TokenValidation,userController.list);

    }
}

//Exportamos el enrutador con 

const userRoutes = new UserRoutes();
export default userRoutes.router;