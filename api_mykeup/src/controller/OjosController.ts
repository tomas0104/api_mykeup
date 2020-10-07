import {getRepository, getCustomRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Ojos} from "../entity/Ojos";
import { validate } from 'class-validator';

export class OjosController{


    static getAll = async(req: Request, res: Response) =>{
        const ojosRepository = getRepository(Ojos);
        let ojos;
       
        try{
            ojos = await ojosRepository.find();
        }catch(e){
            res.status(404).json({message:'Algo ha salido mal'});
        }

        if(ojos.length > 0){
            res.send(ojos);
        }else{
            res.status(404).json({message:'No hay resultados'});
        }
    };

    static getById = async(req: Request, res: Response) =>{
        const {id} = req.params;
        const OjosRepository = getRepository(Ojos);

        try{
            const Ojos = await OjosRepository.findOneOrFail(id);
            res.send(Ojos);
        }catch(e){
            res.status(404).json({messge: 'No hay resultados'});
        }
    };

    static getCaregoria = async(req: Request, res: Response) =>{
        const {categoria} = req.params;
        const OjosRepository = getRepository(Ojos);
        //let ojos;
 
        try{
          const ojos = await OjosRepository.find({ categoria : (categoria) });
          res.send(ojos);
        }catch{
           res.status(409).json({message: 'No hay resultados'});
        }
    };

    static newProducto = async(req: Request, res: Response) =>{
        const { nombre, cantidad, categoria, preciobase, precioventa, imagen, descripcion}=req.body;
        const ojos = new Ojos();

        ojos.nombre = nombre;
        ojos.cantidad = cantidad;
        ojos.categoria = categoria;
        ojos.preciobase = preciobase;
        ojos.precioventa = precioventa;
        ojos.imagen = imagen;
        ojos.descripcion = descripcion;

        //validacion

        const errors = await validate(Ojos);
        if(errors.length >0){
            return res.status(400).json(errors);
        }

        const OjosRepository = getRepository(Ojos)
        try{
          await OjosRepository.save(ojos);
          res.status(200).json('Producto creado creado');
        } catch(e){
            return res.status(409).json({message: 'id ya existe'});
        }
       
    };

    static editProducto = async(req: Request, res: Response) =>{
        let ojos;
        const {id} = req.params;
        const {   nombre, cantidad, categoria, preciobase, precioventa, imagen, descripcion} = req.body;
        
        const OjosRepository = getRepository(Ojos);

        try{
            ojos = await OjosRepository.findOneOrFail(id);
            ojos.nombre = nombre;
            ojos.cantidad = cantidad;
            ojos.categoria = categoria;
            ojos.preciobase = preciobase;
            ojos.precioventa = precioventa;
            ojos.imagen = imagen;
            ojos.descripcion = descripcion;;

        }catch(e){
            return res.status(404).json({message:'No se ha encontrado el producto'})
        }

        const errors = await validate(Ojos, {validationError:{target:false, value:false} });

        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        try{
            await OjosRepository.save(ojos);
            res.status(201).json({menssage: 'Producto actualizado'});
        }catch(e){
            return res.status(409).json({menssage: 'id ya es utilizado'})
        }
 
      
    };

    static deleteProducto = async(req: Request, res: Response) =>{
        const {id} = req.params;
        const OjosRepository = getRepository(Ojos);
        let ojos : Ojos;

        try{
            ojos= await OjosRepository.findOneOrFail(id);
        }catch(e){
            return res.status(404).json({menssage: 'producto no encontrado'});
        }

        //Eliminar producto
        OjosRepository.delete(id);
        res.status(201).json({menssage: 'Eliminado con exito'});
    };


}

export default OjosController;