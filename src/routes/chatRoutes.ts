import express from "express"
import { Request, Response } from 'express';
import { getUsers,Register, Login, Logout } from "../controllers/user"

const router = express.Router();

router.get("/chats", getUsers)
router.post('/chats/:id', Register);

export default router;