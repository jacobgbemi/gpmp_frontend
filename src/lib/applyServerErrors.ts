import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ApiError } from "@/types/api";

/**
 * Maps a DRF-style `{ field: ["message"] }` error body onto the
 * matching react-hook-form fields, so a backend validation error
 * (e.g. a duplicate variation_number, an illegal status transition)
 * shows up right under the field it concerns instead of only as a
 * generic banner. Returns a top-level message for anything that
 * doesn't match a known field (or has no field errors at all).
 */
export function applyServerErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
): string {
  if (!(error instanceof ApiError)) {
    return "Something went wrong. Please try again.";
  }

  const body = error.body?.errors;
  if (body && typeof body === "object" && !Array.isArray(body)) {
    let matchedAny = false;
    for (const [field, messages] of Object.entries(
      body as Record<string, unknown>,
    )) {
      const message = Array.isArray(messages)
        ? String(messages[0])
        : String(messages);
      setError(field as Path<T>, { type: "server", message });
      matchedAny = true;
    }
    if (matchedAny) return "";
  }

  return error.message || "Something went wrong. Please try again.";
}
