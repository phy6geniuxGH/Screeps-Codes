var spawnFillUpgrader = {

    /** @param {Creep} creep **/

    run: function(creep, numfU){
        let basicAttributes = [WORK,CARRY, MOVE];
        let spawnCenter = Game.spawns['SpawnCenter'];
        var fillUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'fillUpgrader');
        console.log('FillUpgraders: ' + fillUpgraders.length);
        
        if(fillUpgraders.length < numfU){
            var newNamefU = 'fU'+ Game.time;
            console.log('Spawning new fillUpgrader: ' + newNamefU);
            Game.spawns['SpawnCenter'].spawnCreep(basicAttributes, newNamefU, {memory: {
                role: 'fillUpgrader'}}); 
        }
        if(spawnCenter.room.energyAvailable > 500 && spawnCenter.room.energyAvailable < 1000){
            basicAttributes.push(MOVE,MOVE,MOVE,WORK,CARRY,CARRY);
        } else if(spawnCenter.room.energyAvailable >= 1000 && spawnCenter.room.energyAvailable < 2000 ){
            basicAttributes.push(MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,CARRY);
        } else if(spawnCenter.room.energyAvailable >= 2000){
            basicAttributes.push(MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY,CARRY, CARRY);
        } else if(spawnCenter.room.energyAvailable <= 500) {
            basicAttributes = [WORK,CARRY,MOVE];
        }
    }
    

};


module.exports = spawnFillUpgrader;
