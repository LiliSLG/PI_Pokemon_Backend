const { pokemonsGetAll, pokemonGetByName } = require("../controllers");

const pokemonHandlerGetAll = async (req, res) => {
  const { name, page, pageSize } = req.query;
  try {
    let results;
    if (name) {
      results = await pokemonGetByName(name);
      if (results.length === 0) {
        return res.status(404).json({ error: "Pokemon not found" });
      }
    } else {
      results = await pokemonsGetAll(page, pageSize);
    }
    res.json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  pokemonHandlerGetAll, 
};
