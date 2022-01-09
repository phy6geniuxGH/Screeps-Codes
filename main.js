/// <reference path="./Screeps-Typescript-Declarations/dist/screeps.d.ts"/>

//Importing Modules

/**
 * 1. roleHarvester Module - controls the behavior of the harvesters and the miners.
 * 2. roleUpgrader Module - controls the behavior of the upgraders.
 * 3. roleBuilder Module - controls the behavior of the builders.
 * 4. roleRepairer Module - controls the behavior of the repairers.
 * 5. roleFillUpgrader Module - controls the behavior of the fill upgraders, which 
 *    is required to be full in energy before it transfer it to the room controllers.
 *    Required to be emptied before harvesting energy again for the next cycle.
 * 6. spawnHarvester - algorithm for spawning harvesters. 
 * 7. spawnBuilder - algorithm for spawning builders.
 * 8. spawnUpgrader - algorithm for spawning upgraders.
 * 9. spawnRepairer - algorithm for spawning repairers.
 * 10. spawnFillUpgraders - algorithm for spawning fill upgraders.
 * 11. StructureSpawning - algorithm for automated construction site building.
 */
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var spawnHarvester = require('spawner.harvester');
var spawnBuilder = require('spawner.builder');
var spawnUpgrader = require('spawner.upgrader');
var spawnRepairer = require('spawner.repairer');
var StructureSpawning = require('Structure.spawning');
var roleFillUpgraders = require('role.fillUpgraders');
var spawnFillUpgrader = require('spawner.fillUpgrader');

//Game room number;

let gameRoom = 'W1N7';

//creep numbers
var numH = 5;
var numM;
var numB;
var numU;
var numR;
var numfU;

//Set creep numbers under condition (for controlling the number of creeps depending on the critical number of harvesters)
var numM2 = 2;
var numB2 = 0;
var numU2 = 0;
var numR2 = 3;
var numfU2 = 7;

//Room Controller ID:
var controllerID = Game.getObjectById('fd2c0774d801520');

//Game.rooms['W1N7'].createFlag(3,38,'Francis'); - Creating flags
//Game.spawns['SpawnCenter'].room.createConstructionSite(x,y, structure constant) - spawning structures

//Testing code for structure spawning
StructureSpawning.run();

//loop

module.exports.loop = function (){
//creep.work() execute every tick
//This is for keeping the program error-less when spawning creeps. It always  checks the existence of the available creeps
    Creep.prototype.work = () => {
        if(this.ticksToLive === CREEP_LIFE_TIME) return;
    }

//Clearing Memory of the deceased creeps
//Memory.creeps contains the unique info of the creeps. It returns an array.
    for(var name in Memory.creeps){
        if(!Game.creeps[name]){
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory', name);
        }
    }


//Check whether construction sites still exist or not
//constSite returns an array of construction_sites
    var constSite = Game.rooms[gameRoom].find(FIND_CONSTRUCTION_SITES);  

    if(constSite.length === 0){
        console.log('There are no construction sites');
    } else {
        console.log('Available CS: ' + constSite + ', No. of CS: ' + constSite.length);
        //This is to force assign a 0 velue when there is really no constSite available
        if(constSite.length === 0){
            constSite.length = 0;
        }
    }

//Check the amount of storage used in the Structure_Storage
    if(Game.rooms[gameRoom].controller.level >= 4){
        //you can use the find method to return a number of storage structures.
        //Since there's only one storage structure, don't forget to put roomStorage[0] to access the only one available storage.
        let roomStorage = Game.rooms[gameRoom].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return(structure.structureType === STRUCTURE_STORAGE);
            }
        });
        
        if(roomStorage[0].store.getUsedCapacity(RESOURCE_ENERGY) >= 500000){
            console.log(`Storage Contents: ${roomStorage[0].store.getUsedCapacity(RESOURCE_ENERGY)}`);
        }
    }
   
//Check for the harvester numbers\
    //This one uses the lodash filter syntax. It has a lot of usage in terms of filtering 
    // and array assignments and retrieval. 
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    /**
        To make sure that a harvester will always be prioritized in spawning,
        Set the other creeps 0, and focus on spawning harvesters.
        If there's a storage available, set the miner number to 1, to ensure a miner will be spawned.
        This block tells that if the total number of harvesters decreased from 3 or below,
        there must some emergency, and harvesters/miners spawning is prioritized.
     */
    if(harvesters.length <= 3){
        
        numM = 1;
        numB = 0;
        numU = 0;
        numR = 0;
        numfU = 0;
        console.log('Emergency, low in Harvester!',numM, numB,numU,numR, numfU);
    } else {
        //When the number of harvesters is now sufficient, we can now return to normal
        //spawning operation. A creep global variable can be then changed to a desired value.
        numM = numM2;
        numB = numB2;
        numU = numU2;
        numR = numR2;
        numfU = numfU2;
    }


