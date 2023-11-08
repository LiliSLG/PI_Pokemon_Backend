const { validatePokemon } = require("./validatePokemon");
const { validateType } = require("./validateType");
const { validatePagination } = require("./validatePagination");
const { validateUserLogin } = require("./validateUserLogin");
const { validateUser } = require("./validateUser");
const passport = require("./passport");

module.exports = {
  validatePokemon,
  validateType,
  validatePagination,
  passport,
  validateUserLogin,
  validateUser,
};
