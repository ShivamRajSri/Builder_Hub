const mongoose = require('mongoose');
function connectToDb() {
    mongoose.connect('Your Db address'
    ).then(() => {
        console.log('Connected to DB');
    }).catch(err => console.log(err));
}
module.exports = connectToDb;
