const express = require('express');

const verifyTokenMiddleware = require('../Middlewares/verifyTokenMiddleware');
const roleAuthorizationMiddleware = require('../Middlewares/roleAuthorizationMiddleware');
const controllers_student = require('../Controllers/controllers_student'); 
const controllers_teacher = require('../Controllers/controllers_teacher'); 

const routers_get = express.Router();

routers_get.get('/student/' , verifyTokenMiddleware , roleAuthorizationMiddleware(['student' , 'admin']) , controllers_student.getStudentProfile)
routers_get.get('/teacher/' , verifyTokenMiddleware , roleAuthorizationMiddleware(['teacher' , 'admin']) , controllers_teacher.getTeacherProfile)

module.exports = routers_get;