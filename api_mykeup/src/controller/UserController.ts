import {getRepository, getCustomRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { validate } from 'class-validator';


export class UserController {

    static getAll = async(req: Request, res: Response) =>{
        const userRepository = getRepository(User);
        let users;
       
        try{
            users = await userRepository.find();
        }catch(e){
            res.status(404).json({message:'Algo ha salido mal'});
        }

        if(users.length > 0){
            res.send(users);
        }else{
            res.status(404).json({message:'No hay resultados'});
        }
    };

    static getById = async(req: Request, res: Response) =>{
        const {id} = req.params;
        const userRepository = getRepository(User);

        try{
            const user = await userRepository.findOneOrFail(id);
            res.send(user);
        }catch(e){
            res.status(404).json({messge: 'Not result'});
        }
    };

    static newUser = async(req: Request, res: Response) =>{
        const { username, password, nombres, apellidos, ciudad, direccion, telefono}=req.body;
        const user = new User();

        user.username = username;
        user.password = password;
        user.nombres = nombres;
        user.apellidos = apellidos;
        user.ciudad = ciudad;
        user.direccion = direccion;
        user.telefono = telefono;
        
        //validacion

        const errors = await validate(user);
        if(errors.length >0){
            return res.status(400).json(errors);
        }

        //todo: hash password

        const userRepository = getRepository(User)
        try{
            user.hashPassword();
            await userRepository.save(user);
            return res.status(200).json({ message: 'Usuario creado'})
        } catch(e){
            return res.status(400).json({message: 'Usuario ya existe'});
        }
        
        //res.send('Usuariario creado');
    };

    static editUser = async(req: Request, res: Response) =>{
        let user;
        const {id} = req.params;
        const { username, nombres, apellidos, ciudad, direccion, telefono, role} = req.body;
        
        const userRepository = getRepository(User);

        try{
            user = await userRepository.findOneOrFail(id);
            user.username = username;
            user.nombres = nombres;
            user.apellidos = apellidos;
            user.ciudad = ciudad;
            user.direccion = direccion;
            user.telefono = telefono;
            user.role = role;
        }catch(e){
            return res.status(404).json({message:'No se ha encontrado el usuario'})
        }

        const errors = await validate(user, {validationError:{target:false, value:false} });

        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        //try guardando usuario

        try{
            await userRepository.save(user);
        }catch(e){
            return res.status(409).json({menssage: 'Usuario ya es utilizado'})
        }

        res.status(201).json({menssage: 'Usuario actualizado'});
    };

    static deleteUser = async(req: Request, res: Response) =>{
        const {id} = req.params;
        const userRepository = getRepository(User);
        let user : User;

        try{
            user= await userRepository.findOneOrFail(id);
        }catch(e){
            return res.status(404).json({menssage: 'Usuario no encontrado'});
        }

        //Eliminar usuario
        userRepository.delete(id);
        res.status(201).json({menssage: 'Eliminado con exito'});
    };


}

export default UserController;