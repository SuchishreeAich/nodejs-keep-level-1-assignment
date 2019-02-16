const userDAO = require('./user.dao');

const loginUser = (userDetails) => {
    return userDAO.loginUser(userDetails);
}

const registerUser = (userDetails) => {
    // console.log('register 3');
    return userDAO.registerUser(userDetails);
}

module.exports = {
    loginUser,
    registerUser
}