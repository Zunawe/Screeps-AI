var helpers = require('helpers');

var role = {
	run: function(creep){
	    if(creep.memory.building && creep.carry.energy == 0){
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy > (creep.carryCapacity * 0.7)){
            creep.memory.building = true;
        }
        
		if(creep.memory.building){
		    if(!creep.memory['moveTarget']){
		        var conSite = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
		        creep.memory['moveTarget'] = conSite ? conSite.id : null;
		    }
		    var buildTarget = Game.getObjectById(creep.memory['moveTarget']);
		    if(buildTarget instanceof ConstructionSite){
    		    if(creep.build(buildTarget) == ERR_NOT_IN_RANGE){
    		        creep.moveTo(buildTarget);
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
	            nextName = 'Builder' + next++;
	        }while(Game.creeps[nextName]);
	        return nextName;
	    }
	}())
}

module.exports = role;