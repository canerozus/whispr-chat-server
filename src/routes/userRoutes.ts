import express from "express"
import { getUsers } from "../controllers/user"
const router = express.Router();

router.get("/:id", getUsers)

export default router;