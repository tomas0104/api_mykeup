import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as cors from 'cors';
import {Request, Response} from "express";
import * as helmet from 'helmet';
const PORT = process.env.PORT || 3000;
import routes from './routes'; 



createConnection().then(async () => {

    // create express app
    const app = express();
    //middlewares
    app.use(cors());
    app.use(helmet());

    app.use(express.json());
     //rules
    app.use('/', routes);
 
    // start express server
    app.listen(PORT, () => console.log('Servicio corriendo por el puerto'+ PORT));

}).catch(error => console.log(error));
