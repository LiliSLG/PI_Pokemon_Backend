const { Type } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_URL } = process.env;

const typesGet = async () => {
  //busco en la BDD
  const dataBaseTypesRaw = await Type.findAll();
  const dataBaseTypes = dataBaseTypesRaw.map((type) => type.dataValues);

  if (dataBaseTypes.length === 0) {
    //los traigo de la API
    const apiTypesRaw = (await axios(`${API_URL}/type`)).data.results;
    const apiTypes = apiTypesRaw.map((type) => {
      return { name: type.name };
    });
    const allTypes = await Type.bulkCreate(apiTypes);
    // for (let i = 0; i < apiTypesRaw.length; i++) {
    //   await Type.findOrCreate({ where: { name: typeDB[i].name } }); }
    // const allTypes = await Type.findAll();
    return allTypes;
  }

  return dataBaseTypes;
};

module.exports = {
  typesGet,
};
