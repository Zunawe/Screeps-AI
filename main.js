var helpers = require('helpers');

var roleMiner = require('roleMiner');
var roleScavenger = require('roleScavenger');
var roleHarvester = require('roleHarvester');
var roleUpgrader = require('roleUpgrader');
var roleBuilder = require('roleBuilder');
var roleHandycreep = require('roleHandycreep');

const MINER_PARTS = [WORK, WORK, MOVE, CARRY];
const SCAVENGER_PARTS = [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY];
const HARVESTER_PARTS = [WORK, MOVE, CARRY];
const BUILDER_PARTS = [WORK, WORK, MOVE, MOVE, CARRY];
const UPGRADER_PARTS = [WORK, WORK, MOVE, MOVE, CARRY];
const HANDYCREEP_PARTS = [WORK, MOVE, CARRY];

const NUM_MINERS = 4;
const NUM_SCAVENGERS = 4;
const NUM_HARVESTERS = 0;
const NUM_BUILDERS = 3;
const NUM_UPGRADERS = 3;
const NUM_HANDYCREEPS = 1;

module.exports.loop = function(){
	for(var creepName in Memory.creeps){
		if(!Game.creeps[creepName]){
			delete Memory.creeps[creepName];
		}
	}
	
	var spawner = Game.spawns['Spawn1'];

	var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
	var scavengers = _.filter(Game.creeps, (creep) => creep.memory.role == 'scavenger');
	var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
	var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
	var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
	var handycreeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'handycreep');
	
	if(scavengers.length < NUM_SCAVENGERS){
	    if(spawner.canCreateCreep(SCAVENGER_PARTS, undefined) == OK){
	        var newName = spawner.createCreep(SCAVENGER_PARTS, roleScavenger.getName(), {role: 'scavenger'});
	        console.log('Spawn1: created creep ' + newName + ' with role "scavenger"');
	    }
	}
	else if(miners.length < NUM_MINERS){
	    if(spawner.canCreateCreep(MINER_PARTS, undefined) == OK){
	        var newName = spawner.createCreep(MINER_PARTS, roleMiner.getName(), {role: 'miner'});
	        console.log('Spawn1: created creep ' + newName + ' with role "miner"');
	    }
	}
	else if(harvesters.length < NUM_HARVESTERS){
	    if(spawner.canCreateCreep(HARVESTER_PARTS, undefined) == OK){
	        var newName = spawner.createCreep(HARVESTER_PARTS, roleHarvester.getName(), {role: 'harvester'});
	        console.log('Spawn1: created creep ' + newName + ' with role "harvester"');
	    }
	}
	else if(upgraders.length < NUM_UPGRADERS){
	    if(spawner.canCreateCreep(UPGRADER_PARTS, undefined) == OK){
	        var newName = spawner.createCreep(UPGRADER_PARTS, roleUpgrader.getName(), {role: 'upgrader'});
	        console.log('Spawn1: created creep ' + newName + ' with role "upgrader"');
	    }
	}
	else if(builders.length < NUM_BUILDERS){
	    if(spawner.canCreateCreep(BUILDER_PARTS, undefined) == OK){
	        var newName = spawner.createCreep(BUILDER_PARTS, roleBuilder.getName(), {role: 'builder'});
	        console.log('Spawn1: created creep ' + newName + ' with role "builder"');
	    }
	}
	else if(handycreeps.length < NUM_HANDYCREEPS){
	    if(spawner.canCreateCreep(HANDYCREEP_PARTS, undefined) == OK){
	        var newName = spawner.createCreep(HANDYCREEP_PARTS, roleHandycreep.getName(), {role: 'handycreep'});
	        console.log('Spawn1: created creep ' + newName + ' with role "handycreep"');
	    }
	}

	for(var creepName in Memory.creeps){
		var creep = Game.creeps[creepName];
		switch(creep.memory.role){
			case 'miner':
			    roleMiner.run(creep);
			    break;
			case 'scavenger':
			    roleScavenger.run(creep);
			    helpers.expandRoad(creep);
			    break;
			case 'harvester':
			    roleHarvester.run(creep);
			    break;
			case 'builder':
			    roleBuilder.run(creep);
			    break;
			case 'upgrader':
			    roleUpgrader.run(creep);
			    helpers.expandRoad(creep);
			    break;
			case 'handycreep':
			    roleHandycreep.run(creep);
			    break;
			default:
			    creep.say('No Role');
		}
	}
}