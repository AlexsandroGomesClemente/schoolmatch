import { Request, Response } from "express";
import prisma from "../config/prisma.config";

export const createLike = async (req: Request, res: Response) => {
  const { userId, targetId, like } = req.body;

  console.log(userId, "userId");
  console.log(targetId, "TargeId");
  try {
    const likes = await prisma.like.create({
      data: { userId, targetId, like },
    });
    return res.json(likes);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};
