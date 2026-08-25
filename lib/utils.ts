import { clsx, type ClassValue } from "clsx";
import crypto from "crypto";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createHash = (data: string): string => {
  const hash = crypto.createHash("sha256").update(data, "utf8").digest("hex");
  return hash;
};
