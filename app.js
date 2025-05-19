const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//Routes
const userRoute = require('./src/routes/user.route');
const authRoute = require('./src/routes/auth.route');

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(userRoute);
app.use(authRoute);

module.exports = app;