# WallJS

WallJS is a splash page animation, which uses PIXI 2D Renderer _(http://www.pixijs.com)_
This animates at 25 frames per second.
## Getting Started

### Images
WallJS has two sets of images that make up the Wall; the Start Button and the Wall images.

#### Start Button animation
The user clicks the Start Button to trigger the animation. This animation is used to draw the user to click.
The start button can be a static image (not animating) or a Texture sheet (see below about the PIXI Sprite Sheet) and should be installed in the <em>img/BrickHilight</em> directory.
##### Configuring the Start Button animation
The _startButtonSpriteSheet_ object is used to configure the Start Button animation, as shown below.
```javascript
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
  speed: 10
}
```
- _spriteSheetLoader:_ This JSON configuration file references the sprite sheet frames.
- _spriteNameList:_  This is an array that references each frame and enables the order of the frames to be set. These names must match this in the spriteSheetLoader JSON file.
- _speed:_ This sets the speed of the animation. This can be omitted if there is not speed required.

#### Wall Images
The Wall images are displayed randomly displayed throughout the wall.
These images should be added to the img/Bricks directory
```javascript
textureSrc: [
  'img/Bricks/brick_old_03.png',
  'img/Bricks/brick_old_1_03.png',
  'img/Bricks/brick_old_2_03.png',
  'img/Bricks/brick_old_4_03.png',
  'img/Bricks/brick_old_5_03.png'
],
```
##### PIXI Sprite sheet.
The sprite sheet is created using Texture Packer _(http://www.codeandweb.com/texturepacker)_
This produces a JSON frame reference file and tps sprite sheet.

### Adding to your page

#### Example
```javascript
<script type="text/javascript">// <![CDATA[

//Override the base url if the html file is not in the root directory of the js directory
requirejs.config({
  baseUrl: '../dist/js',
});

//Configuration
require(['jQuery', 'ssm', 'Wall'], function($, ssm) {

    var properties = undefined;

    ssm.addStates([
      {
        id: 'mobile',
        query: '(max-width: 767px)',
        onEnter: function(){
          properties = {
            // The rows and width is measured in the number of icons
            wallRows: 2,
            wallCols: 3,
            // This is the icon in the wall where the start button should overlay
            startRow: 2,
            startCol: 2,
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
              speed: 10
            }
          };

          $('#wall').empty();
          $('#wall').AddWallAnimation(properties);
        }
      },
      {
        id: 'tablet',
        query: '(min-width: 768px) and (max-width: 1023px)',
        onEnter: function(){
          properties = {
            // The rows and width is measured in the number of icons
            wallRows: 3,
            wallCols: 5,
            // This is the icon in the wall where the start button should overlay
            startRow: 2,
            startCol: 2,
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
                "brickHi_A8.png"
              ],
              speed: 4
            }
          };

          $('#wall').empty();
          $('#wall').AddWallAnimation(properties);
        }
      },
      {
        id: 'desktop',
        query: '(min-width: 1024px)',
        onEnter: function(){
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
              width: $('#wall').width()
            }
          };

          $('#wall').empty();
          $('#wall').AddWallAnimation(properties);
        }
      }
    ]);


});
// ]]></script>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" subdirectory as they are generated via Grunt. You'll find source code in the "lib" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 ajames72  
Licensed under the MIT license.
