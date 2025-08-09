const Validator = require('fastest-validator');
const v = new Validator();

const classSchema = {
  class_name: { type: "string", min: 2, max: 50, empty: false },
  school_year: { type: "string", pattern: /^\d{4}\/\d{4}$/, empty: false },  // مثلا "1403/1404"
  student_count: { type: "number", positive: true, integer: true },
  $$strict: true
};

const checkClass = v.compile(classSchema);

module.exports = checkClass;
