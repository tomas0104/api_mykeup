import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { checkJwt } from '../middlewares/jwt'; 
import { checkRole } from '../middlewares/roll';
const router = Router();

//Rutas 

//GetTodoslosusuarios
router.get('/', [checkJwt ],  UserController.getAll);

//Getunsolousuario
router.get('/:id', [checkJwt],  UserController.getById);

//crearusuario
router.post('/', UserController.newUser);

//Editarusuario

router.patch('/:id',  [checkJwt],  UserController.editUser);

//eliminar un usuario

router.delete('/:id',  [checkJwt], UserController.deleteUser);

export  default router;