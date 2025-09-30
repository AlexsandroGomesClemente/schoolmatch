import { Request, Response } from "express";
import prisma from "../config/prisma.config";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, course, photo_url } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, course, photo_url },
    });
    return res.json(user);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

export const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
