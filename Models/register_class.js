async function saveClass(db, data) {
  const sql = `
    INSERT INTO classes
    (class_name, school_year, student_count)
    VALUES (?, ?, ?)
  `;

  const values = [
    data.class_name,
    data.school_year,
    data.student_count
  ];

  try {
    const [result] = await db.execute(sql, values);
    return result.insertId;
  } catch (error) {
    throw error;
  }
}

module.exports = saveClass;
