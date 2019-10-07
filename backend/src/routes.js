const express = require('express');
const SessionController = require('./controllers/SessionController')
const routes = express.Router();
const User = require('./models/User');


routes.post('/sessions', SessionController.store);




module.exports = routes;