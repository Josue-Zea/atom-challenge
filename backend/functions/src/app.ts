import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { requestHandler } from "./middlewares/requestHandler";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Middleware to handle and log errors
app.use(errorHandler);

// Middleware to log requests
app.use(requestHandler);

// Routes
app.use("/tasks", taskRoutes);
app.use("/health", healthRoutes);
app.use("/users", authRoutes);

export default app;
