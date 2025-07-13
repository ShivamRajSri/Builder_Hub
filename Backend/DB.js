const mongoose = require('mongoose');
function connectToDb() {
    mongoose.connect('mongodb://localhost:27017/Shop'
    ).then(() => {
        console.log('Connected to DB');
    }).catch(err => console.log(err));
}
module.exports = connectToDb;