const Validator = require('fastest-validator');
const v = new Validator();

const deleteStudentSchema = {
  national_code: { 
    type: "string", 
    empty: false, 
    length: 10, 
    pattern: /^\d{10}$/ // فقط ۱۰ رقم
  },
  $$strict: true
};

const checkDeleteStudent = v.compile(deleteStudentSchema);

module.exports = checkDeleteStudent;
