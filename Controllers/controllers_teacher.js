const saveTeacherRegistration = require('./../Models/register_teacher');
const checkTeacherRegistration = require('./../validator/register_teacher_validator');
const deleteTeacher = require('./../Models/delete_teacher');
const checkDeleteTeacher = require('./../validator/delete_teacher_validator');
const connectToDatabase = require('./../Config/db');

exports.registerTeacher = async (req, res) => {
  try {
    const db = await connectToDatabase();

    const validationResult = checkTeacherRegistration(req.body);
    if (validationResult !== true) {
      return res.status(422).json({ message: 'اطلاعات وارد شده معتبر نیست', errors: validationResult });
    }

    const newId = await saveTeacherRegistration(db, req.body);

    res.status(201).json({ message: 'معلم با موفقیت ثبت شد', id: newId });
  } catch (error) {
    console.error('خطا در ثبت نام معلم:', error);
    res.status(500).json({ message: 'خطای سرور در ثبت نام معلم' });
  }
};

exports.removeTeacher = async (req, res) => {
  try {
    const db = await connectToDatabase();

    const validationResult = checkDeleteTeacher(req.body);
    if (validationResult !== true) {
      return res.status(422).json({
        message: 'اطلاعات وارد شده معتبر نیست',
        errors: validationResult
      });
    }

    const affectedRows = await deleteTeacher(db, req.body.national_code);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'معلمی با این کد ملی یافت نشد' });
    }

    res.status(200).json({ message: 'معلم با موفقیت حذف شد' });
  } catch (error) {
    console.error('خطا در حذف معلم:', error);
    res.status(500).json({ message: 'خطای سرور در حذف معلم' });
  }
};

exports.getTeacherProfile = async (req, res) => {
  try {
    const db = await connectToDatabase();

    // فرض: میدلور verifyTokenMiddleware داده رو تو req.user قرار داده
    const national_code = req.user.national_code;

    // جستجو در جدول معلم‌ها بر اساس national_code
    const [rows] = await db.query('SELECT id, first_name, last_name, national_code, role, photo_path FROM teachers WHERE national_code = ?', [national_code]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'معلم یافت نشد' });
    }

    // اطلاعات معلم
    const teacher = rows[0];

    res.json({ teacher });

  } catch (err) {
    console.error('خطا در دریافت پروفایل معلم:', err);
    res.status(500).json({ message: 'خطای سرور' });
  }
};


