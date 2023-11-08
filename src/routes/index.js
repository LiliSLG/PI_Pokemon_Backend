const express = require('express');
const pokemonRouter = require('./pokemonRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', pokemonRouter);
router.use('/type', typeRouter);
router.use('/user', userRouter);

module.exports = router;
