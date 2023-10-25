const validatePagination = (req, res, next) => {
  const { page, pageSize } = req.query;

  if (page && isNaN(Number(page))) {
    return res.status(400).json({ error: "Invalid page number" });
  }
  if (pageSize && isNaN(Number(pageSize))) {
    return res.status(400).json({ error: "Invalid page size number" });
  }

  next();
};

module.exports = { validatePagination };
