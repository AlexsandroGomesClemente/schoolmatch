import { Request, Response } from "express";
import prisma from "../config/prisma.config";

export const checkAndCreateMatch = async (req: Request, res: Response) => {
  const { userId, targetId } = req.body;

  try {
    const reciprocal = await prisma.like.findUnique({
      where: { userId_targetId: { userId: targetId, targetId: userId } },
    });

    if (reciprocal) {
      const [user1Id, user2Id] =
        userId < targetId ? [userId, targetId] : [targetId, userId];

      const match = await prisma.match.create({
        data: { user1Id, user2Id },
      });

      return res.json({ match: true, match });
    }

    return res.json({ match: false });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const getMatchesForUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const matches = await prisma.match.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
    });
    res.json(matches);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
