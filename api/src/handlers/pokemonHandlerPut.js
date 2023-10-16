const { pokemonPut } = require("../controllers");

const pokemonHandlerPut = async (req, res) => {
  const { id } = req.params;
  const {
    // id,
    idAPI,
    name,
    height,
    weight,
    hp,
    image,
    attack,
    defense,
    speed,
    types,
  } = req.body;

  try {
    const updatedPokemon = await pokemonPut(
      id,
      idAPI,
      name,
      height,
      weight,
      hp,
      image,
      attack,
      defense,
      speed,
      types
    );
    res.json({ updatedPokemon });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  pokemonHandlerPut,
};
