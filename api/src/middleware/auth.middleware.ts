import { Request,Response } from 'express';
import { getManager } from 'typeorm';
import {sign, verify} from "jsonwebtoken";
import { User } from '../entity/user.entity';

export const AuthMiddleware = async (req: Request, res: Response,next: Function) => {
    try {
        const jwt = req.cookies['jwt'];
        const payload:any = verify(jwt,"secret");
        if(!payload){
            return res.status(401).send({
                message:'unauthenticated'
            })
        }
        const repository = getManager().getRepository(User);
        req['user'] = await repository.findOne({ where:
            { id: payload.id}
        }); 
        next();
    } catch (error) {
        return res.status(401).send({
            message:'unauthenticated'
        })
    }
}