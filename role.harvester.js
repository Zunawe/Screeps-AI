var helpers = require('helpers');
 
var role = {
    run: function(creep){
        if(creep.carry.energy < creep.carryCapacity){
            helpers.doHarvesting(creep);
        }
        else{
            if(!creep.memory.containerTarget){
                creep.memory.containerTarget = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (structure) => {
                    return (structure instanceof StructureSpawn || structure instanceof StructureExtension) && structure.energy < structure.energyCapacity;
                }}).id;
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