const { Pokemon, Type } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { pokemonMapDetailFromAPI } = require("../utils/mapPokemons");
const { API_URL } = process.env;

const pokemonsGetByNameInAPI = async (names) => {
  const myArrayNames = names.split(",");
  try {
    const pokemonsToSearch = myArrayNames.map((name) =>
      axios.get(`${API_URL}/pokemon/${name}`)
    );

    const pokemonsDataAPI = await Promise.all(pokemonsToSearch);

    return {
      pokemons: pokemonMapDetailFromAPI(
        pokemonsDataAPI.map((response) => response.data)
      ),
    };
  } catch (error) {
    console.log("Error in API");
    return [];
  }
};

module.exports = {
  pokemonsGetByNameInAPI,
};
