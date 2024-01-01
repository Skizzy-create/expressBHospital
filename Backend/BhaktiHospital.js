const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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
        healthy: true
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

function calculateMaxHealth(id) {
    var maxHealth = 0;
    const user = users[id];

    // Bhakti contributes 20 to max health
    if (user.bhakti) {
        maxHealth += 20;
    }

    // Each healthy kidney contributes 30 to max health
    for(let i = 0; i < user.kidenys.length; i++){
        if(user.kidenys[i].healthy){
            maxHealth += 30;
        }
    }

    // Healthy heart contributes 30 to max health
    if(user.heart.healthy){
        maxHealth += 30;
    }

    // Bones contribute based on past breaks
    maxHealth = bones(id, maxHealth);

    // Subtract plastered bones
    maxHealth = maxHealth - user.Bones[0].plastered * 2;

    return maxHealth;
}

// Function to check if id is valid
function isValidId(id) {
    return id >= 0 && id < users.length;
}

// Routes

// Welcome route
app.get("/", function(req,res){
    res.status(200).send("Welcome to Bhakti Hospital, Here we will fix you both Spiritually and Medically. That too for free");
});

// Route to get user data
app.get('/getUser', function(req,res){
    const id = req.query.id;
    if (!isValidId(id)) {
        return res.status(404).send('User not found');
    }
    res.json(users[id]);
});

// Route to get health report of a user
app.get('/healtReport', function(req,res){
    const id = req.query.id;
    if (!isValidId(id)) {
        return res.status(404).send('User not found');
    }
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

// Route to add organ to a user
app.post("/addOrgan", function(req,res){
    const id = req.body.id;
    if (!isValidId(id)) {
        return res.status(404).send('User not found');
    }
    const organ = req.body.organ;
    const ishealthy = req.body.ishealthy;
    if(organ == "heart"){
        //if there is no heart, then add it
        if(!users[id].heart){
            users[id].heart = {
                healthy: ishealthy
            };
            res.send("Heart added to user " + id);
        }
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

// Route to update organ of a user
app.put("/updateOrgan", function(req,res){
    const id = req.body.id;
    if (!isValidId(id)) {
        return res.status(404).send('User not found');
    }
    const organ = req.body.organ;
    const ishealthy = req.body.ishealthy;
    if(organ == "heart"){
        users[id].heart.healthy = ishealthy;
    }else if(organ == "kidney"){
        for(let i = 0; i < users[id].kidenys.length; i++){
            users[id].kidenys[i].healthy = ishealthy;
        }
    }
    res.send(`${organ} updated to user ${id} and is updated to ${ishealthy}`);
});

// Route to remove all unhealthy organs of a user
app.delete("/deleteOrgan", function(req,res){
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

app.listen(port, function(){
    console.log(`Server running at https://localhost:${port}`)
});
