// write your db connection code here
const mongoose = require('mongoose');
const { dbConfig } = require('../config').appConfig;

function createMongoConnection(){
    mongoose.connect(dbConfig.mongoUrl,{useNewUrlParser:true});
}

function getMongoConnection(){
    return mongoose.connection;
}

module.exports = {
    createMongoConnection,
    getMongoConnection
}