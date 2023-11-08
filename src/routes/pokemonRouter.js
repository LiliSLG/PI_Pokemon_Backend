const express = require("express");
const { validatePokemon, validatePagination } = require("../middlewares/");
const {
  pokemonHandlerGetAll,
  pokemonHandlerGetAllByNames,
  pokemonHandlerById,
  pokemonHandlerPost,
  pokemonHandlerPut,
  pokemonHandlerDelete,
} = require("../handlers");

const passport = require('passport');

const pokemonRouter = express.Router();

pokemonRouter.get("/names", pokemonHandlerGetAllByNames);
pokemonRouter.get("/name?", pokemonHandlerGetAll);
pokemonRouter.get("/", validatePagination, pokemonHandlerGetAll);
pokemonRouter.get("/:id", pokemonHandlerById);
// pokemonRouter.post("/", validatePokemon, pokemonHandlerPost);
pokemonRouter.post('/', passport.authenticate('jwt', { session: false }), validatePokemon, pokemonHandlerPost);
pokemonRouter.put("/:id", validatePokemon, pokemonHandlerPut);
pokemonRouter.delete("/:id", pokemonHandlerDelete);

module.exports = pokemonRouter;
