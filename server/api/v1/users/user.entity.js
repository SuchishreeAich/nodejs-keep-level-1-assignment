const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId : {
        type : String,
        require : true
    },
    username : {
        type : String,
        unique : true,
        require : true
    },
    password : {
        type : String,
        require : true
    }
});

module.exports = mongoose.model('user',UserSchema);