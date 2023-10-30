const { pokemonHandlerGetAll } = require("./pokemonHandlerGetAll");
const { pokemonHandlerGetAllByNames } = require("./pokemonHandlerGetAllByNames");
const { pokemonHandlerById } = require("./pokemonHandlerById");
const { pokemonHandlerPost } = require("./pokemonHandlerPost");
const { pokemonHandlerPut } = require("./pokemonHandlerPut");
const { pokemonHandlerDelete } = require("./pokemonHandlerDelete");
const { typesHandlerGetAll } = require("./typesHandlerGetAll");


module.exports = {
  pokemonHandlerGetAll,
  pokemonHandlerGetAllByNames,
  pokemonHandlerById,
  pokemonHandlerPost,
  pokemonHandlerPut,
  pokemonHandlerDelete,
  typesHandlerGetAll
};
