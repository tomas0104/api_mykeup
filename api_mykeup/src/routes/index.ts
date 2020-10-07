import { Router } from 'express';
import auth from './auth';
import user from './user';
import rostro from './rostro';
import labios from './labios';
import ojos from './ojos';
import rostrocategoria from './rostro-categoria';
import labiocategoria from './labio-categoria';
import ojoscategoria from './ojos-categoria';
const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/rostro', rostro);
routes.use('/ojos', ojos);
routes.use('/labios', labios);
routes.use('/rostrocategoria', rostrocategoria);
routes.use('/labioscategoria', labiocategoria);
routes.use('/ojoscategoria', ojoscategoria)
export default routes;







