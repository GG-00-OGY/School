const Validator = require('fastest-validator');
const v = new Validator();

const deleteClassSchema = {
  id: { type: "number", positive: true, integer: true },
  $$strict: true
};

const checkDeleteClass = v.compile(deleteClassSchema);

module.exports = checkDeleteClass;
