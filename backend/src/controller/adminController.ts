import { json, Request, Response } from 'express';
// import userModel from '../models/userModels';
import adminModel from '../models/adminModels';
import { body, Result, validationResult } from 'express-validator';
import flash from "connect-flash";
import { setOriginalNode } from 'typescript';

class AdminController {


    // START PARCIAL
    // abmproductos
    public async abmproductos(req: Request, res: Response) {
        console.log('ENTRE AL BACKEND METODO ABMPRODCUTOS!');
        const productos = await adminModel.listarCombustibles();
        console.log(productos);
        return res.status(200).json(productos);
    }

    public async modificarProductos(req: Request, res: Response) {
        console.log(req.body);
        const { id } = req.body.id;
        const result = await adminModel.modificarProductos(req.body, req.body.id);
        if(result)
        return res.status(200).json({ message:"DONE "});
        else
        return res.status(404).json({ message:"FAIL"});
    }
    public async delete(req: Request, res: Response) {
        console.log('BE: ENTRE AL METODO DELETE!');
        console.log(req.params);       
        const id = req.params.id; 
        console.log(id);
        const result = await adminModel.eliminar(id); 
        if(result)
            return res.status(200).json({ message:"DONE "});
        else
            return res.status(404).json({ message:"FAIL"});
    }

    // agregarProductos :
    public async agregarProductos(req: Request, res: Response) {
       const producto = req.body;
        console.log(req.body);
        if (req.body.precio > 0 && req.body.nombre.length >0) {

        const result = await adminModel.crear(producto);
        if(result)
            return res.status(200).json({ message:"DONE "});
        else
            return res.status(404).json({ message:"FAIL"});
        }
        else {
            return res.status(404).json({ message:"FAIL"});
        }
    }

    // listarpedidos : 

    public async listarpedidos(req: Request, res: Response) {
        const listaPedidos = await adminModel.listaPedidos();
        if(listaPedidos)
        return res.status(200).json(listaPedidos);
        else
        return res.status(404).json({ message:"Error al listar pedidos"});
    }
    // END PARCIAL

    public endSession(req: Request, res: Response) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }

}

const adminController = new AdminController();
export default adminController;
