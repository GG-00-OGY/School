const express = require('express');
const verifyTokenMiddleware = require('../Middlewares/verifyTokenMiddleware');
const roleAuthorizationMiddleware = require('../Middlewares/roleAuthorizationMiddleware');
const controllers_delete_student = require('../Controllers/controllers_student');
const controllers_delete_teacher = require('../Controllers/controllers_teacher');
const controllers_delete_class = require('../Controllers/controllers_class');
const controllers_delete_admin = require('../Controllers/controllers_admin');
const controllers_delete_tour = require('../Controllers/controllers_tour');
const controllers_delete_notification = require('../Controllers/controllers_notifications');
const routers_delete = express.Router();

routers_delete.delete("/student/",verifyTokenMiddleware , roleAuthorizationMiddleware(['admin']) , controllers_delete_student.removeStudent);
routers_delete.delete("/teacher/",verifyTokenMiddleware , roleAuthorizationMiddleware(['admin']) , controllers_delete_teacher.removeTeacher);
routers_delete.delete("/class/",verifyTokenMiddleware , roleAuthorizationMiddleware(['admin']) , controllers_delete_class.removeClass);
routers_delete.delete("/tour/",verifyTokenMiddleware , roleAuthorizationMiddleware(['admin']) , controllers_delete_tour.removeTour);
routers_delete.delete("/admin/",verifyTokenMiddleware , roleAuthorizationMiddleware(['admin']) , controllers_delete_admin.removeAdmin);
routers_delete.delete("/notification/",verifyTokenMiddleware , roleAuthorizationMiddleware(['admin']) , controllers_delete_notification.removeAnnouncement);

module.exports = routers_delete;