var helpers = require('helpers');

var role = {
    run: function(creep){
        if(creep.memory.repairing && creep.carry.energy == 0){
            creep.memory.repairing = false;
        }
        if(!creep.memory.repairing && creep.carry.energy > 0){
            creep.memory.repairing = true;
        }
        
        
        if(!creep.memory.repairing){
            helpers.doWithdraw(creep);
        }
        else{
            var structures = creep.room.find(FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax * 0.7});
            //structures.sort((a, b) => a.hits - b.hits)
            if(creep.repair(structures[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(structures[0]);
            }
        }
    }
}

module.exports = role;