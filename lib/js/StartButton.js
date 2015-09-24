/* global define */
define('StartButton', ['PIXI'], function(PIXI){
	/**
	 * Class: StartButton
	 *
	 * Usage:
	 *
	 * Params:
	 * @stage:
	 * @spriteSheet
	 * @positionX
	 * @positionY
	 * @setAnimationState
	 **/
	var stage, spriteSheet, positionX, positionY, setAnimationState;
	var StartButton = {
		/**
		 * 
		 *
		 **/
		initialize: function(args){
			stage = args.stage;
			spriteSheet = args.spriteSheet;
			positionX = args.positionX;
			positionY = args.positionY;
			setAnimationState = args.setAnimationState;
		},
		/**
		 *
		 *
		 **/
		start: function() {
			// create a new loader
			try{
					var loader = new PIXI.AssetLoader(spriteSheet.spriteSheetLoader);
		
					loader.onComplete = function() {
					
							var spriteTextures = [];
							
							spriteTextures = spriteSheet.spriteNameList.map(function(texture){
								return PIXI.Texture.fromFrame(texture);
							});
							
							spriteTextures.concat(spriteSheet.spriteNameList.reverse(function(texture){
								return PIXI.Texture.fromFrame(texture);
							}));
							
							var sprite = new PIXI.MovieClip(spriteTextures);
							
							sprite.buttonMode = true;
							sprite.position.x = positionX;
							sprite.position.y = positionY;
							sprite.anchor.x = 0.5;
							sprite.anchor.y = 0.5;
							sprite.interactive = true;
							sprite.click = function () {
									stage.removeChild(sprite);
									setAnimationState();
							};

							sprite.play();
							
							stage.addChild(sprite);
					};
		
					//begin load
					loader.load();
			} catch(err){
					//console.log(err.message);
			}
		}
	};
	return StartButton;
});