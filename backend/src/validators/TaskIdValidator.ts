import { Request, Response, NextFunction } from "express";
import { param, validationResult } from "express-validator";

export const validateTaskId = [
    param("taskId")
        .isString()
        .withMessage("El ID de la tarea debe ser un texto válido")
        .notEmpty()
        .withMessage("El ID de la tarea es obligatorio"),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    },
];
