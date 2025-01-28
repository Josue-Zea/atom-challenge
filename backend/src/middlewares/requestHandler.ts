import { Request, Response, NextFunction } from "express";
import logger from "../services/logger";

export const requestHandler = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
};
