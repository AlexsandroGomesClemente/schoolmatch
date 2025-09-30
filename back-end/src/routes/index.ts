import { Router } from "express";
import usersRouter from "./users";
import likesRouter from "./likes";
import matchesRouter from "./matches";
import documentsRouter from "./document";

const router = Router();

router.use("/users", usersRouter);
router.use("/likes", likesRouter);
router.use("/matches", matchesRouter);
router.use("/documents", documentsRouter);

export default router;
