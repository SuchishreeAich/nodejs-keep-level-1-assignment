const router = require('express').Router();

//write your routes here
router.use('/users',require('./users'));

router.use('/notes',require('./notes'));

module.exports = router;