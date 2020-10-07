import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { validate } from 'class-validator';

class AuthController {
    static login = async(req: Request, res: Response) =>{
        const {username, password}= req.body;

        if( ! (username && password) ){
           return res.status(400).json( { message: 'Usuario y contreaseña son requeridos'})
           
        }

        const userRepository = getRepository(User);
        let user: User;

        try{
            user = await userRepository.findOneOrFail({where: { username } });
        } catch(e){
            return res.status(400).json({ message:'Usuario o Contraseña incorrectos'});
        }

        //comprobacion de contraseña

        if(! user.checkPassword(password)){
            return res.status(404).json({ message: 'Usuario o contraseña incorrecto'})
        }
        
        const token = jwt.sign({ userId: user.id, username: user.username}, config.jwtSecret);

        res.json({message:'Ok', token});
    };

    static changePassword = async(req: Request, res: Response) =>{
        const { userId } = res.locals.jwtPayload;
        const { oldPassword, newPassword } = req.body;

        if(!(oldPassword && newPassword)){
            res.status(400).json({message: 'Contraseña antigua y nueva contraseña son requeridos'});

        }

        const userRepository = getRepository(User);
        let user: User;

        try{
           user = await userRepository.findOneOrFail(userId);
        } catch(e){
           res.status(400).json({message: 'Algo a fallado'});
        }

        if(! user.checkPassword(oldPassword)){
         return  res.status(401).json({ message: 'Contraseña antigua no coincide'});
        }

        user.password = newPassword;
        
        const validacionops = { validationError: { target:false, value:false}};
        const errors = await validate(user, validacionops);
        
        if(errors.length >0 ){
            return res.status(400).json(errors);
        }

        //hash password 

        user.hashPassword();
        userRepository.save(user);
        
        res.json({message: 'Contraseña actualizada correctamente'});
        
    };
   
}

export default AuthController;
