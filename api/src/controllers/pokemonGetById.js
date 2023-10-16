const { Pokemon, Type } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { pokemonMapFromAPI, pokemonMapFromDB } = require("../utils/mapPokemons");
const { API_URL } = process.env;

const pokemonGetById = async (id, source) => {
  const pokemon =
    source === "api"
      ? (await axios(`${API_URL}/pokemon/${id}`)).data //no uso el try catch aca porque el id seguro existe
      : await Pokemon.findByPk(id, {
          include: {
            model: Type,
            attributes: ["id", "name"],
          },
        });
  return source === "api"
    ? pokemonMapFromAPI([pokemon])[0]
    : pokemonMapFromDB([pokemon])[0];
};

module.exports = { pokemonGetById };
