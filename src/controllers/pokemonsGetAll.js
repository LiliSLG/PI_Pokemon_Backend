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

const pokemonsGetAll = async (getFromAPI, page, pageSize) => {
  let pokemonsMappedAPI = [];
  let pokemonsMappedDB = [];
  let allPokemons = [];
  let uniquePokemons = [];
  let totalPokemonsDB = 0;
  let totalPokemonsAPI = 0; 

  //por params viene como string
  if (getFromAPI === "true") {
    //busco solo en la api
    pokemonsMappedAPI = await getPokemonFromAPI(page, pageSize);
    allPokemons = [...pokemonsMappedAPI.pokemons];
  } else {
    [pokemonsMappedDB, pokemonsMappedAPI] = await Promise.all([
      getPokemonFromBD(page, pageSize),
      getPokemonFromAPI(page, pageSize),
    ]).catch((error) => console.warn(`Error en API o DB${error}`));

    totalPokemonsDB = pokemonsMappedDB.totalPokemons
      ? pokemonsMappedDB.totalPokemons
      : 0;
    totalPokemonsAPI = pokemonsMappedAPI.totalPokemons
      ? pokemonsMappedAPI.totalPokemons
      : 0;
    //no cargo los pokemons de la api que ya tengo guardados en la base de datos

    if (totalPokemonsDB === 0) {
      uniquePokemons = [...pokemonsMappedAPI.pokemons];
    } else if (totalPokemonsAPI === 0) {
      uniquePokemons = [...pokemonsMappedDB.pokemons];
    } else {
      uniquePokemons = [
        ...pokemonsMappedDB.pokemons,
        ...pokemonsMappedAPI.pokemons.filter(
          (apiPokemons) =>
            !pokemonsMappedDB.pokemons.find(
              (pokemons) => pokemons.idAPI === apiPokemons.id
            )
        ),
      ];
    }

    allPokemons = [...uniquePokemons];
  }

  allPokemons.sort((a, b) => a.name.localeCompare(b.name));

  return {
    pokemons: [...allPokemons],
    totalPokemonsDB: totalPokemonsDB,
    totalPokemonsAPI: totalPokemonsAPI,
  };
};

module.exports = {
  pokemonsGetAll,
};
