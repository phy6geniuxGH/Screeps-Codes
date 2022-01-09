/// <reference path="./Screeps-Typescript-Declarations/dist/screeps.d.ts"/>


var StructureSpawning = {
    
    /** @param {Creep} creep **/
    run: function () {
        
        /*
        var spawnCenter = Game.spawns['SpawnCenter'];
        for(var alpha = 0; alpha < 10; alpha++){
            for(var beta = 0; beta < 10; beta++){
                spawnCenter.room.createConstructionSite(
                    spawnCenter.pos.x+alpha,
                    spawnCenter.pos.y+alpha,
                    STRUCTURE_ROAD);
                spawnCenter.room.createConstructionSite(
                    spawnCenter.pos.x-beta,
                    spawnCenter.pos.y-beta,
                    STRUCTURE_ROAD);
                }
        }
        */
        
        
        //Construction Site removal (remove comment sign)

        /*
        var cSites = Game.rooms['W1N7'].find(FIND_CONSTRUCTION_SITES);
        for(const site of cSites){ site.remove();}
        */

        //STRUCTURE REMOVAL
        /*
        var strucRoads = Game.rooms['W1N7'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_ROAD);
            }
        });
        for(const roads of strucRoads){ roads.destroy();}
        */
    }
};

module.exports = StructureSpawning;