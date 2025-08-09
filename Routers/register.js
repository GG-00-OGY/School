const express = require('express');
const verifyTokenMiddleware = require('../Middlewares/verifyTokenMiddleware');
const roleAuthorizationMiddleware = require('../Middlewares/roleAuthorizationMiddleware');
const controller_register_student = require('../Controllers/controllers_student')
const controller_admin_register = require('../Controllers/controllers_admin')
const controller_register_teacher = require('../Controllers/controllers_teacher');
const controller_register_tour = require('../Controllers/controllers_tour');
const controller_register_class = require('../Controllers/controllers_class');
const controller_register_schedule = require('../Controllers/controlers_schedule');

const router_register = express.Router();

router_register.post("/student/", verifyTokenMiddleware, roleAuthorizationMiddleware(['admin']), controller_register_student.registerStudent);
router_register.post("/teacher/", verifyTokenMiddleware, roleAuthorizationMiddleware(['admin']), controller_register_teacher.registerTeacher);
router_register.post("/admin/", verifyTokenMiddleware, roleAuthorizationMiddleware(['admin']), controller_admin_register.registerAdmin),
router_register.post('/tour/', verifyTokenMiddleware, roleAuthorizationMiddleware(['admin']), controller_register_tour.registerTour);
router_register.post('/class/', verifyTokenMiddleware, roleAuthorizationMiddleware(['admin']) , controller_register_class.registerClass),
router_register.post('/schedule/' , verifyTokenMiddleware , roleAuthorizationMiddleware(['admin']) , controller_register_schedule.addTeacherSchedule)

module.exports = router_register;