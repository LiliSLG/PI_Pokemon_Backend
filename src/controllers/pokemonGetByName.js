const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
require("dotenv").config();
const { pokemonMapFromAPI, pokemonMapFromDB } = require("../utils/mapPokemons");
const { API_URL } = process.env;

const searchByNameInAPI = async (name) => {
  //separo esta funcion porque la api solo busca por nombre completo, no parcial
  //cuando no encuentra el nombre en la api da error, y lo capturo con el catch
  try {
    const pokemonFromAPI = (
      await axios(`${API_URL}/pokemon/${name}`)
    ).data;
    return pokemonMapFromAPI([pokemonFromAPI]);
  } catch (error) {
    return [];
  }
};
const pokemonGetByName = async (name) => {
  const nameToLowerCase = name.toLowerCase();
  const pokemonsFromDB = await Pokemon.findAll({
    where: {
      name: { [Op.iLike]: `%${nameToLowerCase}%` },
    },
    include: {
      model: Type,
      attributes: ["name"],
    },
  });
  const filteredInDBMapped = pokemonMapFromDB(pokemonsFromDB);
  const filteredInAPIMapped = await searchByNameInAPI(nameToLowerCase);
  return [...filteredInDBMapped, ...filteredInAPIMapped];
};

module.exports = { pokemonGetByName };
