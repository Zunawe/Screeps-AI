#Overview
This is some fairly basic AI without much rigorous optimization or attempt at strategy. At least in the current state. A single-room colony can succesfully sustain itself with a bit of help to get it started. Changing population sizes, body part lists, and other similar toggles are managed with constants and single lines of code that can be commented or moved.

As a general rule, a creep withdrawing energy will prioritize containers and storage. If they can't find anything there, they will move to extensions. As a last resort, it's possible they may remove energy from the spawner. A creep that deposits energy will work with the opposite priority.

A creep role may be assigned road construction. For this, any time they spend a tick on a position adjacent to a fully built road, they will drop another road construction site. This means that after a road is placed initially by the user, the creeps build roads along the paths they use most frequently. These roads tend to widen more than necessary, as builders clutter the highway as they build it which diverts road constructors and causes further expansion of the road.

#Roles
Each creep is spawned with a role defined for it. Each role has a set of body parts to be used with that role.

###Harvester
Creeps that navigate to a source in the room, fill their carry capacity with energy, and return that energy to the room's spawn, extensions, or storage containers. These creeps are meant as a low-cost recovery that can get a decimated colony back on its feet. They should be replaced by miners and scavengers ASAP.

###Miner
A miner's job is to remove energy from a resource and then drop it on the ground. Its body parts should be allocated almost exclusively to WORK, as it won't move much and is dropping what it collects. Miners are meant to be paired with scavengers.

###Scavenger
Scavengers search for piles of resources on the ground and transport them to appropriate containers. Parts should be mostly MOVE and CARRY. While they can perform a function on their own, they're meant to be paired with miners who drop their resources on the ground for scavengers to transport.

###Builder
As expected, builders take energy from storage and use it to build structures.

###Upgrader
Upgraders take energy from storage and upgrade the room controller. This task is probably the most important role aside from resource collection.

###Handycreep
Structures that decay are repaired by handycreeps. A handycreep will fill its energy capacity and then fully repair the structure in the room that has lost the largest percentage of its hits. It may collect more energy mid-repair, but it will return to that structure until it is fully repaired.
