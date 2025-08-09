async function deleteTeacher(db, nationalCode) {
  const sql = `DELETE FROM teachers WHERE national_code = ?`;

  try {
    const [result] = await db.execute(sql, [nationalCode]);
    return result.affectedRows; // تعداد رکوردهای حذف‌شده
  } catch (error) {
    throw error;
  }
}

module.exports = deleteTeacher;
