var helpers = require('helpers');
 
var role = {
    run: function(creep){
        if(creep.carry.energy < creep.carryCapacity){
            helpers.doHarvesting(creep);
        }
        else{
            creep.drop(RESOURCE_ENERGY);
        }
    }
}

module.exports = role;