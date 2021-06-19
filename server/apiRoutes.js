const express = require('express');

const movieRoutes = require('./movies/moviesRoutes.js');
const apiRouter = express.Router();

module.exports = () => apiRouter.use('/movie', movieRoutes());


