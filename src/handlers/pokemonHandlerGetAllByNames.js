const { pokemonsGetAllByNames } = require("../controllers");

const pokemonHandlerGetAllByNames = async (req, res) => {
  try {
    const results = await pokemonsGetAllByNames();
    res.json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  pokemonHandlerGetAllByNames,
};
