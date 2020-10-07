import { Router } from 'express';
import AuthController from '../controller/AuthController';
import { checkJwt } from '../middlewares/jwt'

const router = Router();

//login
router.post('/login', AuthController.login);

//ruta de cambio de contraseña

router.post('/cambio',  [checkJwt ], AuthController.changePassword);

export default router;
