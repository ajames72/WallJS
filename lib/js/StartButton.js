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
	//var stage, spriteSheet, positionX, positionY, setAnimationState, speed;
	
	
	
	var StartButton = {
		stage: undefined,
		spriteSheet: undefined,
		positionX: undefined,
		positionY: undefined,
		setAnimationState: undefined,
		speed: undefined,
		/**
		 * 
		 *
		 **/
		initialize: function(args){
			this.stage = args.stage;
			this.spriteSheet = args.spriteSheet;
			this.positionX = args.positionX || 0;
			this.positionY = args.positionY || 0;
			this.setAnimationState = args.setAnimationState;
			this.speed = parseInt(args.speed) || 1;
			
			if((isNaN(this.speed)) || (this.speed < 1)){
				this.speed = 1;
			}
		},
		/**
		 *
		 *
		 **/
		start: function() {
			// create a new loader
			try{
					var loader = new PIXI.AssetLoader(this.spriteSheet.spriteSheetLoader);
		
					loader.onComplete = function() {
					
							var spriteTextures = [];
							
							spriteTextures = this.spriteSheet.spriteNameList.map(function(texture){
								return PIXI.Texture.fromFrame(texture);
							});
							
							spriteTextures.concat(this.spriteSheet.spriteNameList.reverse().map(function(texture){
								return PIXI.Texture.fromFrame(texture);
							}));
							
							var sprite = new PIXI.MovieClip(spriteTextures);
							
							sprite.buttonMode = true;
							sprite.position.x = this.positionX;
							sprite.position.y = this.positionY;
							sprite.anchor.x = 0.5;
							sprite.anchor.y = 0.5;
							sprite.interactive = true;
							sprite.click = function () {
									this.stage.removeChild(sprite);
									this.setAnimationState();
							};

							sprite.play();
							
							this.stage.addChild(sprite);
					};
		
					//begin load
					loader.load();
			} catch(err){
					//console.log(err.message);
			}
		},
		setSpriteTextures: function(){
			var spriteNameList = [];
			
			for(var i = 0; i < this.spriteSheet.spriteNameList.length; i++){
				for(var x = 0; x < this.speed; x++){
					spriteNameList.push(this.spriteSheet.spriteNameList[i]);
				}
			}
			
			var spriteTextures = [];
								
			spriteTextures = spriteNameList.map(function(texture){
				return PIXI.Texture.fromFrame(texture);
			});
								
			spriteTextures.concat(spriteNameList.reverse().map(function(texture){
				return PIXI.Texture.fromFrame(texture);
			}));
			
			return spriteTextures;
		}
	};
	return StartButton;
});