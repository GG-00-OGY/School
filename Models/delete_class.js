async function deleteClass(db, classId) {
  const sql = `DELETE FROM classes WHERE id = ?`;

  try {
    const [result] = await db.execute(sql, [classId]);
    return result.affectedRows; // تعداد رکوردهای حذف‌شده
  } catch (error) {
    throw error;
  }
}

module.exports = deleteClass;
