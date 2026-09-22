const asyncHandler = (fun) => async (req, res, next) => {
  try {
    await fun(req, res, next);
  } catch (err) {
    res.status(err.code || 400).json({
      success: false,
      message: err.message,
    });
  }
};

export { asyncHandler };
