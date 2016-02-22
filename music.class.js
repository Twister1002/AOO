function Music() {
	this.tier = {
		1:"sounds/tier1.ogg",
		2:"sounds/tier2.ogg",
		3:"sounds/tier3.ogg",
		4:"sounds/tier4.ogg",
		5:"sounds/tier5.ogg",
		6:"sounds/victory.ogg",
		"finish": "sounds/tierFinish.ogg"
	};
	this.intro = {
		"main":"sounds/intro.ogg",
		"loop":"sounds/introLoop.ogg"
	};
	this.gameOver = "sounds/gameOver.ogg";
	this.audio = null;
	this.isMuted = false;
	this.isPlaying = false;
	
	this.Init();
}

Music.prototype.Init = function() {
	this.audio = new Audio();
}

Music.prototype.PlayIntro = function() {
	if (this.audio.src.indexOf(this.intro.main) == -1) {
		this.audio = new Audio(this.intro.main);
		this.Play(false, .2);
	}
}

Music.prototype.PlayMainMenu = function() {
	if (this.audio.src.indexOf(this.intro.loop) == -1) {
		this.audio.pause();
		
		this.audio = new Audio(this.intro.loop);
		this.Play(true, .2);
	}
}

Music.prototype.PlayTier = function(tierNum) {
	if (this.audio.src.indexOf(this.tier[tierNum]) == -1) {
		this.audio.pause();
		
		if (this.tier.hasOwnProperty(tierNum)) {
			this.audio = new Audio(this.tier[tierNum]);
			this.Play(true, .2);
		}
		else {
			console.log("Tier " + tierNum +" was not found.");
		}
	}
}

Music.prototype.PlayGameOver = function() {
	if (this.audio.src.indexOf(this.gameOver) == -1) {
		this.audio.pause();
		
		this.audio = new Audio(this.gameOver);
		this.Play(true, .7);
	}
}

Music.prototype.PlayEnd = function() {
	if (this.audio.src.indexOf(this.victory) == -1) {
		this.audio.pause();
		
		this.audio = new Audio(this.victory);
		this.Play(true, .5);
	}
}

Music.prototype.Play = function(isReplayable, volume) {
	if (!volume) volume = .5;
	
	if (!this.isPlaying) {
		if (!this.isMuted) {
			this.audio.volume = volume;
			this.audio.play();
			
			if (isReplayable) {
				if (typeof this.audio.loop == 'boolean') {
					this.audio.loop = true;
				}
				else {
					this.audio.addEventListener("ended", function() {
						this.audio.currentTime = 0;
						this.audio.play();
					}.bind(this));
				}
			}
		}
		else {
			this.audio.pause;
			this.isPlaying = false;
		}
	}
}

Music.prototype.Mute = function() {
	this.isMuted = this.isMuted ? false : true;
	if (this.isMuted) {
		this.isPlaying = false;
		this.audio.pause();
		this.audio.currentTime = 0;
	}
	else {
		this.Play();
	}
}
