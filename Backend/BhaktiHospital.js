const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var total = 1.2;
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
        healthy: false
    },{
        healthy: false    
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
    userName: "Madhav",
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


// Routes

app.get("/", function(req,res){
    res.status(200).send(/*Welcome to Bhakti Hospial,
    Here we will fix you both Spiritually and Medically.
    That to for free*/);
});

app.get('/getUser', function(req,res){
    const id = req.query.id;
    res.json(users[id]);
});

app.get('/healtReport', function(req,res){
    // write a description of the health report route
    var health = 0;
    const id = req.query.id;
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
        if(kideny[i] ){
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
    const healtPercent = health / total;
    res.json({health: health.toString(),
        HealthPercentage : healtPercent.toString()
        ,user: user
    });
});

app.post("/addOrgan", function(req,res){
    const id = req.body.id;
    const organ = req.body.organ;
    const ishealthy = req.body.ishealthy;
    if(organ == "heart"){
        users[id].heart.healthy = ishealthy;
    }else if(organ == "kidney"){
        users[id].kidenys.push({
            healthy: ishealthy
        });
    }else{
        res.sendStatus(400).send("Invalid Data");
    }
    res.send(`${organ} added to user ${id} and is updated to ${ishealthy}`);
})

app.put("/updateOrgan", function(req,res){
    const id = req.body.id;
    const organ = req.body.organ;
    const ishealthy = true;
    if(organ == "heart"){
        users[id].heart.healthy = ishealthy;
    }else if(organ == "kidney"){
        for(let i = 0; i < users[id].kidenys.length; i++){
            users[id].kidenys[i].healthy = ishealthy;
        }
    }
    res.send(`${organ} updated to user ${id} and is updated to ${ishealthy}`);
});

app.listen(port, function(){
    console.log(`Server running at https://localhost:${port}`)
});
