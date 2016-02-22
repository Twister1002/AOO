function EnemyShip() {
	GameObject.call(this);
	
	this.velocity = 80;
	this._RECOVERY = 7;
	this.timeRecovered = 0;
	this.isRecovering = false;
	this.mine = {
		"location": {
			"X":0,
			"Y":0
		}
	}
	this.missile = {
		"location": {
			"X":0,
			"Y":0
		}
	}
	
	this.Init();
}

EnemyShip.prototype = Object.create(GameObject.prototype);
EnemyShip.prototype.constructor = EnemyShip;

EnemyShip.prototype.Init = function() {
	this.moveDirection = 0;
	this.image = s_hazards.ship[this.moveDirection];
	this.isAvailable = true;
}

EnemyShip.prototype.CollisionActions = function() {
	if (this.isAvailable) {
		CreateWreckage(this.location.X, this.location.Y);
		this.isAvailable = false;
		this.isRecovering = true;
		this.setLocation();
	}
}
	
EnemyShip.prototype.Update = function(delta) {
	if (this.isRecovering) {
		if (this.timeRecovered <= 0) {
			this.isRecovering = false;
			this.isAvailable = true;
			this.timeRecovered = 7;
		}
		else {
			this.timeRecovered -= delta;
		}
	}
	else {
		this.Move(delta);
		
		if (isOffScreen(this.location.X, this.location.Y, this.image)) {
			this.setLocation();
			this.isRecovering = true;
		}
	}
}

EnemyShip.prototype.setLocation = function() {
	//Reset the location of the shield
	this.moveDirection = Math.floor(Math.random() * 4);
	this.image = s_hazards.ship[this.moveDirection];
	switch (this.moveDirection) {
		case this.directions.up:
			//Go to the top.
			x = Math.floor(Math.random() * (gameHeight - this.image.width)) - this.image.width;
			y = gameHeight + this.image.height;
			
			this.mine.location.X = x;
			this.mine.location.Y = Math.floor(Math.random() * (gameHeight - s_hazards.mine.height)) + s_hazards.mine.height;
			
			this.missile.location.X = x;
			this.missile.location.Y = Math.floor(Math.random() * (gameHeight - s_hazards.mine.height)) + s_hazards.mine.height;
			break;
		case this.directions.right:
			//Go to the right.
			x = -this.image.width;
			y = Math.floor(Math.random() * (gameHeight - this.image.height)) + this.image.height;
			
			this.mine.location.X = Math.floor(Math.random() * (gameWidth - s_hazards.mine.width)) + s_hazards.mine.width;
			this.mine.location.Y = y;
			
			this.missile.location.X = Math.floor(Math.random() * (gameWidth - s_hazards.mine.width)) + s_hazards.mine.width;
			this.missile.location.Y = y;
			break;
		case this.directions.down:
			//Go to the bottom.
			x = Math.floor(Math.random() * (gameHeight - this.image.width)) + this.image.width;
			y = -this.image.height;
			
			this.mine.location.X = x;
			this.mine.location.Y = Math.floor(Math.random() * (gameHeight - s_hazards.mine.height)) + s_hazards.mine.height;
			
			this.missile.location.X = x;
			this.missile.location.Y = Math.floor(Math.random() * (gameHeight - s_hazards.mine.height)) + s_hazards.mine.height;
			break;
		case this.directions.left:
			//Go to the left.
			x = gameWidth  + this.image.width;
			y = Math.floor(Math.random() * (gameHeight - this.image.height)) + this.image.height;
			
			this.mine.location.X = Math.floor(Math.random() * (gameWidth - s_hazards.mine.width)) + s_hazards.mine.width;
			this.mine.location.Y = y;
			
			this.missile.location.X = Math.floor(Math.random() * (gameWidth - s_hazards.mine.width)) + s_hazards.mine.width;
			this.missile.location.Y = y;
			break;
	}
	
	this.location.X = x;
	this.location.Y = y;
}
	
EnemyShip.prototype.Move = function(delta) {
	switch (this.moveDirection) {
		case this.directions.right:
			this.location.X += delta * this.velocity;
			break;
		case this.directions.down:
			this.location.Y += delta * this.velocity;
			break;
		case this.directions.left:
			this.location.X -= delta * this.velocity;
			break;
		case this.directions.up:
			this.location.Y -= delta * this.velocity;
			break;
	}
	
	if (Math.floor(this.location.X) == this.mine.location.X && Math.floor(this.location.Y) == this.mine.location.Y) {
		ShipPlacedMine(this.location.X, this.location.Y);
	}
	
	if (Math.floor(this.location.X) == this.missile.location.X && Math.floor(this.location.Y) == this.missile.location.Y) {
		FireMissile(this.location.X, this.location.Y);
	}
}

//EnemyShip.prototype.Draw = function(ctx) {
//	this.image.draw(ctx, this.location.X, this.location.Y);
//	ctx.fillText("X: "+this.location.X+", Y: "+this.location.Y, 40, 30);
//	ctx.fillText("Recovery time: "+this.timeRecovered, 40, 60);
//}