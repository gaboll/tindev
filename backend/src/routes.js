const express = require('express');
const DevController = require('./database/controllers/DevController');
const LikeController = require('./database/controllers/LikeController');

const routes = express.Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.post('/devs/:devId/like', LikeController.store)

module.exports = routes;