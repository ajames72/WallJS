define(['require', 'jQuery', 'PIXI', 'Wall', 'Brick', 'BrickTexture'], function (require, jQuery, PIXI, Wall, Brick, BrickTexture) {
	describe("Wall Classes", function(){
	
		it("should describe Brick contructor", function(){
			var brick = new Brick(0, 0, 0, 0, PIXI.Texture.fromImage("lib/img/brick_03.png"));
			expect(brick instanceof Brick).toBe(true);
			expect(brick.constructor === Brick).toBe(true);
			//console.log(brick.column);
		});
		
		it("should describe BrickTexture constructor", function(){
			var brickTexture = new BrickTexture("img/Bricks/brick_old_1_03.png", 25, 75);
			expect(brickTexture instanceof BrickTexture).toBe(true);
			expect(brickTexture.constructor === BrickTexture).toBe(true);
			expect(brickTexture.texture).not.toBe(null);
		});
		
		it("should test wall functions", function(){
			//Wall['wallCols'] = 4;
			//Wall['textureWidth'] = 25;
			Wall.initialize({'wallCols' : 4, 'textureWidth': 25});
			expect(Wall.wallWidth()).toBe(100);
		});
		/*
		it("should describe StartButton constructor", function(){
			var startButton = new StartButton();
			expect(startButton instanceof StartButton).toBe(true);
			expect(startButton.constructor === StartButton).toBe(true);
		});
		
		it("should describe HARRYPOTTER constructor", function(){
			var hp = new HARRYPOTTER();
			expect(hp instanceof HARRYPOTTER).toBe(true);
			expect(hp.constructor === HARRYPOTTER).toBe(true);
		});*/
	});
/*
	describe("class Brick", function(){
		it("should move the brick", function(){
			expect(PIXI.Texture.fromImage("C:\\Users\\Lenovo\\Documents\\workspace\\Bak\\HarryPotterBak\\app\\img\\Bricks\\brick_old_1_03.png") instanceof PIXI.Texture);
			var texture = PIXI.Texture.fromImage("C:/Users/Lenovo/Documents/workspace/Bak/HarryPotterBak/app/img/Bricks/brick_old_1_03.png");
			var brick = new Brick(0, 0, 0, 0, texture);
			brick.slideRight = true;
			expect(brick.slideRight).toBe(true);
			//expect(brick.component).not.toBe(null);
			//expect(brick.component instanceof PIXI.Sprite).toBe(true);
			//expect(brick.component.position.x).toBe(0);
		});
	});*/

});