var spawnUpgrader = {

    /** @param {Creep} creep **/

    run: function(creep, numU){
            
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgraders: ' + upgraders.length);
        
        if(upgraders.length < numU){
            var newNameU = 'U'+Game.time;
            console.log('Spawning new upgrader: ' + newNameU);
            Game.spawns['SpawnCenter'].spawnCreep([WORK,CARRY,MOVE], newNameU, {memory: {
                role: 'upgrader'}}); 
        }
    }

};

module.exports = spawnUpgrader;