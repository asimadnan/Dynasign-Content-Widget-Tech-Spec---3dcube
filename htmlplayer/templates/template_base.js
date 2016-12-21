 /*
 * Dynasign Proprietary and Confidential
 * 
 * Dynasign © 2016 Dynasign Corporation 
 * All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains the property of Dynasign Corporation and its suppliers.
 * The intellectual and technical concepts contained herein are proprietary to Dynasign Corporation and its suppliers 
 * and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden 
 * without the prior written consent of Dynasign Corporation.
 */

 function TemplateBase(debug) {
    var _this = this;

    this.m_dacUtil = new DacUtil(); 
    //this.m_dacPixi = new DacPixi(1);
    this.m_cache = 1;
    this.m_accountNo = "";
    this.m_wid ="";  // widget id field
    this.m_templateName = ""; // define template name
    this.m_assetIdPrefix = ""; //m_assetId = "w"+m_wid+"-"+m_templateName+"-" + fieldname

    //landscape
    //this.m_stageSize = [1300,800];
    this.m_layoutName = "L1";
    this.m_xScale = 1;
    this.m_yScale = 1;

    //////////////////
    this.m_isPlaying=false;
    this.m_isLoading=true; 
    this.m_playAfterPreload = false; // internal variable, set playAfterPreload = true when preload is not finished, but playTemplate is called. So after preload is done, need to play right away instead of waiting for player to call

    this.m_playmode="standalone"; // "standalone", "preview", "htmlplayer", "editor"

    this.m_preload = null;  // in case of html player, preload = 1 for init only, no play

    this.m_width = null;
    this.m_height = null;
    this.m_zone_width = null;
    this.m_zone_height = null;
    this.m_edit_view_with = null; //$(window).width();
    this.m_edit_view_height = null; //$(window).height();

// define content field array and asset array
    this.m_fullWidget = null;
    this.m_contentArray = null; 
    this.m_assetArray = null;
    this.m_feedArray = null;
    this.m_feedAssetArray = null;
    
    this.m_zone_size_changed = 0;
    
    // QR code
    this.m_qr_size = 50;
    this.m_qr_flag = 0;
    this.m_qr_x = 20;
    this.m_qr_y = 190;   
    this.m_qr_color = "#000000";
    this.m_qr_text = "http://www.dynasign.net";   
    

}



TemplateBase.prototype.setCache=function(cache)
{
    this.m_cache= cache;
}
	
TemplateBase.prototype.setPlaymode=function(mode)
{
    this.m_playmode= mode;
}

TemplateBase.prototype.setAccountNo=function(accountNo)
{
    this.m_accountNo = accountNo;
}

