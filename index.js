const express = require('express');
const port = 8000;
const router = require('./routes');

//process var
require('dotenv').config();

//db
const db = require('./config/mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }));

//routes
app.use('/', router);

app.listen(port, () => {
    console.log('server is up and running on', port);
})