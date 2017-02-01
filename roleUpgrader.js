var helpers = require('helpers');

var role = {
    run: function(creep){
        if(creep.memory.upgrading && creep.carry.energy == 0){
            creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity){
            creep.memory.upgrading = true;
        }
        
        
        if(!creep.memory.upgrading){
            helpers.doWithdraw(creep);
        }
        else{
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller);
            }
        }
    },
	
	getName: (function (){
	    var next = 0;
	    
	    return function (){
	        var nextName = '';
	        do{
	            nextName = 'Upgrader' + next++;
	        }while(Game.creeps[nextName]);
	        return nextName;
	    }
	}())
}

module.exports = role;