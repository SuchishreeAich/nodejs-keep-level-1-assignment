// const { serverConfig } = require('./config').appConfig;
const db = require('./db');
/* Replace undefined with Require of your Mongoose connection initialization method */
const initializeMongooseConnection = () => {
	db.createMongoConnection();
	db.getMongoConnection();
};
/* Replace undefined with Require of your note entity*/
const noteModel = require('./api/v1/notes/notes.entity');
/* Replace undefined with Require of your user entity*/
const userModel = require('./api/v1/users/user.entity');

module.exports = {
	initializeMongooseConnection,
	noteModel,
	userModel
}