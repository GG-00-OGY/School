async function saveTeacherSchedule(db, data) {
  const sql = `
    INSERT INTO weekly_schedule 
    (teacher_id, teacher_name, day_of_week, start_time, end_time, student_count, class_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.teacher_id,
    data.teacher_name,
    data.day_of_week,
    data.start_time,
    data.end_time,
    data.student_count,
    data.class_id
  ];

  try {
    const [result] = await db.execute(sql, values);
    return result.insertId;  // برگرداندن آیدی برنامه کاری جدید
  } catch (error) {
    throw error;
  }
}

module.exports = saveTeacherSchedule;
