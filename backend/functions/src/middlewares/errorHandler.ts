import { Request, Response, NextFunction } from "express";
import logger from "../services/logger";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Error: ${req.method} ${req.url} - ${err.message}`);
    logger.error(err.stack);
    res.status(500).send({ message: "Ha ocurrido un error", error: err.message });
};
