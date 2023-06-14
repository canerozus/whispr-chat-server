import express from "express"
import { Request, Response } from 'express';
import { getUsers,Register, Login } from "../controllers/user"

const router = express.Router();

router.get("/", getUsers)
router.post('/register', Register);
router.post('/login', Login)

export default router;