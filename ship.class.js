function Ship() {
	GameObject.call(this);
	
	this._MOVESPEED = 275;
	this.velocity = 275;
	this.weight = 10;
	this.speedBoost = 0;
	this.ores = [];
	this.lastLocations = [];
	this.oreWeight = 4.25;
	this.shieldWeight = .2;
	this.shields = 0;
	
	this.Init();
}

Ship.prototype = Object.create(GameObject.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.Init = function() {
	this.location = {
		"X":gameWidth / 2,
		"Y":gameHeight / 2
	}
	this.isAvailable = true;
	this.image = s_ships.cruiser[this.moveDirection];
	this.shields += 5;
	this.velocity = this._MOVESPEED;
};

Ship.prototype.Update = function(delta) {
	this.velocity = this._MOVESPEED;
	this.velocity -= this.weight;
	this.velocity -= this.ores.length * this.oreWeight;
	this.velocity -= this.shieldWeight * this.shields;
	
	//Add on the speedboost!
	if (this.speedBoost > 0) {
		this.velocity += this.speedBoost;
	}
	
	if (this.velocity <= this.weight) this.velocity = this.weight;
	this.Move(delta);
	//Player was moved. Lets keep track of its locations.
	this.lastLocations.unshift({"X":this.location.X, "Y":this.location.Y});
	//Now keep the array holding only the ore array + 1;
	this.lastLocations.slice(this.ores.length + 1, this.lastLocations.length);
	
	
	//Along with moving the player forward, the ores need to move with it.
	this.MoveOres(delta);
}

Ship.prototype.MoveOres = function(delta) { 
	for (i = 0; i < this.ores.length; i++) {
		ore = this.ores[i];
		locationToX = 0;
		locationToY = 0;
		move = (this._MOVESPEED - 50) * delta;
		
		
		//Just move the location of the ore to the last location of the of lastLocations.
		
		
		
		//Loop backwards and set the position the the location of the trail - 1;
		
		/* if (i == 0) {
			locationToX = ore.location.X - (this.location.X);
			locationToY = ore.location.Y - this.location.Y;
		}
		else {
			locationToX = ore.location.X - (this.ores[i - 1].location.X);
			locationToY = ore.location.Y - (this.ores[i - 1].location.Y);
		}
		
		switch (ore.moveDirection) {
			case this.directions.up:
				if (locationToY > 0) {
					if (Math.abs(locationToY) <= move) {
						//Take the location of the previous ore.
						ore.location.Y ;
					}
					else {
						ore.location.Y += -move;
					}
				}
				else {
					if (locationToY < 0) ore.moveDirection = this.directions.down;
					else if (locationToX < 0) ore.moveDirection = this.directions.left;
					else if (locationToX > 0) ore.moveDirection = this.directions.right;
				}
				break;
			case this.directions.down:
				if (locationToY < 0) {
					if (Math.abs(locationToY) <= move) {
						//Take the location of the previous ore.
						ore.location.Y += locationToY;
					}
					else {
						ore.location.Y += move;
					}
				}
				else {
					if (locationToY > 0) ore.moveDirection = this.directions.up;
					else if (locationToX < 0) ore.moveDirection = this.directions.left;
					else if (locationToX > 0) ore.moveDirection = this.directions.right;
				}
				break;
			case this.directions.left:
				if (locationToX < 0) {
					if (Math.abs(locationToX) <= move) {
						//Take the location of the previous ore.
						ore.location.X += -locationToX;
					}
					else {
						ore.location.X += move;
					}
				}
				else {
					if (locationToX > 0) ore.moveDirection = this.directions.right;
					else if (locationToY > 0) ore.moveDirection = this.directions.up;
					else if (locationToY < 0) ore.moveDirection = this.directions.down;
				}
				break;
			case this.directions.right:
				if (locationToX > 0) {
					if (Math.abs(locationToX) <= move) {
						//Take the location of the previous ore.
						ore.location.X += locationToX;
					}
					else {
						ore.location.X += -move;
					}
				}
				else {
					if (locationToX < 0) ore.moveDirection = this.directions.left;
					else if (locationToY < 0) ore.moveDirection = this.directions.down;
					else if (locationToY > 0) ore.moveDirection = this.directions.up;
				}
				break;
		} */
	}
}

Ship.prototype.CollisionActions = function() {
	this.shields--;
	
	if (this.shields < 0) {
		PlayerShipExploded();
	}
};

Ship.prototype.GainShields = function(amount) {
	this.shields += amount;
}

Ship.prototype.ChangeDirection = function(direction) {
	this.moveDirection = direction;
	this.image = s_ships.cruiser[this.moveDirection];
};

Ship.prototype.Trail = function(collectedOre) {
	ore = {
		"location": {
			"X":collectedOre.location.X,
			"Y":collectedOre.location.Y
		},
		"moveDirection":this.moveDirection,
		"image":new Sprite(spriteImage, collectedOre.image.x / 2, collectedOre.image.y / 2, collectedOre.image.width / 2, collectedOre.image.height / 2),
		"bounds" : {
			"X": collectedOre.image.width / 2,
			"Y": collectedOre.image.height / 2
		}
	};
	ore.image.angle = collectedOre.image.angle;
	this.ores.push(ore);
}

Ship.prototype.RemoveOre = function() {
	this.ores.shift();
}

Ship.prototype.Draw = function(ctx) {
	this.image.draw(ctx, this.location.X, this.location.Y);
	//ctx.fillText("Shields: "+this.shields, 30, 30);
	
	$.each(this.ores, function(i, ore) {
		if (i < this.shields) {
			//Draw the Ore with the shield
			ore.image.draw(ctx, ore.location.X, ore.location.Y);
			s_collectables.shield.draw(ctx, ore.location.X, ore.location.Y);
		}
		else {
			//Draw the Ore only
			ore.image.draw(ctx, ore.location.X, ore.location.Y);
		}
	}.bind(this));
}