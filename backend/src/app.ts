import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", taskRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

export default app;
