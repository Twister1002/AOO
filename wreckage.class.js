function Wreckage(x, y) {
	GameObject.call(this);

	this.velocity = 0;
	this.points = 150;
	this.moveDirection = -1;
	this.location.X = x;
	this.location.Y = y;
	
	this.Init();
}

Wreckage.prototype = Object.create(GameObject.prototype);
Wreckage.prototype.constructor = Wreckage;

Wreckage.prototype.Init = function(x, y) {
	this.isAvailable = true;
	this.image = s_collectables.wreckage;
}

Wreckage.prototype.CollisionActions = function() {
	return false;
}