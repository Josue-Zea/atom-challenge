import { Router } from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/task.controller";
import { checkAuth } from '../middlewares/checkAuth';
import { validateTask } from "../validators/createTaskValidator";
import { validateTaskId } from "../validators/TaskIdValidator";

const router = Router();

router.post("/tasks", checkAuth, validateTask, createTask);
router.get("/tasks", checkAuth, getTasks);
router.put("/tasks/:taskId", checkAuth, validateTask, updateTask);
router.delete("/tasks/:taskId", checkAuth, validateTaskId, deleteTask);

export default router;
