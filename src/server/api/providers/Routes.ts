import { Application } from "express";
import Logger from "../middlewares/Logger";
import apiRoutes from '../routes/Api';

class Routes {
    public addApiRoutes(app: Application): Application {
        Logger.info("Routes :: Mounting web routes");

        app.use("/api", apiRoutes);

        return app;
    }
}

export default new Routes;