const { Pokemon, Type } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { pokemonMapFromAPI, pokemonMapFromDB } = require("../utils/mapPokemons");
const { API_URL } = process.env;

const getPokemonFromAPI = async (page, pageSize) => {
  const offset = (page - 1) * pageSize; // Calculate the offset based on the current page
  const limit = pageSize; // Set the limit to the page size

  try {
    const response = await axios.get(`${API_URL}/pokemon`, {
      params: {
        offset,
        limit,
      },
    });

    const totalPokemons = response.data.count;
    const pokemonsRawURL = response.data.results.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonDataAPI = await Promise.all(pokemonsRawURL);

    return {
      pokemons: pokemonMapFromAPI(
        pokemonDataAPI.map((response) => response.data)
      ),
      totalPokemons,
    };
  } catch (error) {
    console.log("Error in API");
    return [];
  }
};

const getPokemonFromBD = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize; // Calculate the offset based on the current page
    const limit = pageSize; // Set the limit to the page size
    const [pokemonsFromDB, totalPokemons] = await Promise.all([
      Pokemon.findAll({
        include: {
          model: Type,
          attributes: ["id", "name"],
        },
        offset: offset,
        limit: limit,
      }),
      Pokemon.count(),
    ]);
    return {
      pokemons: pokemonMapFromDB(pokemonsFromDB),
      totalPokemons,
    };
  } catch (error) {
    console.log("Error en la BDD", error.message);
    return [];
  } 
};

const pokemonsGetAll = async (page, pageSize) => {
  const [pokemonsMappedDB, pokemonsMappedAPI] = await Promise.all([
    //uso el mismo page, pageSize para api y bdd. En algun momento se podria modificar
    //preguntar si totalPokemonsDB es < pageSize no buscar en la bdd
    getPokemonFromBD(page, pageSize),
    getPokemonFromAPI(page, pageSize),
  ]);
  return {
    pokemons: [...pokemonsMappedDB.pokemons, ...pokemonsMappedAPI.pokemons],
    totalPokemonsDB: pokemonsMappedDB.totalPokemons,
    totalPokemonsAPI: pokemonsMappedAPI.totalPokemons,
  };
};

module.exports = {
  pokemonsGetAll,
};
