const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const schema = require("../utility/schemas");
const { users, userNames } = require("../data/data");
const { mongooseConnectionString, jwtSecret } = require("../utility/constants");
const { userValid, isValidIdState, countRequests, countTime } = require("../utility/middlewares");
const { connect, assignValues, userDBschema, saveUser } = require("../database/dataBaseFun");
const { userValidDB } = require("../utility/middelwaresDB");
router.use(express.json());
router.use(countRequests);
router.use(countTime);

// connecting to DB
connect(mongooseConnectionString);

// need to passing the op in the query
router.post("/signin", async function (req, res) {
    const userName = req.body.userName;
    const password = req.body.password.toString();
    const email = req.body.email;
    const check = schema.userNamesSchema
    .safeParse({
        userName: userName,
        password: password,
        email: email,
    });
    const existingUser = await userDBschema.findOne({email: email});
    if(existingUser != null){
        res.status(400).json({
            error:"User already exists"
        });
        console.log("error: User already exists\nexistingUser:", existingUser);
        return;
    }
    if (check.success) {
        var token = jwt.sign({ userName: userName }, jwtSecret);
        console.log("singin called");
        const {check, user} = assignValues(userName, password, email);
        if(check.success){
            saveUser(user);
        }else{
            console.log("Failed to save user:");
        }
        return res.json({
            jwt: token,
            userName: userName,
        });
    } else {
        console.error("Invalid Inputs:", check.error);
        return res.status(400).json({
            crash: "Invalid Inputs",
            error: check.error,
        });
    }
});

function userWithOutThemSelves(userName) {
    const usersWithoutTS = userNames.filter((user) => {
    return user.userName !== userName;
    });
    return usersWithoutTS;
}

router.get("/users", userValidDB, function (req, res) {
    console.log("users route called");
    const token = req.headers.authorization;
    try {
        const decode = jwt.verify(token, jwtSecret);
        const userName = decode.userName;
        const userTSN = userWithOutThemSelves(userName);
        res.status(200).json({
            decode: decode,
            userName: userName,
            userTS: userTSN,
        });
    } catch (err) {
        console.log("Invalid token or user");
        console.log(err);
        return res.status(403).json({
            crash: "Invalid token",
        });
    }
});

module.exports = router;
