var helpers = require('helpers');

var role = {
	run: function(creep){
		if(creep.carry[RESOURCE_ENERGY] < creep.carryCapacity){
		    if(!creep.memory['sourceTarget']){
		        creep.memory['sourceTarget'] = helpers.findAvailableSource(creep.room).id;
		    }
		    var source = Game.getObjectById(creep.memory['sourceTarget']);
		    if(creep.harvest(source) == ERR_NOT_IN_RANGE){
		        creep.moveTo(source);
		    }
		}
		else{
		    if(!creep.memory['moveTarget']){
		        creep.memory['moveTarget'] = helpers.getUnfilledContainer(creep.pos).id || null;
		    }
		    var transferTarget = Game.getObjectById(creep.memory['moveTarget']);
		    if(creep.transfer(transferTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
		        creep.moveTo(transferTarget);
		    }
		}
	},
	
	getName: (function (){
	    var next = 0;
	    
	    return function (){
	        var nextName = '';
	        do{
	            nextName = 'Harvester' + next++;
	        }while(Game.creeps[nextName]);
	        return nextName;
	    }
	}())
}

module.exports = role;