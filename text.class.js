function Text(x ,y ,width, height) {
	this.x = x;
	this.y =y;
	this.width = width;
	this.height = height;
	this.Init();
}

Text.prototype.Init = function() {
	s_text = {
		"level": new Text(125, canvas.height - s_toolbar.img.height, 25, 25),
		"exp": new Text(163, canvas.height - s_toolbar.img.height, 25, 25),
		"score": new Text(275, canvas.height - s_toolbar.img.height, 25, 25),
		"energy": new Text(770, (canvas.height - s_toolbar.img.height) + 15, 0, 0),
		"paused":new Text(gameWidth / 2, gameHeight / 2, 0, 0)
	}
}

Text.prototype.draw = function(ctx, text) {
	drawX = 0;
	drawY = 0;
	
	text = text.toString();
	textSize = 24;
	
	textLength = text.length * 21 // How big the text is
	drawX = this.x + ((this.width - textLength) / 2);
	drawY = this.y + 35;
	
	ctx.fillText(text, drawX, drawY);
}