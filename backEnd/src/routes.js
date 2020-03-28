const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const ongController = require('./controller/ongController');
const incidentController = require('./controller/incidentController');
const profileController = require('./controller/profileController');
const session = require('./controller/sessionsController');
const routes = express.Router();

routes.post("/session", session.create);

routes.get('/ongs', ongController.index)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), ongController.create)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), profileController.index)

routes.get('/incedents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), incidentController.index)
routes.post('/incedents', incidentController.create)
routes.delete('/incedents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), incidentController.delete)

module.exports = routes;