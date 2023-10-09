const { pokemonsGetAll, pokemonGetByName } = require("../controllers");

const pokemonHandlerGetAll = async (req, res) => {
  const { name } = req.query;
  try {
    const results = name
      ? await pokemonGetByName(name)
      : await pokemonsGetAll();
    if (name && results.length === 0) {
      return res.status(404).json({ error: "Pokemon not found" });
    } else res.json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  pokemonHandlerGetAll,
};
