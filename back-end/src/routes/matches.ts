import { Router } from "express";
import { checkAndCreateMatch, getMatchesForUser } from "../controllers/matchController";

const router = Router();

router.post("/", checkAndCreateMatch);
router.get("/:userId", getMatchesForUser);

export default router;
