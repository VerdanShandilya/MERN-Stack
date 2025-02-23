const express = require('express');
const router = express.Router();  //instance of express router
const { loginuser, signupuser } = require('../controllers/usercontroller')

//login route
router.post('/', loginuser);


//signup routes
router.post('/signup', signupuser)

module.exports = router