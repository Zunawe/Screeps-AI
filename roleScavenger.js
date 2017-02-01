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
    	    var pile = creep.room.find(FIND_DROPPED_ENERGY)[0];
    		if(creep.pickup(pile) == ERR_NOT_IN_RANGE){
    		    creep.moveTo(pile);
    		}
	    }
	    else{
		    if(!creep.memory['moveTarget']){
		        var targets = helpers.getUnfilledContainers(creep.room);
		        creep.memory['moveTarget'] = (targets[Math.floor(Math.random() * targets.length)] ? targets[0].id : null);
		    }
		    var transferTarget = Game.getObjectById(creep.memory['moveTarget']);
		    if(transferTarget){
    		    if(creep.transfer(transferTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
    		        creep.moveTo(transferTarget);
    		    }
    		    else{
    		        creep.memory['moveTarget'] = null;
    		    }
		    }
		    else{
		        creep.memory['moveTarget'] = null;
		    }
		}
	},
	
	getName: (function (){
	    var next = 0;
	    
	    return function (){
	        var nextName = '';
	        do{
	            nextName = 'Scavenger' + next++;
	        }while(Game.creeps[nextName]);
	        return nextName;
	    }
	}())
}

module.exports = role;