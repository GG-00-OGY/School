async function saveStudentRegistration(db, data) {
  const sql = `
    INSERT INTO students
    (first_name, last_name, father_name, mother_name, national_code, father_phone, mother_phone, home_phone, birth_date, password, photo_path, grade, school_year, class_name, debt, role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // هش کردن پسورد باید قبل از این تابع انجام شود، پس فرض میکنیم data.password هش شده است.
  // اگر خواستی خود تابع این کارو انجام بده بگو.

  const values = [
    data.first_name,
    data.last_name,
    data.father_name || null,
    data.mother_name || null,
    data.national_code,
    data.father_phone || null,
    data.mother_phone || null,
    data.home_phone || null,
    data.birth_date || null,
    data.password,        // هش شده فرض میشه
    data.photo_path || null,
    data.grade || null,
    data.school_year || null,
    data.class_name || null,
    data.debt || 0,
    data.role || 'student'
  ];

  try {
    const [result] = await db.execute(sql, values);
    return result.insertId;  // برگرداندن آیدی دانش‌آموز جدید
  } catch (error) {
    throw error;
  }
}

module.exports = saveStudentRegistration;
