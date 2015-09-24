/* global define */
define('BrickTexture', ['PIXI'], function(PIXI){
	'use strict';
	/**
	* Class: BrickTexture
	*
	* Usage: Image properties associated with a texture image
	* 
	* Params:
	* @img: String Uri of brick image
	* @height: int: height of brick image required for spacing in the wall
	* @width: int: width of brick image required for spacing in the wall
	*/
  	var BrickTexture = function(img, height, width) {

		this.img = img;
		this.height = height || 0;
		this.width = width || 0;
		this.texture = PIXI.Texture.fromImage(img);
  	};

  	return BrickTexture;
});

  



