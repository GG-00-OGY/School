const express = require('express');
const verifyTokenMiddleware = require('../Middlewares/verifyTokenMiddleware');
const roleAuthorizationMiddleware = require('../Middlewares/roleAuthorizationMiddleware');
const controller_notifications = require('../Controllers/controllers_notifications');


const router_notif = express.Router();

router_notif.post("/notifications/", verifyTokenMiddleware, roleAuthorizationMiddleware(['admin','teacher']), controller_notifications.registerAnnouncement);

module.exports = router_notif;