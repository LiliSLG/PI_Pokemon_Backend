//pokemons post
import { createPokemon } from "./pokemonPost";
//pokemons put
import { updatePokemon } from "./pokemonUpdate";
//pokemons delete
import { pokemonDelete } from "./pokemonDelete";
//pokemons get
import { getPokemons, getPokemonById, getPokemonByName } from "./pokemonGet";

//types
import { getTypes } from "./types";

export {
  createPokemon,
  updatePokemon,
  pokemonDelete,
  getPokemons,
  getPokemonById,
  getPokemonByName,
  getTypes,
};
