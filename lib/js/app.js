/*global define, console */
define(['jQuery'], function($) {
  var App = function() {
  	  		$.fn.AddWallAnimation = function(){
			console.log("animating wall");
		};
  };

  App.prototype = {
  };

  return App;
});