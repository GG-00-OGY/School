const connectToDatabase = require('../Config/db');

async function saveStudentClass(data) {
    const db = await connectToDatabase();

    const query = `
        INSERT INTO student_class (student_id, class_id, school_year)
        VALUES (?, ?, ?)
    `;
    const values = [data.student_id, data.class_id, data.school_year];

    const [result] = await db.query(query, values);
    return result;
}

async function studentExists(student_id) {
    const db = await connectToDatabase();
    const [rows] = await db.query('SELECT id FROM students WHERE id = ?', [student_id]);
    return rows.length > 0;
}

async function classExists(class_id) {
    const db = await connectToDatabase();
    const [rows] = await db.query('SELECT id FROM classes WHERE id = ?', [class_id]);
    return rows.length > 0;
}

module.exports = { saveStudentClass, studentExists, classExists };
