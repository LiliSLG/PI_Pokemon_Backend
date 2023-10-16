const { pokemonDelete } = require("../controllers");

const pokemonHandlerDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const pokemonId = await pokemonDelete(id);
    
    if (!pokemonId) {
      return res.status(404).json({ error: "Pokemon not found" });
    }
    
    return res.send(pokemonId);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  pokemonHandlerDelete,
};
