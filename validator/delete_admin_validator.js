const Validator = require('fastest-validator');
const v = new Validator();

const deleteAdminSchema = {
  national_code: { 
    type: "string", 
    empty: false, 
    length: 10, 
    pattern: /^\d{10}$/ // فقط ۱۰ رقم
  },
  $$strict: true
};

const checkDeleteAdmin = v.compile(deleteAdminSchema);

module.exports = checkDeleteAdmin;
