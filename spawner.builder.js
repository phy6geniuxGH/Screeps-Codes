var spawnBuilder = {

    /** @param {Creep} creep **/

    run: function(creep, numB){
        
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builders.length);

        if(builders.length < numB){
            var newNameB = 'B'+Game.time;
            console.log('Spawning new builder: ' + newNameB);
            Game.spawns['SpawnCenter'].spawnCreep([WORK,CARRY,MOVE], newNameB, {memory: {
                role: 'builder'}}); 
        } 
    }

};

module.exports = spawnBuilder;