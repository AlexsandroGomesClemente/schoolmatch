import { Request, Response } from "express";
import multer from "multer";
import supabase from "../config/supabase.config";
import validateDocument from "../utils/aiValidator.utils";
import prisma from "../config/prisma.config";

const upload = multer({ storage: multer.memoryStorage() });

export const uploadDocument = [
  upload.single("file"),
  async (req: Request, res: Response) => {
    const file = (req as any).file as Express.Multer.File | undefined;
    const { userId } = req.body;

    if (!file) return res.status(400).json({ error: "Arquivo não enviado" });

    try {
      const fileName = `documents/${Date.now()}-${file.originalname}`;

      // upload para supabase storage (bucket 'documents')
      const { data, error } = await supabase.storage
        .from("documents")
        .upload(fileName, file.buffer, { contentType: file.mimetype });

      if (error) return res.status(500).json({ error: error.message });

      const publicUrl = supabase.storage
        .from("documents")
        .getPublicUrl(fileName).data.publicUrl;

      // valida documento (mock)
      const approved = await validateDocument(file.buffer);

      // salva no DB
      const doc = await prisma.document.create({
        data: {
          userId,
          file_url: publicUrl ?? fileName,
          approved,
        },
      });

      return res.json({ doc });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
];
