var users = [{
    userName: "Kartik",
    bhakti: true,
    kidneys: [{
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
    kidneys: [{
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
    kidneys: [{
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

const userNames = [{
    userName: "Kartik",
    password: "12341234",
    email: "kartik@gmail.com"
},{
    userName: "Ujjwal",
    password: "12341234",
    email: "ujjwal@gmail.com"
},{
    userName: "Madhav",
    password: "12341234",
    email: "madhav@radha.com"
}];

module.exports = {
    users,
    userNames
};


// this is how we will send the data
// {
//     "userName": "Madhav",
//     "bhakti": true,
//     "kidneys": [{
//         "healthy": true
//     },{
//         "healthy": true
//     }],
//     "heart": {
//         "healthy": true
//     },
//     "Bones":[{
//         "current": false,
//         "brokenPast": 0,
//         "plastered": 0
//     }]
// }

// this is how we will send the data
// {
//     "userName": "Madhav",
//     "password": "12341234",
//     "email": "madhav@radha"
// }

