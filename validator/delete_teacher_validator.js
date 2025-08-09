const Validator = require('fastest-validator');
const v = new Validator();

const deleteTeacherSchema = {
  national_code: { 
    type: "string", 
    empty: false, 
    length: 10, 
    pattern: /^\d{10}$/ // فقط ۱۰ رقم
  },
  $$strict: true
};

const checkDeleteTeacher = v.compile(deleteTeacherSchema);

module.exports = checkDeleteTeacher;
