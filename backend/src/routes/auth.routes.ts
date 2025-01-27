import { Router } from "express";
import { creatUser, lookForUser } from "../controllers/login.controller";
import { validateEmail } from "../validators/emailValidator";

const router = Router();

router.get("/:email", validateEmail, lookForUser);
router.post("/", validateEmail, creatUser);

export default router;