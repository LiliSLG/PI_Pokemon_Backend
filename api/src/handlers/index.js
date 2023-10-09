const { pokemonHandlerGetAll } = require("./pokemonHandlerGetAll");
const { pokemonHandlerGetAllByNames } = require("./pokemonHandlerGetAllByNames");
const { pokemonHandlerById } = require("./pokemonHandlerById");
const { pokemonHandlerPost } = require("./pokemonHandlerPost");
const { typesHandlerGetAll } = require("./typesHandlerGetAll");

module.exports = {
  pokemonHandlerGetAll,
  pokemonHandlerGetAllByNames,
  pokemonHandlerById,
  pokemonHandlerPost,
  typesHandlerGetAll
};
