import { Router } from 'express';
import { RostroController } from '../controller/RostroController';
import { checkJwt } from '../middlewares/jwt'; 
import { checkRole } from '../middlewares/roll';
const router = Router();

//Rutas 

//GetTodoslosproductos
router.get('/',  RostroController.getAll);

//Getunsoloproducto
router.get('/:id', RostroController.getById);

//crearproducto
router.post('/', RostroController.newProducto);

//Editarproducto

router.patch('/:id',  [checkJwt],  RostroController.editProducto);

//eliminar un producto

router.delete('/:id',  [checkJwt], RostroController.deleteProducto);

export  default router;