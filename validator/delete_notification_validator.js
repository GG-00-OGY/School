const Validator = require('fastest-validator');
const v = new Validator();

const deleteAnnouncementSchema = {
  id: { type: "number", positive: true, integer: true },
  $$strict: true
};

const checkDeleteAnnouncement = v.compile(deleteAnnouncementSchema);

module.exports = checkDeleteAnnouncement;
