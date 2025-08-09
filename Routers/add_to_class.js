const express = require('express');
const verifyTokenMiddleware = require('../Middlewares/verifyTokenMiddleware');
const roleAuthorizationMiddleware = require('../Middlewares/roleAuthorizationMiddleware');
const controller_add_to_class = require('../Controllers/controllers_student');

const router_add = express.Router();

router_add.post("/student/", verifyTokenMiddleware, roleAuthorizationMiddleware(['admin']), controller_add_to_class.addStudentToClass);

module.exports = router_add;