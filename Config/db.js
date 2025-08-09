const mysql = require('mysql2/promise');
require('dotenv').config();

// تابعی برای ایجاد اتصال به دیتابیس
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.HOST_DB,       
      user: process.env.USER_DB,            
      password: process.env.PASSWORD_DB, 
      database: process.env.DATABASE_NAME, 
      port: process.env.PORT_DATABASE
    });

    console.log(' MySQL connected!');
    return connection;
  } catch (error) {
    console.error('MySQL not connected!', error.message);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
