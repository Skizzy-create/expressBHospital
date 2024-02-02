// This file contains all the middleware functions
// check the structure.txt for info on the file structure.

const express = require('express');
const { bones, calculateMaxHealth } = require('../data/userData');
const { users, userNames } = require('../data/data.js');


function opSelcet(req, op){
    let id;
    if(op == 'addOrgan'){
        id = req.body.id;
        console.log(id);
        console.log("addUser called -using alternative read in middelware");
    }else{
        id = req.query.id;
    }
    return id;
}

function userPasswordValid(username, password){
    const user = userNames.find(function (user) {
        return user.userName == username && user.password == password;
    });
    if(user){
        return true;
    } else {
        return false;
    }
}

function userValid(req, res, next){
    const op = req.query.op;
    if(op == 'addUser' || op == 'users'){
        console.log(`${op} called -suppressing userValid check`);
        next();
    // is now obsolete
    // }else if(op == 'signin'){
    //     const userName = req.body.userName;
    //     const password = req.body.password.toString();
    //     if(userPasswordValid(userName, password)){
    //         console.log("userValid called -user found");
    //         next();
    //     } else {
    //         console.log("userValid called -user not found");
    //         res.status(403).json({crash :"User not found"});
    //     }
    } else {
        const id = opSelcet(req, op);
        if(id >= 0 && id < users.length){
            next();
        } else {
            console.log("userValid called -user not found");
            res.status(403).json({crash :"User not found"});
        }
    }
}                  

// making userValid with find function
// function userValidFind(req, res, next){
//     const op = req.query.op;
//     if(op == 'addUser'){
//         console.log("addUser called -suppressing userValid check");
//         next();
//     } else {
//         const id = opSelcet(req, op);
//         const user = users.find(function (user) {
//              user.id == id
//             });
//         if(user){
//             next();
//         } else {
//             res.status(411).json({crash :"User not found"});
//         }
//     }
// }

function isValidIdState(req, res, next){
    const op = req.query.op;
    const ishealthy = req.body.ishealthy; // or req.query.ishealthy, depending on your setup
    if(op == 'addUser' || op == 'signin' || op == 'users'){
        console.log(`${op} called -suppressing userValid check`);
        next();
    }
    else if(ishealthy == true || ishealthy == false){
        console.log("ishealthy state : " + ishealthy + " found");
        next();
    }else{
        res.status(411).json({crash :"Invalid state of organ"});
    }
}

function validOrgan(req, res, next){
    const op = req.query.op;
    const organ = req.body.organ; // or req.query.organ, depending on your setup
    if(op == 'addUser' || op == 'signin' || op == 'users'){
        console.log(`${op} called -suppressing userValid check`);
        next();
    }
    else if(organ == "heart" || organ == "kidney" || organ == "bones"){
        console.log(organ + " found")
        next();
    }else{
        res.status(411).json({crash :"Organ not found"});
    }
}

// function to count the total number of requests, made to the server
function countRequests(req, res, next){
    count++;
    console.log("number of request :" + count);
    console.log("-----Resquest starts-----");
    next();
}

// count variable to count the total number of requests
var count = 0;

// funtion to count the time taken by the server to respond
function countTime(req, res, next){
    const start = new Date().getTime();
    next();
    const end = new Date().getTime();
    console.log(`TIme taken : ${end - start}ms `);
    console.log('----####Request Ends####----');
}



module.exports = {
    userValid,
    validOrgan,
    countRequests,
    isValidIdState,
    countTime,
    count
};