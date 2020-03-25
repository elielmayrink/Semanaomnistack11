const express = require('express');
const ongController = require('./controller/ongController');
const incidentController = require('./controller/incidentController');
const profileController = require('./controller/profileController');
const session = require('./controller/sessionsController');
const routes = express.Router();

routes.post("/session", session.create);

routes.get('/ongs', ongController.index)
routes.post('/ongs', ongController.create)

routes.get('/profile', profileController.index)

routes.get('/incedents', incidentController.index)
routes.post('/incedents', incidentController.create)
routes.delete('/incedents/:id', incidentController.delete)

module.exports = routes;