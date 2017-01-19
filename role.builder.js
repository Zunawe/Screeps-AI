var helpers = require('helpers');

var role = {
    run: function(creep){
        if(creep.memory.building && creep.carry.energy == 0){
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy > 0){
            creep.memory.building = true;
        }
        
        
        if(!creep.memory.building){
            helpers.doWithdraw(creep);
        }
        else{
            if(!creep.memory.buildTarget){
                var closestSite = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
                creep.memory.buildTarget = closestSite ? closestSite.id : false;
            }
            else{
                if(creep.build(Game.getObjectById(creep.memory.buildTarget)) == ERR_NOT_IN_RANGE){
                    creep.moveTo(Game.getObjectById(creep.memory.buildTarget));
                }
                else{
                    creep.memory.buildTarget = false;
                }
            }
        }
    }
}

module.exports = role;