const saveTour = require('./../Models/register_tour');
const checkTour = require('./../validator/register_tour_validator');
const deleteTour = require('./../Models/delete_tour');
const checkDeleteTour = require('./../validator/delete_tour_validator');
const connectToDatabase = require('./../Config/db');

exports.registerTour = async (req, res) => {
  try {
    const db = await connectToDatabase();

    const validationResult = checkTour(req.body);
    if (validationResult !== true) {
      return res.status(422).json({ message: 'اطلاعات وارد شده معتبر نیست', errors: validationResult });
    }

    const newId = await saveTour(db, req.body);

    res.status(201).json({ message: 'اردو با موفقیت ثبت شد', id: newId });
  } catch (error) {
    console.error('خطا در ثبت اردو:', error);
    res.status(500).json({ message: 'خطای سرور در ثبت اردو' });
  }
};

exports.removeTour = async (req, res) => {
  try {
    const db = await connectToDatabase();

    const validationResult = checkDeleteTour(req.body);
    if (validationResult !== true) {
      return res.status(422).json({
        message: 'اطلاعات وارد شده معتبر نیست',
        errors: validationResult
      });
    }

    const affectedRows = await deleteTour(db, req.body.id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'اردویی با این شناسه یافت نشد' });
    }

    res.status(200).json({ message: 'اردو با موفقیت حذف شد' });
  } catch (error) {
    console.error('خطا در حذف اردو:', error);
    res.status(500).json({ message: 'خطای سرور در حذف اردو' });
  }
};

