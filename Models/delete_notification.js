async function deleteAnnouncement(db, announcementId) {
  const sql = `DELETE FROM notifications WHERE id = ?`;

  try {
    const [result] = await db.execute(sql, [announcementId]);
    return result.affectedRows; // تعداد رکوردهای حذف شده
  } catch (error) {
    throw error;
  }
}

module.exports = deleteAnnouncement;
