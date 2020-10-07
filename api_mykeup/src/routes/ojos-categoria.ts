import { Router } from 'express';
import { OjosController } from '../controller/OjosController';

const router = Router();

//un producto por categoria
router.get('/:categoria', OjosController.getCaregoria);

export  default router;