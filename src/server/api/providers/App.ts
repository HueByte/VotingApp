import Logger from "../middlewares/Logger";
import Config from "../models/Config";
import Express from "./Express";

class App {
    public loadServer(): void {
        Logger.info('Server :: Starting @ Master')
        Express.Initialize();
    }

    public loadDatabase(): void {
        Logger.warn("Database not implemented")
    }

    public loadConfig(): void {
        Logger.info("Loading config")
        Config.Initialize();
    }
}

export default new App;