const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

//connect to db
mongoose.connect(`${process.env.DB_URL}`);

//get the db
const db = mongoose.connection;

db.on('error', console.log.bind(console, 'Error inconnecting db'));

db.once('open', () => {
    console.log('Connected to mongoDB');
});

module.exports = db;