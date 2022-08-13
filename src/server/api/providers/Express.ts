import express, { Application } from 'express';
import CORS from '../middlewares/CORSMiddleware';
import Logger from '../middlewares/Logger';
import Config from '../models/Config';
import Routes from './Routes';

class Express {
    public app: Application;

    constructor() {
        this.app = express();

        this.mountMiddlewares();
        this.mountRoutes();
    }

    public Initialize(): any {
        const port: number | undefined = Config.Data?.port;

        this.app.listen(port, () => this.OnServerStarted({ Port: port, Date: new Date().toLocaleString() }));
        Logger.info("API is running");
    }

    private mountRoutes(): void {
        Logger.info("Mouting API routes")
        this.app = Routes.addApiRoutes(this.app);
    }

    private mountMiddlewares(): void {
        Logger.info("Mouting Middlewares")
        CORS.apply(this.app);
    }

    private OnServerStarted(data: any) {
        console.table({ Port: data.Port, StartedDate: data.Date, AppUrl: `http://localhost:${data.Port}/` })
        Logger.info(`Started app on address: http://localhost:${data.Port}/`)
    }
}

export default new Express();