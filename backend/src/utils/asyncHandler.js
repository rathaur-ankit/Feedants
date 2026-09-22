const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    const statusCode =
      err.statusCode ||
      (typeof err.code === "number" && err.code >= 100 && err.code < 600
        ? err.code
        : 500);

    return res.status(statusCode).json({
      statusCode,
      success: false,
      message: err.message || "Internal Server Error",
      errors: err.errors || [],
      ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
    });
  }
};

export { asyncHandler };
