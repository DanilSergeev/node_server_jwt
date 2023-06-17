require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors');
const sequelize = require("./db")
const models = require("./models/models.js")
const cookieParser = require('cookie-parser');
const fileupload = require("express-fileupload")
const path = require("path")
const router = require('./router/index')
const errorMiddleware = require('./middlware/error-middlware');


const PORT = process.env.PORT || 5000 


app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(cookieParser());
app.use(fileupload({}))
app.use('/api', router);
app.use(express.static(path.resolve(__dirname,"static")))

app.use(errorMiddleware);


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start()
