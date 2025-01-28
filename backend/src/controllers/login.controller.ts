import { Request, Response } from "express";
import { handleAuthResponse } from "../helpers/handleAuthResponse";
import { checkUserExists, createUser } from "../services/auth.service";

export const lookForUser = async (req: Request, res: Response) => {
    const { email } = req.params;

    try {
        const user = await checkUserExists(email);
        if (!user) {
            return handleAuthResponse(res, true, "This user does not exist", null);
        }

        return handleAuthResponse(res, false, "User found successfully", {
            email,
            id: user.id,
        });
    } catch (error) {
        console.error(error);
        return handleAuthResponse(
            res,
            true,
            "An error occurred while searching for the user",
            null
        );
    }
};

export const creatUser = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const userExists = await checkUserExists(email);
        if (userExists) {
            return handleAuthResponse(res, true, "This user already exists", null);
        }

        const newUser = await createUser(email);
        return handleAuthResponse(res, false, "User created successfully", newUser);
    } catch (error) {
        console.error(error);
        return handleAuthResponse(
            res,
            true,
            "An error occurred while creating the user",
            null
        );
    }
};