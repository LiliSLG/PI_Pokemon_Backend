const axios = require("axios");
require("dotenv").config();
const { Pokemon, PokemonName } = require("../db");
const { pokemonMapNames } = require("../utils/mapPokemons");
const { API_URL } = process.env;

const pokemonsGetAllByNames = async (name) => {
  //funcion para cargar los nombres de los pokemones , porque la api solo busca por nombre completo, no parcial
  //busco los nombres en la BDD
  const pokemonsNames = await PokemonName.findAll({ attributes: ["name"] });
  if (pokemonsNames.length === 0) {
    //busco todos los nombres de la API
    const pokemonsRawFromAPI = await axios(`${API_URL}/pokemon?limit=900`); //limite para que traiga a todos los pokemones
    const pokemonURLRequestsAPI = pokemonsRawFromAPI.data?.results.map(
      (pokemon) => axios.get(pokemon.url)
    );
    const pokemonUrlResponsesAPI = await Promise.all(pokemonURLRequestsAPI);
    const pokemonDataFromAPI = pokemonUrlResponsesAPI.map(
      (response) => response.data
    );
    const pokemonsByNameFromAPI = pokemonMapNames(pokemonDataFromAPI);
    await PokemonName.bulkCreate(pokemonsByNameFromAPI);
  }
  const pokemonsByNameFromDB = await Pokemon.findAll({ attributes: ["name"] }); //agrego los pokemons creados

  return [pokemonsByNameFromDB];
};

module.exports = { pokemonsGetAllByNames };
