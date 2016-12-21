function DacPixi(debug) {

    this.debug = debug;
    this.sprites=new Array();
    this.density=new Array();
    var _this = this;
	
	
    this.buildFallingObjects = function(stage, imageUrl, objectCount, width, height) {

        for (var i=0;i<objectCount;i++)
        {
            var x = (Math.random()*width)-20;
            var y = Math.random()*height;
            var scale = (Math.random()*.07)+.02;
            scale = scale * 10;
            var sprite = DacPixi.buildSprite(imageUrl, x,y,scale,scale);
            stage.addChild(sprite);
            this.sprites.push(sprite);
            var d = Math.random();//density
            this.density.push(d);
        }

    }

    this.moveFallingObjects = function(width, height) {

        angle = Math.random()*.09; //0.001;
        for(var i=0;i<this.sprites.length;i++)
        {
            var sprite=this.sprites[i];
            var d = this.density[i];
            sprite.position.y += Math.cos(angle+d)+1;
            sprite.position.x += Math.sin(angle)*3;
            if(sprite.position.y>=height){
                sprite.position.y=-20; 
                sprite.position.x=Math.random()*width;
            }
        }
    }

}

DacPixi.buildRectangle = function(xpos, ypos, width, height, fillColor, alpha, lineWidth, lineColor){
    return DacPixi.drawRectangle(xpos, ypos, width, height, fillColor, alpha, lineWidth, lineColor);
}

DacPixi.drawRectangle = function(xpos, ypos, width, height, fillColor, alpha, lineWidth, lineColor){
    var pixiGraphics = new PIXI.Graphics();
    var pixiFillColor  = "0x"+fillColor.substring(fillColor.indexOf("#")+1); 
    //console.log("[dac_pixi]drawRectangle pixiFillColor= "+pixiFillColor);
    pixiGraphics.beginFill(pixiFillColor);

    if (lineWidth!=undefined && lineColor!=undefined)
    {
            var pixiLineColor  = "0x"+fillColor.substring(lineColor.indexOf("#")+1); 
            pixiGraphics.lineStyle(lineWidth, pixiLineColor, alpha);
    }
    pixiGraphics.drawRect(xpos,ypos, width, height);
    pixiGraphics.endFill();
    pixiGraphics.alpha = alpha;
    return pixiGraphics;
}

DacPixi.redrawRectangle= function(pixiGraphics,x, y, width, height, color, alpha) {
	//color = "#001122";
    var pixiColor  = "0x"+color.substring(color.indexOf("#")+1); 

    //console.log("[dac_pixi]redrawRectangle pixiColor= "+pixiColor+" width="+width+" height="+height+" x="+x+" y="+y);
    pixiGraphics.clear();
    pixiGraphics.beginFill(pixiColor);
    pixiGraphics.drawRect(0,0,width,height);
    pixiGraphics.endFill();
    pixiGraphics.alpha = alpha;      
    pixiGraphics.position.x = x;
    pixiGraphics.position.y = y;
}

DacPixi.drawRoundedRect = function(xpos, ypos, width, height, fillColor, alpha, lineWidth, lineColor, radius){
    var pixiGraphics = new PIXI.Graphics();
    var pixiFillColor  = "0x"+fillColor.substring(fillColor.indexOf("#")+1); 
    //console.log("[dac_pixi]drawRectangle pixiFillColor= "+pixiFillColor);
    pixiGraphics.beginFill(pixiFillColor);

    if (lineWidth!=undefined && lineColor!=undefined)
    {
            var pixiLineColor  = "0x"+fillColor.substring(lineColor.indexOf("#")+1); 
            pixiGraphics.lineStyle(lineWidth, pixiLineColor, alpha);
    }
    pixiGraphics.drawRoundedRect(xpos,ypos, width, height, radius);
    pixiGraphics.endFill();
    pixiGraphics.alpha = alpha;
    return pixiGraphics;
}
	


DacPixi.drawEllipse = function(xpos, ypos, width, height, fillColor, alpha, lineWidth, lineColor)
{
    var graphics = new PIXI.Graphics();
    var pixiFillColor  = "0x"+fillColor.substring(fillColor.indexOf("#")+1); 

    graphics.beginFill(pixiColor);

    if (lineWidth!=undefined && lineColor!=undefined)
    {
            var pixiLineColor  = "0x"+fillColor.substring(lineColor.indexOf("#")+1); 
            graphics.lineStyle(lineWidth, pixiLineColor, alpha);
    }

    graphics.drawEllipse(xpos,ypos, width, height);
    graphics.endFill();
    graphics.alpha = alpha;
    return graphics;
}

