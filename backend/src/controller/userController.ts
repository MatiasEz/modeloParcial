import { json, Request, Response } from 'express';
// import {connect} from '../models/userModels';
import userModel from '../models/userModels';
import { body, validationResult } from 'express-validator';
import flash from "connect-flash";
import { setOriginalNode } from 'typescript';
import jwt from "jsonwebtoken";


class UserController {


    public async login(req: Request, res: Response) {
        const { usuario, password } = req.body;
        const result = await userModel.buscarNombre(usuario);
        console.log(usuario);
        console.log(password);
        console.log('IMPRIMO LOS DATOS DEL USUARIO QUE TRAJO DE LA BASE:');
        console.log(result);
        if (!result) {
            return res.status(404).json({ message:"Usuario no registrado"});
        }
        if (usuario != result.nombre || password != result.password) {

            return res.status(403).json({ message:"Usuario y/o contraseña incorrectos"});
        }
        if (result.nombre == usuario && result.password == password) {

            if(result.rol == 'admin')
            {
                const token:string=jwt.sign({_id: result.id},"secretKey");
                return res.status(200).json({ message:"Bienvenido "+result.nombre, usuario:result.nombre,rol:result.rol,token:token});
            }
            else{
            const token:string=jwt.sign({_id: result.id},"secretKey");
            return res.status(200).json({ message:"Bienvenido "+result.nombre, usuario:result.nombre,rol:result.rol,token:token});
        }
        }
    }

    //CRUD
    public async list(req: Request, res: Response) {  
        console.log(req.params);
        console.log('ACA ABAJO EL HEADER DE AUTORIZACION DE TOKEN:');
        console.log(req.header("Authotization"));
        const usuarios = await userModel.listar();
        console.log(usuarios);
        return res.status(200).json(usuarios);
    
        //res.send('Listado de usuarios!!!');
    } //LO DEJAMOS PERO NO FUNCIONA

    //FIND:
    public async find(req: Request, res: Response) {
        console.log(req.params.id);
        const { id } = req.params;
        const usuario = await userModel.buscarId(id);
        if (usuario)
            return res.status(404).json({ text: "User doesn't exists" });
    } //NO FUNCIONA PERO LO DEJAMOS

    public async findOne(req: Request, res: Response) {
        console.log(req.params.id);
        const { id } = req.params;
        const usuario = await userModel.buscarId(id);
        if (usuario) {
            // return res.json(usuario);
            const user = usuario;
            console.log(usuario);
            console.log(usuario.id);
            console.log(usuario.nombre);
            res.render("partials/seleccionMod", { user: usuario, userLoginOk: req.session.user, mi_session: true });
        }
        else
            res.status(404).json({ text: "User doesn't exists" });
    } //NO FUNCIONA PERO LO DEJAMOS

    public async addUser(req: Request, res: Response) {
        const usuario = req.body;
        delete usuario.repassword;
        console.log(req.body);
        //res.send('Usuario agregado!!!');
        const busqueda = await userModel.buscarNombre(usuario.nombre);
        if (!busqueda) {
            const result = await userModel.crear(usuario);
            return res.status(200).json({ message: 'User saved!!' });
        }
        return res.status(403).json({ message: 'User exists!!' });
    }

    public async signMod(req: Request, res: Response) {
        //SESSION: este es un metodo POST no GET!!!
        console.log('ENTRE AL BE metodo signMod!')
        console.log(req.body);
        const { id } = req.body.id;
        const result = await userModel.signMod(req.body, req.body.id);
        // res.redirect("/user/controls");
        return res.status(200).json({ message:"updating a userrrr "+req.body.id  }); // message:"Bienvenido "+result.nombre
    }

    public async delete(req: Request, res: Response) {
        console.log('ABAJO PRINT BODY:');
        console.log(req.body);
        console.log('ABAJO PRINT PARAMS:');
        console.log(req.params);
        //res.send('Usuario '+ req.params.id +' Eliminado!!!');
        const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await userModel.eliminar(id);
        // res.redirect('../control');
        return res.status(200).json({ message:"Delete user "+req.params});
    }
    //FIN CRUD

    public async control(req: Request, res: Response) {
        if (!req.session.auth) {
            // res.redirect("/");
            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            res.redirect("./error");
        }
        //res.send('Controles');
        const usuarios = await userModel.listar();
        // const users = usuarios;
        // console.log(users);
        res.render('partials/controls', { users: usuarios, mi_session: true });
    }

  
   
    public async procesar(req: Request, res: Response) {
        if (!req.session.auth) {
            // res.redirect("/");
            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            res.redirect("./error");
        }
        console.log(req.body);
        let usuario = req.body.usuario;
        var usuarios: any = [];
        console.log(usuario);
        console.log('ACA SALIDA COMPROBACION IF');
        //if (usuario.length > 0) {
        // if(usuario == undefined){
        if (usuario) {
            for (let elemento of usuario) {
                const encontrado = await userModel.buscarId(elemento);
                if (encontrado) {
                    usuarios.push(encontrado);
                    console.log(encontrado);
                }
            }
        }
        console.log(usuarios);
        //res.send("Recibido");
        // home es una variable  abajo!!!:
        res.render("partials/seleccion", { usuarios, userLoginOk: req.session.user, mi_session: true });
    }

    public endSession(req: Request, res: Response) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }

    public showError(req: Request, res: Response) {
        //res.send({ "Usuario y/o contraseña incorrectos": req.body });
        res.render("partials/error");
    }
}

const userController = new UserController();
export default userController;
