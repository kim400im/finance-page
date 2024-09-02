require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = 'mongodb://root:root@localhost:27017/admin';

mongoose.connect(mongoURI, {
    dbName: 'nodejs',
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch(err => {
    console.error('MongoDB connection error', err);
});

module.exports = mongoose