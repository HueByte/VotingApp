import * as os from 'os';
import * as clusterLib from 'cluster'
import App from "./providers/App";
import Logger from './middlewares/Logger';

const cluster: clusterLib.Cluster = require("cluster")

if (!cluster.isPrimary) {
    Logger.info("Starting clusters")

    App.loadConfig();

    const cpus: any = os.cpus;

    cpus.forEach(() => cluster.fork());
}
else {
    Logger.info("Starting App");
    App.loadConfig();
    App.loadDatabase();
    App.loadServer();
}