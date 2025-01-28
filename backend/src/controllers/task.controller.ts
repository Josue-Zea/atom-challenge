import { Request, Response } from "express";
import { db } from "../config/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Task } from "../models/task.model";
import { getPayloadToken } from "../helpers/getPayloadToken";
import { COLLECTIONS } from "../config/config";

// Create a task
export const createTask = async (req: Request, res: Response) => {
    try {
        const task: Task = req.body;
        const token: string = req.headers.authorization?.split(" ").pop() || "";
        const payload = getPayloadToken(token);

        if (payload === null || typeof payload === "string") {
            res.status(401).send({ message: "No autorizado" });
            return;
        }

        const tasksCollectionRef = collection(
            db,
            COLLECTIONS.USERS_COLLECTION,
            payload.id,
            COLLECTIONS.TASKS_COLLECTION
        );
        const newTask = await addDoc(tasksCollectionRef, { ...task });
        res.status(201).send({ taskId: newTask.id, ...task });
        return;
    } catch (error) {
        res.status(500).send({ message: "Error al crear la tarea", error });
    }
};

// Get all user´s tasks
export const getTasks = async (req: Request, res: Response) => {
    try {
        const token: string = req.headers.authorization?.split(" ").pop() || "";
        const payload = getPayloadToken(token);

        if (payload === null || typeof payload === "string") {
            res.status(401).send({ message: "No autorizado" });
            return;
        }

        const tasksCollectionRef = collection(
            db,
            COLLECTIONS.USERS_COLLECTION,
            payload.id,
            COLLECTIONS.TASKS_COLLECTION
        );

        const tasksSnapshot = await getDocs(tasksCollectionRef);

        const tasks: Record<string, any> = {};
        tasksSnapshot.forEach((doc) => {
            tasks[doc.id] = doc.data();
        });

        res.status(200).send({ tasks });
    } catch (error) {
        res.status(500).send({ message: "Error al obtener las tareas", error });
    }
};

// Update an specific task
export const updateTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const updatedData: Partial<Task> = req.body;
        const token: string = req.headers.authorization?.split(" ").pop() || "";
        const payload = getPayloadToken(token);

        if (payload === null || typeof payload === "string") {
            res.status(401).send({ message: "Not allowed" });
            return;
        }

        const taskDocRef = doc(
            db,
            COLLECTIONS.USERS_COLLECTION,
            payload.id,
            COLLECTIONS.TASKS_COLLECTION,
            taskId
        );

        await updateDoc(taskDocRef, updatedData);
        res.status(200).send({ message: "Task updated succesfully" });
    } catch (error) {
        res.status(500).send({ message: "Error during updating", error });
    }
};

// Delete an specific task
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const token: string = req.headers.authorization?.split(" ").pop() || "";
        const payload = getPayloadToken(token);

        if (payload === null || typeof payload === "string") {
            res.status(401).send({ message: "Not allowed" });
            return;
        }

        const taskDocRef = doc(
            db,
            COLLECTIONS.USERS_COLLECTION,
            payload.id,
            COLLECTIONS.TASKS_COLLECTION,
            taskId
        );

        await deleteDoc(taskDocRef);
        res.status(200).send({ message: "Task deleted succesfully" });
    } catch (error) {
        res.status(500).send({ message: "Error during deleting a task", error });
    }
};
