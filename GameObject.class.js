function GameObject() {
	this.location = {
		"X": null,
		"Y": null
	};
	this.velocity = 0;
	this.image = null;
	this.isAvailable = false;
	this.isActive = true;
	this.moveDirection = -1;
	this.directions = {"up":0, "left":1, "down":2, "right":3};
}

GameObject.prototype.Init = function() {
	alert("I was not replaced!");
}

GameObject.prototype.Update = function(delta) { }

GameObject.prototype.CollisionActions = function(delta) { }

GameObject.prototype.Collision = function(object) {
	//Test THIS object's against another object and detect if the object is colliding.
	x1 = this.location.X - this.image.width / 2;
	y1 = this.location.Y - this.image.height / 2;
	w1 = this.image.width;
	h1 = this.image.height;
	
	x2 = object.location.X - object.image.width / 2;
	y2 = object.location.Y - object.image.height / 2;
	w2 = object.image.width;
	h2 = object.image.height;
	
	//Now test to see if the objects are colliding.
	if (
		x1 <= (x2 + w2) && 
		y1 <= (y2 + h2) &&
		(x1 + w1) >= x2 &&
		(y1 + h1) >= y2 &&
		this.isAvailable && this.isActive && object.isAvailable
	) {
		return true;
	}
	else {
		return false;
	}
}

GameObject.prototype.Move = function(delta) {
	switch (this.moveDirection) {
		case this.directions.up:
			this.location.Y -= this.velocity * delta;
			break;
		case this.directions.left:
			this.location.X -= this.velocity * delta;
			break;
		case this.directions.down:
			this.location.Y += this.velocity * delta;
			break;
		case this.directions.right:
			this.location.X += this.velocity * delta;
			break;
	}
}

GameObject.prototype.Draw = function(ctx) {
	if (this.image && this.isAvailable) {
		this.image.draw(ctx, this.location.X, this.location.Y);
	}
}