// This file contains all the middleware functions
// check the structure.txt for info on the file structure.

const { users, bones, calculateMaxHealth } = require('../data/userData');

// no need to get the info from the req.body
// but we need to get the id from the req.query
// so info from req.body is automatically accessible
// but we need to get the info from req.query
function userValid(req, res, next){
    const id = req.query.id;
    if(id >= 0 && id < users.length){
        next();
    }else{
        res.status(404).send("User not found");
    }
}

function validOrgan(req, res, next){
    if(organ == "heart" || organ == "kidney" || organ == "bones"){
        next();
    }else{
        res.status(404).send("Organ not found");
    }
}

// function to count the total number of requests, made to the server
function countRequests(req, res, next){
    count++;
    console.log("number of request :" + count);
    next();
}

// count variable to count the total number of requests
var count = 0;

// funtion to count the time taken by the server to respond
function countTime(req, res, next){
    const start = new Date().getTime();
    next();
    const end = new Date().getTime();
    console.log(end - start);
}

module.exports = {
    userValid,
    validOrgan,
    countRequests,
    countTime,
    count
};