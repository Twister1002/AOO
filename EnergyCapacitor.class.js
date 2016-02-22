function EnergyCapacitor(player) {
	this.self = this;
	this.energyLevel = 0;
	this.maxEnergyLevel = 0;
	this.abilities = {
		90: { 
			"name":"afterburner",
			"isAvailable":false,
			"isActive":false,
			"requires":5,
			"cost":1,
			"speedIncrease": {
				"current": 0,
				"max": player._MOVESPEED,
				"min": player._MOVESPEED / 5
			},
			"time": {
				"max": 10,
				"min": 3,
				"timeLeft":0,
				"timeStart": 0
			}
		},
		88: { 
			"name":"shields",
			"isAvailable":false,
			"isActive":false,
			"requires":6,
			"cost":2,
			"shields": 0,
			"time": {
				"max": 0,
				"min": 0,
				"timeLeft":0,
				"timeStart": 0
			}
		},
		67: { 
			"name":"crusher",
			"isAvailable":false,
			"isActive":false,
			"requires":10,
			"cost":3,
			"oreRemoved": 0,
			"oreToRemove": 0,
			"oreRemoval": function(playerOre) {
				min = 5;
				max = playerOre - min;
				this.oreToRemove = (Math.floor(Math.random() * 8) +1) * (playerOre / 15);
				this.oreRemoved = 0;
			},
			"time": {
				"max": 0,
				"min": 0,
				"timeLeft":0,
				"timeStart": 0,
				"perOre":2.5
			}
		}
	};
	
	this.Init();
}

EnergyCapacitor.prototype = Object.create(EnergyCapacitor);
EnergyCapacitor.prototype.constructor = EnergyCapacitor;

EnergyCapacitor.prototype.Init = function() {
	this.energyLevel = 3;
	this.maxEnergyLevel = 7;
};

EnergyCapacitor.prototype.EnergyGained = function(amount) {
	this.energyLevel += amount;
	if (this.energyLevel > this.maxEnergyLevel) {
		this.energyLevel = this.maxEnergyLevel;
	}
};

EnergyCapacitor.prototype.AbilityUsed = function(abilityCode, playerOre) {
	ability = this.abilities[abilityCode];
	
	if (ability && ability.isAvailable && !ability.isActive && this.energyLevel >= ability.cost) {
		this.energyLevel -= ability.cost;
		s_abilities[ability.name].isFadeOut = true;
		ability.isActive = true;
		
		//Set the time of how long the ability runs for
		ability.time.timeLeft = Math.floor(Math.random() * (ability.time.max - ability.time.min)) + ability.time.min;
		ability.time.timeStart = ability.time.timeLeft;
		
		if (ability.name == "afterburner") {
			ability.speedIncrease.current = Math.floor(Math.random() *(ability.speedIncrease.max - ability.speedIncrease.min)) + ability.speedIncrease.min;
		}
		else if (ability.name == "shields") {
			//Max of 10 shields
			//Can result in 0 for a failure.
			ability.shields = Math.floor(Math.random() * 11);
		}
		if (ability.name == "crusher") {
			ability.oreRemoval(playerOre);
			ability.time.timeLeft = ability.time.perOre * ability.oreToRemove;
			ability.time.timeStart = ability.time.timeLeft;
		}
	}
};

EnergyCapacitor.prototype.Update = function(delta, player) {
	$.each(this.abilities, function(keycode, ability) {
		image = s_abilities[ability.name];
		
		if (ability.isActive) {	
			if (image.isFadeOut) {
				if (image.opacity <= 0.02) {
					image.isFadeIn = true;
					image.isFadeOut = false;
					image.opacity = 0;
				}
				else {
					image.opacity -= .015;
				}
			}
			else if (image.isFadeIn) {
				if (image.opacity >= 0.98) {
					image.isFadeIn = false;
					image.isFadeOut = true;
					image.opacity = 1;
				}
				else {
					image.opacity += .015;
				}
			}
			else {
				image.opacity = .5;
			}
			
			//Make reduce the time for this skill
			if (ability.time.timeLeft <= 0) {
				ability.isActive = false; //Time ran out!
				
			}
			else {
				ability.time.timeLeft -= delta;
			}
			
			if (ability.name == "afterburner") {
				//Add logic specifically for the speed increase
				player.speedBoost = ability.speedIncrease.current * (ability.time.timeLeft / ability.time.timeStart);
			}
			else if (ability.name == "shields") {
				player.GainShields(ability.shields);
				ability.shields = 0;
			}
			else if (ability.name == "crusher") {
				//Remove ore in a timely manner 
				if (Math.floor((ability.time.timeStart - ability.time.timeLeft) / ability.time.perOre) > ability.oreRemoved) {
					player.RemoveOre();
					ability.oreRemoved++;
					ability.oreToRemove--;
				}
			}
		}
		else if (player.ores.length < ability.requires || this.energyLevel < ability.cost) {
			ability.isAvailable = false;
			
			if (!ability.isActive) {
				image.opacity = .5;
			}
		}
		else {
			ability.isAvailable = true;
			image.opacity = 1;
		}
	}.bind(this));
}

EnergyCapacitor.prototype.Draw = function(ctx) {
	center = gameWidth / 2;
	
	ctx.fillText("OreRemoved: "+this.abilities[Keys.C].oreRemoved, center, 30);
	ctx.fillText("Crusher Time left: "+this.abilities[Keys.C].time.timeLeft, center, 60);
}