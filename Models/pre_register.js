async function savePreRegistration(db, data) {
  const sql = `
    INSERT INTO pre_registration 
    (first_name, last_name, elementary_school_name, sixth_grade_teacher_name, father_phone, mother_phone, home_phone, notes, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  const values = [
    data.first_name,
    data.last_name,
    data.elementary_school_name,
    data.sixth_grade_teacher_name,
    data.father_phone,
    data.mother_phone,
    data.home_phone,
    data.notes
  ];

  try {
    const [result] = await db.execute(sql, values);
    return result.insertId;  // برگرداندن آیدی رکورد جدید
  } catch (error) {
    throw error;
  }
}

module.exports = savePreRegistration;
