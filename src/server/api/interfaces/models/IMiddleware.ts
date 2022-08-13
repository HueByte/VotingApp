import { Application } from "express";

interface IMiddleware {
    apply(server: Application): void;
}

export { IMiddleware }