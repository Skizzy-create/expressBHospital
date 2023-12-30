const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
// basic structure 
var users = [{
    userName: "Kartik",
    bhakti: true,
    kidenys: [{
        healthy: true
    },{
        healthy: true    
    }],
    heart: {
        healthy: true
    },
    Bones:[{
        current: false,
        brokenPast: 3,
        plastered: 5
    }]
},{
    userName: "Ujjwal",
    bhakti: false,
    kidenys: [{
        healthy: true
    },{
        healthy: true    
    }],
    heart: {
        healthy: false
    },
    Bones:[{
        current: true,
        brokenPast: 2,
        plastered: 3
    }]
},{
    userName: "Annie",
    bhakti: true,
    kidenys: [{
        healthy: true
    },{
        healthy: true
    }],
    heart: {
        healthy: true
    },
    Bones:[{
        current: false,
        brokenPast: 0,
        plastered: 0
    }]
}];

function bones(id, health){
    const bones = users[id].Bones[0]
    if(bones.brokenPast == 0){
        return health + 10
    }else if(bones.brokenPast > 0 && bones.brokenPast <= 2){
        return health + 7;
    }else if(bones.brokenPast > 2 && bones.brokenPast <= 5){
        return health + 5;
    }else{
        return health + 3;
    }
}

app.get("/", function(req,res){
    res.status(200).send("Welcome to Bhakti Hospial, Here we will fix you both Spiritually and Medically/ That to for free");
});

app.get('/getUser', function(req,res){
    const id = req.query.id;
    res.json(users[id]);
});

app.get('/healtReport', function(req,res){
    // the function is to calculate the health %age of the user,
    // we have the data of kidney, heart and bones
    // we will give 30 marks for each kidney, 50 for heart and 20 for bhakti, and 10 for bones
    // for each broken bone in the past we will deduct 0.0048543689320388349514 marks
    var health = 0;
    const id = req.query.id;
    const user = users[id];
    const kideny = user.kidenys;
    const Bones = user.Bones[0]
    const bonesCurrent = Bones.current;
    const bonesPlastered = Bones.plastered;
    if (user.bhakti){
        health += 20;
    }
    for(let i = 0; i < kideny.length; i++){
        if(kideny[i]){
            health += 50;
        }
    }
    if(bonesCurrent){
        health -= 20;
    }
    health = bones(id,health);
    health = health - bonesPlastered * 2;
    const healtPercent = health / 1.3;
    res.json({health: health.toString(),
        HealthPercentage : healtPercent.toString()
        ,user: user
    });
});

app.listen(port, function(){
    console.log(`Server running at https://localhost:${port}`)
});
