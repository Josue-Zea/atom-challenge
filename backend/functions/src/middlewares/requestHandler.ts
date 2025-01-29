import { Request, Response, NextFunction } from "express";
import logger from "../services/logger";

export const requestHandler = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url} ${req.ip} ${req.hostname} ${JSON.stringify(req.body)}`);
    next();
};
