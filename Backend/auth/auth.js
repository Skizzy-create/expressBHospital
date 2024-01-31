const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// importing the data
const { users, usersName } = require('../data/data');

// importing the middlewares
const { userValid, isValidIdState, countRequests, countTime } = require('../utility/middlewares');

const jwtPassword = "1234567890";

router.use(express.json());
router.use(countRequests);
router.use(countTime);
router.use(userValid);

// need to passing the op in the query
router.post('/singin', function(req, res){
    const userName = req.body.userName;
    const password = req.body.password;

    var jwt = jwt.sign({userName: userName}, jwtPassword);
    return res.json({
        jwt: jwt
    });
});

module.exports = router;
