const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const routes = require('./routes');

dotenv.config()

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("db connected"))
    .catch((e) => console.log(e))


app.use(cors());
app.use(express.json());
require('./config/passport')(app);

app.use(routes);

app.listen(process.env.PORT || 5000, () => {
    console.log('conected to port 5000')
})