const express = require('express');
const router = express.Router();
const { bones, calculateMaxHealth, isValidId } = require('../data/userData');
const { userValid, validOrgan, isValidIdState, countRequests, countTime } = require('../utility/middlewares');
const schema = require('../utility/schemas.js')
const { users, userNames } = require('../data/data.js');
router.use(express.json());

// middleware for all the routes
router.use(countRequests);
router.use(countTime);

// // we can manually add the middelwares
// router.get("/", countRequests, countTime, function (req, res) {
//     res.status(200).send("Welcome to Bhakti Hospital, Here we will fix you both Spiritually and Medically. That too for free");
// });

router.get("/schema", function (req, res) {
    const kidneys = JSON.parse(req.query.kidneys); // this is to get the kidneys from the query, query is a the part of the url after the ?
    const response = schema.kidneysSchema.safeParse(kidneys);
    res.json({
        error: response,
        msg: "Will always return error"
    });
});

router.get("/getAllusers", function (req, res) {
    res.status(200).json(users);
});

router.use(userValid);

router.get('/getUser', function (req, res) {
    const id = req.query.id;
    res.json(users[id]);
});

router.get('/healtReport', function (req, res) {
    const id = req.query.id;
    var health = 0;
    const total = calculateMaxHealth(id);
    const user = users[id];
    const kidney = user.kidneys;
    const Bones = user.Bones[0]
    const bonesCurrent = Bones.current;
    const bonesPlastered = Bones.plastered;
    const heart = user.heart;
    if (user.bhakti) {
        health += 20;
    }
    for (let i = 0; i < kidney.length; i++) {
        if (kidney[i].healthy) {
            health += 30;
        }
    }
    if (bonesCurrent) {
        health -= 20;
    }
    if (heart.healthy) {
        health += 30;
    }
    health = bones(id, health);
    health = health - bonesPlastered * 2;
    const healtPercent = (health / total) * 100;
    res.json({
        health: health.toString(),
        HealthPercentage: healtPercent.toString(),
        maxHealth: total.toString(),
        user: user
    });
});

router.delete("/deleteOrgan", function (req, res) {
    const id = req.query.id;
    if (!isValidId(id)) {
        return res.status(404).send('Invalid ID');
    }
    users[id].kidneys = users[id].kidenys.filter(function (kideny) {
        return kideny.healthy;
    });
    //cehcking if heart is healthy, and if not removing it
    if (!users[id].heart.healthy) {
        users[id].heart = {};
        res.send("Heart is removed, Get a replacment soon");
    }
    res.send("All unhealthy organs are removed");
});

router.use(validOrgan);

// adding good organs
router.put("/updateOrgan", function (req, res) {
    const id = req.body.id;
    const organ = req.body.organ;
    if (organ == "heart") {
        users[id].heart.healthy = true;
    } else if (organ == "kidney") {
        for (let i = 0; i < users[id].kidenys.length; i++) {
            users[id].kidenys[i].healthy = true;
        }
    }
    res.send(`${organ} updated to user ${id} and is updated to true`);
});

router.use(isValidIdState);

router.post("/addOrgan", function (req, res) {
    const id = req.body.id;
    const organ = req.body.organ;
    const ishealthy = req.body.ishealthy;
    // adding new organ
    if (organ == "heart") {
        users[id].heart = {
            healthy: ishealthy
        };
    } else if (organ == "kidney") {
        users[id].kidneys.push({
            healthy: ishealthy
        });
    }
    res.json({
        msg: `${organ} added to user ${id} and is updated to ${ishealthy}`,
        kidneys: users[id].kidneys,
        countOfKidneys: users[id].kidneys.length
    });
});

router.post('/addUser', (req, res) => {
    const user = req.body.user;
    const userName = req.body.userName;
    const response1 = schema.userNamesSchema.safeParse(userName);
    const response2 = schema.userSchema.safeParse(user);
    if (response1.success && response2.success) {
        users.push(user);
        userNames.push(userName);
        res.status(200).json({
            msg: "User added successfully",
            user: user,
            userName: userName
        });
    } else {
        error = response1.error || response2.error;
        res.status(411).json({
            msg: "Invalid Inputs",
            error: error
        });
    }
});

module.exports = router;
