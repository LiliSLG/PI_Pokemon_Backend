const { Router } = require('express');
const { typesHandlerGetAll } = require('../handlers/');

const typeRouter = Router();

typeRouter.get('/', typesHandlerGetAll);

module.exports = typeRouter;