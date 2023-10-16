const express = require("express");
const {
  validatePokemon
} = require("../middlewares/validatePokemon");
const {
  pokemonHandlerGetAll,
  pokemonHandlerGetAllByNames,
  pokemonHandlerById,
  pokemonHandlerPost,
  pokemonHandlerPut,
  pokemonHandlerDelete,
} = require("../handlers");

const pokemonRouter = express.Router();

pokemonRouter.get("/names", pokemonHandlerGetAllByNames);
pokemonRouter.get("/name?", pokemonHandlerGetAll);
pokemonRouter.get("/", pokemonHandlerGetAll);
pokemonRouter.get("/:id", pokemonHandlerById);
pokemonRouter.post("/", validatePokemon, pokemonHandlerPost);
pokemonRouter.put("/:id", validatePokemon, pokemonHandlerPut);
pokemonRouter.delete("/:id", pokemonHandlerDelete);

module.exports = pokemonRouter;
