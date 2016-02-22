function Ore(tier) {
	GameObject.call(this);
	
	this.velocity = 0;
	this.speed = {
		"min":15,
		"max":55,
	}
	this.rotation = 0;
	this.rare = false;
	this.exp = 0;
	this._POINTS = 50;
	this.points = 0;
	this.dest = {
		"X":-50, 
		"Y":-50
	};
	
	this.Init(tier);
}

Ore.prototype = Object.create(GameObject.prototype);
Ore.prototype.constructor = Ore;

Ore.prototype.Init = function(tier) {
	//Determine if this is a rare ore!
	if (((Math.random() * 100) + 1) >= 80) {
		this.rare = true;
		this.image = s_collectables.ore.rare;
		
		//How many EXP is this ore worth?
		this.exp = Math.floor((Math.random() * 4) + tier);
		this.points =  this._POINTS * this.exp;
	}
	else {
		this.rare = false;
		this.exp = 1;
		this.points =  this._POINTS
		this.image = s_collectables.ore.normal;
	}
	
	if (isNaN(this.exp) || isNaN(this.points)) {
		throw new Excpetion("This ore is bad!");
	}
	
	this.isAvailable = true;
	this.velocity = this.speed.min;
	this.rotation = Math.random() * 3;
	this.setDestination();
	this.setStartLocation();
}
	
Ore.prototype.Update = function(delta) {
	//Round the location variables for detection of movement
	x = Math.floor(this.location.X);
	y = Math.floor(this.location.Y);
	
	if (x == this.dest.X && y == this.dest.Y) {
		this.setDestination();
	}
	
	if (y != this.dest.Y) {
		//What direction is the Y?
		if (this.dest.Y > y) {
			//The Y is greater. We need to move the Ore down
			this.moveDirection = this.directions.down
		}
		else if (this.dest.Y < y){
			//The Y is less. We need to move the ore up
			this.moveDirection = this.directions.up
		}
		else {
			this.location.Y = this.dest.Y;
			this.moveDirection = -1;
		}
	}
	this.Move(delta); //Move the Ore in the Y direction
	
	if (x != this.dest.X) {
		//What direction is the X?
		if (this.dest.X > x) {
			//Move the ore to the right
			this.moveDirection = this.directions.right
		}
		else if (this.dest.X < x){
			//Move the ore to the left
			this.moveDirection = this.directions.left
		}
		else {
			this.location.X = this.dest.X;
			this.moveDirection = -1;
		}
	}
	this.Move(delta);//Now move the ore in the X direction
	
	//Increase the Ore's move speed
	if (this.velocity <= this.speed.max){
		this.velocity += .03;
	} 
	else {
		this.velocity = this.speed.max;
	}
	
	this.image.angle += this.rotation;
}
	
Ore.prototype.CollisionActions = function(tier) {
	this.Init(tier);
}

Ore.prototype.setDestination = function() {
	//The ore got to its location, reset its destination, and go
	x = Math.floor(Math.random() * (gameWidth - this.image.width)) + this.image.width;
	y = Math.floor(Math.random() * (gameHeight - this.image.height)) + this.image.height;
	
	this.dest.X = x;
	this.dest.Y = y;
}

Ore.prototype.setStartLocation = function() {
	//Where should the Ore start from?
	startLocation = Math.floor(Math.random() * 4);
	x = 0;
	y = 0;
	
	switch (startLocation) {
		case 0: //Start from the top
			x = Math.floor(Math.random() * gameWidth);
			y = -this.image.height;
			break;
		case 1: //Start from the right
			x = gameWidth + this.image.width;
			y = Math.floor(Math.random() * gameHeight);
			break;
		case 2: //Start from the bottom
			x = Math.floor(Math.random() * gameWidth);
			y = gameHeight + this.image.height;
			break;
		case 3: //Start from the left
			x = -this.image.width;
			y = Math.floor(Math.random() * gameHeight);
			break;
	}
	
	this.location.X = x;
	this.location.Y = y;
}