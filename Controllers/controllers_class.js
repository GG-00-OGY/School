const saveClass = require('./../Models/register_class');
const checkClass = require('./../validator/register_class_validator');
const deleteClass = require('./../Models/delete_class');
const checkDeleteClass = require('./../validator/delete_class_validator');
const connectToDatabase = require('./../Config/db');

exports.registerClass = async (req, res) => {
  try {
    const db = await connectToDatabase();

    const validationResult = checkClass(req.body);
    if (validationResult !== true) {
      return res.status(422).json({ message: 'اطلاعات وارد شده معتبر نیست', errors: validationResult });
    }

    const newId = await saveClass(db, req.body);

    res.status(201).json({ message: 'کلاس با موفقیت ثبت شد', id: newId });
  } catch (error) {
    console.error('خطا در ثبت کلاس:', error);
    res.status(500).json({ message: 'خطای سرور در ثبت کلاس' });
  }
};

exports.removeClass = async (req, res) => {
  try {
    const db = await connectToDatabase();

    const validationResult = checkDeleteClass(req.body);
    if (validationResult !== true) {
      return res.status(422).json({
        message: 'اطلاعات وارد شده معتبر نیست',
        errors: validationResult
      });
    }

    const affectedRows = await deleteClass(db, req.body.id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'کلاسی با این شناسه یافت نشد' });
    }

    res.status(200).json({ message: 'کلاس با موفقیت حذف شد' });
  } catch (error) {
    console.error('خطا در حذف کلاس:', error);
    res.status(500).json({ message: 'خطای سرور در حذف کلاس' });
  }
};

