import { Router } from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/task.controller";
import { checkAuth } from '../middlewares/checkAuth';
import { validateTask } from "../validators/createTaskValidator";
import { validateTaskId } from "../validators/TaskIdValidator";

const router = Router();

router.post("/", checkAuth, validateTask, createTask);
router.get("/", checkAuth, getTasks);
router.put("/:taskId", checkAuth, validateTask, updateTask);
router.delete("/:taskId", checkAuth, validateTaskId, deleteTask);

export default router;
