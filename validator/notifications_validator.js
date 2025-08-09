const Validator = require('fastest-validator');
const v = new Validator();

const announcementSchema = {
  class_id: { type: "number", positive: true, integer: true },
  title: { type: "string", min: 3, max: 255, empty: false },
  message: { type: "string", min: 1, empty: false },
  teacher_id: { type: "number", positive: true, integer: true },
  is_active: { type: "number", enum: [0, 1] }, // 0=غیرفعال ، 1=فعال
  $$strict: true
};

const checkAnnouncement = v.compile(announcementSchema);

module.exports = checkAnnouncement;
