/* global define */
define('Brick', ['PIXI'], function(PIXI){

	var Brick = function(row, column, positionX, positionY, texture) {
			/**
			 * @property slideRight
			 * @description flag to set direection the image should slide off screen; false slides left
			 * @type Boolean
			 * @default true
			 */
			this.slideRight = true;
			/**
			 * @property row
			 * @description
			 * @type Number
			 * @default 0
			 */
			this.row = row || 0;
			/**
			 * @property column
			 * @description
			 * @type Number
			 * @default 0
			 */
			this.column = column || 0;
			/**
			 * @property speed
			 * @description
			 * @type Number
			 * @default 1
			 */
			this.speed = 1;
			
			if(texture instanceof PIXI.Texture){
					/**
					 * @property component
					 * @description
					 * @type PIXI.Sprite
					 * @default 
					 */
					this.component = new PIXI.Sprite(texture);
					/**
					 * @property position
					 * @description
					 * @type 
					 * @default 
					 */
					 this.component.position.x = positionX || 0;
					 this.component.position.y = positionY || 0;
					/**
					 * @property anchor
					 * @description
					 * @type 
					 * @default 
					 */
					this.component.anchor.x = 0.5;
					this.component.anchor.y = 0.5;
			} else {
					this.component = null;
			}
			/**
			 * @property interactive
			 * @description
			 * @type Boolean
			 * @default true
			 */
			this.interactive = true;
			
			/**
			 *
			 *
			 *
			 **/
			this.moveBrick = function(){
				if (this.speed < 25) {
					this.speed++;
				}
				if(this.component){
					if (this.slideRight) {
								this.component.position.x += this.speed;
					} else {
						this.component.position.x -= this.speed;
					}
				}
			};
	};

	return Brick;
});


