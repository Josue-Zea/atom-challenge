import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateEmail = [
    check("email")
        .isEmail()
        .withMessage("El correo electrónico debe ser válido")
        .notEmpty()
        .withMessage("El correo electrónico es obligatorio"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    },
];
