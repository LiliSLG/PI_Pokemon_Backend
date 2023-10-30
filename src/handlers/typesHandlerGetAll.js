const { typesGet } = require("../controllers");

const typesHandlerGetAll = async (req, res) => {
  try {
    const allTypes = await typesGet();
    res.json(allTypes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  typesHandlerGetAll,
};
