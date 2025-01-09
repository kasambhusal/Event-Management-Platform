// /src/lib/errorHandler.ts
export function handleError(error: Error) {
    console.error(error);
    throw new Error(error.message || "An unexpected error occurred");
  }
  