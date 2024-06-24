const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongodb = require("mongodb");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors()
);



// routers...
const fileRouter = require('./src/routers/file.routes');
const userRouter = require('./src/routers/user.routes');
const planRouter = require('./src/routers/plan.routes')
app.use('/api/user', userRouter);
app.use('/api/file', fileRouter);
app.use('/api/plan', planRouter);
module.exports = app;