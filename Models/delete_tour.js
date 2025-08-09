async function deleteTour(db, tourId) {
  const sql = `DELETE FROM tours WHERE id = ?`;

  try {
    const [result] = await db.execute(sql, [tourId]);
    return result.affectedRows; // تعداد رکوردهای حذف شده
  } catch (error) {
    throw error;
  }
}

module.exports = deleteTour;
