/// <reference path="./Screeps-Typescript-Declarations/dist/screeps.d.ts"/>

//builder algorithm
var roleFillUpgraders = {

    /** @param {Creep} creep */
    run: function(creep, controllerID) {
        var targetController = controllerID;
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0){
            creep.memory.upgrading = false;
            creep.say('harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() === 0){
            creep.memory.upgrading = true;
            creep.say('upgrade');
        }
        if(creep.memory.upgrading){
                if(creep.upgradeController(targetController) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targetController, {visualizePathStyle: {stroke: '#f0daa4', strokeWidth: 0.7}});
                }
        }
        else {
            /*
            
            */
           
            if(creep.store.getFreeCapacity() > 0){
                var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return((structure.structureType === STRUCTURE_CONTAINER) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 0);
                    }
                });
                if(sources.length > 0){
                    if(creep.withdraw(sources[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#f0daa4', strokeWidth: 0.7}});
                    }
                } else {
                    var sources = creep.room.find(FIND_SOURCES);

                    if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE){
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#f0daa4', strokeWidth: 0.7}});
                    }
                }
            }
        }
    }
};

module.exports = roleFillUpgraders;