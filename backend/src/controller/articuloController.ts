import { json, Request, Response } from 'express';
// import userModel from '../models/userModels';
import articuloModel from '../models/articuloModels';
import { body, validationResult } from 'express-validator';
import flash from "connect-flash";
import { setOriginalNode } from 'typescript';

class ArticuloController {

    // START PARCIAL

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

const articuloController = new ArticuloController();
export default articuloController;
