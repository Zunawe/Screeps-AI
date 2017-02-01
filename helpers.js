const MIN_SPAWN_ENERGY = 300;

module.exports = {
    expandRoad: function (creep){
        if(creep.room.lookAt(creep).filter((obj) => (obj.type === 'structure') && obj.structure instanceof StructureRoad).length == 0){
            if(creep.room.lookAtArea(creep.pos.y - 1, creep.pos.x - 1, creep.pos.y + 1, creep.pos.x + 1, true).filter((obj) => (obj.type === 'structure') && obj.structure instanceof StructureRoad).length >= 1){
                creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
            }
        }
    },
    
    getUnfilledContainers: function (searchRoom){
        var primaryTargets = searchRoom.find(FIND_STRUCTURES, {filter: (structure) => {
            return (structure instanceof StructureSpawn || structure instanceof StructureExtension) && (structure.energy < structure.energyCapacity);
        }});
        if(primaryTargets.length != 0){
            return primaryTargets;
        }
        return searchRoom.find(FIND_STRUCTURES, {filter: (structure) => {
            return structure instanceof StructureContainer && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
        }});
    },
    
    getEnergizedContainers: function (room){
        return room.find(FIND_STRUCTURES, {filter: (structure) => {
            return (structure instanceof StructureExtension && structure.energy > 0) ||
            (structure instanceof StructureSpawn && structure.energy > MIN_SPAWN_ENERGY) ||
            (structure instanceof StructureContainer && structure.store[RESOURCE_ENERGY] > 0);
        }});
    },
    
    doWithdraw: function (creep){
        if(!creep.memory.energyTarget){
            var nextStructure = creep.pos.findClosestByPath(this.getEnergizedContainers(creep.room));
            
            creep.memory.energyTarget = nextStructure ? nextStructure.id : null;
        }
        else{
            if(creep.withdraw(Game.getObjectById(creep.memory['energyTarget']), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.getObjectById(creep.memory['energyTarget']));
            }
            else{
                creep.memory.energyTarget = null;
            }
        }
    },
    
    findAvailableSource: function (searchRoom){
        var sources = searchRoom.find(FIND_SOURCES);
        var mostSpaces = Number.NEGATIVE_INFINITY;
        var mostAvailableIndex = 0;
        for(var s = 0; s < sources.length; ++s){
            var spaces = 0;
            var miners = 0;
            for(var i = -1; i <= 1; ++i){
                for(var j = -1; j <= 1; ++j){
                    var lookPosition = new RoomPosition(sources[s].pos.x + i, sources[s].pos.y + j, searchRoom.name);
                    if(Game.map.getTerrainAt(lookPosition) != 'wall'){
                        ++spaces;
                        if(lookPosition.lookFor(LOOK_CREEPS)){
                            ++miners;
                        }
                    }
                }
            }
            if(spaces - miners > mostSpaces){
                mostSpaces = spaces - miners;
                mostAvailableIndex = s;
            }
        }
        return sources[mostAvailableIndex];
    }
};