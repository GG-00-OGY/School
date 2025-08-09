const express = require('express');

const pre_register_routers = express.Router();
const verifyTokenMiddleware = require('../Middlewares/verifyTokenMiddleware');
const roleAuthorizationMiddleware = require('../Middlewares/roleAuthorizationMiddleware');
const controller_pre_register = require('./../Controllers/controllers_pre');

pre_register_routers.post('/pre-register', controller_pre_register.pre_register);
pre_register_routers.get('/all/pre-register', verifyTokenMiddleware , roleAuthorizationMiddleware(['admin']) , controller_pre_register.getAllPreRegistrations)
module.exports = pre_register_routers;