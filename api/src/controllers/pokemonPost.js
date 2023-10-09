const { Pokemon, Type } = require("../db");
const { pokemonMapFromDB } = require("../utils/mapPokemons");

const pokemonPost = async (
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
  const newPokemon = await Pokemon.create({
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

  await newPokemon.addType(TypeIds);
  // for (let index = 0; index < TypeIds.length; index++) {
  //   const typeId = TypeIds[index]; //el tipo me viene por id, y ya existe en la bdd
  //   await newPokemon.addType(+typeId);
  // }
  const createdPokemon = await Pokemon.findByPk(newPokemon.id, {
    include: {
      model: Type,
      attributes: ["name"],
    },
  });
  return pokemonMapFromDB([createdPokemon]);
};

module.exports = { pokemonPost };
