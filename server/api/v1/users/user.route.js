const router = require('express').Router();
const userCtrl = require('./user.controller');


//login users
router.post('/login',(req,res) => {   
    userCtrl.loginUser(req.body).then((response) => {
        res.status(response.status).send(response);
    }).catch((error) => {
        res.status(error.status).send(error);
    }); 
});

//register users
router.post('/register',(req,res) => {   
    // console.log('registeruser');
    userCtrl.registerUser(req.body).then((response) => {
        res.status(response.status).send(response.user);
    }).catch((error) => {
        res.status(error.status).send(error);
    });
});

router.get('/',(req,res) =>{
    res.send('Users');
});

module.exports = router;