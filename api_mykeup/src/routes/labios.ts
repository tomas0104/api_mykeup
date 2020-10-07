import { Router } from 'express';
import { LabiosController } from '../controller/LabiosController';
import { checkJwt } from '../middlewares/jwt'; 
import { checkRole } from '../middlewares/roll';
const router = Router();

//Rutas 

//GetTodosloproductos
router.get('/',  LabiosController.getAll);

//Getunsoloproducto
router.get('/:id', LabiosController.getById);

//crearproducto
router.post('/', LabiosController.newProducto);

//Editarproducto

router.patch('/:id',  [checkJwt],  LabiosController.editProducto);

//eliminar un producto

router.delete('/:id',  [checkJwt], LabiosController.deleteProducto);

export  default router;