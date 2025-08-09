const saveAdminRegistration = require('./../Models/register_admin');
const checkAdminRegistration = require('./../validator/register_admin_validator');
const deleteAdmin = require('./../Models/delete_admin');
const checkDeleteAdmin = require('./../validator/delete_admin_validator');
const connectToDatabase = require('./../Config/db');

exports.registerAdmin = async (req, res) => {
  try {
    const db = await connectToDatabase();

    const validationResult = checkAdminRegistration(req.body);
    if (validationResult !== true) {
      return res.status(422).json({ message: 'اطلاعات وارد شده معتبر نیست', errors: validationResult });
    }

    const newId = await saveAdminRegistration(db, req.body);

    res.status(201).json({ message: 'ادمین با موفقیت ثبت شد', id: newId });
  } catch (error) {
    console.error('خطا در ثبت نام ادمین:', error);
    res.status(500).json({ message: 'خطای سرور در ثبت نام ادمین' });
  }
};

exports.removeAdmin = async (req, res) => {
  try {
    const db = await connectToDatabase();

    const validationResult = checkDeleteAdmin(req.body);
    if (validationResult !== true) {
      return res.status(422).json({
        message: 'اطلاعات وارد شده معتبر نیست',
        errors: validationResult
      });
    }

    const affectedRows = await deleteAdmin(db, req.body.national_code);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'ادمینی با این کد ملی یافت نشد' });
    }

    res.status(200).json({ message: 'ادمین با موفقیت حذف شد' });
  } catch (error) {
    console.error('خطا در حذف ادمین:', error);
    res.status(500).json({ message: 'خطای سرور در حذف ادمین' });
  }
};
