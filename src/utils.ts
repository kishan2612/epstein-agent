import fs from "fs";
import { createHash } from "crypto";

export function readFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

export function generateHash(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}