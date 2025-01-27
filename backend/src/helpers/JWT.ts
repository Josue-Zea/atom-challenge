const jwt = require("jsonwebtoken");
import { SERVER } from "../config/config";

// Para validar que el token sea correcto
export const verifyToken = async (token: string): Promise<any> => {
    try {
        return jwt.verify(token, SERVER.JWT_KEY);
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const signToken = (data: any): string => {
    const newData = { ...data };
    const opcionesToken = {
        expiresIn: '1d',
    };
    return jwt.sign(newData, SERVER.JWT_KEY, opcionesToken);
};
