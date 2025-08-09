async function saveAnnouncement(db, data) {
  const sql = `
    INSERT INTO notifications
    (class_id, title, message, teacher_id, created_at, is_active)
    VALUES (?, ?, ?, ?, NOW(), ?)
  `;

  const values = [
    data.class_id,
    data.title,
    data.message,
    data.teacher_id,
    data.is_active
  ];

  try {
    const [result] = await db.execute(sql, values);
    return result.insertId;
  } catch (error) {
    throw error;
  }
}

module.exports = saveAnnouncement;
