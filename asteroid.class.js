function Asteroid(type) {
	GameObject.call(this);
	
	this.asteroidType = "asteroid"+type.toUpperCase();
	this.isRecovering = false;
	this.timeRecovered = 0;
	this._RECOVERY = {
		"asteroidA":15,
		"asteroidB":6
	}
	this.velocity = {
		"asteroidA": 40,
		"asteroidB":65,
	};
	this.damageTaken = 0;
	this.damageMax = {
		"asteroidA":5,
		"asteroidB":3
	}
	this.rotation = 0;
	
	this.Init();
}

Asteroid.prototype = Object.create(GameObject.prototype);
Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.Init = function() {
	this.isAvailable = true;
	this.isRecovering = true;
	
	//this.image = s_hazards[this.asteroidType];
	this.image = new Sprite(spriteImage, s_hazards[this.asteroidType].x / 2, s_hazards[this.asteroidType].y / 2, s_hazards[this.asteroidType].width / 2, s_hazards[this.asteroidType].height / 2);
	this.timeRecovered = this._RECOVERY[this.asteroidType];
	this.setLocation();
}

Asteroid.prototype.Collision = function(object) {
	//Test THIS object's against another object and detect if the object is colliding.
	x1 = this.location.X;
	y1 = this.location.Y;
	w1 = this.image.width;
	h1 = this.image.height;
	
	x2 = object.location.X;
	y2 = object.location.Y;
	w2 = object.image.width;
	h2 = object.image.height;
	
	//Now test to see if the objects are colliding.
	if (
		x1 < x2 + w2 && 
		x1 + w1 > x2 &&
		y1 < y2 + h2 &&
		y1 + h1 > y2 &&
		this.damageTaken < this.damageMax[this.asteroidType]
	) {
		return true;
	}
	else {
		return false;
	}
}

Asteroid.prototype.CollisionActions = function() {
	this.damageTaken++;
	
	if (this.damageTaken >= this.damageMax[this.asteroidType]) {
		//This asteroid is destroyed
		this.isAvailable = false;
		this.isRecovering = true;
		this.setLocation();
	}
}
	
Asteroid.prototype.Update = function(delta) {
	if (this.isRecovering) {
		if (this.timeRecovered <= 0) {
			this.isAvailable = true;
			this.isRecovering = false;
			this.damageTaken = 0;
			this.timeRecovered = this._RECOVERY[this.asteroidType];
			this.rotation = Math.random() * 3;
			if (this.asteroidType == 'asteroidA') this.rotation / 2;
		}
		else {
			this.timeRecovered -= delta;
		}
	}
	else {
		this.Move(delta);
		
		if (isOffScreen(this.location.X, this.location.Y, this.image)) {
			//Reset the location of the shield
			this.setLocation();
		}
	}
	
	this.image.angle += this.rotation;
}

Asteroid.prototype.setLocation = function() {
	this.moveDirection = Math.floor(Math.random() * 4);
	switch (this.moveDirection) {
		case this.directions.right:
			//Go to the Right.
			x = -this.image.width;
			y = Math.floor(Math.random() * (gameHeight - this.image.height)) + this.image.height;
			break;
		case this.directions.down:
			//Go to the bottom.
			x = Math.floor(Math.random() * (gameHeight - this.image.width)) + this.image.width;
			y = -this.image.height;
			break;
		case this.directions.left:
			//Go to the Left.
			x = gameWidth  + this.image.width;
			y = Math.floor(Math.random() * (gameHeight - this.image.height)) + this.image.height;
			break;
		case this.directions.up:
			//Go to the top
			x = Math.floor(Math.random() * (gameHeight - this.image.width)) - this.image.width;
			y = gameHeight + this.image.height;
			break;
	}
	
	this.location.X = x;
	this.location.Y = y;
	this.isRecovering = true;
}

Asteroid.prototype.Move = function(delta) {
	switch (this.moveDirection) {
		case this.directions.right:
			this.location.X += delta * this.velocity[this.asteroidType];
			break;
		case this.directions.down:
			this.location.Y += delta * this.velocity[this.asteroidType];
			break;
		case this.directions.left:
			this.location.X -= delta * this.velocity[this.asteroidType];
			break;
		case this.directions.up:
			this.location.Y -= delta * this.velocity[this.asteroidType];
			break;
	}
}