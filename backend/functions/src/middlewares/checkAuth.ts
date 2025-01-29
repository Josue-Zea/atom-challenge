import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/JWT";

export const checkAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).send("No se proporcionó un token");
            return;
        }

        const token = authHeader.split(" ").pop();

        if (!token) {
            res.status(401).send("Token no válido");
            return;
        }

        const tokenData = await verifyToken(token);

        if (tokenData) {
            next();
        } else {
            res.status(401).send("Token inválido");
        }
    } catch (err) {
        console.error(err);
        res.status(401).send("Token inválido");
    }
};
