var doHarvesting = function(creep){
    var sources = creep.room.find(FIND_SOURCES);
    if(creep.harvest(sources[parseInt(creep.id.charAt(0), 16) % sources.length]) == ERR_NOT_IN_RANGE){
        /*var path = creep.room.findPath(creep.pos, sources[0].pos, {ignoreCreeps: true});
        creep.moveByPath(path);*/
        creep.moveTo(sources[parseInt(creep.id.charAt(0), 16) % sources.length]);
    }
}

var doScavenging = function(creep){
    var piles = creep.room.find(FIND_DROPPED_ENERGY);
    if(creep.pickup(piles[0]) == ERR_NOT_IN_RANGE){
        /*var path = creep.room.findPath(creep.pos, sources[0].pos, {ignoreCreeps: true});
        creep.moveByPath(path);*/
        creep.moveTo(piles[0]);
    }
}

var doWithdraw = function(creep){
    if(!creep.memory.energyTarget){
        var nextStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {
            return structure instanceof StructureContainer && structure.store['energy'] > 0;
        }})
        || 
        creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (structure) => {
            return structure instanceof StructureExtension && structure.energy > 0;
        }});
        
        creep.memory.energyTarget = nextStructure ? nextStructure.id : false;
    }
    else{
        if(creep.withdraw(Game.getObjectById(creep.memory.energyTarget), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(Game.getObjectById(creep.memory.energyTarget));
        }
        else{
            creep.memory.energyTarget = false;
        }
    }
}

var pickRandom = function(list){
    var index = Math.floor(Math.random() * list.length);
    return list[index];
}

module.exports.doHarvesting = doHarvesting;
module.exports.doScavenging = doScavenging;
module.exports.doWithdraw = doWithdraw;
module.exports.pickRandom = pickRandom;