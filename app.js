const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();

//Routes
const userRoute = require('./src/routes/user.route');
const authRoute = require('./src/routes/auth.route');
const roomRoute = require('./src/routes/room.route');
const bookingRoute = require('./src/routes/booking.route');
const adminRoute = require('./src/routes/admin.route');

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use(userRoute);
app.use(authRoute);
app.use(roomRoute);
app.use(bookingRoute);
app.use(adminRoute);

module.exports = app;