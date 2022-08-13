// import
import { Application } from 'express'
import { IMiddleware } from '../interfaces/models/IMiddleware'
import Logger from './Logger';
import cors from 'cors';

class CORSMiddleware implements IMiddleware {
    apply(server: Application): void {
        // server.use();
        Logger.info('Middlewares :: Adding CORS');

        // const options = {

        // }

        // server.use(cors(options))
    }
}

export default new CORSMiddleware;