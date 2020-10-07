import { Router } from 'express';
import { LabiosController } from '../controller/LabiosController';

const router = Router();

//un producto por categoria
router.get('/:categoria', LabiosController.getCaregoria);

export  default router;