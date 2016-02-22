function Images(imgPath) {
	this.img = img;
	
	this.Init();
}

Images.prototype.Init = function() {
	image = new Image();
	image.src = this.img;
	this.img = image;
}

Images.prototype.drawImage = function(x ,y) {
	
}

function LoadImages() {
	s_tierbackgrounds = {
		1:"images/backgrounds/tier1.png",
		2:"images/backgrounds/tier2.png",
		3:"images/backgrounds/tier3.png",
		4:"images/backgrounds/tier4.png",
		5:"images/backgrounds/tier5.png",
		6:"images/backgrounds/tier5.png",
		"field":"images/backgrounds/gameFence.png"
	};
	
	s_menuScreens = { 
		"menu":"images/menus/main.png",
		"options":"images/menus/optionsMenu.png",
		"controls":"images/menus/controlsMenu.png",
		"tutorial":"images/menus/tutorialPage1.png",
		"credits":"images/menus/creditsMenu.png"
	};
	
	s_tutorialScreen = {
		1:"images/menus/tutorialPage1.png",
		2:"images/menus/tutorialPage2.png",
		3:"images/menus/tutorialPage3.png",
		4:"images/menus/tutorialPage4.png",
	};
	
	$.each(s_tierbackgrounds, function(i, e) {
		s_tierbackgrounds[i] = new Images(this);
	});
	
	$.each(s_menuScreens, function(i, e) {
		s_menuScreens[i] = new Images(this);
	});
	
	$.each(s_tutorialScreen, function(i, e) {
		s_tutorialScreen[i] = new Images(this);
	});
}