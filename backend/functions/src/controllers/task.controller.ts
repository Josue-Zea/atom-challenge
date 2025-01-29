// src/controllers/taskController.ts
import { Request, Response } from "express";
import { getPayloadToken } from "../helpers/getPayloadToken";
import {
    createTask as createTaskService,
    getTasks as getTasksService,
    updateTask as updateTaskService,
    deleteTask as deleteTaskService,
} from "../services/task.service";
import { Task } from "../models/task.model";

// Create a task
export const createTask = async (req: Request, res: Response) => {
    try {
        const task: Task = req.body;
        const token: string = req.headers.authorization?.split(" ").pop() || "";
        const payload = getPayloadToken(token);

        if (payload === null || typeof payload === "string") {
            res.status(401).send({ message: "Not authorized" });
            return;
        }

        const newTask = await createTaskService(payload.id, task);
        res.status(201).send({ taskId: newTask.id, ...task });
    } catch (error) {
        res.status(500).send({ message: "Error while creating task", error });
    }
};

// Get all user´s tasks
export const getTasks = async (req: Request, res: Response) => {
    try {
        const token: string = req.headers.authorization?.split(" ").pop() || "";
        const payload = getPayloadToken(token);

        if (payload === null || typeof payload === "string") {
            res.status(401).send({ message: "Not authorized" });
            return;
        }

        const tasksObject = await getTasksService(payload.id);

        const tasksArray = Object.entries(tasksObject).map(([taskId, task]) => ({
            taskId,
            ...task,
            creation_date: new Date(task.creation_date.seconds * 1000 + task.creation_date.nanoseconds / 1e6)
        }));

        res.status(200).send(tasksArray);
    } catch (error) {
        res.status(500).send({ message: "Error while retrieving tasks", error });
    }
};

// Update a specific task
export const updateTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const updatedData: Partial<Task> = req.body;
        const token: string = req.headers.authorization?.split(" ").pop() || "";
        const payload = getPayloadToken(token);

        if (payload === null || typeof payload === "string") {
            res.status(401).send({ message: "Not authorized" });
            return;
        }

        await updateTaskService(payload.id, taskId, updatedData);
        res.status(200).send({ message: "Task updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error while updating task", error });
    }
};

// Delete a specific task
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const token: string = req.headers.authorization?.split(" ").pop() || "";
        const payload = getPayloadToken(token);

        if (payload === null || typeof payload === "string") {
            res.status(401).send({ message: "Not authorized" });
            return;
        }

        await deleteTaskService(payload.id, taskId);
        res.status(200).send({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error while deleting task", error });
    }
};
