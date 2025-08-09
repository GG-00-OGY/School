const saveTeacherSchedule = require('./../Models/register_schedule');
const scheduleValidator = require('./../validator/schedule_validator');
const connectToDatabase = require('./../Config/db');

exports.addTeacherSchedule = async (req, res) => {
  try {
    const db = await connectToDatabase();

    const validationResult = scheduleValidator(req.body);
    if (validationResult !== true) {
      return res.status(422).json({ message: "داده‌ها معتبر نیستند", errors: validationResult });
    }

    const newId = await saveTeacherSchedule(db, req.body);
    res.status(201).json({ message: "برنامه کاری معلم با موفقیت ثبت شد", schedule_id: newId });

  } catch (error) {
    console.error('خطا در ثبت برنامه کاری:', error);
    res.status(500).json({ message: "خطای سرور" });
  }
};
