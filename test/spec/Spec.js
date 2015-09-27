define(['require', 'jQuery', 'PIXI', 'Wall', 'Brick', 'BrickTexture'], function (require, jQuery, PIXI, Wall, Brick, BrickTexture) {
	describe("Wall Classes", function(){

		/*
			TODO: Complete tests
		*/
	
		it("should describe Brick contructor", function(){
			var brick = new Brick(0, 0, 0, 0, PIXI.Texture.fromImage("lib/img/brick_03.png"));
			expect(brick instanceof Brick).toBe(true);
			expect(brick.constructor === Brick).toBe(true);
		});
		
		it("should describe BrickTexture constructor", function(){
			var brickTexture = new BrickTexture("img/Bricks/brick_old_1_03.png", 25, 75);
			expect(brickTexture instanceof BrickTexture).toBe(true);
			expect(brickTexture.constructor === BrickTexture).toBe(true);
			expect(brickTexture.texture).not.toBe(null);
		});
		
		it("should test wall functions", function(){
			Wall.initialize({'wallCols' : 4, 'textureWidth': 25});
			expect(Wall.wallWidth()).toBe(100);
		});
	});
	
	describe("Wall", function(){
		describe("Wall Settings", function(){
			
			var properties;
			
			beforeEach(function(){
				properties = {
					// The rows and width is measured in the number of icons
					wallRows: 6,
					wallCols: 10,
					// This is the icon in the wall where the start button should overlay
					startRow: 2,
					startCol: 3,
					// The img src path is relative to the html page
					textureSrc: [
						'img/Bricks/brick_old_03.png',
						'img/Bricks/brick_old_1_03.png',
						'img/Bricks/brick_old_2_03.png',
						'img/Bricks/brick_old_4_03.png',
						'img/Bricks/brick_old_5_03.png'
					],
					// The texture height and width of the textureSrc.
					// This can be smaller that the actual height and width in order to overlap icons
					textureWidth: 225,
					textureHeight: 70,
					// The xRowOffset offsets every second row to give brick laying effect
					xRowOffset: -100,
					// The yRowOffset 
					yRowOffset: 35,
					startButtonSpriteSheet: {
						spriteSheetLoader : ["img/BrickHilight/brickhilight.json"],
						spriteNameList : [
							"brickHi_A1.png",
							"brickHi_A2.png",
							"brickHi_A3.png",
							"brickHi_A4.png",
							"brickHi_A5.png",
							"brickHi_A6.png",
							"brickHi_A7.png",
							"brickHi_A8.png",
						],
						speed: 4
					},
					canvas: {
						height: '100px',
						width: '200px'
					}
				};
				
				Wall.initialize(properties);
				
			});
			
			afterEach(function(){
			
			});
			
			it("should test wall canvas height", function(){
				expect(Wall.wallHeight()).toBe(100);
			});
			
			it("should test wall canvas width", function(){
				expect(Wall.wallWidth()).toBe(200);
			});
			
		});
	});
	
	describe("StartButton", function(){
	
		var StartButton = require('StartButton');
		
		describe("StartButton speed property", function(){
			beforeEach(function(){

			});
			
			afterEach(function(){
			
			});
			
			it("should test startbutton speed", function(){			
				StartButton.initialize({
					'speed': 4
				});
				expect(StartButton.speed).toBe(4);
			});
			
			it("should test invalid startbutton speed values", function(){
				StartButton.initialize({
					'speed': -1
				});
				expect(StartButton.speed).toBe(1);
			});
			
			it("should test invalid startbutton speed values", function(){
				StartButton.initialize({
					'speed': 'Not A Number'
				});
				expect(StartButton.speed).toBe(1);
			});
		});
		
		describe("setSpriteTextures array", function(){
			beforeEach(function(){
				StartButton.initialize({
					'stage': null,
					'spriteSheet': {
						spriteSheetLoader : ["img/BrickHilight/brickhilight.json"],
						spriteNameList : [
							"brickHi_A1.png",
							"brickHi_A2.png",
							"brickHi_A3.png",
							"brickHi_A4.png",
							"brickHi_A5.png",
							"brickHi_A6.png",
							"brickHi_A7.png",
							"brickHi_A8.png",
						],
					},
					'positionX': 0,
					'positionY': 0,
					'setAnimationState': function(){

					},
					'speed': 4
				});
			});
			
			afterEach(function(){
			
			});
			
			it("should test startbutton speed", function(){			
				expect(StartButton.speed).toBe(4);
			});
			
			it("should test number of items in the spriteTextures array", function(){
				var spriteTexturesArray = [];
				var expectedSize = StartButton.spriteSheet.spriteNameList.length;
				// spriteNameList * 2 - this includes the reverse fade,
				expectedSize *= 2;
				// * 4 - this is the speed of the fade
				expectedSize *= StartButton.speed;
				
				spriteTexturesArray = StartButton.setFrameRate(StartButton.spriteSheet.spriteNameList, StartButton.speed);
				
				expect(spriteTexturesArray.length).toBe(expectedSize);
			});
			
			it("should only allow fade in", function(){
				var spriteTexturesArray = [];
				var expectedSize = StartButton.spriteSheet.spriteNameList.length;
				// * 4 - this is the speed of the fade
				expectedSize *= StartButton.speed;
				
				spriteTexturesArray = StartButton.setFrameRate(StartButton.spriteSheet.spriteNameList, StartButton.speed, false);
				
				expect(spriteTexturesArray.length).toBe(expectedSize);
			});
			
		});
	});

});