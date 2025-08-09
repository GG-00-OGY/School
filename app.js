require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const pre_register = require('./Routers/pre_register');
const login = require('./Routers/login');
const register = require('./Routers/register');
const notifications = require('./Routers/notifications');
const delete_a = require('./Routers/delete');
const get_data = require('./Routers/get_data');
const add_to_class = require('./Routers/add_to_class');

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/pre/', pre_register);
app.use("/login/", login);
app.use('/register/', register);
app.use('/send/', notifications)
app.use('/delete/' , delete_a);
app.use('/dashbord/' , get_data);
app.use('/add-to-class/' , add_to_class);

app.use((req, res) => {
  res.status(404).send('خطای 404: این صفحه یافت نشد!');
});

module.exports = app;