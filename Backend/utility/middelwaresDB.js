const mongoose = require("mongoose");
const { mongooseConnectionString } = require("./constants");
const schema = require("./schemas");
const { userDBschema } = require("../database/dataBaseFun");


function userValidDB(req, res, next){
    // used to check if the user is valid,
    // exists in the DB using the email
    const email = req.body.email;
    const useerValid = userDBschema.findOne({email: email});
    if ( useerValid != null ) {
        console.log("userValidDB called -user found");
        next();
    } else {
        console.log("userValidDB called -user not found");
        res.status(400).json({crash :"User not found"});
    }
}

module.exports = {
    userValidDB
}