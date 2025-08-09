const Validator = require('fastest-validator');
const v = new Validator();

const scheduleSchema = {
  teacher_id: { type: "number", integer: true, positive: true },
  teacher_name: { type: "string", min: 3, max: 100 },
  day_of_week: { type: "enum", values: ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'] },
  start_time: { type: "string", pattern: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/ },  // فرمت hh:mm:ss
  end_time: { type: "string", pattern: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/ },
  student_count: { type: "number", integer: true, min: 0 },
  class_id: { type: "number", integer: true, positive: true },
  $$strict: true
};

const checkSchedule = v.compile(scheduleSchema);
module.exports = checkSchedule;
