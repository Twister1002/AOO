function Shield() {
	GameObject.call(this);
	
	this.velocity = 75;
	this._RECOVERY = 7;
	this.isRecovering = false;
	this.timeRecovered = 0;
	
	this.Init();
}

Shield.prototype = Object.create(GameObject.prototype);
Shield.prototype.constructor = Shield;

Shield.prototype.Init = function() {
	this.isAvailable = true;
	this.image = s_collectables.shield;
	this.setLocation();
}

Shield.prototype.CollisionActions = function() {
	this.setLocation();
}

Shield.prototype.setLocation = function() {
	//Reset the location of the shield
	this.moveDirection = Math.floor(Math.random() * 4);
	switch (this.moveDirection) {
		case this.directions.right:
			//Go to the right
			x = -s_collectables.shield.width;
			y = Math.floor(Math.random() * (gameHeight - s_collectables.shield.height)) + s_collectables.shield.height;
			break;
		case this.directions.down:
			//Go to the bottom
			x = Math.floor(Math.random() * (gameHeight - s_collectables.shield.width)) + s_collectables.shield.width;
			y = -s_collectables.shield.height;
			break;
		case this.directions.left:
			//Go to the left
			x = gameWidth  + s_collectables.shield.width;
			y = Math.floor(Math.random() * (gameHeight - s_collectables.shield.height)) + s_collectables.shield.height;
			break;
		case this.directions.up:
			//Go to the top
			x = Math.floor(Math.random() * (gameHeight - s_collectables.shield.width)) - s_collectables.shield.width;
			y = gameHeight + s_collectables.shield.height;
			break;
	}
	
	this.location.X = x;
	this.location.Y = y;
	this.isRecovering = true;
}

Shield.prototype.Update = function(delta) {
	if (this.isRecovering) {
		if (this.timeRecovered <= 0) {
			this.isRecovering = false;
			this.timeRecovered = this._RECOVERY;
		}
		else {
			this.timeRecovered -= delta;
		}
	}
	else {
		this.Move(delta);
		
		if (isOffScreen(this.location.X, this.location.Y, s_collectables.shield)) {
			this.setLocation();
		}
	}
}