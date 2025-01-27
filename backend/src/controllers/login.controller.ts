import { Request, Response } from "express";
import { SERVER } from "../config/config";
import { signToken } from "../helpers/JWT";

export const lookForUser = async (req: Request, res: Response) => {
    const { email } = req.params;
    const data = {
        email
    }
    // VALIDATE IF USER EXISTS, IF NOT, CREATE IT
    // const result = await fetchRoute(
    //     'POST',
    //     req.body,
    //     `${SERVER_CONFIG.MS_DATOS}/auth/login`
    // );
    // if (result.code === 200) {
    //     const response = {
    //         mensaje: "Correcto",
    //         token: signToken(result.data)
    //     }
    //     result.data = { ...response };
    // }

    const result = {
        code: 200,
        data: {
            mensaje: "SE ENCONTRO EL USUARIO",
        }
    }
    res.status(result.code).send(result.data);
    return;
    // saveLog(true, "LOGIN", req.body, null);



    try {
        res.status(201).json({ message: `Server running on port ${SERVER.SERVER_PORT}` });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la tarea", error });
    }
};

export const creatUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    const data = {
        email
    }
    // VALIDATE IF USER EXISTS, IF NOT, CREATE IT
    // const result = await fetchRoute(
    //     'POST',
    //     req.body,
    //     `${SERVER_CONFIG.MS_DATOS}/auth/login`
    // );
    // if (result.code === 200) {
    //     const response = {
    //         mensaje: "Correcto",
    //         token: signToken(result.data)
    //     }
    //     result.data = { ...response };
    // }

    const result = {
        code: 200,
        data: {
            mensaje: "Correcto",
            token: signToken(data)
        }
    }
    res.status(result.code).send(result.data);
    return;
    // saveLog(true, "LOGIN", req.body, null);



    try {
        res.status(201).json({ message: `Server running on port ${SERVER.SERVER_PORT}` });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la tarea", error });
    }
};