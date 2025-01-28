import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/tasks", taskRoutes);
app.use("/health", healthRoutes);
app.use("/users", authRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

export default app;
