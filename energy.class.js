function Energy() {
	GameObject.call(this)
	
	this.energy = 0;
	this._RESPAWN  = 12;
	this._RECOVERY = 12;
	this.respawnTime = 0;
	this.recoveryTime = 0;
	
	this.Init();
}

Energy.prototype = Object.create(GameObject.prototype);
Energy.prototype.constructor = Energy;

Energy.prototype.Init = function() {
	this.image = s_collectables.energy;
	
	x = Math.floor(Math.random() * (gameWidth - this.image.width));
	y = Math.floor(Math.random() * (gameHeight - this.image.height));
	
	this.location.X = x;
	this.location.Y = y;
	this.respawnTime = this._RESPAWN;
	this.recoveryTime = this._RECOVERY;
}

Energy.prototype.CollisionActions = function() {
	//No collision for Energy!
	this.isAvailable = false;
}

Energy.prototype.setLocation = function() {
	//Create location for the X and Y
	x = Math.floor(Math.random() * (gameWidth - this.image.width));
	y = Math.floor(Math.random() * (gameHeight - this.image.height));
	
	this.location.X = x;
	this.location.Y = y;
	this.energy = Math.ceil(Math.random() * 4);
}
	
Energy.prototype.Update = function(delta) {
	if (this.isAvailable) {
		if (this.respawnTime <= 0) {
			this.setLocation();
			this.respawnTime = this._RESPAWN;
		}
		else {
			this.respawnTime -= delta;
		}
	}
	else {
		if (this.recoveryTime <= 0) {
			this.recoveryTime = this._RECOVERY;
			this.respawnTime = this._RESPAWN;
			this.isAvailable = true;
			this.setLocation();
		}
		else {
			this.recoveryTime -= delta;
		}
	}
}
	
/*Energy.prototype.Draw = function(ctx) {
	if (this.isAvailable) {
		s_collectables.energy.draw(ctx, this.location.X, this.location.Y);
	}
	
	//Debug
	//ctx.fillText("X: "+this.location.X+", Y: "+this.location.Y, 0 ,30);
	//ctx.fillText("Time until respawn: "+this.respawnTime, 0, 60);
	//ctx.fillText("Time until recovery:" +this.recoveryTime, 0, 90);
}*/