var spawnRepairer = {

    /** @param {Creep} creep **/

    run: function(creep, numR){
            
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        console.log('Repairers: ' + repairers.length);
    

        if(repairers.length < numR){
            var newNameR = 'R'+Game.time;
            console.log('Spawning new repairer: ' + newNameR);
            Game.spawns['SpawnCenter2'].spawnCreep([WORK,CARRY,MOVE], newNameR, {memory: {
                role: 'repairer'}}); 
        }
    }

};

module.exports = spawnRepairer;