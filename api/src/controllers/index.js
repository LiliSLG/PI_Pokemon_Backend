const { pokemonsGetAll } = require("./pokemonsGetAll");
const { pokemonGetByName } = require("./pokemonGetByName");
const { pokemonGetById } = require("./pokemonGetById");
const { pokemonsGetAllByNames } = require("./pokemonsGetAllByNames");
const { pokemonPost } = require("./pokemonPost");
const { typesGet } = require("./typesGet");

module.exports = {
  pokemonsGetAll,
  pokemonsGetAllByNames,
  pokemonGetByName,
  pokemonGetById,
  pokemonPost,
  typesGet
};
