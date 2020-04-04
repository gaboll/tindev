const express = require('express');
const DevController = require('./database/controllers/DevController');
const LikeController = require('./database/controllers/LikeController');
const DislikeController = require('./database/controllers/DislikeController');

const routes = express.Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.post('/devs/:devId/like', LikeController.store);
routes.post('/devs/:devId/dislike', DislikeController.store);

module.exports = routes;