DacPixi.buildTextItem = function(text,fontType,color,size,align,italic,bold,x,y,wordWrap, wordWrapWidth,strokeColor,strokeThickness, dropShadow, dropShadowColor){
    var boldStr = "";
    var italicStr = "";
    if (bold) boldStr = "bold ";
    if (italic) italicStr = "italic ";

    if (strokeColor==undefined) 
        strokeColor = "#FFFFFF";
    if (strokeColor.indexOf("#")!= 0) strokeColor = "#"+strokeColor;
    //console.log("[dac_pixi]buildTextItem color 1= "+color+" italicStr="+italicStr+" boldStr="+boldStr+" fontType="+fontType);
    if (color==undefined) color = "#FFFFFF";
    if (color.indexOf("#")!= 0) color = "#"+color;

    //console.log("[dac_pixi]buildTextItem color 2= "+color+" italicStr="+italicStr+" boldStr="+boldStr+" fontType="+fontType);
    if (strokeThickness!=undefined) strokeThickness = 0;
    /*Text ( text  [style] )
            [font] String optional,  'bold 20px Arial' 
            [fill='black'] String | Number optional
            [align='left'] String optional
            [stroke] String | Number optional, 'blue', '#FCFF00'
            [strokeThickness=0] Number optional
            [wordWrap=false] Boolean optional
            [wordWrapWidth=100] Number optional
            [dropShadow=false] Boolean optional
            [dropShadowColor='#000000'] String optional
            [dropShadowAngle=Math.PI/4] Number optional
            [dropShadowDistance=5] Number optional
    */
    if (text === undefined) text = "";

    var textBox = new PIXI.Text(text, {font: boldStr+italicStr+size+"px "+fontType, fill: color, align: align, stroke: strokeColor, strokeThickness: strokeThickness, wordWrap:wordWrap, wordWrapWidth:wordWrapWidth, dropShadow:dropShadow, dropShadowColor: dropShadowColor});
    textBox.position.x = x;
    textBox.position.y = y;
    return textBox;
}  

DacPixi.rebuildTextItem = function(textBox, text,fontType,color,size,align,italic,bold,x,y,wordWrap, wordWrapWidth,strokeColor,strokeThickness, dropShadow, dropShadowColor){
    var boldStr = "";
    var italicStr = "";
    if (bold) boldStr = "bold ";
    if (italic) italicStr = "italic ";

    if (strokeColor==undefined) 
        strokeColor = "#FFFFFF";
    if (strokeColor.indexOf("#")!= 0) strokeColor = "#"+strokeColor;
    //console.log("[dac_pixi]buildTextItem color 1= "+color+" italicStr="+italicStr+" boldStr="+boldStr+" fontType="+fontType);
    if (color==undefined) color = "#FFFFFF";
    if (color.indexOf("#")!= 0) color = "#"+color;

    //console.log("[dac_pixi]buildTextItem color 2= "+color+" italicStr="+italicStr+" boldStr="+boldStr+" fontType="+fontType);
    if (strokeThickness!=undefined) strokeThickness = 0;
    /*Text ( text  [style] )
            [font] String optional,  'bold 20px Arial' 
            [fill='black'] String | Number optional
            [align='left'] String optional
            [stroke] String | Number optional, 'blue', '#FCFF00'
            [strokeThickness=0] Number optional
            [wordWrap=false] Boolean optional
            [wordWrapWidth=100] Number optional
            [dropShadow=false] Boolean optional
            [dropShadowColor='#000000'] String optional
            [dropShadowAngle=Math.PI/4] Number optional
            [dropShadowDistance=5] Number optional
    */
    var style = {font: boldStr+italicStr+size+"px "+fontType, fill: color, align: align, stroke: strokeColor, strokeThickness: strokeThickness, wordWrap:wordWrap, wordWrapWidth:wordWrapWidth, dropShadow:dropShadow, dropShadowColor: dropShadowColor};

    if (text === undefined) text = "";
    if (textBox == null)
        textBox = new PIXI.Text(text, style);
    textBox.text = text;

    textBox.position.x = x;
    textBox.position.y = y;
    textBox.style = style;
    return textBox;
}  

DacPixi.buildSprite = function(imageUrl,x,y,xScale,yScale){
    var texture = PIXI.Texture.fromImage(imageUrl);
    var sprite = new PIXI.Sprite(texture);

    // center the sprites anchor point
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    // move the sprite to the center of the screen
    sprite.position.x = x;
    sprite.position.y = y;
    sprite.scale.x=xScale;
    sprite.scale.y=yScale;

    return sprite;

 } 
 


DacPixi.buildResizeHandle=function(stage, handleWidth, handleHeight, color, alpha)
{
    var pixiColor  = "0x"+color.substring(color.indexOf("#")+1); 

    handle = new PIXI.Graphics();
    handle.interactive = true;
    handle.buttonMode = true;
    var overlayColor = pixiColor;
    handle.beginFill(overlayColor);
    handle.drawEllipse(0,0,handleWidth,handleHeight);
    handle.endFill();
    handle.alpha = alpha;
    stage.addChild(handle);  
    //handle.width = handleWidth;
    //handle.height = handleHeight;  

    return handle;
}


 /*
(function () {
	// ... all vars and functions are in this scope only
	// still maintains access to all globals
}());
*/

 

