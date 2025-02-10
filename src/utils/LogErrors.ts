// Utility function for standardized error logging across the application
export const logErrors = (error: unknown) => {
  if (error instanceof Error) {
    console.error("Error message:", error.message);
    console.error("Stack trace:", error.stack);
  } else if (error instanceof Response) {
    console.error("HTTP Error:", {
      status: error.status,
      statusText: error.statusText,
      url: error.url,
    });
  } else {
    console.error("Unknown error:", error);
  }

  return {
    message:
      error instanceof Error ? error.message : "An unexpected error occurred",
    timestamp: new Date().toISOString(),
  };
};
