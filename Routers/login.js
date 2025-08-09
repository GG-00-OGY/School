const express = require('express');

const login_router = express.Router();
const login_admin = require('../Middlewares/loginAdmin');
const login_student = require('../Middlewares/loginStudent');
const login_teacher = require('../Middlewares/loginTeacher')

login_router.post("/admin/",login_admin);
login_router.post("/student/", login_student);
login_router.post('/teacher/', login_teacher)

module.exports = login_router;