const saveAnnouncement = require('./../Models/notifications');
const checkAnnouncement = require('./../validator/notifications_validator');
const connectToDatabase = require('./../Config/db');
const deleteAnnouncement = require('./../Models/delete_notification');
const checkDeleteAnnouncement = require('./../validator/delete_notification_validator');

exports.registerAnnouncement = async (req, res) => {
  try {
    const db = await connectToDatabase();

    const validationResult = checkAnnouncement(req.body);
    if (validationResult !== true) {
      return res.status(422).json({
        message: 'اطلاعات وارد شده معتبر نیست',
        errors: validationResult
      });
    }

    const newId = await saveAnnouncement(db, req.body);
    res.status(201).json({ message: 'اطلاعیه با موفقیت ثبت شد', id: newId });
  } catch (error) {
    console.error('خطا در ثبت اطلاعیه:', error);
    res.status(500).json({ message: 'خطای سرور در ثبت اطلاعیه' });
  }
};

exports.removeAnnouncement = async (req, res) => {
  try {
    const db = await connectToDatabase();

    const validationResult = checkDeleteAnnouncement(req.body);
    if (validationResult !== true) {
      return res.status(422).json({
        message: 'اطلاعات وارد شده معتبر نیست',
        errors: validationResult
      });
    }

    const affectedRows = await deleteAnnouncement(db, req.body.id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'اطلاعیه‌ای با این شناسه یافت نشد' });
    }

    res.status(200).json({ message: 'اطلاعیه با موفقیت حذف شد' });
  } catch (error) {
    console.error('خطا در حذف اطلاعیه:', error);
    res.status(500).json({ message: 'خطای سرور در حذف اطلاعیه' });
  }
};

