# WallJS

Intro...

## Getting Started

### Images

PIXI

#### Start Button graphic

##### PIXI Sprite sheet.
The sprite sheet is created using Texture Packer _(http://www.codeandweb.com/texturepacker)_
This produces a JSON frame reference file and tps sprite sheet.
The _spriteNameList_ references the frames and enables the order of the frames to be set.
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
