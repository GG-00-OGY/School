const { studentExists, classExists } = require('../Models/students_class');

async function validateStudentClass(data) {
    const errors = [];

    // 1. بررسی خالی نبودن فیلدها
    if (!data.student_id) errors.push('شناسه دانش‌آموز الزامی است');
    if (!data.class_id) errors.push('شناسه کلاس الزامی است');
    if (!data.school_year) errors.push('سال تحصیلی الزامی است');

    // اگر همینجا خطا داریم، نیازی به ادامه نیست
    if (errors.length > 0) return errors;

    // 2. بررسی فرمت سال تحصیلی
    const schoolYearRegex = /^\d{4}-\d{4}$/;
    if (!schoolYearRegex.test(data.school_year)) {
        errors.push('فرمت سال تحصیلی معتبر نیست (مثال: 1403-1404)');
    }

    // 3. بررسی وجود دانش‌آموز
    const isStudentValid = await studentExists(data.student_id);
    if (!isStudentValid) {
        errors.push('دانش‌آموز یافت نشد');
    }

    // 4. بررسی وجود کلاس
    const isClassValid = await classExists(data.class_id);
    if (!isClassValid) {
        errors.push('کلاس یافت نشد');
    }

    return errors;
}

module.exports = { validateStudentClass };
