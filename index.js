const express = require('express');
const cors = require('cors')
const port = 8000;
const router = require('./routes');

//process var
require('dotenv').config();

//db
const db = require('./config/mongoose');

const app = express();

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.urlencoded({ extended: true }));

//routes
app.use('/', router);

app.listen(port, () => {
    console.log('server is up and running on', port);
})