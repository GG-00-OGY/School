const saveStudentRegistration = require('./../Models/register_student');
const checkStudentRegistration = require('./../validator/register_student_validator');
const deleteStudent = require('./../Models/delete_student');
const { saveStudentClass } = require('../Models/students_class');
const { validateStudentClass } = require('../validator/add_to_class_validator');
const checkDeleteStudent = require('./../validator/delete_student_validator');
const connectToDatabase = require('./../Config/db');
const bcrypt = require('bcrypt');

exports.registerStudent = async (req, res) => {
  try {
    const db = await connectToDatabase();

    // اعتبارسنجی ورودی
    const validationResult = checkStudentRegistration(req.body);
    if (validationResult !== true) {
      return res.status(422).json({ message: "اطلاعات وارد شده معتبر نیست", errors: validationResult });
    }

    // هش کردن پسورد
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // داده‌ها را آماده می‌کنیم و پسورد هش شده را جایگزین می‌کنیم
    const studentData = {
      ...req.body,
      password: hashedPassword,
      role: 'student' // به طور پیش‌فرض نقش دانش‌آموز
    };

    // ذخیره در دیتابیس
    const newId = await saveStudentRegistration(db, studentData);

    res.status(201).json({ message: 'ثبت نام دانش‌آموز با موفقیت انجام شد', id: newId });

  } catch (error) {
    console.error('خطا در ثبت نام دانش‌آموز:', error);
    res.status(500).json({ message: 'خطای سرور در ثبت نام' });
  }
};

exports.removeStudent = async (req, res) => {
  try {
    const db = await connectToDatabase();

    const validationResult = checkDeleteStudent(req.body);
    if (validationResult !== true) {
      return res.status(422).json({
        message: 'اطلاعات وارد شده معتبر نیست',
        errors: validationResult
      });
    }

    const affectedRows = await deleteStudent(db, req.body.national_code);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'دانش‌آموزی با این کد ملی یافت نشد' });
    }

    res.status(200).json({ message: 'دانش‌آموز با موفقیت حذف شد' });
  } catch (error) {
    console.error('خطا در حذف دانش‌آموز:', error);
    res.status(500).json({ message: 'خطای سرور در حذف دانش‌آموز' });
  }
};

exports.getStudentProfile = async (req, res) => {
  try {
    const db = await connectToDatabase();

    // فرض: میدلور verifyTokenMiddleware داده رو تو req.user قرار داده
    const national_code = req.user.national_code;

    // جستجو در جدول دانش آموزان بر اساس national_code
    const [rows] = await db.query('SELECT id, first_name, last_name, father_name, mother_name, national_code, father_phone, mother_phone, home_phone, birth_date, photo_path, grade, school_year, class_name, debt FROM students WHERE national_code = ?', [national_code]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'دانش‌آموز یافت نشد' });
    }

    // اطلاعات دانش آموز
    const student = rows[0];

    res.json({ student });

  } catch (err) {
    console.error('خطا در دریافت پروفایل دانش‌آموز:', err);
    res.status(500).json({ message: 'خطای سرور' });
  }
};

exports.addStudentToClass = async (req, res) => {
    try {
        const { student_id, class_id, school_year } = req.body;

        // اجرای Validator
        const errors = await validateStudentClass({ student_id, class_id, school_year });
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        // ذخیره در دیتابیس
        const result = await saveStudentClass({ student_id, class_id, school_year });

        res.status(201).json({ 
            message: 'دانش‌آموز با موفقیت به کلاس اضافه شد', 
            insertId: result.insertId 
        });

    } catch (error) {
        console.error('خطا در افزودن دانش‌آموز به کلاس:', error);
        res.status(500).json({ message: 'خطای سرور' });
    }
};
