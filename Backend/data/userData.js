const { users } = require('./data.js');

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
    if (id < 0 || id >= users.length) {
        throw new Error('User not found');
    }
    // Bhakti contributes 20 to max health
    if (user.bhakti) {
        maxHealth += 20;
    }

    // Each healthy kidney contributes 30 to max health
    for(let i = 0; i < user.kidneys.length; i++){
        maxHealth += 30;
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



module.exports = {
    bones,
    calculateMaxHealth,
};
