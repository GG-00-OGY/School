const savePreRegistration = require('./../Models/pre_register');
const Pre_Valid = require('./../validator/pre_validator');
const connectToDatabase = require('./../Config/db');

exports.pre_register = async (req, res) => {
    try {
        let db = await connectToDatabase();
        const validationRuslte = Pre_Valid(req.body);
        console.log(validationRuslte);

        if (validationRuslte === true) {
            const newId = await savePreRegistration(db, req.body);
            res.status(201).json({ message: 'پیش ثبت‌نام با موفقیت ثبت شد', id: newId });
        } else {
            return res.status(422).json({ massage: "Data is not valid!" });
        }
    } catch (error) {
        console.error('err in pre register : ', error);
        res.status(500).json({ message: 'خطا در ثبت اطلاعات' });
    }
};

exports.getAllPreRegistrations = async (req, res) => {
  try {
    const db = await connectToDatabase();

    // گرفتن همه رکوردهای پیش ثبت نام
    const [rows] = await db.query('SELECT * FROM pre_registration ORDER BY created_at DESC');

    res.json({ preRegistrations: rows });
  } catch (err) {
    console.error('خطا در دریافت لیست پیش ثبت نام:', err);
    res.status(500).json({ message: 'خطای سرور' });
  }
};
