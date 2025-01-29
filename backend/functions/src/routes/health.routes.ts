import { Router } from "express";
import { healthCheck, principalRoute } from "../controllers/health.controller";

const router = Router();

router.get("/", principalRoute);
router.get("/health-check", healthCheck);

export default router;