/// <reference path="./Screeps-Typescript-Declarations/dist/screeps.d.ts"/>

//harvesters algorithm
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0){
            var sources = creep.room.find(FIND_SOURCES);

            if(creep.harvest(sources[1]) === ERR_NOT_IN_RANGE){
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#34558b'}});
            }
            /*
            var energyContainer = creep.room.find(STRUCTURE_CONTAINER);
            if(creep.harvest(energyContainer[1]) === ERR_NOT_IN_RANGE){
                creep.moveTo(energyContainer[1], {visualizePathStyle: {stroke: '#34558b'}});
            }
            */
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType === STRUCTURE_TOWER ||
                            structure.structureType === STRUCTURE_CONTAINER ||
                            structure.structureType === STRUCTURE_STORAGE /*||
                            structure.structureType === STRUCTURE_EXTENSION ||
                            structure.structureType === STRUCTURE_SPAWN*/) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                }
            });
            if(targets.length > 0){
                if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#34558b'}});
                }
            }
           
        }

    },
    run2: function(creep){
        if(creep.store.getFreeCapacity() > 0){
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return((structure.structureType === STRUCTURE_STORAGE) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 0);
                }
            });
            if(sources.length > 0){
                if(creep.withdraw(sources[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#34558b'}});
                }
            }
            
            /*
            var energyContainer = creep.room.find(STRUCTURE_CONTAINER);
            if(creep.harvest(energyContainer[1]) === ERR_NOT_IN_RANGE){
                creep.moveTo(energyContainer[1], {visualizePathStyle: {stroke: '#34558b'}});
            }
            */
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType === STRUCTURE_EXTENSION ||
                            structure.structureType === STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                } 
            });
            if(targets.length > 0){
                if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#34558b'}});
                }
            }
           
        }
    }

};

module.exports = roleHarvester;
