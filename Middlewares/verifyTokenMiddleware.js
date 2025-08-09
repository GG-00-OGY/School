const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;


function verifyTokenMiddleware(req, res, next) {
    const token = req.cookies.token; // فرض می‌کنیم کوکی با نام 'token' ذخیره شده
    
    if (!token) {
       
        return res.status(401).json({ message: 'لطفاً ابتدا وارد شوید' });
        // یا اگر بخوای هدایت کن:
        // return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        req.user = decoded; // اطلاعات توکن رو به req.user میدیم برای استفاده در میدلور بعدی
        next();
    } catch (err) {
        return res.status(401).json({ message: 'توکن نامعتبر است، لطفاً دوباره وارد شوید' });
        // یا ریدایرکت به لاگین
    }
}

module.exports = verifyTokenMiddleware;
