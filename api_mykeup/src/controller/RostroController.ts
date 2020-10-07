import {getRepository, getCustomRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Rostro} from "../entity/Rostro";
import { validate } from 'class-validator';

export class RostroController{

    static getAll = async(req: Request, res: Response) =>{
        const rostroRepository = getRepository(Rostro);
        let rostro;
       
        try{
            rostro = await rostroRepository.find();
        }catch(e){
            res.status(404).json({message:'Algo ha salido mal'});
        }

        if(rostro.length > 0){
            res.send(rostro);
        }else{
            res.status(404).json({message:'No hay resultados'});
        }
    };

    static getById = async(req: Request, res: Response) =>{
        const {id} = req.params;
        const rostroRepository = getRepository(Rostro);

        try{
            const rostro = await rostroRepository.findOneOrFail(id);
            res.send(rostro);
        }catch(e){
            res.status(404).json({messge: 'No hay resultados'});
        }
    };

    static newProducto = async(req: Request, res: Response) =>{
        const { nombre, cantidad, categoria, preciobase, precioventa, imagen, descripcion}=req.body;
        const rostro = new Rostro();

        rostro.nombre = nombre;
        rostro.cantidad = cantidad;
        rostro.categoria = categoria;
        rostro.preciobase = preciobase;
        rostro.precioventa = precioventa;
        rostro.imagen = imagen;
        rostro.descripcion = descripcion;

        //validacion

        const errors = await validate(rostro);
        if(errors.length >0){
            return res.status(400).json(errors);
        }

        const rostroRepository = getRepository(Rostro)
        try{
          await rostroRepository.save(rostro);
          res.status(200).json('Producto creado creado');
        } catch(e){
            return res.status(409).json({message: 'id ya existe'});
        }
       
    };

    static getCaregoria = async(req: Request, res: Response) =>{
        const {categoria} = req.params;
        const rostroRepository = getRepository(Rostro);
        //let labios;
 
        try{
          const rostro = await rostroRepository.find({ categoria : (categoria) });
          res.send(rostro);
        }catch{
           res.status(409).json({message: 'No hay resultados'});
        }
    };

    static editProducto = async(req: Request, res: Response) =>{
        let rostro;
        const {id} = req.params;
        const {   nombre, cantidad, categoria, preciobase, precioventa, imagen, descripcion} = req.body;
        
        const rostroRepository = getRepository(Rostro);

        try{
            rostro = await rostroRepository.findOneOrFail(id);
            rostro.nombre = nombre;
            rostro.cantidad = cantidad;
            rostro.categoria = categoria;
            rostro.preciobase = preciobase;
            rostro.precioventa = precioventa;
            rostro.imagen = imagen;
            rostro.descripcion = descripcion;;

        }catch(e){
            return res.status(404).json({message:'No se ha encontrado el producto'})
        }

        const errors = await validate(rostro, {validationError:{target:false, value:false} });

        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        try{
            await rostroRepository.save(rostro);
            res.status(201).json({menssage: 'Producto actualizado'});
        }catch(e){
            return res.status(409).json({menssage: 'id ya es utilizado'})
        } 
      
    };

    static deleteProducto = async(req: Request, res: Response) =>{
        const {id} = req.params;
        const rostroRepository = getRepository(Rostro);
        let rostro : Rostro;

        try{
            rostro= await rostroRepository.findOneOrFail(id);
        }catch(e){
            return res.status(404).json({menssage: 'producto no encontrado'});
        }

        //Eliminar producto
        rostroRepository.delete(id);
        res.status(201).json({menssage: 'Eliminado con exito'});
    };


}

export default RostroController;