import { Router } from 'express';
import { OjosController } from '../controller/OjosController';
import { checkJwt } from '../middlewares/jwt'; 
import { checkRole } from '../middlewares/roll';
const router = Router();

//Rutas 

//GetTodosloproductos
router.get('/',  OjosController.getAll);

//Getunsoloproducto
router.get('/:id', OjosController.getById);

//crearproducto
router.post('/', OjosController.newProducto);

//Editarproducto
router.patch('/:id',  [checkJwt],  OjosController.editProducto);

//eliminar un producto
router.delete('/:id',  [checkJwt], OjosController.deleteProducto);

export  default router;