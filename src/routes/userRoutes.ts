import express from "express"
import { Request, Response } from 'express';
import { getUsers,createUser } from "../controllers/user"

const router = express.Router();

router.get("/", getUsers)
router.post('/', createUser);

export default router;