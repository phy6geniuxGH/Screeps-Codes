/// <reference path="./Screeps-Typescript-Declarations/dist/screeps.d.ts"/>

//Working temporary repairer logic
var roleRepairer = {

  /** @param {Creep} creep **/
  run: function(creep) {

        //creep.moveTo(Game.flags.Flag1);

        if(creep.store.getFreeCapacity() > 0){
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) === ERR_NOT_IN_RANGE){
                //creep.moveTo(new RoomPosition(13, 30, 'W1N7'));
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#4ec5a5', strokeWidth: 0.5}});
            }
        }
        else {
            const strucRepair = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return((structure.structureTypes === STRUCTURE_ROAD ||
                           structure.structureTypes === STRUCTURE_TOWER) ||
                           (structure.hits < structure.hitsMax))}});

            strucRepair.sort((a,b) => a.hits - b.hits);

            if(strucRepair.length > 0){
                if(creep.repair(strucRepair[0]) === ERR_NOT_IN_RANGE){
                    creep.moveTo(strucRepair[0], {visualizePathStyle: {stroke: '#4ec5a5', strokeWidth: 0.5}});
                    }
                }

            }
            
        }

};

module.exports = roleRepairer;