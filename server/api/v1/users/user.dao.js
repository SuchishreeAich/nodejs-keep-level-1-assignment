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
                let user = {userName : data.username};
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
        let registeredUser;
        newUser.save((error,addedUser) => {
            if(error){
                
                if(error.message.includes('duplicate')){
                    registeredUser={userInfo:null};
                    reject({message : 'username is already exist',status : 403,user:registeredUser});
                }
                else{
                    registeredUser={userInfo:null};
                    reject({message : 'Registration Failure',status : 500,user:registeredUser});
                }
            }
            else{
                //console.log('register usersuccess: ');
                registeredUser={userInfo:addedUser.username};
                resolve({message : "Successfull register",status:201,user:registeredUser});
            }
        });
    });
};

module.exports = {
    loginUser,
    registerUser
}