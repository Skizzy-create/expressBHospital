const mongoose = require('mongoose');
const { mongooseConnectionString } = require('../utility/constants');
const { userNamesSchema } = require('../utility/schemas');


function connect(ConnectionString){
    mongoose.connect(ConnectionString)
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
    });
};


// The schema for the user for the database, data validation will be performed using zod
// here the syntax is mongoose.model('name', {schema}) where name is the name of the collection/table
// and schema is the schema for the collection/table

const userDBschema = mongoose.model('Users', { 
    name: String,
    password: String,
    email: String
});

const userHealthSchema = new mongoose.Schema({
    userName: String,
    bhakti: Boolean,
    kidneys: [{
        healthy: Boolean
    }],
    heart: {
        healthy: Boolean
    },
    Bones: [{
        current: Boolean,
        brokenPast: Number,
        plastered: Number
    }]
});

const UserHealth = mongoose.model('UserHealth', userHealthSchema);


function assignValues(userNameR, passwordR, emailR){
    const check = userNamesSchema.safeParse({
        userName: userNameR,
        password: passwordR,
        email: emailR
    });
    let user = null;
    if(check.success){
        user = new userDBschema({ 
            name: userNameR, 
            password: passwordR, 
            email: emailR
        });
    }else{
        console.error('Invalid Inputs:', check.error);
    }
    return {check, user};
};

function saveUser(user){
    user.save()
    .then(() => {
        console.log('User saved successfully');
    })
    .catch(err => {
        console.error('Failed to save user:', err);
    });
}


// testing the functions
// connect(mongooseConnectionString);
// const {check, user} = assignValues("Rahul", "Rahul123", "rahul@gmail.com");
// if (check.success) {
//     saveUser(user);
// } else {
//     console.log('User not saved due to validation errors.');
// }
 
    
module.exports = {
    connect,
    assignValues,
    saveUser,
    userDBschema
}