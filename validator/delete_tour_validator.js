const Validator = require('fastest-validator');
const v = new Validator();

const deleteTourSchema = {
  id: { type: "number", positive: true, integer: true },
  $$strict: true
};

const checkDeleteTour = v.compile(deleteTourSchema);

module.exports = checkDeleteTour;
