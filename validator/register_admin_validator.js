const Validator = require('fastest-validator');
const v = new Validator();

const adminSchema = {
  national_code: { type: "string", length: 10, pattern: /^[0-9]{10}$/, empty: false },
  first_name: { type: "string", min: 2, max: 50, empty: false },
  last_name: { type: "string", min: 2, max: 50, empty: false },
  username: { type: "string", min: 3, max: 50, empty: false },
  role: { type: "string", optional: true, enum: ["admin"], default: "admin" },
  password: { type: "string", min: 6, max: 25, empty: false },
  $$strict: true
};

const checkAdminRegistration = v.compile(adminSchema);

module.exports = checkAdminRegistration;
