import { signToken } from "./JWT";
import { Response } from "express";

export const handleAuthResponse = (
    res: Response,
    error: boolean,
    message: string,
    data: { email: string; id: string } | null
) => {
    const result = {
        code: error ? 500 : 201,
        data: {
            mensaje: message,
            token: error ? "" : signToken(data),
        },
    };
    res.status(result.code).send(result.data);
};