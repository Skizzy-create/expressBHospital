const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
// basic structure 
var users = [{
    bid: 1,
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
        currnt: false,
        brokenPast: 3,
        plastered: 5
    }]
},{
    bid: 2,
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
}];

function health(id){
    
    
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
    // we will give 20 marks for each kidney, 30 for heart and 20 for bhakti, and 10 for bones
    // for each broken bone in the past we will deduct 0.0048543689320388349514 marks
    var health = 0;
    const id = req.query.id;
    if(users[id].bhakti){
        health += 10;
    }
    for(let i=0; i<users[id].kidenys.length; i++){
        if(users[id].kidenys[id].healthy){
            health += 20;
        }
    }
    if(!users[id].Bones.current){
        health += 10;
        health -= users[id].Bones.brokenPast*0.0048543689320388349514;
    }
    return  health
});

app.listen(port, function(){
    console.log(`Server running at https://localhost:${port}`)
});
