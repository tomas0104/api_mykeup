import { Router } from 'express';
import { RostroController } from '../controller/RostroController';

const router = Router();

//un producto por categoria
router.get('/:categoria', RostroController.getCaregoria);

export  default router;