TemplateBase.prototype.getIFrameSize = function () 
{
    var myWidth = 0, myHeight = 0;
    if( typeof( window.innerWidth ) == 'number' ) 
    {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    //window.alert( 'Width = ' + myWidth );
    //window.alert( 'Height = ' + myHeight );
    return {width: myWidth, height: myHeight};
}

TemplateBase.prototype.run = function() 
{
/// enable or disable console.log using debug parameter
    var debug = 1;//this.m_dacUtil.getQueryVariable("debug"); 

    if(debug != 1){
       if(!window.console) window.console = {};
       var methods = ["log", "debug", "warn", "info"];
       for(var i=0;i<methods.length;i++){
            console[methods[i]] = function(){};
       }
    }

    this.m_cache = this.m_dacUtil.getQueryVariable("cache"); 
    this.m_playmode = this.m_dacUtil.getQueryVariable("playmode");

    this.m_preload = this.m_dacUtil.getQueryVariable("preload");

    //this.m_accountNo = this.m_dacUtil.getQueryVariable("account");
    this.m_width = this.m_dacUtil.getQueryVariable("width");
    this.m_height = this.m_dacUtil.getQueryVariable("height");

    var size = this.getIFrameSize();
    //alert("size="+JSON.stringify(size));
    if (this.m_width == null) this.m_width = size["width"];
    if (this.m_height == null) this.m_height = size["height"];
    console.log("[template_base]run width, heigth="+this.m_width+","+this.m_height);
    console.log("[template_base]ready ... cache="+this.m_cache+" playmode="+this.m_playmode);
    if (this.m_playmode === "standalone")
    { //wplayer.php
        console.log("[template_base]standalone play");
        if (typeof parent.playWidgetStandalone == 'function') { 
            parent.playWidgetStandalone();
        }else{
            this.initAndPlayTemplate(null);
        }
    }
    else if (this.m_playmode === "preview")
    {
        console.log("[template_base]preview play");

        if (typeof parent.playWidgetStandalone == 'function') { 
            parent.playWidgetStandalone();
        }else{
            this.initAndPlayTemplate(null);
        }
    }
    else //htmlplayer
    {
        console.log("[template_base]htmlplayer play");

        if (typeof parent.playWidget == 'function') { 
            parent.playWidget();
        }else{
            this.initAndPlayTemplate(null);
        }
    }
}

TemplateBase.prototype.initAndPlayTemplate = function(fullWidget)
{
    //console.log("[template_base]initTemplate ...widgetJson="+widgetJson);
    //console.log("[template_base]initAndPlayTemplate...fullWidget="+JSON.stringify(fullWidget));
    console.log("[template_base]initAndPlayTemplate m_isPlaying="+this.m_isPlaying+"  m_isLoading="+this.m_isLoading);
    this.initTemplate(fullWidget);
    this.playTemplate();
}
 
TemplateBase.prototype.previewTemplate = function(fullWidget)
{
    console.log("[template_base]previewTemplate");
    this.initAndPlayTemplate(fullWidget);
}

TemplateBase.prototype.initFullWidget = function(fullWidget)
{
    if (fullWidget != null)
    {
        this.m_fullWidget = fullWidget;
        this.m_wid = fullWidget.wid
        this.m_assetIdPrefix = "w"+this.m_wid+"-"+this.m_templateName+"-";
        //console.log("[template_base]initTemplate m_assetIdPrefix="+this.m_assetIdPrefix);
        //var dac = fullWidget["widget"];
        //	console.log("[template_base]initTemplate...dac="+JSON.stringify(dac));
        this.m_contentArray = fullWidget["widget"]["dac_widget"]["content"];
        this.m_assetArray = fullWidget["widgetAsset"];
        this.m_feedArray = fullWidget["feed"];
        this.m_feedAssetArray = fullWidget["feedAsset"];
        //console.log("[template_base]initFullWidget...m_feedAssetArray="+JSON.stringify(this.m_feedAssetArray));
        if (this.m_contentArray == undefined || this.m_contentArray === null) this.m_contentArray = {};
        if (this.m_assetArray == undefined || this.m_assetArray === null) this.m_assetArray = {};
        if (this.m_feedArray == undefined || this.m_feedArray === null) this.m_feedArray = {};
        if (this.m_feedAssetArray == undefined || this.m_feedAssetArray === null) this.m_feedAssetArray = {};
        
       // console.log("[template_base]initFullWidget....m_assetArray="+JSON.stringify(this.m_assetArray));

    }
}

TemplateBase.prototype.initTemplate = function(fullWidget)
{//          
    console.log("[template_base]initTemplate ... ");
    //console.log("[template_base]initTemplate...before fullWidget="+JSON.stringify(fullWidget));

    //var fullWidgetJson = JSON.stringify(fullWidget);
    //fullWidgetJson = fullWidgetJson.replace(/\\/g, "");
    //fullWidget = JSON.parse(fullWidgetJson);
    //console.log("[template_base]initTemplate...after fullWidget="+JSON.stringify(fullWidget));
    if (fullWidget != null)
    {
        this.m_fullWidget = fullWidget;
        this.m_wid = fullWidget.wid
        this.m_assetIdPrefix = "w"+this.m_wid+"-"+this.m_templateName+"-";
        //console.log("[template_base]initTemplate m_assetIdPrefix="+this.m_assetIdPrefix);
        //var dac = fullWidget["widget"];
        //	console.log("[template_base]initTemplate...dac="+JSON.stringify(dac));
        this.m_contentArray = fullWidget["widget"]["dac_widget"]["content"];
        this.m_assetArray = fullWidget["widgetAsset"];
        this.m_feedArray = fullWidget["feed"];
        this.m_feedAssetArray = fullWidget["feedAsset"];
        //console.log("[template_base]initTemplate...m_feedAssetArray="+JSON.stringify(this.m_feedAssetArray));

        if (this.m_assetArray == undefined || this.m_assetArray === null) this.m_assetArray = {};
        if (this.m_feedArray == undefined || this.m_feedArray === null) this.m_feedArray = {};
        if (this.m_feedAssetArray == undefined || this.m_feedAssetArray === null) this.m_feedAssetArray = {};
    }
    //console.log("[template_base] initTemplate this.m_feedAssetArray="+JSON.stringify(this.m_feedAssetArray));
    this.initTemplateFields();
    this.initTemplateUI();

    this.m_isLoading = false; // init done

}

/////////////////////////////////////////////////////////////
TemplateBase.prototype.initCommonTemplateFields = function()
{
    if (this.m_contentArray['qr_size'] == null) this.m_contentArray['qr_size'] = this.m_qr_size;
    if (this.m_contentArray['qr_color'] == null) this.m_contentArray['qr_color'] = this.m_qr_color;
    
    if (this.m_contentArray['qr_x'] == null) this.m_contentArray['qr_x'] = this.m_qr_x;
    if (this.m_contentArray['qr_y'] == null) this.m_contentArray['qr_y'] = this.m_qr_y; 
    if (this.m_contentArray['qr_text'] == null) this.m_contentArray['qr_text'] = this.m_qr_text;
    if (this.m_contentArray['qr_flag'] == null) this.m_contentArray['qr_flag'] = this.m_qr_flag;
}

TemplateBase.prototype.initPixiStage= function()
{
}
    
TemplateBase.prototype.initHtmlCanvasStage= function()
{

}
    
TemplateBase.prototype.initHtmlNonCanvasStage= function()
{

}
 
TemplateBase.prototype.initTemplateUI = function()
{
}

TemplateBase.prototype.playTemplate = function()
{
    
}
/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
TemplateBase.prototype.initEditView = function(fullWidget)
{
    this.m_cache = 0;
    this.m_playmode="editor";
    this.m_fullWidget = fullWidget;
    this.m_wid = fullWidget.wid
    this.m_assetIdPrefix = "w"+this.m_wid+"-"+this.m_templateName+"-";
    this.m_contentArray = fullWidget["widget"]["dac_widget"]["content"];
    this.m_feedArray = fullWidget["feed"];
    //console.log("initEditView  fullWidget="+JSON.stringify(fullWidget));
    console.log("initEditView  this.m_contentArray="+JSON.stringify(this.m_contentArray));
    //console.log("initEditView  this.m_feedArray="+JSON.stringify(this.m_feedArray));

    this.m_assetArray = fullWidget.widgetAsset;
    console.log("initEditView  this.m_assetArray="+JSON.stringify(this.m_assetArray));
    console.log("[template_base]initEditView wid="+this.m_wid);


    this.initTemplateFields();
    this.initTemplateUI();
    this.playTemplate();
}


TemplateBase.prototype.resizeEditView = function(fullWidget)
{
    this.m_cache = 0;
    this.m_playmode="editor";
    this.m_fullWidget = fullWidget;
    this.m_wid = fullWidget.wid
    this.m_assetIdPrefix = "w"+this.m_wid+"-"+this.m_templateName+"-";
    this.m_contentArray = fullWidget["widget"]["dac_widget"]["content"];

    //console.log("initEditView  this.m_contentArray="+JSON.stringify(this.m_contentArray));

    this.m_assetArray = fullWidget.widgetAsset;
    console.log("[template_base]initEditView wid="+this.m_wid);
    this.initTemplateFields();
    this.initTemplateUI();

    this.playTemplate();
}


TemplateBase.prototype.updateEditorVariable = function(name,value){
    this.m_fullWidget.widget.dac_widget.content[name] = value;
    this.m_contentArray[name] = value;
    parent.updateEditorContent(this.m_fullWidget);
}

TemplateBase.prototype.setTextItem = function(pixiText,fieldName) 
{

    if (pixiText != undefined)
    {
        pixiText.text = this.m_contentArray[fieldName];
        var boldStr = "";
        var italicStr = "";

        if (this.m_contentArray[fieldName+"_bold"])
            boldStr = "bold ";
        if (this.m_contentArray[fieldName+"_italic"])
            italicStr = "italic ";

        var color = this.m_contentArray[fieldName+"_font_color"];
        if (color==undefined) color = "#FFFFFF";
        if (color.indexOf("#")!= 0) color = "#"+color;
		
        var alignment = this.m_contentArray[fieldName+"_align"];
        if (alignment==undefined) alignment = "left";
        


       // console.log("setTextItem color="+color);

        var style = {font: boldStr+italicStr+this.m_contentArray[fieldName+"_font_size"]+"px "+this.m_contentArray[fieldName+"_font"], fill: color, align: alignment, stroke: "#FFFFFF", strokeThickness: 0,wordWrap:true,wordWrapWidth: this.m_contentArray["zone_width"]};

        console.log("[template_base]setTextItem: "+fieldName+"="+this.m_contentArray[fieldName]+" style ="+this.m_contentArray[fieldName+"_font_size"] );
        pixiText.style = style;
     }
}

TemplateBase.prototype.setTextStyle = function(pixiText,fieldName) 
{
    if (pixiText != undefined)
    {
        var boldStr = "";
        var italicStr = "";

        if(this.m_contentArray[fieldName+"_bold"])
            boldStr = "bold ";
        if(this.m_contentArray[fieldName+"_italic"])
            italicStr = "italic ";
		
        var color = this.m_contentArray[fieldName+"_font_color"];
        if (color==undefined) color = "#FFFFFF";
        if (color.indexOf("#")!= 0) color = "#"+color;
		
        var alignment = this.m_contentArray[fieldName+"_align"];
        if (alignment==undefined) alignment = "left";

       // console.log("setTextItem: "+fieldName+"="+this.m_contentArray[fieldName+"_font_size"]);

        var style = {font: boldStr+italicStr+this.m_contentArray[fieldName+"_font_size"]+"px "+this.m_contentArray[fieldName+"_font"], fill: color, align: alignment, stroke: "#FFFFFF", strokeThickness: 0,wordWrap:true,wordWrapWidth: this.m_contentArray["zone_width"]};
        pixiText.style = style;
     }
}

TemplateBase.prototype.initPixiStage = function()
{
    if (this.m_stage == null)
    {
        canvasNode = document.createElement("canvas");
        canvasNode.setAttribute("id", "pixiCanvas");
        canvasNode.style.property= "position:absolute;top:0px;";
        document.body.appendChild(canvasNode);
        // create a renderer instance
        this.m_renderer = PIXI.autoDetectRenderer(this.m_width,this.m_height, {transparent: true,view:pixiCanvas});
        //this.m_renderer = PIXI.autoDetectRenderer(this.m_width,this.m_height);

        // create a renderer instance
        //this.m_renderer = PIXI.autoDetectRenderer(this.m_width,this.m_height);
        this.m_renderer.view.style.display = "block";
        this.m_renderer.view.style.width = "100%";
        this.m_renderer.view.style.height = "100%";
        this.m_renderer.view.style.position = "absolute";
        this.m_renderer.view.style.top = "0px";
        document.body.appendChild(this.m_renderer.view);

        this.m_stage = new PIXI.Container();
        //added this line to remove blur on text
        PIXI.RESOLUTION = window.devicePixelRatio;
    }
}

TemplateBase.prototype.buildWidgetBackground = function()
{
    var bgColor = this.m_contentArray["background_color"];
    if (bgColor != null && bgColor.substring(0, 1) != "#") bgColor = "#" + bgColor;
    console.log("[template_base]buildWidgetBackground ... bgColor="+bgColor+" theme="+this.m_contentArray["background_theme"]+", alpha="+this.m_contentArray["background_alpha"]);

    var bgImage = null;
    if ( this.m_contentArray["background_image_flag"] === true )
        bgImage = this.m_assetArray[this.m_assetIdPrefix+"background_image"];
    


    this.m_widgetBackground.play(this.m_contentArray["background_theme"],bgColor, bgImage, this.m_contentArray["background_alpha"]);
    //myBackground.play(4,"#112200",5);
}

TemplateBase.prototype.rebuildWidgetBackground = function()
{
    var bgColor = this.m_contentArray["background_color"];
    if (bgColor != null && bgColor.substring(0, 1) != "#") bgColor = "#" + bgColor;
    console.log("[template_base]rebuildWidgetBackground ... bgColor="+bgColor+" theme="+this.m_contentArray["background_theme"]+", alpha="+this.m_contentArray["background_alpha"]);

    var bgImage = null;
    if ( this.m_contentArray["background_image_flag"] === true )
    {
        bgImage = this.m_assetArray[this.m_assetIdPrefix+"background_image"];
    }
    console.log("[template_base]rebuildWidgetBackground *** bgImage="+bgImage);
    this.m_widgetBackground.replay(this.m_contentArray["background_theme"],bgColor, bgImage, this.m_contentArray["background_alpha"]);
    //myBackground.play(4,"#112200",5);
}


TemplateBase.prototype.buildQRCode = function(mesg, size, color, x, y)
{
    var _this = this;
    if (this.m_contentArray['qr_flag'] != true) 
    {
        $( "div" ).remove( "#qr_div" );
        return;
    }
    var xscale = 1.0;
    var yscale = 1.0;
    var sscale = 1.0;
    var actualViewW = $(window).width(); //window.innerWidth;//
    var actualViewH = $(window).height(); //window.innerHeight;//
    
    if (this.m_playmode != "editor")
    {
        if (_this.m_contentArray['edit_view_width'] != undefined)
            xscale = actualViewW/_this.m_contentArray['edit_view_width'];
        if (_this.m_contentArray['edit_view_height'] != undefined)
            yscale = actualViewH/_this.m_contentArray['edit_view_height'];
    }
    else if (this.m_playmode ==="editor")
    {
        _this.m_fullWidget["widget"]["dac_widget"]["content"]["edit_view_width"] = actualViewW;
        _this.m_fullWidget["widget"]["dac_widget"]["content"]["edit_view_height"] = actualViewH;
        _this.m_contentArray = _this.m_fullWidget["widget"]["dac_widget"]["content"];
    }
    
    if (actualViewW >actualViewH)
    {
        if (xscale>yscale)
            sscale = yscale;
        else
            sscale = xscale;   
    }
    else
    {
        if (xscale<yscale)
            sscale = yscale;
        else
            sscale = xscale;  
    }

    console.log("[template_base] buildQRCode.....mesg="+mesg+" size="+size+" color="+color+" x="+x+" y="+y);
    //console.log("[template_base] buildQRCode.....edit view w="+_this.m_contentArray['edit_view_width']+" h="+_this.m_contentArray['edit_view_height']);
    //console.log("[template_base] buildQRCode.....actual view w="+actualViewW+" h="+actualViewH);  
    //console.log("[template_base] buildQRCode.....xscale="+xscale+" yscale="+yscale);
    
    var body = document.getElementsByTagName("body")[0];
        //create a canvas
    $( "div" ).remove( "#qr_div" );
    var qrDiv = document.createElement('div');
    qrDiv.id = "qr_div";
   // var qr_div = document.createElement('div_qr');
   
    size = parseInt(size * sscale);
    if (x==-1)
    {
        x = size *0.1;//actualViewW - size - size *0.1;
        y = actualViewH - size - size *0.1;
        //console.log("[template_base] buildQRCode.....before reposition:  x="+x+" y="+y);
    }
    else
    {
        x = parseInt(parseInt(x) * xscale);
        y = parseInt(parseInt(y) * yscale);
    }
    console.log("[template_base] buildQRCode.....after scaling size="+size+"  x="+x+" y="+y);
    body.appendChild(qrDiv);
    qrDiv.style.zIndex = 1000020;
    qrDiv.style.position = "absolute";
    qrDiv.style.top = y;
    qrDiv.style.left = x;
   
   // qrDiv.style.backgroundColor = "rgba(200, 54, 54, 0.5)";
    

    var newX = 50;
    var newY = 50;

    var options = {
         render: 'canvas',
         ecLevel: 'L',
         minVersion: 1,
         fill: color,
         background: "#FFF",
         text: mesg,
         size: size,
         radius: 0,
         quiet: 0,
         mode: 0,
         mSize: 1,
         mPosX: 0.5,
         mPosY: 0.5,
         label: 'no',
         fontname: 'sans',
         fontcolor: '#000000',
         image: null
     };
        
    $('#qr_div').qrcode(options);
    $('#qr_div').css('top',y+'px');
    $('#qr_div').css('left',x+'px'); 
     
    if (this.m_playmode ==="editor")
    {   qrDiv.style.backgroundColor = "rgba(200, 54, 54, 0.5)";
        $("#qr_div").draggable({
          start: function() {

          },
          drag: function() {

          },
          stop: function() {
              console.log("pos="+qrDiv.style.left+","+qrDiv.style.top);
              newX = qr_div.style.left;
              newY = qr_div.style.top;
              _this.m_contentArray['qr_x'] = newX;
              _this.m_contentArray['qr_y'] = newY;
              TemplateBase.prototype.updateEditorVariable.call(_this,"qr_x", _this.m_contentArray['qr_x']);
              TemplateBase.prototype.updateEditorVariable.call(_this,"qr_y", _this.m_contentArray['qr_y']);
          }
        });

        $("#qr_div").resizable({
            aspectRatio: 16 / 16,
            start: function() {
                var qr_canvas = $('#qr_div').find( "canvas" )[0];
                var ctx = qr_canvas.getContext("2d");
                ctx.clearRect(0, 0, qr_canvas.width, qr_canvas.height);

            },
            drag: function() {

            },
            stop: function() {
                console.log("size="+qr_div.style.width+","+qr_div.style.height);
                var newSize = parseInt(qr_div.style.width);
                newSize= newSize * sscale;

                _this.m_contentArray['qr_size'] = newSize;
                TemplateBase.prototype.updateEditorVariable.call(_this,"qr_size", _this.m_contentArray['qr_size']);
                TemplateBase.prototype.buildQRCode.call(_this,mesg, newSize, color, x, y); //(mesg, size, color, x, y)
            }
        });
    }
}