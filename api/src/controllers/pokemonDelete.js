const { Pokemon, Type } = require("../db");
const { pokemonMapFromDB } = require("../utils/mapPokemons");

const pokemonDelete = async (id) => {
  const pokemonToDelete = await Pokemon.findByPk(id, {
    include: { model: Type },
    attributes: { id }
  });

  if (!pokemonToDelete) {
    return res.sendStatus(404);
  }

  const typesToRemove = pokemonToDelete.types.map((type) => type.id);
  await pokemonToDelete.removeTypes(typesToRemove);

  await pokemonToDelete.destroy();

  return id;
};

module.exports = { pokemonDelete };
