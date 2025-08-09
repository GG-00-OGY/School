const bcrypt = require('bcrypt');

async function saveTeacherRegistration(db, data) {
  const sql = `
    INSERT INTO teachers
    (first_name, last_name, national_code, role, password, photo_path)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const values = [
    data.first_name,
    data.last_name,
    data.national_code,
    data.role || 'teacher',
    hashedPassword,
    data.photo_path || null
  ];

  try {
    const [result] = await db.execute(sql, values);
    return result.insertId;
  } catch (error) {
    throw error;
  }
}

module.exports = saveTeacherRegistration;
