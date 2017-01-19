var helpers = require('helpers');
 
var role = {
    run: function(creep){
        if(creep.memory.scavenging && creep.carry.energy == creep.carryCapacity){
            creep.memory.scavenging = false;
        }
        if(!creep.memory.scavenging && creep.carry.energy == 0){
            creep.memory.scavenging = true;
        }
        
        
        if(creep.memory.scavenging){
            helpers.doScavenging(creep);
        }
        else{
            if(!creep.memory.containerTarget){
                var nextStructures = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return ((structure instanceof StructureSpawn || structure instanceof StructureExtension) && structure.energy < structure.energyCapacity) ||
                    (structure instanceof StructureContainer && structure.store['energy'] < structure.storeCapacity);
                }});
                var next = helpers.pickRandom(nextStructures);
                creep.memory.containerTarget = next ? next.id : false;
            }
            else{
                if(creep.transfer(Game.getObjectById(creep.memory.containerTarget), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(Game.getObjectById(creep.memory.containerTarget));
                }
                else{
                    creep.memory.containerTarget = false;
                }
            }
        }
    }
}

module.exports = role;