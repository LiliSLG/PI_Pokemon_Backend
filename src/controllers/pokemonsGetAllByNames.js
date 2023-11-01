const axios = require("axios");
require("dotenv").config();
const { Pokemon, PokemonName } = require("../db");
const { Sequelize } = require("sequelize");
const { pokemonMapNames } = require("../utils/mapPokemons");
const { API_URL } = process.env;

const pokemonsGetAllByNames = async () => {
  // Retrieves all pokemons by their names.
  let pokemonsByNameFromAPI = await PokemonName.findAll({
    attributes: ["name", [Sequelize.literal("false"), "created"]],
  });
  if (pokemonsByNameFromAPI.length === 0) {
    for (let index = 0; index <= 200; index++) {
      const offset = index * 100 + 1; // Calculate the offset based on the current page
      const limit = 100; // Set the limit to the page size

      const pokemonsRawFromAPI = await axios.get(`${API_URL}/pokemon`, {
        params: {
          offset,
          limit,
        },
      });
      const pokemonURLRequestsAPI = pokemonsRawFromAPI.data?.results.map(
        (pokemon) => axios.get(pokemon.url)
      );
      const pokemonUrlResponsesAPI = await Promise.all(pokemonURLRequestsAPI);
      const pokemonDataFromAPI = pokemonUrlResponsesAPI.map(
        (response) => response.data
      );
      const sortedPokemonsFromAPI = pokemonMapNames(pokemonDataFromAPI).sort(
        (a, b) => a.name.localeCompare(b.name) // Sort by name in ascending order
      );
      await PokemonName.bulkCreate(sortedPokemonsFromAPI);
    }
  }
  pokemonsByNameFromAPI = await PokemonName.findAll({
    attributes: ["name", [Sequelize.literal("false"), "created"]],
  });
  const pokemonsByNameFromDB = await Pokemon.findAll({
    attributes: ["name", [Sequelize.literal("true"), "created"]],
  });
  const sortedPokemons = [
    ...pokemonsByNameFromDB,
    ...pokemonsByNameFromAPI,
  ].sort((a, b) => a.name.localeCompare(b.name));
  return sortedPokemons;
};

module.exports = { pokemonsGetAllByNames };
