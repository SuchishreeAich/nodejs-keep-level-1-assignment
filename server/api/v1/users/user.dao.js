const userModule = require('./user.entity');
const uuidv1 = require('uuid/v1');

const loginUser = (userInfo) => {

    return new Promise((resolve,reject) => {
              
        userModule.findOne({'username' : userInfo.username}, (error,data) => {
            
            if(error){
                reject({message : 'Login failure',status : 500});
            }
            else if(!data){
                reject({message : 'You are not registered user',status : 403});
            }
            else if(data.password !== userInfo.password){
                reject({message : 'Password is incorrect',status : 403});
            }
            else{
                let user = {userId : data.userId,userName : data.username};
                resolve({message : 'Successfull login',status:200,user:user}); 
            }
        });
        
    });
};

const registerUser = (userInfo) => {
    //console.log('register user : ');
    return new Promise((resolve,reject) => {
        let newUser = new userModule();
        newUser.userId = uuidv1();
        newUser.username = userInfo.username;
        newUser.password = userInfo.password;
        newUser.save((error,addedUser) => {
            if(error){
                
                if(error.message.includes('duplicate')){
                    reject({message : 'username is already exist',status : 403});
                }
                else{
                    reject({message : 'Registration Failure',status : 500});
                }
            }
            else{
                //console.log('register usersuccess: ');
                let user={userInfo:addedUser.username};
                resolve({message : "Successfull register",status:201,user:user});
            }
        });
    });
};

module.exports = {
    loginUser,
    registerUser
}