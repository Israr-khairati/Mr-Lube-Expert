import { ENV } from "./_core/env.js";
import { storagePut } from "./storage.js";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function uploadFile(
  fileName: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  const hasForge = !!ENV.forgeApiUrl && !!ENV.forgeApiKey;
  if (hasForge) {
    try {
      const result = await storagePut(fileName, buffer, contentType);
      return result.url;
    } catch (error) {
      console.warn("[Storage] Forge upload failed, falling back to local storage:", error);
    }
  }

  // Local storage fallback
  const uploadsDir = path.join(process.cwd(), "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  
  const hash = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);
  const newName = `${base}_${hash}${ext}`;
  const filePath = path.join(uploadsDir, newName);
  
  await fs.writeFile(filePath, buffer);
  return `/uploads/${newName}`;
}
