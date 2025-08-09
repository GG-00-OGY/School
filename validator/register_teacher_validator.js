const Validator = require('fastest-validator');
const v = new Validator();

const teacherSchema = {
  first_name: { type: "string", min: 2, max: 50, empty: false },
  last_name: { type: "string", min: 2, max: 50, empty: false },
  national_code: { type: "string", length: 10, pattern: /^[0-9]{10}$/, empty: false },
  role: { type: "string", optional: true, enum: ["teacher"], default: "teacher" },
  password: { type: "string", min: 6, max: 255, empty: false },
  photo_path: { type: "string", optional: true, max: 255, empty: true },
  $$strict: true
};

const checkTeacherRegistration = v.compile(teacherSchema);

module.exports = checkTeacherRegistration;
