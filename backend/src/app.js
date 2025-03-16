const express = require('express');
const app = express();
const logReq = require('./middlewares/log.middleware')

const cors = require('cors')
const cookieParser = require('cookie-parser');

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use(logReq)

// importing routers
const userRoute = require('./routes/user.routes')
app.use('/todo/api/v1/users',userRoute);

module.exports = app