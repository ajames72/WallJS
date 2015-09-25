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

});