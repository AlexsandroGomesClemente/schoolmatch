import { Request, Response } from "express";
import prisma from "../config/prisma.config";
import bcrypt from "bcryptjs";
import multer from "multer";
import supabase from "../config/supabase.config";
import jwt from 'jsonwebtoken'

const upload = multer({ storage: multer.memoryStorage() });

export const createUser = [
  upload.single("photo"),
  async (req: Request, res: Response) => {
    const { name, email, course, password } = req.body;
    const file = (req as any).file as Express.Multer.File | undefined;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      let photo_url = "";

      if (file) {
        const fileName = `users/${Date.now()}-${file.originalname}`;

        // Upload seguro para Supabase
        const { data, error } = await supabase.storage
          .from("users")
          .upload(fileName, file.buffer, { contentType: file.mimetype });

        // Obter URL pública
        const publicUrl = supabase.storage.from("users").getPublicUrl(fileName)
          .data.publicUrl;

        if (!publicUrl) {
          return res
            .status(500)
            .json({ error: "Não foi possível gerar URL pública" });
        }

        photo_url = publicUrl;
      }

      const user = await prisma.user.create({
        data: {
          name,
          email,
          course,
          password: hashedPassword,
          photo_url,
        },
      });

      return res.json({ ok: true, user });
    } catch (err: any) {
      console.error("ERRO createUser:", err);
      return res.status(400).json({ error: err.message });
    }
  },
];
export const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

    // Verificar senha
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: "Senha incorreta" });

    // Criar token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    return res.json({ ok: true, token, user });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
