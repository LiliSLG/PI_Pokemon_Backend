const { Pokemon, Type } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { pokemonMapFromAPI, pokemonMapFromDB } = require("../utils/mapPokemons");
const { API_URL } = process.env;

const pokemonsGetAll = async () => {
  let pokemonsFromDB;
  let pokemonDataAPI;
  try {
    pokemonsFromDB = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["id", "name"],
      },
    });
  } catch (error) {
    pokemonsFromDB = [];
    // console.log("Error en la BDD");
  }
  try {
    const pokemonsRawFromAPI = await axios(`${API_URL}/pokemon?limit=12`);
    const pokemonURLRequestsAPI = pokemonsRawFromAPI.data?.results.map(
      (pokemon) => axios.get(pokemon.url)
    );
    const pokemonURLResponsesAPI = await Promise.all(pokemonURLRequestsAPI);
    pokemonDataAPI = pokemonURLResponsesAPI.map((response) => response.data);
  } catch (error) {
    pokemonDataAPI = [];
    // console.log("Error en la API");
  }
  const pokemonsMapedAPI = pokemonMapFromAPI(pokemonDataAPI);
  const pokemonsMapedDB = pokemonMapFromDB(pokemonsFromDB);
  return [...pokemonsMapedDB, ...pokemonsMapedAPI];
};

module.exports = {
  pokemonsGetAll,
};
