/// <reference path="./Screeps-Typescript-Declarations/dist/screeps.d.ts"/>

var spawnHarvester = {

    /** @param {Creep} creep **/

    run: function(creep, numH){
        
        let basicAttributes = [WORK, CARRY, MOVE];
        var spawnCenter = Game.spawns['SpawnCenter'];
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);

        if(harvesters.length < numH){
            var newNameH = `H0${Game.time}`;
            console.log('Spawning new harvester: ' + newNameH);
            spawnCenter.spawnCreep(basicAttributes, newNameH, {memory: {
                role: 'harvester'}}); 
                
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
        console.log('Energy Available for Spawning: ' + spawnCenter.room.energyAvailable);
        console.log('Total Energy Available for Spawning: ' + spawnCenter.room.energyCapacityAvailable);
        //Specific Body Count Algorithm
        /*
        for(const att in harvesters){
            var creepMovePartcount = _.filter(harvesters[att].body, function(basicAttributes){
                return basicAttributes;});
            console.log('H-creeps move body part: ' + creepMovePartcount.length);
        }
        */
       
    },
    run2: function(creep, numM){

        let basicAttributes = [WORK, CARRY, MOVE];
        var spawnCenter = Game.spawns['SpawnCenter'];
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        console.log('Miners: ' + miners.length);

        if(miners.length < numM){
            var newNameM = 'M'+Game.time;
            console.log('Spawning new miner: ' + newNameM);
            spawnCenter.spawnCreep(basicAttributes, newNameM, {memory: {
                role: 'miner'}}); 
        }  
        if(spawnCenter.room.energyAvailable > 500 && spawnCenter.room.energyAvailable <= 1000){
            basicAttributes.push(MOVE,MOVE,MOVE,WORK,CARRY,CARRY);
        } else if(spawnCenter.room.energyAvailable > 1000){
            basicAttributes.push(MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,CARRY);
        } else if (spawnCenter.room.energyAvailable <= 500){
            basicAttributes = [WORK,CARRY, MOVE];
        }
        /*
        for(const att in harvesters){
            var creepMovePartcount = _.filter(harvesters[att].body, function(basicAttributes){
                return basicAttributes;});
            console.log('H-creeps move body part: ' + creepMovePartcount.length);
        }
        */
    }

};

module.exports = spawnHarvester;