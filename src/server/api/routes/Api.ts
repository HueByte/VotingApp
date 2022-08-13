import express from "express";
import Logger from "../middlewares/Logger";

const router = express.Router();

router.use((req, res, next) => {
    Logger.info(`${req.method} ${req.baseUrl}`);
    next();
});

router.get('/', (req, res) => {
    res.send("Hello World")
});

export default router;