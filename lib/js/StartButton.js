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
							
							spriteTextures = StartButton.setFrameRate(StartButton.spriteSheet.spriteNameList, StartButton.speed).map(function(texture){
								return PIXI.Texture.fromFrame(texture);
							});
							/*
							spriteTextures.concat(this.spriteSheet.spriteNameList.reverse().map(function(texture){
								return PIXI.Texture.fromFrame(texture);
							}));
							*/
							var sprite = new PIXI.MovieClip(spriteTextures);
							
							sprite.buttonMode = true;
							sprite.position.x = StartButton.positionX;
							sprite.position.y = StartButton.positionY;
							sprite.anchor.x = 0.5;
							sprite.anchor.y = 0.5;
							sprite.interactive = true;
							sprite.click = function () {
									StartButton.stage.removeChild(sprite);
									StartButton.setAnimationState();
							};

							sprite.play();
							
							StartButton.stage.addChild(sprite);
					};
		
					//begin load
					loader.load();
			} catch(err){
					//console.log(err.message);
			}
		},
		setFrameRate: function(inArr, frameRate, noFade){
			// Do not set frame rate
			if((frameRate === 1) && (noFade === false)) {
				return inArr;
			} else {			
				var tmpArray = [];
				
				//this creates the fade in sequence
				for(var i = 0; i < inArr.length; i++){
					for(var x = 0; x < frameRate; x++){
						tmpArray.push(inArr[i]);
					}
				}
				// Skipping the fade
				if(noFade === false) {
					return tmpArray;
				} else {
					var _tmpArray = tmpArray.slice(0);
					//This creates the fade out
					tmpArray.reverse().map(function(i){
						_tmpArray.push(i);
					});

					return _tmpArray;
				}
			}
		}
	};
	return StartButton;
});