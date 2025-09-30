import { Request, Response } from "express";
import prisma from "../config/prisma.config";

export const createLike = async (req: Request, res: Response) => {
  const { userId, targetId } = req.body;
  try {
    const like = await prisma.like.create({
      data: { userId, targetId },
    });
    return res.json(like);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};
