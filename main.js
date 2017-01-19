var builderRole = require('role.builder');
var harvesterRole = require('role.harvester');
var minerRole = require('role.miner');
var scavengerRole = require('role.scavenger');
var handycreepRole = require('role.handycreep');
var upgraderRole = require('role.upgrader');

const MAX_BUILDERS = 2;
const MAX_HARVESTERS = 1;
const MAX_MINERS = 4;
const MAX_SCAVENGERS = 4;
const MAX_HANDYCREEPS = 2;
const MAX_UPGRADERS = 3;

module.exports.loop = function(){
    
    for(var creepName in Memory.creeps){
        if(!Game.creeps[creepName]){
            delete Memory.creeps[creepName];
        }
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.my && creep.memory.role == 'harvester');
    var scavengers = _.filter(Game.creeps, (creep) => creep.my && creep.memory.role == 'scavenger');
    var miners = _.filter(Game.creeps, (creep) => creep.my && creep.memory.role == 'miner');
    var builders = _.filter(Game.creeps, (creep) => creep.my && creep.memory.role == 'builder');
    var handycreeps = _.filter(Game.creeps, (creep) => creep.my && creep.memory.role == 'handycreep');
    var upgraders = _.filter(Game.creeps, (creep) => creep.my && creep.memory.role == 'upgrader');
    if(miners.length < MAX_MINERS && miners.length < scavengers.length){
        if(Game.spawns['Spawn1'].canCreateCreep([WORK, WORK, WORK/*, WORK*/, CARRY, MOVE], undefined) == OK){
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK/*, WORK*/, CARRY, MOVE], undefined, {role: 'miner'});
            console.log('Created miner: ' + newName);
            for(var creepName in harvesters){
                harvesters[creepName].memory.role = 'scavenger';
                console.log('Reassigned ' + creepName + ' to scavenger');
            }
        }
    }
    /*if(harvesters.length < MAX_HARVESTERS && miners.length == 0){
        if(Game.spawns['Spawn1'].canCreateCreep([WORK, CARRY, MOVE], undefined) == OK){
            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester'});
            console.log('Created harvester: ' + newName);
        }
    }*/
    else if(scavengers.length < MAX_SCAVENGERS){
        if(Game.spawns['Spawn1'].canCreateCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined) == OK){
            var newName = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'scavenger'});
            console.log('Created scavenger: ' + newName);
        }
    }
    else if(upgraders.length < MAX_UPGRADERS){
        if(Game.spawns['Spawn1'].canCreateCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined) == OK){
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: 'upgrader'});
            console.log('Created upgrader: ' + newName);
        }
    }
    else if(builders.length < MAX_BUILDERS){
        if(Game.spawns['Spawn1'].canCreateCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined) == OK){
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: 'builder'});
            console.log('Created builder: ' + newName);
        }
    }
    else if(handycreeps.length < MAX_HANDYCREEPS){
        if(Game.spawns['Spawn1'].canCreateCreep([WORK, WORK, CARRY, MOVE], undefined) == OK){
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'handycreep'});
            console.log('Created handycreep: ' + newName);
        }
    }
    
    for(var creepName in Game.creeps){
        var creep = Game.creeps[creepName];
        
        switch(creep.memory.role){
            case 'builder':
                builderRole.run(creep);
                break;
            case 'harvester':
                harvesterRole.run(creep);
                /*if(creep.room.lookAt(creep)){
                    creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
                }*/
                break;
            case 'miner':
                minerRole.run(creep);
                break;
            case 'scavenger':
                scavengerRole.run(creep);
                /*if(creep.room.lookAt(creep)){
                    creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
                }*/
                break;
            case 'handycreep':
                handycreepRole.run(creep);
                if(creep.room.lookAt(creep).filter((obj) => (obj.type === 'structure') && obj.structure instanceof StructureRoad).length == 0){
                    if(creep.room.lookAtArea(creep.pos.y - 1, creep.pos.x - 1, creep.pos.y + 1, creep.pos.x + 1, true).filter((obj) => (obj.type === 'structure') && obj.structure instanceof StructureRoad).length >= 1){
                        creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
                    }
                }
                break;
            case 'upgrader':
                upgraderRole.run(creep);
                if(creep.room.lookAt(creep).filter((obj) => (obj.type === 'structure') && obj.structure instanceof StructureRoad).length == 0){
                    if(creep.room.lookAtArea(creep.pos.y - 1, creep.pos.x - 1, creep.pos.y + 1, creep.pos.x + 1, true).filter((obj) => (obj.type === 'structure') && obj.structure instanceof StructureRoad).length >= 1){
                        creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
                    }
                }
                break;
            default:
                creep.say('No Role');
        }
    }
}