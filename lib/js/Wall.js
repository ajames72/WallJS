/*global define, requestAnimFrame */
define('Wall', ['jQuery', 'PIXI', 'StartButton', 'BrickTexture', 'Brick'], function($, PIXI, StartButton, BrickTexture, Brick){
	
	'use strict';
	/**
	* Class: Wall
	*
	* Usage: 
	* 
	* Params:
	* @bricks = [],
	* @wallSize: 	used for comparison to check if all bricks have been triggered
	* @count: 		count how many bricks have been triggered
	* @xRowOffset: 	offset every second row to give brick laying effect
	* @yRowOffset:
	* @wallXPosition:
	* @wallYPosition: 	empty array that will be a holder for the animating brick sprites. 
	*					We can use this to test against the wall as a test to trigger the nest brick for animation
	* @slidingBrick:
	* @startRow:
	* @startCol:
	* @wallRows:
	* @wallCols:
	* @sb:
	* @textureWidth:
	* @textureHeight:
	* @textureSrc:
	* @complete:
	* @canvasProperties:
	*/
	var bricks = [],
	wallSize = 0,
	count = 0,
	xRowOffset = 0,
	yRowOffset = 0,
	wallXPosition = 0,
	wallYPosition = 0,
	slidingBrick = [],
	startRow = 0,
	startCol = 0,
	wallRows = 0,
	wallCols = 0,
	sb = 0,
	textureWidth = 0,
	textureHeight = 0,
	textureSrc = [],
	complete = false,
	canvasProperties = {
		height: null,
		width: null
	};

	//Extending Sprite class to set animation flag
	PIXI.Sprite.prototype.animating = false;

	PIXI.Sprite.prototype.flagOnAnimation = function () {
		this.animating = true;
	};

	PIXI.Sprite.prototype.flagOffAnimation = function () {
		this.animating = false;
	};

	PIXI.Sprite.prototype.isAnimating = function () {
		return this.animating;
	};

	$.fn.AddWallAnimation = function(properties){

		var anim_state = 0;
		var ANIM_STATE_NONE = 0;
		var ANIM_STATE_WALL = 1;
		var ANIM_STATE_WALL_OPEN = 2;
		var ANIM_STATE_NEXT = 3;
		var stage = new PIXI.Stage(0x000000, true); //new interactive stage with black background
		var renderer = null;
		
		var startButtonPosition = Wall.initialize(properties);
		StartButton.initialize({'stage': stage,
			'spriteSheet': properties.startButtonSpriteSheet,
			'positionX': startButtonPosition.x,
			'positionY': startButtonPosition.y,
			'setAnimationState': function(){
				// Start the wall animation when the user clicks the start button
				anim_state = ANIM_STATE_WALL;
			},
			'speed': properties.startButtonSpriteSheet.speed
		});
		StartButton.start();

		var frames = 0;     //animation frames

		var self = this;
		function animate() {

			if(!complete){
				//Animate until complete
				requestAnimFrame(animate);
			} else {
				//When the animation is complete, remove from the page
				self.remove();
			}

			//state machine to control which animations are played out
			switch (anim_state) {
				case ANIM_STATE_NONE:

					break;
				case ANIM_STATE_WALL:
					
					Wall.startWallAnimation();
					anim_state = ANIM_STATE_WALL_OPEN;

					break;
				case ANIM_STATE_WALL_OPEN:
					
					frames++;

					if (!Wall.animateWall(frames)) {
						anim_state = ANIM_STATE_NEXT;
					}
					
					break;
				case ANIM_STATE_NEXT:
					complete = true;
					break;
			}
			renderer.render(stage);
		}

		//The background is transparent. We can then include a background image
		renderer = PIXI.autoDetectRenderer(Wall.wallWidth(), Wall.wallHeight(), null, true);  
		this.append(renderer.view); //place the canvas in the element tags
		renderer.view.style.position = "absolute";
		renderer.view.style.top = "0px";
		renderer.view.style.left = "0px";

		//Add the wall to the stage
		for (var rows = 0; rows < bricks.length; rows++) {
			for (var cols = 0; cols < bricks[rows].length; cols++, wallSize++) {
				stage.addChild(bricks[rows][cols].component);
			}
		}

		//start the animation
		requestAnimFrame(animate);

	};
	/**
	 *
	 *
	 **/
	var parseIntProperty = function(val){
		if(typeof val !== 'undefined'){
			var i = parseInt(val);
			if(!isNaN(i)){
				return i;
			} else {
				return null;
			}
		} else {
			return null;
		}
	};
	
	var Wall = {

		/**
		 *
		 *
		 **/
		initialize: function(args){
			//TODO: This function is way too big, needs to be split up
			bricks = args.bricks || [];
			wallSize = args.wallSize || 0;
			count = args.count || 0;
			xRowOffset = args.xRowOffset || 0;
			yRowOffset = args.yRowOffset || 0;
			wallXPosition = args.wallXPosition || 0;
			wallYPosition = args.wallYPosition || 0;
			slidingBrick = args.slidingBrick || [];
			startRow = args.startRow || 0;
			startCol = args.startCol || 0;
			wallRows = args.wallRows || 0;
			wallCols = args.wallCols || 0;
			sb = args.sb || 0;
			textureWidth = args.textureWidth || 0;
			textureHeight = args.textureHeight || 0;
			Wall.setCanvasProperties(args.canvas);

			// TODO: Load from sprite sheet
			// Create textures to be added to the stage
			if(args.textureSrc instanceof Array){
				textureSrc = args.textureSrc.map(function(texture){
					return new BrickTexture(texture, textureHeight, textureWidth);
				});
			} else {
				textureSrc = [];
			}

			// Set cordiantes where the brick textures will be positioned on the stage
			var brickXPos = wallXPosition + xRowOffset;
			var brickYPos = wallYPosition + yRowOffset;
			var startButtonPosX, startButtonPosY = 0;

			//prep the wall
			for (var row = 0; row < wallRows; row++) {
				bricks[row] = [];

				for (var col = 0; col < wallCols; col++) {
					//Generate random number to add random brick texture
					var randomIndex = 0;
					if (textureSrc.length > 1) {
						randomIndex = Math.floor(Math.random() * textureSrc.length);
					}

					//add the brick to the wall
					var brick = new Brick(row, col, brickXPos, brickYPos, textureSrc[randomIndex].texture);

					//We want to animate the bricks left and right
					if (col <= startCol) {
						brick.slideRight = false;
					}
					//Set the position of where the start button should overlay
					if (row === startRow && col === startCol) {
						startButtonPosX = brickXPos;
						startButtonPosY = brickYPos;
					}

					bricks[row].push(brick);

					brickXPos += parseInt(textureWidth);
				}//end col

				//Next row
				if (row % 2 === 0) {
					brickXPos = 0;
				} else {
					brickXPos = parseInt(xRowOffset);
				}

				brickYPos += parseInt(textureHeight);
			}

			return { x : startButtonPosX, y : startButtonPosY };
		},
		setCanvasProperties: function(properties){
			if(typeof properties !== 'undefined'){
				canvasProperties.height = parseIntProperty(properties['height']);
				canvasProperties.width = parseIntProperty(properties['width']);
			}
		},
		/**
		 * calculate the width of the wall using pixel width of a single texture image and multiply by the number of columns
		 * Params: none
		 * Return: pixel width of the entire wall
		 **/
		wallWidth: function(){
			if(canvasProperties.width !== null){
				return canvasProperties.width;
			} else {
				return wallCols * textureWidth;
			}
		},
		/**
		 *
		 * Params: none
		 * Return: pixel height of the entire wall
		 **/
		wallHeight: function(){
			if(canvasProperties.height !== null){
				return canvasProperties.height;
			} else {
				return wallRows * textureHeight;
			}
		},
		/**
		 * Sets the brick object in the bricks array to start animating
		 * Params:
		 * @row: row index where brick object is located
		 * @column: column index where brick object is located
		 * Return: none
		 **/
		startBrickAnimating: function(row, column){
			if((row < bricks.length) && (column < bricks[row].length)){
				this.animateBrick(bricks[row][column]);
			}
		},
		/**
		 * Sets the specified brick object to animate and adds to the slidingBrick array
		 * Params:
		 * @brick: Brick object to animate
		 * Return: true if the brick object has started animating, false if currently animating
		 **/
		animateBrick: function(brick){
			if (!brick.component.isAnimating()) {
				brick.component.flagOnAnimation();
				count++;
				slidingBrick.push(brick);
				return true;
			}
			
			return false;
		},
		/**
		 * Triggers surrounding brick objects to start animating
		 * Params:
		 * @row: row index where brick object is located
		 * @column: column index where brick object is located
		 **/
		triggerAdjacentBricks: function(row, column){
			if ((row < bricks.length) && !bricks[row][column].component.isAnimating()) {
				this.startBrickAnimating(row, column);
			}
			if (((row + 1) < bricks.length) && !bricks[row + 1][column].component.isAnimating()) {
				this.startBrickAnimating((row + 1), column);
			}
			if (((row - 1) >= 0) && !bricks[row - 1][column].slideFlag) {
				this.startBrickAnimating((row - 1), column);
			}
			if (((column + 1) < bricks[row].length) && !bricks[row][column + 1].component.isAnimating()) {
				this.startBrickAnimating(row, (column + 1));
			}
			if (((column - 1) >= 0) && !bricks[row][column - 1].component.isAnimating()) {
				this.startBrickAnimating(row, (column - 1));
			}
		},
		/**
		 * Start the wall animating event
		 * Params: none
		 **/
		startWallAnimation: function(){
			this.startBrickAnimating(startRow, startCol);
		},
		/**
		 * Slide the bricks off the page
		 * Params:
		 * @frames: the frame counter
		 **/
		animateWall: function(frames){
			//Chosen to slide bricks off the screen
			//Could have used a PIXI.MovieClip to animate bricks or combination of both 
			if (count > 0) {
				for (var i = 0; i < slidingBrick.length; i++) {
					var r = slidingBrick[i].row;
					var c = slidingBrick[i].column;
					bricks[r][c].moveBrick();
				}
			} else {
				//animate initial brick
				this.startWallAnimation();
			}

			if ((frames % 7) === 0) {
				//trigger 3 * wall animations, otherwise waiting too long to complete
				for (var _i = 0; _i < 3; _i++) {
					if (this.getNextBrick()) {
						return false;
					}
				}
			}

			//animation complete
			return true;
		},
		/**
		 * Logic for finding the next bricks to animate
		 *
		 **/
		getNextBrick: function(){

			if (count < wallSize) {
				//wall is animating
				if (sb < slidingBrick.length) {
					this.triggerAdjacentBricks(slidingBrick[sb].row, slidingBrick[sb].column);
					sb++;
				}
			} else {
				return true;
			}

			return false;
		},
		/**
		 * Check if the identified brick is visible on the stage
		 *
		 **/
		checkPosition: function(brick){
			if (brick.component.positionX > this.wallWidth() || brick.component.positionX < (0 - textureWidth)){
				return true;
			} else {
				return false;
			}
		},
	};

	return Wall;
});