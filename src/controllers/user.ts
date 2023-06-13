import { Request, Response } from 'express';
import User from '../models/user';


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcılar getirilirken bir hata oluştu.' });
  }
};

// Yeni bir kullanıcı oluşturma
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı oluşturulurken bir hata oluştu.' });
  }
};