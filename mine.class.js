function Mine(x, y, tier) {
	GameObject.call(this);
	
	this.hasExploded = false;
	this.radius = 0;
	this.activateDelay = 3;
	this.fade = {
		"in":false,
		"out":false,
		"opacity":0.000,
		"rate":0.010
	};
	
	this.Init(tier, x , y);
}

Mine.prototype = Object.create(GameObject.prototype);
Mine.prototype.constructor = Mine;

Mine.prototype.Init = function(tier, x, y) {
	this.image = s_hazards.mine;
	this.location.X = x;
	this.location.Y = y;
	this.hasExploded = false;
	this.isAvailable = true;
	this.isActive = false;
	
	//Set the range from the tier.
	if (tier >= 3) {
		this.radius = 35;
	}
	else {
		this.radius = 25;
	}
}
	
Mine.prototype.Collision = function(object) {
	//Test THIS object's against another object and detect if the object is colliding.
	x1 = this.location.X + this.image.width / 2;
	y1 = this.location.Y + this.image.height / 2;
	r1 = this.radius;
	
	//The object's X and Y need to be in the center for this collision detection
	x2 = object.location.X + object.image.width / 2;
	y2 = object.location.Y + object.image.height / 2;
	w2 = object.image.width;
	h2 = object.image.height;
	
	cdX = Math.abs(x1 - x2);
	cdY = Math.abs(y1 - y2);
	
	if (this.isActive && object.isAvailable && !this.hasExploded) {
		if (cdX > (w2 / 2 + r1)) {
			return false;
		}
		if (cdY > (h2 / 2 + r1)) {
			return false;
		}
		if (cdX <= w2 / 2)  {
			return true;
		}
		if (cdY <= h2 / 2) {
			return true;
		}
		
		cornerDistanceSq = Math.pow(cdX - w2 / 2, 2) + Math.pow(cdY - h2 / 2, 2);
		if (cornerDistanceSq <= Math.pow(r1, 2)) {
			return true;
		}
		else {
			return false;
		}
	}
	else {
		return false;
	}
}

Mine.prototype.CollisionActions = function() {
	this.hasExploded = true;
	this.isAvailable = false;
	this.isActive = false;
}

Mine.prototype.Update = function(delta) {
	//Nothing in this needs to update except a ring around the mine to show its range.
	if (!this.isActive) {
		this.activateDelay -= delta;
		
		if (this.activateDelay <= 0) {
			this.isActive = true;
			this.fade.in = true;
		}
	}
	else {
		if (this.fade.out) {
			if (this.fade.opacity <= 0.02) {
				this.fade.in = true;
				this.fade.out = false;
				this.fade.opacity = 0;
			}
			else {
				this.fade.opacity -= this.fade.rate;
			}
		}
		else if (this.fade.in) {
			if (this.fade.opacity >= .98) {
				this.fade.in = false;
				this.fade.out = true;
				this.fade.opacity = 1;
			}
			else {
				this.fade.opacity += this.fade.rate;
			}
		}
	}
}

Mine.prototype.Draw = function(ctx) {
	if (this.isAvailable && !this.hasExploded) {
		//create a ring around the mine.
		ctx.globalAlpha = this.fade.opacity;
		ctx.beginPath();
		ctx.arc(this.location.X + this.image.width / 2, this.location.Y + this.image.height / 2, this.radius, 0, 2*Math.PI);
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#FF0000';
		ctx.stroke();
		//Restore the alpha
		ctx.globalAlpha = 1;
		
		this.image.draw(ctx, this.location.X, this.location.Y);
	}
}