import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely, resolving conflicting utility
 * classes in the order they are provided.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
