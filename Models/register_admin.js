const bcrypt = require('bcrypt');

async function saveAdminRegistration(db, data) {
  const sql = `
    INSERT INTO admins
    (national_code, first_name, last_name, username, role, password)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const values = [
    data.national_code,
    data.first_name,
    data.last_name,
    data.username,
    data.role || 'admin',
    hashedPassword
  ];

  try {
    const [result] = await db.execute(sql, values);
    return result.insertId;
  } catch (error) {
    throw error;
  }
}

module.exports = saveAdminRegistration;
