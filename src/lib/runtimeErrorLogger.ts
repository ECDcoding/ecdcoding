/**
 * Lightweight global runtime error logging.
 * Captures uncaught errors and unhandled promise rejections so problems are
 * visible in the console with a consistent prefix instead of failing silently.
 */
let installed = false;

export function installRuntimeErrorLogger() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  window.addEventListener("error", (event) => {
    console.error("[runtime-error]", event.message, {
      source: event.filename,
      line: event.lineno,
      column: event.colno,
      error: event.error,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    console.error("[unhandled-rejection]", event.reason);
  });
}
