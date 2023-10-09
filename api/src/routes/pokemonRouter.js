const express = require("express");
const {
  validatePokemon
} = require("../middlewares/validatePokemon");
const {
  pokemonHandlerGetAll,
  pokemonHandlerGetAllByNames,
  pokemonHandlerById,
  pokemonHandlerPost,
} = require("../handlers");

const pokemonRouter = express.Router();

pokemonRouter.get("/names", pokemonHandlerGetAllByNames);
pokemonRouter.get("/name?", pokemonHandlerGetAll);
pokemonRouter.get("/", pokemonHandlerGetAll);
pokemonRouter.get("/:id", pokemonHandlerById);
pokemonRouter.post("/", validatePokemon, pokemonHandlerPost);

module.exports = pokemonRouter;
