const { pokemonGetById } = require("../controllers");

const pokemonHandlerById = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  try {
    const pokemon = await pokemonGetById(id, source);
    if (!pokemon) res.status(404).json({ error: "Pokemon not found" });
    res.send(pokemon);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  pokemonHandlerById,
};
