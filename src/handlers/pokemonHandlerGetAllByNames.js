const { pokemonsGetAllByNames, pokemonsGetByNameInAPI } = require("../controllers");

const pokemonHandlerGetAllByNames = async (req, res) => {
  const { namesArray } = req.query;
  try {
    let results;
    if (!namesArray) {
      //si no vienen nombres, devuelvo los nombres de la base de datos para seleccionar
      results = await pokemonsGetAllByNames();
    } else {
      //busco los nombres que me envian en la api   
      results = await pokemonsGetByNameInAPI(namesArray);
    }
    res.json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  pokemonHandlerGetAllByNames,
};
