function Level(tierListener) {
	this.exp = 0;
	this.requiredEXP = 0;
	this.level = 0;
	this.tier = 0;
	this.tierUpListener = tierListener;
	
	this.Init = function() {
		//this.level = 1;
		//this.tier = 1;
		//this.requiredEXP = this.level + 1;
		
		this.EXPGain(1);
	}
	
	this.EXPGain = function(amount) {
		this.exp += amount;
		
		//The requiredEXP should always be 1 + level
		if (this.exp >= this.requiredEXP) {
			this.level++;
			this.exp -= this.requiredEXP;
			this.requiredEXP = this.level + 2
			
			//Check if the user has upgraded in the tiers.
			//If so we need to call the listener
			if (this.tier != this.getTier()) {
				this.tierUpListener(this.tier);
			}
			
			this.EXPGain(0); // Recursion just for testing
		}
	}
	
	this.getTier = function() {
		if (this.level >= 1 && this.level <= 5) {
			return this.tier = 1;
		}
		else if (this.level >= 6 && this.level <= 10) {
			return this.tier = 2;
		}
		else if (this.level >= 11 && this.level <= 15) {
			return this.tier = 3;
		}
		else if (this.level >= 16 && this.level <= 20) {
			return this.tier = 4;
		}
		else if (this.level >= 21 && this.level <= 25) {
			return this.tier = 5;
		}
		else {
			return this.tier = 6;
		}
	}
	
	this.getRequiredEXP = function() {
		return this.requiredEXP - this.exp;
	}
	
	this.Init();
}