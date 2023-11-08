const { pokemonsGetAll } = require("./pokemonsGetAll");
const { pokemonGetByName } = require("./pokemonGetByName");
const { pokemonGetById } = require("./pokemonGetById");
const { pokemonsGetAllByNames } = require("./pokemonsGetAllByNames");
const { pokemonsGetByNameInAPI } = require("./pokemonsGetByNameInAPI");
const { pokemonPost } = require("./pokemonPost");
const { pokemonPut } = require("./pokemonPut");
const { pokemonDelete } = require("./pokemonDelete");

const { typesGet } = require("./typesGet");

const { userLogin } = require("./userLogin");
const { userPost } = require("./userPost");


module.exports = {
  pokemonsGetAll,
  pokemonsGetAllByNames,
  pokemonGetByName,
  pokemonsGetByNameInAPI,
  pokemonGetById,
  pokemonPost,
  pokemonPut,
  pokemonDelete,
  typesGet,
  userLogin,
  userPost,
};
