import { Router } from "express";
import { createLike } from "../controllers/likesController";

const router = Router();
router.post("/", createLike);

export default router;
