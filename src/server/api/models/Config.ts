import * as fs from 'fs';
import * as path from 'path';
import { IConfig } from '../interfaces/models/IConfig';
import Logger from '../middlewares/Logger';

class Config {
    public Data: IConfig | null;
    private ConfigPath: string;

    constructor() {
        this.ConfigPath = path.join(__dirname, '../config.json');
        this.Data = null
    }

    public Initialize(): void {
        if (!fs.existsSync(this.ConfigPath)) {
            Logger.info("Creating new config");

            let tempObject: IConfig = {
                port: 3000
            };

            let jsonConfig = JSON.stringify(tempObject);

            fs.writeFileSync(this.ConfigPath, jsonConfig);
            this.Data = tempObject as IConfig;
        }
        else {
            let data = fs.readFileSync(this.ConfigPath, "utf8");
            this.Data = JSON.parse(data);
        }
    }
}

export default new Config;