const { Pokemon, Type } = require("../db");
const { pokemonMapFromDB } = require("../utils/mapPokemons");

const pokemonPut = async (
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
  TypeIds
) => {
  const pokemonToUpdate = await Pokemon.findByPk(id);
  if (!pokemonToUpdate) {
    return res.sendStatus(404);
  }
  
  await pokemonToUpdate.setTypes(TypeIds);
  
  const updatedFields = {
    idAPI,
    name,
    height,
    weight,
    hp,
    image,
    attack,
    defense,
    speed,
  };
  await pokemonToUpdate.update(updatedFields);

  const updatedPokemon = await Pokemon.findByPk(id, {
    include: {
      model: Type,
      attributes: ["name"],
    },
  });

  return pokemonMapFromDB([updatedPokemon])[0];
};

module.exports = { pokemonPut };
