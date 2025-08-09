const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connectToDatabase = require('./../Config/db');

const JWT_SECRET = process.env.JWT_SECRET;

async function loginStudent(req, res) {
    try {
        const db = await connectToDatabase();
        const { national_code, password } = req.body;

        if (!national_code || !password) {
            return res.status(400).json({ message: 'نام کاربری و رمز عبور الزامی است' });
        }

        const [rows] = await db.query('SELECT national_code, password, role FROM students WHERE national_code = ?', [national_code]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'دانش‌آموز یافت نشد' });
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'نام کاربری یا رمز عبور اشتباه است' });
        }

        const token = jwt.sign(
            { national_code: user.national_code, role: user.role || 'student' },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.clearCookie('token');
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        });

        res.json({ message: 'ورود دانش‌آموز موفقیت‌آمیز بود', role: user.role || 'student' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'خطای سرور' });
    }
}

module.exports = loginStudent;
