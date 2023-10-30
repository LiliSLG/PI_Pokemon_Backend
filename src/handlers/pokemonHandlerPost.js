const { pokemonPost } = require("../controllers");

const pokemonHandlerPost = async (req, res) => {
  const {
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
    const newPokemon = await pokemonPost(
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
    res.json({ newPokemon });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  pokemonHandlerPost,
};
