const Validator = require('fastest-validator');
const v = new Validator();

const tourSchema = {
  tour_name: { type: "string", min: 3, max: 100, empty: false },
  tour_address: { type: "string", min: 5, max: 255, empty: false },
  cost: { type: "number", positive: true, integer: true },
  capacity: { type: "number", positive: true, integer: true },
  remaining_capacity: { type: "number", positive: true, integer: true, optional: true },
  tour_date: { type: "date", convert: true },
  grade: { type: "string", min: 1, max: 20, empty: false },
  $$strict: true
};

const checkTour = v.compile(tourSchema);

module.exports = checkTour;
