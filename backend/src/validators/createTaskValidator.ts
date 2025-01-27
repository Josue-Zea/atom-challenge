import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateTask = [
    body("title")
        .isString()
        .withMessage("El título debe ser un texto")
        .notEmpty()
        .withMessage("El título es obligatorio"),

    body("description")
        .isString()
        .withMessage("La descripción debe ser un texto")
        .notEmpty()
        .withMessage("La descripción es obligatoria"),

    body("creation_date")
        .isISO8601()
        .toDate()
        .withMessage("La fecha de creación debe ser una fecha válida"),

    body("completed")
        .isBoolean()
        .withMessage("El estado de la tarea debe ser booleano"),

    body("taskId")
        .optional()
        .isString()
        .withMessage("El ID debe ser un texto si está presente"),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    },
];
