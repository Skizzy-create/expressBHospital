const express = require('express');
const router = express.Router();
const { users, bones, calculateMaxHealth, isValidId } = require('../data/userData');
const { userValid, validOrgan, countRequests, countTime } = require('../utility/middlewares');



router.use(express.json());

// middleware for all the routes
router.use(countRequests);
router.use(countTime);

router.get("/", function(req,res){
    res.status(200).send("Welcome to Bhakti Hospital, Here we will fix you both Spiritually and Medically. That too for free");
});

router.use(userValid);

router.get('/getUser', function(req,res){
    const id = req.query.id;
    res.json(users[id]);
});

router.get('/healtReport', function(req,res){
    const id = req.query.id;
    var health = 0;
    const total = calculateMaxHealth(id);
    const user = users[id];
    const kideny = user.kidenys;
    const Bones = user.Bones[0]
    const bonesCurrent = Bones.current;
    const bonesPlastered = Bones.plastered;
    const heart = user.heart;
    if (user.bhakti){
        health += 20;
    }
    for(let i = 0; i < kideny.length; i++){
        if(kideny[i].healthy){
            health += 30;
        }
    }
    if(bonesCurrent){
        health -= 20;
    }
    if(heart.healthy){
        health += 30;
    }
    health = bones(id,health);
    health = health - bonesPlastered * 2;
    const healtPercent = (health / total) * 100;
    res.json({health: health.toString(),
        HealthPercentage : healtPercent.toString()
        ,user: user
    });
});

router.delete("/deleteOrgan", function(req,res){
    const id = req.query.id;
    if (!isValidId(id)) {
        return res.status(404).send('User not found');
    }
    users[id].kidenys = users[id].kidenys.filter(function(kideny){
        return kideny.healthy;
    });
    //cehcking if heart is healthy, and if not removing it
    if(!users[id].heart.healthy){
        users[id].heart = {};
        res.send("Heart is removed, Get a replacment soon");
    }
    res.send("All unhealthy organs are removed");
});

router.use(validOrgan);

router.post("/addOrgan", function(req, res) {
    const id = req.body.id;
    const organ = req.body.organ;
    const ishealthy = req.body.ishealthy;
    // adding new organ
    if(organ == "heart"){
        users[id].heart = {
            healthy: ishealthy
        };
    }else if(organ == "kidney"){
        users[id].kidenys.push({
            healthy: ishealthy
        });
    }
    res.send(`${organ} added to user ${id} and is updated to ${ishealthy}`);
});

// adding good organs
router.put("/updateOrgan", function(req,res){
    const id = req.body.id;
    const organ = req.body.organ;
    if(organ == "heart"){
        users[id].heart.healthy = true;
    }else if(organ == "kidney"){
        for(let i = 0; i < users[id].kidenys.length; i++){
            users[id].kidenys[i].healthy = true;
        }
    }
    res.send(`${organ} updated to user ${id} and is updated to true`);
});

module.exports = router;
