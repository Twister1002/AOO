function Sound() {
	this.point = null;
	this.damage = null;
	this.isMuted = false;
	
	this.Init();
}

Sound.prototype.Init = function() {
	this.point = new Audio("sounds/point.ogg");
	this.damage = new Audio("sounds/damage.ogg");
}

Sound.prototype.PlaySound = function(soundType) {
	if (!this.isMuted) {
		this[soundType.toLowerCase()].play();
	}
}

Sound.prototype.Mute = function() {
	this.isMuted = this.isMuted ? false : true;
}
