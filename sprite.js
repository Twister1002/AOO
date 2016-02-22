function Sprite(img, x, y, width, height) {
	this.img = img;
	this.x = x*2;
	this.y = y*2;
	this.width = width*2;
	this.height = height*2;
	this.opacity = 1;
	this.location  = { 
		"X":0,
		"Y":0
	};
	
	this.isFadeIn = false;
	this.isFadeOut = false;
	this.angle = 0;
	this._TORADIANS = Math.PI / 180;
}

Sprite.prototype.test = function (ctx, x ,y) {
	ctx.fillRect(x, y, this.width, this.height);
}

Sprite.prototype.draw = function (ctx, x ,y) {
	ctx.save();
    ctx.translate(x + this.width / 2, y + this.height / 2);
    ctx.rotate(this.angle * Math.PI / 180);
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
}

Sprite.prototype.point = function(ctx, x, y) {
	ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
}

Sprite.prototype.fadeIn = function() {
	this.isFadeIn = true;
	this.isFadeOut = false;
	this.opacity = 0;
}

Sprite.prototype.fadeOut = function() {
	this.isFadeOut = true;
	this.isFadeIn = false;
	this.opacity = 1;
}

Sprite.prototype.doneFading = function() {
	this.isFadeOut = false;
	this.isFadeIn = false;
}

Sprite.prototype.isDoneFading = function() {
	if (!this.isFadeOut && !this.isFadeIn) {
		return true;
	}
	else {
		return false;
	}
}

function Text(x ,y ,width, height) {
	this.x = x;
	this.y =y;
	this.width = width;
	this.height = height;
}

Text.prototype.draw = function(ctx, text) {
	drawX = 0;
	drawY = 0;
	
	text = text.toString();
	
	drawX = this.x + this.width / 2;
	drawY = this.y
	
	ctx.fillText(text, drawX, drawY);
}


Text.prototype.test = function(ctx) {
	ctx.fillRect(this.x, this.y, this.width, this.height);
}

function InitSprites(img) {
	s_logo = new Sprite(img, 0, 190, 375, 45);
	
	s_toolbar  = {
		"img":new Sprite(img, 0, 245, 800, 41)
	};
	
	s_text = {
		"level": new Text(115, 552, 33, 34),
		"exp": new Text(152, 552, 34, 35),
		"score": new Text(225, 552, 110, 30),
		"energy": new Text(780, (canvas.height - s_toolbar.img.height) + 50, 0, 0),
		"paused":new Text(gameWidth / 2, gameHeight / 2, 0, 0)
	}
	
	s_buttonHighlight = {
		"small": new Sprite(img, 85, 115, 66, 15),
		"big": new Sprite(img, 85, 135, 138, 15)
	};
	
	s_ships = {
		"cruiser":{
			"-1":new Sprite(img, 0, 0, 10, 10),
			0:new Sprite(img, 0, 0, 10, 10),
			3:new Sprite(img, 15, 0, 10, 10),
			2:new Sprite(img, 30, 0, 10, 10),
			1:new Sprite(img, 45, 0, 10, 10)
		}
	};
	
	s_hazards = {
		"mine":new Sprite(img, 60, 85, 10, 10),
		"ship": {
			0:new Sprite(img, 0, 11, 10, 10),
			3:new Sprite(img, 15, 11, 10, 10),
			2:new Sprite(img, 30, 11, 10, 10),
			1:new Sprite(img, 45, 11, 10, 10)
		},
		"asteroidA":new Sprite(img, 0, 30, 38, 38),
		"asteroidB":new Sprite(img, 42, 30, 25, 25),
		"missile":new Sprite(img, 8, 85, 5, 20),
		"newMine":new Sprite(img, 25, 85, 25, 25)
	};
	
	s_collectables = {
		"energy":new Sprite(img, 1, 70, 8, 11),
		"shield": new Sprite(img, 30, 70, 11, 11),
		"wreckage": new Sprite(img, 45, 70, 11, 11),
		"ore":{
			"normal":new Sprite(img, 60, 70, 11, 11),
			"rare":new Sprite(img, 75, 70, 11, 11)
		}
	};
	
	s_abilities = {
		"afterburner": {
			"img":new Sprite(img, 100, 0, 25, 25),
			"displayX":414,
			"displayY":(canvas.height - s_toolbar.img.height) + 5,
			"opacity":1,
		},
		"shields": {
			"img":new Sprite(img, 130, 0, 25, 25),
			"displayX":514,
			"displayY":(canvas.height - s_toolbar.img.height) + 5,
			"opacity":1,
		},
		"crusher": {
			"img":new Sprite(img, 70, 0, 25, 25),
			"displayX":613,
			"displayY":(canvas.height - s_toolbar.img.height) + 5,
			"opacity":1,
		}
	};
	
	s_offonSwitch = { 
		0:new Sprite(img, 0, 135, 65, 25), // True option OFF
		1:new Sprite(img, 0, 162, 65, 25) // False option ON
	};
	
	s_buttons = {
		"start":new Sprite(img, 0, 115, 80, 20)
	};
	
	image = new Image();
	image.src = "images/menus/creditsText.png";
	s_endCredits = new Sprite(image, 0, 0, 600 / 2, 750 / 2);
	
	InitBackgrounds();
}

function InitBackgrounds() {
	s_tierbackgrounds = {
		//This is only the location. We will actually have to load them in at one point.
		0:"",
		1:"images/backgrounds/tier1.png",
		2:"images/backgrounds/tier2.png",
		3:"images/backgrounds/tier3.png",
		4:"images/backgrounds/tier4.png",
		5:"images/backgrounds/tier5.png",
		6:"images/backgrounds/tier5.png",
		"field":"images/backgrounds/gameFence.png"
	}
	
	$.each(s_tierbackgrounds, function(i, e) {
		image = new Image();
		image.src = e;
		s_tierbackgrounds[i] = new Sprite(image, 0, 0, 800, 600);
	});
	
	InitMenus();
}

function InitMenus() {
	s_menuScreens = { 
		"menu":"images/menus/main.png",
		"options":"images/menus/optionsMenu.png",
		"controls":"images/menus/controlsMenu.png",
		"tutorial":"images/menus/tutorialPage1.png",
		"credits":"images/menus/creditsMenu.png"
	},
	
	$.each(s_menuScreens, function(i, e) {
		image = new Image();
		image.src = e;
		s_menuScreens[i] = new Sprite(image, 0, 0, 800, 600);
	});
	
	InitTutorials();
}

function InitTutorials() {
	s_tutorialScreen = {
		1:"images/menus/tutorialPage1.png",
		2:"images/menus/tutorialPage2.png",
		3:"images/menus/tutorialPage3.png",
		4:"images/menus/tutorialPage4.png",
	},
	
	$.each(s_tutorialScreen, function(i, e) {
		image = new Image();
		image.src = e;
		s_tutorialScreen[i] = new Sprite(image, 0, 0, 800, 600);
	});
}