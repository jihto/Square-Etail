// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import *  as jwt from "jsonwebtoken";  

// @Injectable()
// export class AuthMiddleware implements NestMiddleware{
//     use(req: Request, res: Response, next: NextFunction){
//         const token = req.headers.authorization?.split(" ")[1]; 
//         if(!token)
//             return res.status(401).json({ message: "Unthorized" }); 
//         try{
//             const decode = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
//             req.user = decode;
//             console.log(decode);
//             next();
//         }catch(err){
//             return res.status(401).json({ message: "Unthorized" });
//         }
//     }
// }