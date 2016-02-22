function Missile(x, y) {
	GameObject.call(this);
	
	this.isActive = false;
	this.hasExploded = false;
	this.activeDelay = 3;
	this.activeTime = 0;
	this._VELOCITY = 75;
	this.velocity = 0;
	this.angle = 0;
	this.Init(x, y);
}

Missile.prototype = Object.create(GameObject.prototype);
Missile.prototype.constructor = Missile;

Missile.prototype.Init = function(x, y) {
	this.location.X = x;
	this.location.Y = y;
	this.velocity = this._VELOCITY;
	//this.image = s_hazards.missile;
	this.image = new Sprite(spriteImage, s_hazards.missile.x / 2, s_hazards.missile.y / 2, s_hazards.missile.width / 2, s_hazards.missile.height / 2);
	this.isAvailable = true;
	this.isActive = false;
}

Missile.prototype.CollisionActions = function() {
	this.isActive = false;
	this.isAvailable = false;
	this.hasExploded = true;
	return true;
}

Missile.prototype.Update = function(delta, playerLocation) {
	this.velocity -= .1;
	if (this.hasExploded) return false;
	
	if (this.velocity <= 0) {
		this.CollisionActions();
		return;
	}
	
	if (!this.isActive) {
		this.activeTime += delta;
		
		if (this.activeTime >= this.activeDelay) {
			this.isActive = true;
			this.isAvailable = true;
		}
	}
	
	//Move the missile in the direction of the player
	if (this.location.X != playerLocation.X) {
		if (this.location.X > playerLocation.X) {
			this.location.X -= delta * this.velocity;
		}
		else {
			this.location.X += delta * this.velocity;
		}
	}
	if (this.location.Y != playerLocation.Y) {
		if (this.location.Y > playerLocation.Y) {
			this.location.Y -= delta * this.velocity;
		}
		else {
			this.location.Y += delta * this.velocity;
		}
	}
	
	//We must rotate the missile to the direction of the playership.
	//dot = x1*x2 + y1*y2      # dot product
	//det = x1*y2 - y1*x2      # determinant
	//angle = atan2(det, dot)  # atan2(y, x) or atan2(sin, cos)
	angle = -Math.atan2(this.location.X - playerLocation.X,  this.location.Y - playerLocation.Y);
	this.image.angle = angle * (180 / Math.PI);
}