export function getErrorMessage(
  err: unknown,
  fallback = "Something went wrong.",
) {
  const message = err instanceof Error ? err.message : fallback;
  return message || fallback;
}
