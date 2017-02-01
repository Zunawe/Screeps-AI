var helpers = require('helpers');

var role = {
	run: function(creep){
	    if(creep.memory.repairing && creep.carry.energy == 0){
            creep.memory.repairing = false;
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity){
            creep.memory.repairing = true;
        }
        
		if(creep.memory.repairing){
		    if(!creep.memory['moveTarget']){
		        var target = creep.room.find(FIND_STRUCTURES).reduce(function (a, b){
		            return b.hitsMax && (b.hits / b.hitsMax < a.hits / a.hitsMax) ? b : a
		        });
		        console.log(target.hitsMax);
		        creep.memory['moveTarget'] = target ? target.id : null;
		    }
		    var repairTarget = Game.getObjectById(creep.memory['moveTarget']);
		    if(repairTarget && (repairTarget.hits < repairTarget.hitsMax)){
    		    if(creep.repair(repairTarget) == ERR_NOT_IN_RANGE){
    		        creep.moveTo(repairTarget);
    		    }
		    }
		    else{
		        creep.memory['moveTarget'] = null;
		    }
		}
		else{
		    helpers.doWithdraw(creep);
		}
	},
	
	getName: (function (){
	    var next = 0;
	    
	    return function (){
	        var nextName = '';
	        do{
	            nextName = 'Handycreep' + next++;
	        }while(Game.creeps[nextName]);
	        return nextName;
	    }
	}())
}

module.exports = role;