//Storing Game Object ID in memory for future retrieval
    for(var name in Game.creeps){
        var creep = Game.creeps[name];
        creep.memory.sourceID = creep.pos.findClosestByRange(FIND_SOURCES).id;
        var energySources = Game.getObjectById(creep.memory.sourceID);
        //console.log(energySources);
    }

    //Notification for spawning. It includes the creep's name and the its role. 
    if(Game.spawns['SpawnCenter'].spawning){
        var spawningCreep = Game.creeps[Game.spawns['SpawnCenter'].spawning.name];
        //Game.room.visual.text allows to log text messages in the game screen
        Game.spawns['SpawnCenter'].room.visual.text(
            spawningCreep.memory.role, 
            Game.spawns['SpawnCenter'].pos.x+1,
            Game.spawns['SpawnCenter'].pos.y,
            {align: 'left', opacity: 0.8});
    }
//Temporary TOWER 
/**
 * This tower programming block can be refactored into one for-loop code block, with all
 * the tower IDs stored in an array or in memory. 
 */
    let tower = Game.getObjectById('09943b9f1045a78');
    if(tower){
        //returns a structure with damage, where hitsMax represent full health
            let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (structure.hits < structure.hitsMax)});
            if(closestDamagedStructure){
                //repair logic for the tower
                //tower.repair(closestDamagedStructure);
            }
            //The code allows the tower to find any close enemies to target.
            let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile){
                //towers, like creeps, have attack command, except that it was already built into it, unlike creeps.
                tower.attack(closestHostile);
            }
        }
    let tower2 = Game.getObjectById('2e8f2c0f9ebbe64');
    if(tower2){
            let closestDamagedStructure = tower2.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (structure.hits < structure.hitsMax)});
            if(closestDamagedStructure){
                //tower2.repair(closestDamagedStructure);
            }
    
            let closestHostile = tower2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile){
                tower2.attack(closestHostile);
            }
        }  
    let tower3 = Game.getObjectById('2dbbffcae795e1c');
    if(tower3){
        let closestDamagedStructure = tower2.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits < structure.hitsMax)});
        if(closestDamagedStructure){
            tower3.repair(closestDamagedStructure);
        }

        let closestHostile = tower2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile){
            tower3.attack(closestHostile);
        }
    }  

    

        
//Assigning Behavior
    /**
     * The assigning behavior code block is the most important part.
     * It controls all the work logic of the creeps, calling the functions inside the
     * modules imported in the main.js. In this code block, there are 6 functions, with
     * 2 functions in the same module, the harvester and the miner functions inside the
     * harvester module.
     */
    for(var name in Game.creeps){
        var creep = Game.creeps[name];
        //The memory.role returns the string value stored in the memory of the creep.
        switch(creep.memory.role){
            //The run function contains all the behavior logic of the creep.
            //This function can be named whatever you like.
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'repairer':
                roleRepairer.run(creep);
                break;
            case 'fillUpgrader':
                roleFillUpgraders.run(creep, controllerID);
                break;
            case 'miner':
                roleHarvester.run2(creep);
                break;

        }
    }
            
//Spawning algorithm, can be stored in a module also.
    spawnHarvester.run(creep, numH);
    spawnBuilder.run(creep, numB);
    spawnUpgrader.run(creep, numU);
    spawnRepairer.run(creep, numR);
    spawnFillUpgrader.run(creep, numfU);
    spawnHarvester.run2(creep, numM); //Miner

//Check the room controller level:
    console.log(`Room Controller Level: ${creep.room.controller.level}`);

//Creep count:

    //spawnHarvester.run2(creep);

    
//Try Catch Throw - for testing and debugging codes
    try {
    
    

    }
    catch (err) {
        console.log(err);
    }
}

//Old Codes
        /*
        if(creep.memory.role === 'harvester'){
            roleHarvester.run(creep);
            
        }
        if(creep.memory.role === 'upgrader'){
            roleUpgrader.run(creep);
        }
        if(creep.memory.role === 'builder'){
            roleBuilder.run(creep);
        }
        if(creep.memory.role === 'repairer'){
            roleRepairer.run(creep);
        }
        if(creep.memory.role === 'fillUpgrader'){
            roleFillUpgraders.run(creep, controllerID);
        }
        */