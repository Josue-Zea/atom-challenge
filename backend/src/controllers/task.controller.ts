import { Request, Response } from "express";
// import { db } from "../config/firebase";
import { Task } from "../models/task.model";

// Crear una tarea
export const createTask = async (req: Request, res: Response) => {
    try {
        const task: Task = req.body;
        // const newTask = await db.collection("tasks").add(task);
        // res.status(201).json({ id: newTask.id, ...task });
        res.status(201).json({ id: 1, ...task });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la tarea", error });
    }
};

// Obtener todas las tareas
export const getTasks = async (req: Request, res: Response) => {
    try {
        // const tasksSnapshot = await db.collection("tasks").get();
        // const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // res.status(200).json(tasks);
        res.status(200).json([]);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las tareas", error });
    }
};

// Actualizar una tarea
export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task: Partial<Task> = req.body;
        // await db.collection("tasks").doc(id).update(task);
        res.status(200).json({ id, ...task });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la tarea", error });
    }
};

// Eliminar una tarea
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // await db.collection("tasks").doc(id).delete();
        res.status(200).json({ message: `Tarea con ID ${id} eliminada` });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la tarea", error });
    }
};
