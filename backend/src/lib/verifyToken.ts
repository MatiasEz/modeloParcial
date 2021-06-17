import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IPayLoad{

    _id: string;
    let:number;
    exp:number;
}
export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    //Recuperamos la cabecera y la dividimos en 2
    let token: any = (req.header("Authotization")?.split('Baerer ', 2));
    //tomamos la parte que nos interesa, el token, para despues evaluar.
    token = token['1'];
    console.log("Evaluando token recibido");
    console.log(token);
    try{
        const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'secretKey') as IPayLoad;
        
        next();
    }
    catch(error){
        return res.status(401).json({message:"Acceso denegado :P"});
    }
  // if (!token) {
  //     console.log("Token NO recibido");
  //     return res.status(401).json("Acceso denegado :P");
  // }

}