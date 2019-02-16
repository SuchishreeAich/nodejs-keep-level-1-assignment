const userService = require('./user.service');

const loginUser = (userDetails) => {
    return userService.loginUser(userDetails);
}

const registerUser = (userDetails) => {
    // console.log('registeruser 2');
    return userService.registerUser(userDetails);
}

module.exports = {
    loginUser,
    registerUser
}