import { json, Request, Response } from 'express';
// import userModel from '../models/userModels';
import comprarModel from '../models/comprarModels';
import { body, validationResult } from 'express-validator';
import flash from "connect-flash";
import { setOriginalNode } from 'typescript';

class ComprarController {
    // START PARCIAL

    public async grabarPedido(req: Request, res: Response) {
        console.log(req.body);
        const tablaPedidos = {
           "calle": req.body.direccion.calle,
           "altura": req.body.direccion.altura,
           "total": req.body.direccion.total
        }
        const result = await comprarModel.grabarTablaPedidos(tablaPedidos);
        console.log(result);
        if(result) {
            console.log(result);
           const tablaPedidosArticulos = [];

           for (let i = 0; i < req.body.carrito.length; i++) {
               tablaPedidosArticulos.push({
                   "id_pedido": result.toString(),
                   "id_articulo": req.body.carrito[i].id.toString(),
                  "precio": req.body.carrito[i].precio.toString(),
                  "cantidad": req.body.carrito[i].cantidad
               })
             console.log('IMPRIMO LO QUE VOY A GRABAR EN TABLA PEDIDDOS_ARTICULOS:');
             console.log(tablaPedidosArticulos[i]);
              const resultado = await comprarModel.grabartablaPedidosArticulos(tablaPedidosArticulos[i]);
              if(!resultado){
                return res.status(402).json({ message:"Error al insertar todos los productos en el carrito, algunos pudieron insertarse"});
              }
            console.log(resultado);
            
            }
            return res.status(200).json({ message:"Bienvenido "});

        }
        else
        {
            return res.status(402).json({ message:"Error al cargar el pedido"});
        }

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

const comprarController = new ComprarController();
export default comprarController;
