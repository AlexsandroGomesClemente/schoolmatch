import { Router } from "express";
import {
  createUser,
  listUsers,
  loginUser,
} from "../controllers/userController";

const router = Router();

router.post("/", createUser);
router.get("/", listUsers);
router.post("/login", loginUser);

export default router;
