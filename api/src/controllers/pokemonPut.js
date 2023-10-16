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
  if (!pokemonToUpdate) return res.sendStatus(404);
  await pokemonToUpdate.setTypes(TypeIds);
  const updatedPokemon = await pokemonToUpdate.update({
    idAPI,
    name,
    height,
    weight,
    hp,
    image,
    attack,
    defense,
    speed,
  });

  //verrr como modififar los types del user
  // await updatedPokemon.removeTypes(TypeIds);
  // await updatedPokemon.addType(TypeIds);

  // const updatedPokemon = await Pokemon.findByPk(newPokemon.id, {
  //   include: {
  //     model: Type,
  //     attributes: ["name"],
  //   },
  // });

  return pokemonMapFromDB([updatedPokemon])[0];
};

module.exports = { pokemonPut };
