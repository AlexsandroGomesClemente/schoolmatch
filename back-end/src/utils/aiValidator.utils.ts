export default async function validateDocument(
  fileBuffer: Buffer
): Promise<boolean> {
  // Aqui você pode integrar OCR (Tesseract) ou APIs de visão (Google Vision / OpenAI)
  // Por enquanto: aprovação simples (pode melhorar)
  return true;
}
