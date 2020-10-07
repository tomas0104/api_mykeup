import {getRepository, getCustomRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Labios} from "../entity/Labios";
import { validate } from 'class-validator';

export class LabiosController{

    static getAll = async(req: Request, res: Response) =>{
        const labiosRepository = getRepository(Labios);
        let labios;
       
        try{
            labios = await labiosRepository.find();
        }catch(e){
            res.status(404).json({message:'Algo ha salido mal'});
        }

        if(labios.length > 0){
            res.send(labios);
        }else{
            res.status(404).json({message:'No hay resultados'});
        }
    };

    static getById = async(req: Request, res: Response) =>{
        const {id} = req.params;
        const labiosRepository = getRepository(Labios);

        try{
            const labios = await labiosRepository.findOneOrFail(id);
            res.send(labios);
        }catch(e){
            res.status(404).json({messge: 'No hay resultados'});
        }
    };

    static getCaregoria = async(req: Request, res: Response) =>{
       const {categoria} = req.params;
       const labiosRepository = getRepository(Labios);
       //let labios;

       try{
         const labios = await labiosRepository.find({ categoria : (categoria) });
         res.send(labios);
       }catch{
          res.status(409).json({message: 'No hay resultados'});
       }
    };

    static newProducto = async(req: Request, res: Response) =>{
        const { nombre, cantidad, categoria, preciobase, precioventa, imagen, descripcion}=req.body;
        const labios = new Labios();

        labios.nombre = nombre;
        labios.cantidad = cantidad;
        labios.categoria = categoria;
        labios.preciobase = preciobase;
        labios.precioventa = precioventa;
        labios.imagen = imagen;
        labios.descripcion = descripcion;

        //validacion

        const errors = await validate(labios);
        if(errors.length >0){
            return res.status(400).json(errors);
        }

        const labiosRepository = getRepository(Labios)
        try{
          await labiosRepository.save(labios);
          res.status(200).json('Producto creado creado');
        } catch(e){
            return res.status(409).json({message: 'id ya existe'});
        }
       
    };

    static editProducto = async(req: Request, res: Response) =>{
        let labios;
        const {id} = req.params;
        const {   nombre, cantidad, categoria, preciobase, precioventa, imagen, descripcion} = req.body;
        
        const labiosRepository = getRepository(Labios);

        try{
            labios = await labiosRepository.findOneOrFail(id);
            labios.nombre = nombre;
            labios.cantidad = cantidad;
            labios.categoria = categoria;
            labios.preciobase = preciobase;
            labios.precioventa = precioventa;
            labios.imagen = imagen;
            labios.descripcion = descripcion;;

        }catch(e){
            return res.status(404).json({message:'No se ha encontrado el producto'})
        }

        const errors = await validate(labios, {validationError:{target:false, value:false} });

        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        try{
            await labiosRepository.save(labios);
              res.status(201).json({menssage: 'Producto actualizado'});
        }catch(e){
            return res.status(409).json({menssage: 'id ya es utilizado'})
        }

  
      
    };

    static deleteProducto = async(req: Request, res: Response) =>{
        const {id} = req.params;
        const labiosRepository = getRepository(Labios);
        let labios : Labios;

        try{
            labios= await labiosRepository.findOneOrFail(id);
        }catch(e){
            return res.status(404).json({menssage: 'producto no encontrado'});
        }

        //Eliminar producto
        labiosRepository.delete(id);
        res.status(201).json({menssage: 'Eliminado con exito'});
    };


}

export default LabiosController;