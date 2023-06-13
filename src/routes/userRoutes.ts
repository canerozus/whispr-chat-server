import express from "express"
import { Request, Response } from 'express';
import { getUsers,Register } from "../controllers/user"

const router = express.Router();

router.get("/", getUsers)
router.post('/', Register);

export default router;