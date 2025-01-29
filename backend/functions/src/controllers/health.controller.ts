import { Request, Response } from "express";
import { SERVER } from "../config/config";

export const principalRoute = async (req: Request, res: Response) => {
    try {
        res.status(201).json({ message: `Server running on port ${SERVER.SERVER_PORT}` });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la tarea", error });
    }
};

export const healthCheck = async (req: Request, res: Response) => {
    try {
        res.status(201).json({ message: "OK" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la tarea", error });
    }
};
