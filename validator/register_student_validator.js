const Validator = require('fastest-validator');
const v = new Validator();

const studentRegistrationSchema = {
  first_name: { type: "string", min: 2, max: 50, empty: false },
  last_name: { type: "string", min: 2, max: 50, empty: false },
  father_name: { type: "string", min: 2, max: 50, empty: false },
  mother_name: { type: "string", min: 2, max: 50, empty: false },
  national_code: { type: "string", length: 10, pattern: /^[0-9]{10}$/, empty: false },
  father_phone: { type: "string", length: 11, pattern: /^09\d{9}$/, empty: false },
  mother_phone: { type: "string", length: 11, pattern: /^09\d{9}$/, empty: false },
  home_phone: { type: "string", optional: true, min: 8, max: 15, pattern: /^\d+$/ },
  birth_date: { type: "date", convert: true, empty: false },
  password: { type: "string", min: 6, max: 255, empty: false },
  photo_path: { type: "string", optional: true, max: 255 },
  grade: { type: "string", optional: true, max: 20 },
  school_year: { type: "string", optional: true, max: 9 }, // مثل 1403-1404
  class_name: { type: "string", optional: true, max: 50 },
  debt: { type: "number", optional: true, integer: true, min: 0 },
  role: { type: "string", optional: true, empty: false, enum: ["student"] },
  $$strict: true
};

const checkStudentRegistration = v.compile(studentRegistrationSchema);

module.exports = checkStudentRegistration;
