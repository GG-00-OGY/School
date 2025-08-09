async function saveTour(db, data) {
  const sql = `
    INSERT INTO tours
    (tour_name, tour_address, cost, capacity, remaining_capacity, tour_date, grade)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.tour_name,
    data.tour_address,
    data.cost,
    data.capacity,
    data.remaining_capacity ?? data.capacity, // اگر remaining_capacity ارسال نشد، برابر capacity بذار
    data.tour_date,
    data.grade
  ];

  try {
    const [result] = await db.execute(sql, values);
    return result.insertId;
  } catch (error) {
    throw error;
  }
}

module.exports = saveTour;
