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

 function TemplateCounting(debug) {
    TemplateBase.call(this);
    var _this = this;
    this.m_templateName = "countdown"; 
    this.m_dacPixi = new DacPixi(1);

    //define all template fields here, set default values
    this.m_field_background_theme = 4;
    this.m_field_background_speeed = 2;
    this.m_field_background_color = "#990000";
    this.m_field_background_image = ""; //"http://www.dynasign.net/dynasign/websites/teamgroup/base/dss_media/image/category/car/911Carrera4S_2.jpg";//
    this.m_field_background_image_flag = true;

    this.m_field_overlay_color = "#FFFFFF";
    this.m_field_overlay_x = 100;
    this.m_field_overlay_y = 100;
    this.m_field_overlay_alpha = 0.5;
    this.m_field_overlay_width = 600;
    this.m_field_overlay_height = 400;

    this.m_field_title = "Enter Event Name";
    this.m_field_title_font = "Arial";
    this.m_field_title_font_size = 60;
    this.m_field_title_font_color = "#000000";
    this.m_field_title_italic = false;
    this.m_field_title_alignment = "left";
    this.m_field_title_bold = false;

    this.m_field_event_date = "3/28/2017";
    this.m_field_event_time = "17:58";

    this.m_field_event_datetime_font = "Arial";
    this.m_field_event_datetime_font_size = 50;
    this.m_field_event_datetime_font_color = "#000000";
    this.m_field_counting_font = "Arial";
    this.m_field_counting_font_size = 120;
    this.m_field_counting_font_color = "#000000";
    this.m_field_time_label_font_size = 50;
    
    this.m_field_hide_event_time = 0;
    
    // define content field array and asset array
    this.m_fullWidget = null;
    this.m_contentArray = null;
    this.m_assetArray = null;

    this.m_titlePIXIText = null;
    this.m_datePIXIText = null;
    this.m_timePIXIText = null;
    this.m_timeContainer = null;
    this.m_amPIXIText = null;
    this.m_dayPIXIText = null;
    this.m_hourPIXIText = null;
    this.m_minutePIXIText = null;
    this.m_secondPIXIText = null;
    this.m_dayLabelPIXIText = null;
    this.m_hourLabelPIXIText = null;
    this.m_minuteLabelPIXIText = null;
    this.m_secondLabelPIXIText = null;
    this.m_backgroundPIXIGraphics = null;
    this.m_overlayPIXIGraphics = null;
    this.m_backgroundImagePIXISprite = null;

    this.m_countingContainer = null;

    this.m_countingDummyPIXIText = "";
    this.m_resizeImageIconPIXISprite = null;
    this.m_isResizeOn = false;
    this.m_lastXpos = 0;
    this.m_lastYPos = 0;
    
    // pixi 
    this.m_stage = null;
    this.m_renderer = null;
    this.m_objInfo = {};

    this.future_date = new Date();
    this.intervalId = null;
    
    this.m_handleWidth=20;
    
    this.m_widgetBackground = new WidgetBackground();
    
    this.determineObjInfo = function()
    {
        var stageRatio = this.m_width/this.m_height;

        if (stageRatio <= 1.3 )
        {
            this.m_layoutName = "P1";
        }
        else if (stageRatio >1.3)
        {
            this.m_layoutName = "L1";
        }
        this.m_objInfo['overlay'] = {};
        this.m_objInfo['title'] = {};
        this.m_objInfo['event_datetime'] = {};
        this.m_objInfo['counting'] = {};
        this.m_objInfo['time_label'] = {};
        
        //layout speific
        if (this.m_layoutName == "L1")
        {
            this.m_objInfo['overlay'].x = parseInt(this.m_height/10);
            this.m_objInfo['overlay'].y = parseInt(this.m_height/10);
            this.m_objInfo['overlay'].w = this.m_width - this.m_objInfo['overlay'].x * 2;
            this.m_objInfo['overlay'].h = this.m_height - this.m_objInfo['overlay'].y * 2;
            
            this.m_objInfo['title'].font_size = parseInt(100*this.m_width/1920);
            this.m_objInfo['event_datetime'].font_size = parseInt(100*this.m_width/1920);
            this.m_objInfo['counting'].font_size = parseInt(170*this.m_width/1920);
            this.m_objInfo['time_label'].font_size = parseInt(50*this.m_width/1920);
            
            this.m_handleWidth= this.m_contentArray["zone_width"]/80;

        }
        else if (this.m_layoutName == "P1")
        {
            this.m_objInfo['overlay'].x = parseInt(this.m_width/10);
            this.m_objInfo['overlay'].y = parseInt(this.m_width/10);
            this.m_objInfo['overlay'].w = this.m_width - this.m_objInfo['overlay'].x * 2;
            this.m_objInfo['overlay'].h = this.m_height - this.m_objInfo['overlay'].y * 2;
            
            this.m_objInfo['title'].font_size = parseInt(120*this.m_width/1920);
            this.m_objInfo['event_datetime'].font_size = parseInt(120*this.m_width/1920);
            this.m_objInfo['counting'].font_size = parseInt(200*this.m_width/1920);
            this.m_objInfo['time_label'].font_size = parseInt(60*this.m_width/1920);
            
            this.m_handleWidth=this.m_contentArray["zone_height"]/80;
        }
        console.log("[template_counting]determineObjInfo title font size="+this.m_objInfo['title'].font_size);
        console.log("[template_counting]determineObjInfo event_datetime font size="+this.m_objInfo['event_datetime'].font_size);
        console.log("[template_counting]determineObjInfo counting font size="+this.m_objInfo['counting'].font_size);
        console.log("[template_counting]determineObjInfo counting time_label font size="+this.m_objInfo['time_label'].font_size);
    }

    /////////*** init template fields***/////////
    this.initTemplateFields = function()
    {
        console.log("[template_counting]initTemplateFields ... ");
        //console.log("[template_counting]m_contentArray="+JSON.stringify(this.m_contentArray));
        this.m_zone_width = this.m_contentArray["zone_width"];
        this.m_zone_height = this.m_contentArray["zone_height"];
        if (this.m_width == null) this.m_width = this.m_zone_width;
        if (this.m_height == null) this.m_height = this.m_zone_height;
        
       // if (this.m_playmode === "editor")
        this.determineObjInfo();
        
        TemplateBase.prototype.initCommonTemplateFields.call(this);
                
        if (this.m_contentArray["background_theme"] == undefined ) this.m_contentArray["background_theme"] = this.m_field_background_theme;
        if (this.m_contentArray["background_color"] === null) this.m_contentArray["background_color"] = this.m_field_background_color;

        if (this.m_assetArray[this.m_assetIdPrefix+"background_image"] === null) this.m_assetArray[this.m_assetIdPrefix+"background_image"] = this.m_field_background_image;
        var asset_id = this.m_assetIdPrefix+"background_image";
        //console.log("[template_counting]initTemplateFields m_assetArray["+asset_id+"] ="+this.m_assetArray[asset_id]);

        if (this.m_contentArray["background_image_flag"] === null) this.m_contentArray["background_image_flag"] = this.m_field_background_image_flag;
        //console.log("[template_counting]initTemplateFields overlay w before ="+this.m_contentArray["overlay_width"]+" h before ="+this.m_contentArray["overlay_height"]);
        //console.log("[template_counting]initTemplateFields overlay x before ="+this.m_contentArray["overlay_x"]+" y before ="+this.m_contentArray["overlay_y"]);
        
        if (this.m_contentArray["overlay_x"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["overlay_x"] = this.m_objInfo['overlay'].x; //this.m_field_overlay_x;
        if (this.m_contentArray["overlay_y"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["overlay_y"] = this.m_objInfo['overlay'].y; //this.m_field_overlay_y;	
        if (this.m_contentArray["overlay_width"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["overlay_width"] = this.m_objInfo['overlay'].w; //this.m_field_overlay_width;
        if (this.m_contentArray["overlay_height"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["overlay_height"] = this.m_objInfo['overlay'].h; //this.m_field_overlay_height;
        
        //console.log("[template_counting]initTemplateFields overlay w after ="+this.m_contentArray["overlay_width"]+" h after ="+this.m_contentArray["overlay_height"]);
        //console.log("[template_counting]initTemplateFields overlay x after ="+this.m_contentArray["overlay_x"]+" y after ="+this.m_contentArray["overlay_y"]);
        
        if (this.m_contentArray["overlay_color"] === null) this.m_contentArray["overlay_color"] = this.m_field_overlay_color;
        if (this.m_contentArray["overlay_alpha"] === null) this.m_contentArray["overlay_alpha"] = this.m_field_overlay_alpha;	

        if (this.m_contentArray["title"] == undefined) this.m_contentArray["title"] = this.m_field_title;
        if (this.m_contentArray["title_font"] == undefined) this.m_contentArray["title_font"] = this.m_field_title_font ;
        if (this.m_contentArray["title_font_size"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["title_font_size"] = this.m_objInfo['title'].font_size;
        if (this.m_contentArray["title_font_color"] == undefined) this.m_contentArray["title_font_color"] = this.m_field_title_font_color;
        if (this.m_contentArray["title_italic"] == undefined) this.m_contentArray["title_italic"] = this.m_field_title_italic;
        if (this.m_contentArray["title_alignment"] == undefined) this.m_contentArray["title_alignment"] = this.m_field_title_alignment;


        if (this.m_contentArray["title_bold"] == undefined) this.m_contentArray["title_bold"] = this.m_field_title_bold;
        if (this.m_contentArray["event_date"] == undefined) this.m_contentArray["event_date"] = this.m_field_event_date;
        if (this.m_contentArray["event_time"] == undefined) this.m_contentArray["event_time"] = this.m_field_event_time;
        if (this.m_contentArray["event_datetime_font"] == undefined) this.m_contentArray["event_datetime_font"] = this.m_field_datetime_font ;
        if (this.m_contentArray["event_datetime_font_size"] == undefined || this.m_zone_size_changed == 1)  
            this.m_contentArray["event_datetime_font_size"] = this.m_objInfo['event_datetime'].font_size;
        if (this.m_contentArray["event_datetime_font_color"] == undefined) this.m_contentArray["event_datetime_font_color"] = this.m_field_event_datetime_font_color;
        if (this.m_contentArray["counting_font"] == undefined) this.m_contentArray["countping_font"] = this.m_field_countping_font ;
        if (this.m_contentArray["counting_font_size"] == undefined || this.m_zone_size_changed == 1)  
            this.m_contentArray["counting_font_size"] = this.m_objInfo['counting'].font_size;
        if (this.m_contentArray["counting_font_color"] == undefined) this.m_contentArray["counting_font_color"] = this.m_field_counting_font_color;
        
        this.m_zone_size_changed = 0;
        if (this.m_zone_size_changed == 1)
            parent.setTextFontSize(this.m_contentArray["title_font_size"],this.m_contentArray["event_datetime_font_size"],this.m_contentArray["counting_font_size"],this.m_contentArray["time_label_font_size"] );
        
        if (this.m_contentArray["time_label_font_size"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["time_label_font_size"] = this.m_objInfo['time_label'].font_size;
        
       //console.log("[template_counting]initTemplateFields after init m_contentArray="+JSON.stringify(this.m_contentArray));
	
    }
     
    ///////// *** init template UI *** /////////
    this.initTemplateUI = function()
    {
        this.m_width = this.m_zone_width; //window.innerWidth; //
        this.m_height = this.m_zone_height; //window.innerHeight; //
        console.log("[template_counting]initTemplateUI ... m_width="+this.m_width+" m_height="+this.m_height);
        
        console.log("[template_counting]initTemplateUI create pixi canvas");
        canvasNode = document.createElement("canvas");
        canvasNode.setAttribute("id", "myCanvas");
        canvasNode.style.property= "position:absolute;top:0px;";
        document.body.appendChild(canvasNode);
        // create a renderer instance
        this.m_renderer = PIXI.autoDetectRenderer(this.m_width,this.m_height, {transparent: true,view:myCanvas});
        //this.m_renderer = PIXI.autoDetectRenderer(this.m_width,this.m_height);

        this.m_renderer.view.style.display = "block";
        this.m_renderer.view.style.width = "100%";
        this.m_renderer.view.style.height = "100%";
        this.m_renderer.view.style.position = "absolute";
        this.m_renderer.view.style.top = "0px";
        // add the renderer view element to the DOM
        document.body.appendChild(this.m_renderer.view);

        this.m_stage = new PIXI.Container();

        //set fields
        //this.buildBackgroundColor();
        //this.buildWidgetBackground();
        TemplateBase.prototype.buildWidgetBackground.call(this)

 
        this.buildOverlay();
        this.buildTitle();
        this.buildEventDate();
        //if (this.m_field_hide_event_time != 1)
        //    this.buildEventTime();
        
        TemplateBase.prototype.buildQRCode.call(_this,_this.m_contentArray['qr_text'],_this.m_contentArray['qr_size'], _this.m_contentArray['qr_color'], _this.m_contentArray['qr_x'],_this.m_contentArray['qr_y'])
 
 
        this.buildCounting();
  
    }
    
    this.buildWidgetBackground = function()
    {
        var bgColor = this.m_contentArray["background_color"];
        if (bgColor.substring(0, 1) != "#") bgColor = "#" + bgColor;
        console.log("[template_counting]buildWidgetBackground ... bgColor="+bgColor+" theme="+this.m_contentArray["background_theme"]+", alpha="+this.m_contentArray["background_theme_alpha"]);

        var bgImage = null;
        if ( this.m_contentArray["background_image_flag"] === true )
            bgImage = this.m_assetArray[this.m_assetIdPrefix+"background_image"];

        this.m_widgetBackground.play(this.m_contentArray["background_theme"],bgColor, bgImage, this.m_contentArray["background_image_alpha"]);
        //myBackground.play(4,"#112200",5);
    }

    this.rebuildWidgetBackground = function()
    {
        var bgColor = this.m_contentArray["background_color"];
        if (bgColor.substring(0, 1) != "#") bgColor = "#" + bgColor;
        console.log("[template_counting]buildWidgetBackground ... bgColor="+bgColor+" theme="+this.m_contentArray["background_theme"]);

        var bgImage = null;
        if ( this.m_contentArray["background_image_flag"] === true )
            bgImage = this.m_assetArray[this.m_assetIdPrefix+"background_image"];
        this.m_widgetBackground.replay(this.m_contentArray["background_theme"],bgColor, bgImage, this.m_contentArray["background_image_alpha"]);
        //myBackground.play(4,"#112200",5);
    }
 
    this.buildBackgroundColor = function()
    {
        //build background color

        this.m_backgroundPIXIGraphics = new PIXI.Graphics();
        var backgroundColorHex  = "0x"+this.m_contentArray["background_color"].substring(this.m_contentArray["background_color"].indexOf("#")+1);

        console.log("[template_counting]initTemplateUI ... backgroundGraphics m_width="+this.m_width+"  m_height="+this.m_height+" backgroundColorHex="+backgroundColorHex);
        this.m_backgroundPIXIGraphics.beginFill(backgroundColorHex);//
        this.m_backgroundPIXIGraphics.drawRect(0,0,this.m_width,this.m_height);
        this.m_backgroundPIXIGraphics.alpha = 1;
        this.m_stage.addChild(this.m_backgroundPIXIGraphics);       
        this.m_backgroundPIXIGraphics.position.x = 0;
        this.m_backgroundPIXIGraphics.position.y = 0;
    }
/* not used
    this.buildBackgroundImage = function()
    {
        if (this.m_contentArray["background_image_flag"] === true) 
        {
            console.log("[template_counting]initTemplateUI ... draw image m_field_background_image="+this.m_assetArray[this.m_assetIdPrefix+"background_image"]);
            if (this.m_backgroundImagePIXISprite != null)
                this.m_stage.removeChild(this.m_backgroundImagePIXISprite);
            if (this.m_assetArray[this.m_assetIdPrefix+"background_image"] != null)
            {
                this.m_backgroundImagePIXISprite = PIXI.Sprite.fromImage(this.m_assetArray[this.m_assetIdPrefix+"background_image"]);
                //backgroundImagePIXISprite.crossOrigin = "www.dynasign.net";
                this.m_stage.addChild(this.m_backgroundImagePIXISprite);
                this.m_backgroundImagePIXISprite.position.x = 0;
                this.m_backgroundImagePIXISprite.position.y = 0;
                this.m_backgroundImagePIXISprite.width = this.m_width;
                this.m_backgroundImagePIXISprite.height = this.m_height; 
                this.m_backgroundImagePIXISprite.alpha = 1;
            }
        }
        else
            console.log("[template_counting]initTemplateUI ... m_field_background_image_flag="+this.m_contentArray["background_image_flag"]);

        if (this.m_backgroundImagePIXISprite != null)
        {
            if (this.m_contentArray["background_image_flag"] === true) 
                this.m_backgroundImagePIXISprite.alpha = 1;
            else
                this.m_backgroundImagePIXISprite.alpha = 0;
        }
    }
*/
    this.buildOverlay = function()
    {
        console.log("[template_counting]buildOverlay");
        this.m_overlayPIXIGraphics = new PIXI.Graphics();
        this.m_overlayPIXIGraphics.interactive = true;
        this.m_overlayPIXIGraphics.buttonMode = true;
        var overlayColor  = "0x"+this.m_contentArray["overlay_color"].substring(this.m_contentArray["overlay_color"].indexOf("#")+1);
        this.m_overlayPIXIGraphics.beginFill(overlayColor);
        this.m_overlayPIXIGraphics.drawRect(0,0,this.m_contentArray["overlay_width"],this.m_contentArray["overlay_height"]);
        this.m_overlayPIXIGraphics.endFill();
        this.m_overlayPIXIGraphics.hitArea = new PIXI.Rectangle(0,0,this.m_contentArray["overlay_width"],this.m_contentArray["overlay_height"]);
        this.m_overlayPIXIGraphics.alpha = this.m_contentArray["overlay_alpha"]
        this.m_stage.addChild(this.m_overlayPIXIGraphics);       
        this.m_overlayPIXIGraphics.position.x = this.m_contentArray["overlay_x"];
        this.m_overlayPIXIGraphics.position.y = this.m_contentArray["overlay_y"];
        console.log("[template_announcement]initTemplateUI ... draw overlay overlayColor="+overlayColor+"  m_field_overlay_width="+this.m_contentArray["overlay_width"]+"  m_field_overlay_height="+this.m_contentArray["overlay_height"]+" m_field_overlay_alpha="+this.m_contentArray["overlay_alpha"]+" m_width="+this.m_width);

        if (this.m_playmode === "editor")
        {
            this.m_overlayPIXIGraphics.interactive = true;
            this.m_overlayPIXIGraphics.buttonMode = true;
        }
		
        this.m_overlayPIXIGraphics.mousedown = this.m_overlayPIXIGraphics.touchstart = function(event)
        {            
            this.data = event.data;
            //this.alpha = 1;
            var mousePosition = event.data.getLocalPosition(this.parent);
            this.dragging = true;
            lastXPos = mousePosition.x;
            lastYPos = mousePosition.y;
	};
		
		// set the events for when the mouse is released or a touch is released
	this.m_overlayPIXIGraphics.mouseup = this.m_overlayPIXIGraphics.mouseupoutside = this.m_overlayPIXIGraphics.touchend = this.m_overlayPIXIGraphics.touchendoutside = function(data)
	{
            //this.alpha = 1
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
            _this.updateEditorVariable("overlay_x",_this.m_contentArray["overlay_x"]);
            _this.updateEditorVariable("overlay_y",_this.m_contentArray["overlay_y"]);
	};
		
        // set the callbacks for when the mouse or a touch moves
        this.m_overlayPIXIGraphics.mousemove = this.m_overlayPIXIGraphics.touchmove = function(event)
        {
            if(this.dragging)
            {
                // need to get parent coords..
                var newPosition = event.data.getLocalPosition(this.parent);
                //var x0 = variableArray["overlay_x"];
                var x0 = lastXPos;
                var y0 = lastYPos;
                var x1 = newPosition.x;
                var y1 = newPosition.y;
                var newXPos = 0;
                var newYPos = 0;

                var xDiff = 0;
                var yDiff = 0;

                if(x0>x1){
                    xDiff = x0-x1;
                    newXPos = _this.m_contentArray["overlay_x"]-xDiff;
                    _this.m_contentArray["overlay_x"] = newXPos;
                }
                else{
                    xDiff = x1-x0;
                    newXPos = _this.m_contentArray["overlay_x"]+xDiff;
                    _this.m_contentArray["overlay_x"] = newXPos;
                }

                if(y0>y1){
                    yDiff = y0-y1;
                    newYPos = _this.m_contentArray["overlay_y"]-yDiff;
                    _this.m_contentArray["overlay_y"] = newYPos;

                }
                else{
                    yDiff = y1-y0;
                    newYPos = _this.m_contentArray["overlay_y"]+yDiff;
                    _this.m_contentArray["overlay_y"] = newYPos;
                }
                lastXPos = x1;
                lastYPos = y1;
                //var overlayColor  = "0x"+_this.m_contentArray["overlay_color"].substring(_this.m_contentArray["overlay_color"].indexOf("#")+1); 
                DacPixi.redrawRectangle(_this.m_overlayPIXIGraphics,_this.m_contentArray["overlay_x"],_this.m_contentArray["overlay_y"],_this.m_contentArray["overlay_width"],_this.m_contentArray["overlay_height"],_this.m_contentArray["overlay_color"],_this.m_contentArray["overlay_alpha"]);
                //_this.m_resizeImageIconPIXISprite.position.x = _this.m_contentArray["overlay_x"]+_this.m_contentArray["overlay_width"];
                //_this.m_resizeImageIconPIXISprite.position.y = _this.m_contentArray["overlay_y"]+ _this.m_contentArray["overlay_height"];      

                _this.setOverLayResizeHandlePosition();

 
            }
	};
    }
	
    this.rebuildBackgroundImage = function()
    {
        if (this.m_contentArray["background_image_flag"] === true && this.m_assetArray[this.m_assetIdPrefix+"background_image"] != null) 
        {
            console.log("[template_announcement]initTemplateUI ... draw image m_field_background_image="+this.m_assetArray[this.m_assetIdPrefix+"background_image"]);

            this.m_stage.removeChild(this.m_backgroundImagePIXISprite);

            this.m_backgroundImagePIXISprite = PIXI.Sprite.fromImage(this.m_assetArray[this.m_assetIdPrefix+"background_image"]);
            //backgroundImagePIXISprite.crossOrigin = "www.dynasign.net";
            this.m_stage.addChildAt(this.m_backgroundImagePIXISprite,1);
            this.m_backgroundImagePIXISprite.position.x = 0;
            this.m_backgroundImagePIXISprite.position.y = 0;
            this.m_backgroundImagePIXISprite.width = this.m_width;
            this.m_backgroundImagePIXISprite.height = this.m_height; 
            this.m_backgroundImagePIXISprite.alpha = 1;
        }
        else
            console.log("[template_announcement]initTemplateUI ... m_field_background_image_flag="+this.m_contentArray["background_image_flag"]);

        if (this.m_backgroundImagePIXISprite != null)
        {
            if (this.m_contentArray["background_image_flag"] === true) 
                this.m_backgroundImagePIXISprite.alpha = 1;
            else
                this.m_backgroundImagePIXISprite.alpha = 0;
        }


    }
	
    this.buildTitle= function()
    {
        console.log("[template_counting buildTitle: title="+this.m_contentArray["title"]);
        var wordWrap = true;
        var strokeColor = "FFFFFF";
        var strokeThickness = 0;
        var dropShadow = false
        var dropShadowColor = "000000"; 
        //console.log("[template_counting]title color: "+this.m_contentArray["title_font_color"]);
  
        this.m_titlePIXIText = DacPixi.buildTextItem(this.m_contentArray["title"],this.m_contentArray["title_font"],this.m_contentArray["title_font_color"],this.m_contentArray["title_font_size"],"left",this.m_contentArray["title_italic"],this.m_contentArray["title_bold"],20,20,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        //console.log("[template_counting]title text: "+this.m_titlePIXIText.text);
        
        //console.log("[template_counting buildTitle: ** Title before x="+this.m_contentArray["title_x"]+" y="+this.m_contentArray["title_y"]);
 
 
        if (this.m_contentArray["title_x"] === undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["title_x"] = parseInt((this.m_width - this.m_titlePIXIText.width)/2);
        if (this.m_contentArray["title_y"] === undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["title_y"] = parseInt(this.m_height/3.5) - parseInt(this.m_titlePIXIText.height) - parseInt(this.m_height/40);
        
        if (this.m_contentArray["title_x"]< 0) this.m_contentArray["title_x"] = 0;
        if (this.m_contentArray["title_x"]> this.m_width) this.m_contentArray["title_x"] = 0;
        
        if (this.m_contentArray["title_y"]< 0) this.m_contentArray["title_x"] = this.m_contentArray["overlay_y"]+10;
        if (this.m_contentArray["title_y"]> this.m_height) this.m_contentArray["title_y"] = this.m_contentArray["overlay_y"]+10;
        console.log("[template_counting buildTitle: ** Title after x="+this.m_contentArray["title_x"]+" y="+this.m_contentArray["title_y"]);
        this.m_titlePIXIText.x = this.m_contentArray["title_x"];//(this.m_width - this.m_titlePIXIText.width)/2;
        this.m_titlePIXIText.y = this.m_contentArray["title_y"];//this.m_height/3.5 - this.m_titlePIXIText.height - this.m_height/40;
        
        //this.m_titlePIXIText.x = (this.m_width - this.m_titlePIXIText.width)/2;
       //this.m_titlePIXIText.y = this.m_height/3.5 - this.m_titlePIXIText.height - this.m_height/40;
        
        this.m_stage.addChild(this.m_titlePIXIText);
        
        if (this.m_playmode === "editor")
        {
            this.m_titlePIXIText.interactive = true;
            this.m_titlePIXIText.buttonMode = true;
        }
		
        // use the mousedown and touchstart
        this.m_titlePIXIText.mousedown = this.m_titlePIXIText.touchstart = function(data)
        {
            //data.originalEvent.preventDefault()
            // store a refference to the data
            // The reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = data;
            this.alpha = 0.5;
            this.dragging = true;
        };
		
        // set the events for when the mouse is released or a touch is released
        this.m_titlePIXIText.mouseup = this.m_titlePIXIText.mouseupoutside = this.m_titlePIXIText.touchend = this.m_titlePIXIText.touchendoutside = function(data)
        {
            this.alpha = 1;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;

        };
			
        // set the callbacks for when the mouse or a touch moves
        this.m_titlePIXIText.mousemove = this.m_titlePIXIText.touchmove = function(event)
        {
            if (this.dragging)
            {
                // need to get parent coords..
                var newPosition = event.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
                this.anchor.x = 0.5;
                this.anchor.y = 0.5;

                _this.updateEditorVariable("title_x",this.position.x - (this.width/2));
                _this.updateEditorVariable("title_y",this.position.y - (this.height/2));

            }
        };
                
    }
    
    this.rebuildTitle= function()
    {
        this.m_stage.removeChild(this.m_titlePIXIText);
        this.m_titlePIXIText = null;
        this.buildTitle();
    }

        
    this.buildEventDate= function()
    {
        console.log("[template_counting buildEventDate: event date="+this.m_contentArray["event_date"]+" event time="+this.m_contentArray["event_time"]+" format="+this.m_contentArray["event_datetime_format"]);
        var wordWrap = false;
        var strokeColor = "FFFFFF";
        var strokeThickness = 0;
        var dropShadow = false;
        var dropShadowColor = "000000"; 

        var dateArr = this.getDate(this.m_contentArray["event_date"]);
        var isInvalidDate = true;
        var date_string = "";
        if(dateArr.length == 0)	
            date_string = "Invalid Date";
        else
        {
            this.future_date = new Date();
            this.future_date.setFullYear(dateArr[2],dateArr[0] - 1,dateArr[1]);
            var futureHours = parseInt(this.m_contentArray["event_time"].substring(0,2)); //08:10
            var futureMinutes = parseInt(this.m_contentArray["event_time"].substring(3,5));
            var futureSeconds = 0;
            
            console.log("[template_counting buildEventDate: future_date="+this.m_contentArray["event_time"]+"  futureHours="+futureHours+" futureMinutes="+futureMinutes);
            this.future_date.setHours(futureHours);
            this.future_date.setMinutes(futureMinutes);
            this.future_date.setSeconds(futureSeconds);
            
            if(this.future_date.getMonth()!=dateArr[0] - 1)
                date_string = "Invalid Date";
            else
            {
                isInvalidDate = false;
                //do different format
                //eeee,mmmm/dd/yyyy Sunday, December 25, 2016
                //mmmm/dd/yyyy December 25, 2016
                //eeee,mmmm/dd/yyyy h12:mi Sunday, December 25, 2016 02:00pm
                //mmmm/dd/yyyy h12:mi December 25, 2016 02:00pm
                //
                //mm/dd/yyyy 12/25/2016
                //mm/dd/yyyy h12:mi 12/25/2016 02:00pm
                //
                //dd/mm/yyyy 25/12/2016
                //dd/mm/yyyy h12:mi 25/12/2016 02:00pm
                //
                //yyyy-mm-dd 2016-12-25
                //yyyy-mm-dd h12:mi 2016-12-25 02:00pm

                var dateTimeFormat = "eeee,mmmm/dd/yyyy";
                if (this.m_contentArray["event_datetime_format"] != undefined)
                    dateTimeFormat = this.m_contentArray["event_datetime_format"];
                

                if (dateTimeFormat==="eeee,mmmm/dd/yyyy" 
                        || dateTimeFormat==="eee,mmm/dd/yyyy" 
                        || dateTimeFormat==="mmmm/dd/yyyy" 
                        || dateTimeFormat==="mmm/dd/yyyy" 
                        || dateTimeFormat==="mm/dd/yyyy" 
                        || dateTimeFormat==="dd/mm/yyyy" 
                        || dateTimeFormat==="yyyy-mm-dd")
                    this.m_field_hide_event_time = 1;
                else
                    this.m_field_hide_event_time = 0;   
                
                if (dateTimeFormat=== "eeee,mmmm/dd/yyyy")
                {
                    date_string = this.getWeekLongText(this.future_date)+", "+this.getMonthLongText(this.future_date)+" "+this.future_date.getDate()+", "+this.future_date.getFullYear();
                }
                else if (dateTimeFormat=== "eee,mmm/dd/yyyy")
                {
                    date_string = this.getWeekShortText(this.future_date)+", "+this.getMonthShortText(this.future_date)+" "+this.future_date.getDate()+", "+this.future_date.getFullYear();
                }
                else if (dateTimeFormat=== "mmmm/dd/yyyy")
                {
                    date_string = this.getMonthLongText(this.future_date)+" "+this.future_date.getDate()+", "+this.future_date.getFullYear();
                }
                else if (dateTimeFormat=== "mmm/dd/yyyy")
                {
                    date_string = this.getMonthShortText(this.future_date)+" "+this.future_date.getDate()+", "+this.future_date.getFullYear();
                }
                else if (dateTimeFormat=== "eee,mmm/dd/yyyy h12:mi")
                {
                    date_string = this.getWeekShortText(this.future_date)+", "+this.getMonthShortText(this.future_date)+" "+this.future_date.getDate()+", "+this.future_date.getFullYear()+ " " + this.getEventTimeStr();
                }        
                else if (dateTimeFormat=== "mmmm/dd/yyyy h12:mi")
                {
                    date_string = this.getMonthLongText(this.future_date)+" "+this.future_date.getDate()+", "+this.future_date.getFullYear()+ " " + this.getEventTimeStr();
                }   
                else if (dateTimeFormat=== "mmm/dd/yyyy h12:mi")
                {
                    date_string = this.getMonthShortText(this.future_date)+" "+this.future_date.getDate()+", "+this.future_date.getFullYear()+ " " + this.getEventTimeStr();
                } 
                else if (dateTimeFormat=== "mm/dd/yyyy")
                {
                    var dd = this.get2DigitDate(this.future_date.getDate());
                    date_string = this.getMonthMM(this.future_date)+"/"+dd+"/"+this.future_date.getFullYear();
                }   
                else if (dateTimeFormat=== "mm/dd/yyyy h12:mi")
                {
                    var dd = this.get2DigitDate(this.future_date.getDate());
                    date_string = this.getMonthMM(this.future_date)+"/"+dd+"/"+this.future_date.getFullYear()+ " " + this.getEventTimeStr();
                }  
                else if (dateTimeFormat=== "dd/mm/yyyy")
                {
                    var dd = this.get2DigitDate(this.future_date.getDate()); 
                    date_string = dd+"/"+this.getMonthMM(this.future_date)+"/"+this.future_date.getFullYear();
                }  
                else if (dateTimeFormat=== "dd/mm/yyyy h12:mi")
                {
                    var dd = this.get2DigitDate(this.future_date.getDate());
                    date_string = dd+"/"+this.getMonthMM(this.future_date)+"/"+this.future_date.getFullYear()+ " " + this.getEventTimeStr();
                } 
                else if (dateTimeFormat=== "yyyy-mm-dd")
                {
                    var dd = this.get2DigitDate(this.future_date.getDate());
                    date_string = this.future_date.getFullYear()+"-"+this.getMonthMM(this.future_date)+"-"+ dd;
                }  
                else if (dateTimeFormat=== "yyyy-mm-dd h12:mi")
                {
                    var dd = this.get2DigitDate(this.future_date.getDate());
                    date_string = this.future_date.getFullYear()+"-"+this.getMonthMM(this.future_date)+"-"+ dd+ " " + this.getEventTimeStr();
                } 
            }
        }
        console.log("[template_counting buildEventDate: dateTimeFormat="+dateTimeFormat+" event date str="+date_string);
        this.m_datePIXIText = DacPixi.buildTextItem(date_string,this.m_contentArray["event_datetime_font"],this.m_contentArray["event_datetime_font_color"],this.m_contentArray["event_datetime_font_size"],"left",this.m_contentArray["event_datetime_italic"],this.m_contentArray["event_datetime_bold"],20,20,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
            
        if (this.m_contentArray["event_date_x"] === undefined || this.m_zone_size_changed == 1)
            this.m_contentArray["event_date_x"] = parseInt((this.m_width - this.m_datePIXIText.width)/2);
        if (this.m_contentArray["event_date_y"] === undefined || this.m_zone_size_changed == 1)
            this.m_contentArray["event_date_y"] = parseInt(this.m_titlePIXIText.y) + parseInt(this.m_titlePIXIText.height) + parseInt(this.m_height/40);
        
        if (this.m_contentArray["event_date_x"]< 0) this.m_contentArray["event_date_x"] = 0;
        if (this.m_contentArray["event_date_x"]> this.m_width) this.m_contentArray["event_date_x"] = 0;
        
        if (this.m_contentArray["event_date_y"]< 0) this.m_contentArray["event_date_x"] = this.m_contentArray["overlay_y"]+50;
        if (this.m_contentArray["event_date_y"]> this.m_height) this.m_contentArray["event_date_y"] = this.m_contentArray["overlay_y"]+50;
        
        this.m_datePIXIText.x = this.m_contentArray["event_date_x"];//(this.m_width - this.m_titlePIXIText.width)/2;
        this.m_datePIXIText.y = this.m_contentArray["event_date_y"];//this.m_height/3.5 - this.m_titlePIXIText.height - this.m_height/40;
        
        // this.m_datePIXIText.y = this.m_titlePIXIText.y + this.m_titlePIXIText.height + this.m_height/40;

        this.m_stage.addChild(this.m_datePIXIText);
        
        
        if (this.m_playmode === "editor")
        {
            this.m_datePIXIText.interactive = true;
            this.m_datePIXIText.buttonMode = true;
        }
		
        // use the mousedown and touchstart
        this.m_datePIXIText.mousedown = this.m_datePIXIText.touchstart = function(data)
        {
            //data.originalEvent.preventDefault()
            // store a refference to the data
            // The reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = data;
            this.alpha = 0.5;
            this.dragging = true;
        };
		
        // set the events for when the mouse is released or a touch is released
        this.m_datePIXIText.mouseup = this.m_datePIXIText.mouseupoutside = this.m_datePIXIText.touchend = this.m_datePIXIText.touchendoutside = function(data)
        {
            this.alpha = 1;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;

        };
			
        // set the callbacks for when the mouse or a touch moves
        this.m_datePIXIText.mousemove = this.m_datePIXIText.touchmove = function(event)
        {
            if (this.dragging)
            {
                // need to get parent coords..
                var newPosition = event.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
                this.anchor.x = 0.5;
                this.anchor.y = 0.5;

                _this.updateEditorVariable("event_date_x",this.position.x - (this.width/2));
                _this.updateEditorVariable("event_date_y",this.position.y - (this.height/2));

            }
        };
        
    }
    
    this.rebuildEventDate= function()
    {
        this.m_stage.removeChild(this.m_datePIXIText);
        this.m_datePIXIText = null;
        this.buildEventDate();
    }
    
    
    this.getEventTimeStr = function()
    {
        var wordWrap = false;
        var strokeColor = "FFFFFF";
        var strokeThickness = 0;
        var dropShadow = false;
        var dropShadowColor = "000000"; 

        var isInvalidTime = true;
        var time_string = "";
        var ampm_string = "";
        if(this.m_contentArray["event_time"] == "")
        {
            time_string = "";
            isInvalidTime = false;
            this.future_date.setHours(0);
            this.future_date.setMinutes(0);
            this.future_date.setSeconds(0);
        }
        else
        {
            var timeArr = this.getTime(this.m_contentArray["event_time"]);
            if(timeArr.length == 0)
            {
                time_string = "Invalid Time";
            }
            else
            {
                isInvalidTime = false;
                this.future_date.setHours(timeArr[0]);
                this.future_date.setMinutes(timeArr[1]);
                this.future_date.setSeconds(0);

                if(timeArr[0]<12)
                {
                    ampm_string = "am";
                    if(timeArr[0] == 0) timeArr[0] = 12;
                }
                else
                {
                    ampm_string = "pm";
                    if(timeArr[0]>12) timeArr[0] = timeArr[0] - 12;
                }
                time_string = timeArr[0]+":"+timeArr[1] + ampm_string;;
            }
        }
        return time_string;
    }
        
  /* not used */
    this.buildEventTime= function()
    {
        var wordWrap = false;
        var strokeColor = "FFFFFF";
        var strokeThickness = 0;
        var dropShadow = false;
        var dropShadowColor = "000000"; 

        var isInvalidTime = true;
        var time_string = "";
        var ampm_string = "";
        if(this.m_contentArray["event_time"] == "")
        {
            time_string = "";
            isInvalidTime = false;
            this.future_date.setHours(0);
            this.future_date.setMinutes(0);
            this.future_date.setSeconds(0);
        }
        else
        {
            var timeArr = this.getTime(this.m_contentArray["event_time"]);
            if(timeArr.length == 0)
            {
                time_string = "Invalid Time";
            }
            else
            {
                isInvalidTime = false;
                this.future_date.setHours(timeArr[0]);
                this.future_date.setMinutes(timeArr[1]);
                this.future_date.setSeconds(0);

                if(timeArr[0]<12)
                {
                    ampm_string = "AM";
                    if(timeArr[0] == 0) timeArr[0] = 12;
                }
                else
                {
                    ampm_string = "PM";
                    if(timeArr[0]>12) timeArr[0] = timeArr[0] - 12;
                }
                time_string = timeArr[0]+":"+timeArr[1];
            }
        }
        this.m_timePIXIText = DacPixi.buildTextItem(time_string,this.m_contentArray["event_datetime_font"],this.m_contentArray["event_datetime_font_color"],this.m_contentArray["event_datetime_font_size"],"left",false,true,20,20,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        this.m_amPIXIText = DacPixi.buildTextItem(am_string,this.m_contentArray["event_datetime_font"],this.m_contentArray["event_datetime_font_color"],this.m_contentArray["event_datetime_font_size"]/2,"left",false,true,20,20,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        
        if (this.m_contentArray["event_time_x"] === undefined) this.m_contentArray["event_time_x"] = parseInt((this.m_width - this.m_timePIXIText.width)/2);
        if (this.m_contentArray["event_time_y"] === undefined) this.m_contentArray["event_time_y"] = parseInt(this.m_datePIXIText.y) + parseInt(this.m_datePIXIText.height);
 
 
        this.m_timePIXIText.x = 0;//this.m_contentArray["event_time_x"];//(this.m_width - this.m_timePIXIText.width)/2;
        this.m_timePIXIText.y = 0;//this.m_contentArray["event_time_y"];
        
        
        this.m_amPIXIText.x = this.m_timePIXIText.x + this.m_timePIXIText.width + this.m_amPIXIText.height*0.1;
        this.m_amPIXIText.y = this.m_timePIXIText.y + this.m_timePIXIText.height - this.m_amPIXIText.height*1.2;

        this.m_timeContainer = new PIXI.Container();
        //this.m_stage.addChild(this.m_timePIXIText);
        //this.m_stage.addChild(this.m_amPIXIText);
        this.m_timeContainer.addChild(this.m_timePIXIText);
        this.m_timeContainer.addChild(this.m_amPIXIText);
        
        this.m_stage.addChild(this.m_timeContainer);
        this.m_timeContainer.position.x = this.m_contentArray["event_time_x"];//this.m_timePIXIText.x;
        this.m_timeContainer.position.y = this.m_contentArray["event_time_y"];//this.m_timePIXIText.y;
        
        
        if (this.m_playmode === "editor")
        {
            this.m_timeContainer.interactive = true;
            this.m_timeContainer.buttonMode = true;
        }
		
        // use the mousedown and touchstart
        this.m_timeContainer.mousedown = this.m_timeContainer.touchstart = function(data)
        {
            //data.originalEvent.preventDefault()
            // store a refference to the data
            // The reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = data;
            this.alpha = 0.5;
            this.dragging = true;
        };
		
        // set the events for when the mouse is released or a touch is released
        this.m_timeContainer.mouseup = this.m_timeContainer.mouseupoutside = this.m_timeContainer.touchend = this.m_timeContainer.touchendoutside = function(data)
        {
            this.alpha = 1;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
            //_this.m_contentArray["event_time_x"] = this.position.x+_this.m_timeContainer.width/8;
            //_this.m_contentArray["event_time_y"] = this.position.y+_this.m_timeContainer.height/8;

        };
			
        // set the callbacks for when the mouse or a touch moves
        this.m_timeContainer.mousemove = this.m_timeContainer.touchmove = function(event)
        {
            if (this.dragging)
            {
                // need to get parent coords..
                var newPosition = event.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
                //this.anchor.x = 0.5;
                //this.anchor.y = 0.5;
                
                this.pivot.x = _this.m_timeContainer.width/2;
                this.pivot.y = _this.m_timeContainer.height/2;

                //_this.updateEditorVariable("event_time_x",this.position.x - (this.width/2));
               // _this.updateEditorVariable("event_time_y",this.position.y - (this.height/2));
                _this.updateEditorVariable("event_time_x",this.position.x - _this.m_timeContainer.width/2);
                _this.updateEditorVariable("event_time_y",this.position.y - _this.m_timeContainer.height/2);
            }
        };
    }
    
    this.rebuildEventTime= function()
    {
        this.m_stage.removeChild(this.m_timeContainer);
        this.m_timeContainer = null;
        this.m_timePIXIText = null;
        this.m_amPIXIText = null;
        this.buildEventTime();
    }
        
    this.buildCounting= function()
    {
        console.log("[template_counting] buildCounting counting_label_option ="+this.m_contentArray["counting_label_option"]);
        /*
        DAYS-HOURS-MINUTES-SECONDS
        HOURS-MINUTES-SECONDS
        MINUTES-SECONDS
        SECONDS
        MINUTES
        HOURS
        DAYS
        */    
        var wordWrap = false;
        var strokeColor = "FFFFFF";
        var strokeThickness = 0;
        var dropShadow = false;
        var dropShadowColor = "000000"; 

        //this.m_dayPIXIText.y = this.m_hourPIXIText.y = this.m_minutePIXIText.y = this.m_secondPIXIText.y = this.m_height*3/4 - this.m_dayPIXIText.height;
        var countingNumbers = this.getCountingNumbers();
        this.m_countingDummyPIXIText = DacPixi.buildTextItem("00",this.m_contentArray["counting_font"],this.m_contentArray["counting_font_color"],this.m_contentArray["counting_font_size"],"left",false,true,0,0,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
 
        var needDay = needHour = needHour = needMinute = needSecond = 0;
        
        switch(this.m_contentArray["counting_label_option"]) 
        {
            case "DAYS-HOURS-MINUTES-SECONDS":
                needDay = needHour = needHour = needMinute = needSecond = 1
                break;
             case "DAYS-HOURS-MINUTES":
                needDay = needHour = needHour = needMinute = 1;
                needSecond = 0;
                break;
             case "DAYS-HOURS":
                needDay = needHour =  1;
                needMinute = needSecond = 0;
                break;
             case "DAYS":
                needDay = 1;
                needHour = needMinute = needSecond = 0;
                break;
            case "HOURS-MINUTES-SECONDS":
                needDay = 0;
                needHour = needMinute = needSecond = 1;
                break;
            case "MINUTES-SECONDS":
                needDay = needHour = 0;
                needMinute = needSecond = 1;
                break;
            case "SECONDS":
                needDay = needHour = needMinute = 0;
                needSecond = 1;
                break;
        
            default:
                break;
         }
         
        this.m_countingContainer = new PIXI.Container();
        
        if (needDay==1 && countingNumbers["DAYS"]!= "0")
        {
            console.log("[template_counting] buildCounting found DAYS");
            this.m_dayPIXIText = DacPixi.buildTextItem(countingNumbers["DAYS"],this.m_contentArray["counting_font"],this.m_contentArray["counting_font_color"],this.m_contentArray["counting_font_size"],"left",false,true,0,0,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
            this.m_dayLabelPIXIText = DacPixi.buildTextItem(this.m_contentArray["day_label"],this.m_contentArray["counting_font"],this.m_contentArray["counting_font_color"],this.m_contentArray["time_label_font_size"],"left",false,true,0,0,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
            this.m_countingContainer.addChild(this.m_dayPIXIText);
            this.m_countingContainer.addChild(this.m_dayLabelPIXIText);
        }
        if (this.m_contentArray["counting_label_option"].indexOf("HOURS")>=0 && (countingNumbers["HOURS"]!= "00" || (countingNumbers["DAYS"]!= "00" && countingNumbers["HOURS"]== "00" ) ))
        {
            console.log("[template_counting] buildCounting found HOURS");
            this.m_hourPIXIText = DacPixi.buildTextItem(countingNumbers["HOURS"],this.m_contentArray["counting_font"],this.m_contentArray["counting_font_color"],this.m_contentArray["counting_font_size"],"left",false,true,0,0,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
            this.m_hourLabelPIXIText = DacPixi.buildTextItem(this.m_contentArray["hour_label"],this.m_contentArray["counting_font"],this.m_contentArray["counting_font_color"],this.m_contentArray["time_label_font_size"],"left",false,true,0,0,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
            this.m_countingContainer.addChild(this.m_hourPIXIText);
            this.m_countingContainer.addChild(this.m_hourLabelPIXIText);
        }
        if (this.m_contentArray["counting_label_option"].indexOf("MINUTES")>=0 && (countingNumbers["MINUTES"]!= "00" || ((countingNumbers["DAYS"]!= "00" || countingNumbers["HOURS"]!= "00") && countingNumbers["MINUTES"]== "00")))
        {
            console.log("[template_counting] buildCounting found MINUTES");
            this.m_minutePIXIText = DacPixi.buildTextItem(countingNumbers["MINUTES"],this.m_contentArray["counting_font"],this.m_contentArray["counting_font_color"],this.m_contentArray["counting_font_size"],"left",false,true,0,0,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
            this.m_minuteLabelPIXIText = DacPixi.buildTextItem(this.m_contentArray["minute_label"],this.m_contentArray["counting_font"],this.m_contentArray["counting_font_color"],this.m_contentArray["time_label_font_size"],"left",false,true,0,0,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
            this.m_countingContainer.addChild(this.m_minutePIXIText);
            this.m_countingContainer.addChild(this.m_minuteLabelPIXIText);
        }
        if (this.m_contentArray["counting_label_option"].indexOf("SECONDS")>=0 && (countingNumbers["SECONDS"]!= "00" || ((countingNumbers["DAYS"]!= "00" || countingNumbers["HOURS"]!= "00" || countingNumbers["SECONDS"]!= "00") && countingNumbers["SECONDS"]== "00")))
        {
            console.log("[template_counting] buildCounting found SECONDS");
            this.m_secondPIXIText = DacPixi.buildTextItem(countingNumbers["SECONDS"],this.m_contentArray["counting_font"],this.m_contentArray["counting_font_color"],this.m_contentArray["counting_font_size"],"left",false,true,0,0,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
            this.m_secondLabelPIXIText = DacPixi.buildTextItem(this.m_contentArray["second_label"],this.m_contentArray["counting_font"],this.m_contentArray["counting_font_color"],this.m_contentArray["time_label_font_size"],"left",false,true,0,0,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
            this.m_countingContainer.addChild(this.m_secondPIXIText);
            this.m_countingContainer.addChild(this.m_secondLabelPIXIText);
        }      



        this.m_stage.addChild(this.m_countingContainer);


        if (this.m_playmode === "editor")
        {
            this.m_countingContainer.interactive = true;
            this.m_countingContainer.buttonMode = true;
        }
		
        // use the mousedown and touchstart
        this.m_countingContainer.mousedown = this.m_countingContainer.touchstart = function(data)
        {
            //data.originalEvent.preventDefault()
            // store a refference to the data
            // The reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = data;
            this.alpha = 0.5;
            this.dragging = true;
        };
		
        // set the events for when the mouse is released or a touch is released
        this.m_countingContainer.mouseup = this.m_countingContainer.mouseupoutside = this.m_countingContainer.touchend = this.m_countingContainer.touchendoutside = function(data)
        {
            this.alpha = 1;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;

            _this.m_contentArray["counting_manual_mid_x"] = _this.m_countingContainer.position.x;
            _this.m_contentArray["counting_manual_y"] = _this.m_countingContainer.position.y - _this.m_countingContainer.height/2;
            
             //console.log("[template_counting] buildCounting mouseup*** counting_manual_mid_x="+parseInt(_this.m_contentArray["counting_manual_mid_x"]) +" counting_manual_y="+parseInt(_this.m_contentArray["counting_manual_y"]) );
             //console.log("[template_counting] buildCounting mouseup*** counting conatiner width="+_this.m_countingContainer.width +" height="+_this.m_countingContainer.height );
             //console.log("[template_counting] buildCounting mouseup*** stage width="+parseInt(_this.m_stage.width) +" height="+parseInt(_this.m_stage.height) );

        };
			
        // set the callbacks for when the mouse or a touch moves
        this.m_countingContainer.mousemove = this.m_countingContainer.touchmove = function(event)
        {
            if (this.dragging)
            {
                // need to get parent coords..
                var newPosition = event.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
                //this.anchor.x = 0.5;
                //this.anchor.y = 0.5;
                
                this.pivot.x = _this.m_countingContainer.width/2;
                this.pivot.y = _this.m_countingContainer.height/2;

                _this.updateEditorVariable("counting_x",this.position.x - _this.m_countingContainer.width/2);
                _this.updateEditorVariable("counting_y",this.position.y - _this.m_countingContainer.height/2);
            }
        };
        
    }	
    
    this.rebuildCounting= function()
    {
        if (this.m_endingMesgPIXIText != undefined)
            this.m_endingMesgPIXIText.alpha = 0;
        
        this.m_stage.removeChild(this.m_countingContainer);
        this.m_dayPIXIText = null;
        this.m_hourPIXIText = null;
        this.m_minutePIXIText = null;
        this.m_secondPIXIText = null;
        this.m_dayLabelPIXIText = null;
        this.m_hourLabelPIXIText = null;
        this.m_minuteLabelPIXIText = null;
        this.m_secondLabelPIXIText = null;

        this.m_countingContainer = null;

        this.buildCounting();
        this.doCounting();
        
    }
    /*
    this.doCounting = function()
    {
        if (this.m_templateName == "countup")
            this.doCountup(); 
        else
            this.doCountdown(); 
        
    }
    */
    this.doCounting = function()
    {
        console.log("[template_counting] doCounting ***template="+_this.m_templateName);
        var current_date = new Date();
        var differ = parseInt((_this.future_date.getTime() - current_date.getTime())/1000);
         if (_this.m_templateName == "countup")
            differ = parseInt((current_date.getTime() - _this.future_date.getTime() )/1000);
        console.log("[template_counting]doCounting current_date="+current_date+" .... future_date="+_this.future_date+" differ="+differ );
        var day_s;
        var hour_s;
        var minute_s;
        var second_s;
        var tempDay = "000";
        var countingNumbers = [];  //DAYS, HOURS, MINUTES, SECONDS
        countingNumbers["DAYS"] = "0";
        countingNumbers["HOURS"] = "00";
        countingNumbers["MINUTES"] = "00";
        countingNumbers["SECONDS"] = "00";
        if(differ < 0)
        {
            if (_this.m_templateName == "countdown")
                clearInterval(_this.intervalId);
            _this.buildEndingMesg();
            _this.m_countingContainer.alpha = 0;
        }
        else
        {
            _this.m_countingContainer.alpha = 1;
            countingNumbers = _this.getCountingNumbers();
/*
            var day_s2 = ""; 
            if (day_s.length == 3)
                day_s2 = day_s;
            else
                day_s2 = day_s.substr(day_s.length-4,4);

            var hour_s2 = (hour_s.length<2) ? "0"+hour_s : hour_s;
            var minute_s2 = (minute_s.length<2) ? "0"+minute_s : minute_s;
            var second_s2 = (second_s.length<2) ? "0"+second_s : second_s;
*/
            
            var labelCount = 4;
            if (countingNumbers["DAYS"] == "0")
            {
                labelCount--;
                if (_this.m_dayPIXIText != null) 
                {
                   _this.m_countingContainer.removeChild(_this.m_dayPIXIText);
                   _this.m_dayPIXIText = null;
                }
                if (_this.m_dayLabelPIXIText != null) 
                {
                   _this.m_countingContainer.removeChild(_this.m_dayLabelPIXIText);
                   _this.m_dayLabelPIXIText = null;
                }
            }
         
            if (countingNumbers["DAYS"] == "0" && countingNumbers["HOURS"] == "00" )
            {
                labelCount--;
                if (_this.m_hourPIXIText != null) 
                {
                   _this.m_countingContainer.removeChild(_this.m_hourPIXIText);
                   _this.m_hourPIXIText = null;
                }  
                if (_this.m_hourLabelPIXIText != null) 
                {
                   _this.m_countingContainer.removeChild(_this.m_hourLabelPIXIText);
                   _this.m_hourLabelPIXIText = null;
                }
            }
            if (countingNumbers["DAYS"] == "0" && countingNumbers["HOURS"] == "00" && countingNumbers["MINUTES"] == "00" )
            {
                labelCount--;
                if (_this.m_minutePIXIText != null) 
                {
                   _this.m_countingContainer.removeChild(_this.m_minutePIXIText);
                   _this.m_minutePIXIText = null;
                }
                if (_this.m_minuteLabelPIXIText != null) 
                {
                   _this.m_countingContainer.removeChild(_this.m_minuteLabelPIXIText);
                   _this.m_minuteLabelPIXIText = null;
                }
            }
       
            var day_width = day_x = day_y = 0;
            var hour_width = hour_x = hour_y = 0;
            var minute_width = minute_x = minute_y = 0;
            var second_width = second_x = second_y = 0;
             
            if (_this.m_dayPIXIText != null)
            {
                _this.m_dayPIXIText.text = countingNumbers["DAYS"];
                day_width = _this.m_dayPIXIText.width;
                _this.m_dayPIXIText.y = 0;
            }
            if (_this.m_hourPIXIText != null)
            {
                _this.m_hourPIXIText.text = countingNumbers["HOURS"];
                hour_width = _this.m_hourPIXIText.width;
                _this.m_hourPIXIText.y = 0;
            }
            if (_this.m_minutePIXIText != null)
            {
                _this.m_minutePIXIText.text = countingNumbers["MINUTES"];
                minute_width = _this.m_minutePIXIText.width; 
                _this.m_minutePIXIText.y = 0;
            }
            if (_this.m_secondPIXIText != null)
            {
                _this.m_secondPIXIText.text = countingNumbers["SECONDS"];
                second_width = _this.m_secondPIXIText.width; 
                _this.m_secondPIXIText.y = 0;
            }
            
            // calculate positions
            var distance = _this.m_countingDummyPIXIText.width;
            if (_this.m_zone_width/_this.m_zone_height < 1.3)
                distance = _this.m_countingDummyPIXIText.width/3;
            //console.log("[template_counting] doCounting dummy width ="+ _this.m_countingDummyPIXIText.width+" height="+_this.m_countingDummyPIXIText.height);
            var counting_y =  _this.m_height*3/4 - _this.m_countingDummyPIXIText.height;
            if ( _this.m_contentArray["counting_manual_y"] != undefined)
                counting_y =  _this.m_contentArray["counting_manual_y"];

            
            //var counting_label_y = _this.m_height*3/4 + _this.m_height/40 - counting_y;
            var counting_label_y = _this.m_countingDummyPIXIText.height;// + _this.m_countingDummyPIXIText.height;
            //console.log("[template_counting] doCounting ***counting_manual_y="+_this.m_contentArray["counting_manual_y"] +" counting_y="+counting_y+" label y="+counting_label_y);
            
            if (labelCount == 4)
            {
                _this.m_dayPIXIText.x = 0;
                if (_this.m_hourPIXIText != undefined)
                    _this.m_hourPIXIText.x = _this.m_dayPIXIText.x + day_width + distance;
                if (_this.m_minutePIXIText != undefined)
                    _this.m_minutePIXIText.x = _this.m_hourPIXIText.x + hour_width + distance;
                if (_this.m_secondPIXIText != undefined)
                    _this.m_secondPIXIText.x = _this.m_minutePIXIText.x + minute_width + distance;
            }
            else if (labelCount == 3)
            {
                _this.m_hourPIXIText.x = 0;
                if (_this.m_minutePIXIText != undefined)
                    _this.m_minutePIXIText.x = _this.m_hourPIXIText.x + hour_width + distance;
                if (_this.m_secondPIXIText != undefined)
                    _this.m_secondPIXIText.x = _this.m_minutePIXIText.x + minute_width + distance;
            }    
            else if (labelCount == 2)
            {
                if (_this.m_minutePIXIText != undefined)
                    _this.m_minutePIXIText.x = 0;
                if (_this.m_secondPIXIText != undefined)
                    _this.m_secondPIXIText.x = _this.m_minutePIXIText.x + minute_width + distance;
            }  
            else if (labelCount == 1)
            {
                _this.m_secondPIXIText.x = 0;
            }  
            
            if (_this.m_dayPIXIText != null && _this.m_dayLabelPIXIText != null)
            {
                _this.m_dayLabelPIXIText.x = _this.m_dayPIXIText.x + _this.m_dayPIXIText.width/2 - _this.m_dayLabelPIXIText.width/2;
                _this.m_dayLabelPIXIText.y = counting_label_y;
            }
            if (_this.m_hourPIXIText != null && _this.m_hourLabelPIXIText != null)
            {
                _this.m_hourLabelPIXIText.x = _this.m_hourPIXIText.x + _this.m_hourPIXIText.width/2 - _this.m_hourLabelPIXIText.width/2.2;
                _this.m_hourLabelPIXIText.y = counting_label_y;
            }
            if (_this.m_minutePIXIText != null && _this.m_minuteLabelPIXIText != null)
            {
                _this.m_minuteLabelPIXIText.x = _this.m_minutePIXIText.x + _this.m_minutePIXIText.width/2 - _this.m_minuteLabelPIXIText.width/2;
                _this.m_minuteLabelPIXIText.y = counting_label_y;
            }
            if (_this.m_secondPIXIText != null && _this.m_secondLabelPIXIText != null)
            {
                _this.m_secondLabelPIXIText.x = _this.m_secondPIXIText.x + _this.m_secondPIXIText.width/2 - _this.m_secondLabelPIXIText.width/2;
                _this.m_secondLabelPIXIText.y = counting_label_y;
            }
            

            var start_x = _this.m_width/2 - _this.m_countingContainer.width/2;
            if (_this.m_contentArray["counting_manual_mid_x"] != undefined)
            {
                start_x = _this.m_contentArray["counting_manual_mid_x"]-_this.m_countingContainer.width/2;
            }
            
            if(start_x < 0)
                start_x = 0;
            var counting_x = start_x;
            //console.log("[template_counting] doCounting *** counting_manual_mid_x="+_this.m_contentArray["counting_manual_mid_x"] );
            
            
            _this.m_contentArray["counting_x"] = counting_x;
            _this.m_contentArray["counting_y"] = counting_y;
            
            if (_this.m_contentArray["counting_x"]< 0) _this.m_contentArray["counting_x"] = 0;
            if (_this.m_contentArray["counting_x"]> _this.m_width) _this.m_contentArray["event_date_x"] = 0;

            if (_this.m_contentArray["counting_y"]< 0) _this.m_contentArray["counting_x"] = _this.m_contentArray["overlay_y"]+ _this.m_contentArray["overlay_height"]-50;
            if (_this.m_contentArray["counting_y"]> _this.m_height) _this.m_contentArray["counting_y"] = _this.m_contentArray["overlay_y"]+ _this.m_contentArray["overlay_height"]-50;
  
            //_this.m_contentArray["counting_x"] = counting_x;

            _this.m_countingContainer.position.x = _this.m_contentArray["counting_x"];
            _this.m_countingContainer.position.y = _this.m_contentArray["counting_y"];

           // console.log("[template_counting] doCounting ***countingContainer*** width="+_this.m_countingContainer.width +" x="+_this.m_contentArray["counting_x"], " y="+_this.m_contentArray["counting_y"] + " manual mid x="+_this.m_contentArray["counting_manual_mid_x"] + " manual y="+_this.m_contentArray["counting_manual_y"]);
            
        }
    }
    
    this.getCountingNumbers = function()
    {
        /*
        DAYS-HOURS-MINUTES-SECONDS
        HOURS-MINUTES-SECONDS
        MINUTES-SECONDS
        SECONDS
        MINUTES
        HOURS
        DAYS
        */  
        var countingNumbers = [];  //DAYS, HOURS, MINUTES, SECONDS
        countingNumbers["DAYS"] = "0";
        countingNumbers["HOURS"] = "00";
        countingNumbers["MINUTES"] = "00";
        countingNumbers["SECONDS"] = "00";
        
        var current_date = new Date();
        var differ = parseInt((_this.future_date.getTime() - current_date.getTime())/1000);
        if (_this.m_templateName == "countup")
            differ = parseInt((current_date.getTime() - _this.future_date.getTime() )/1000);
        
        var day = 0;
        var hour = 0;
        var minute = 0;
        var second = 0;

        if(differ > 0)
        {
            day = parseInt(differ/(24*60*60));
            hour = parseInt((differ - day*24*60*60)/(60*60));
            minute = parseInt((differ - day*24*60*60 - hour*60*60)/60);
            second = differ - day*24*60*60 - hour*60*60 - minute*60;
        }
        
        switch(this.m_contentArray["counting_label_option"]) 
        {
            case "DAYS-HOURS-MINUTES-SECONDS":
                countingNumbers["DAYS"] = day.toString();
                countingNumbers["HOURS"] = hour.toString();
                countingNumbers["MINUTES"] = minute.toString();
                countingNumbers["SECONDS"] = second.toString();
                break;
             case "DAYS-HOURS-MINUTES":
                countingNumbers["DAYS"] = day.toString();
                countingNumbers["HOURS"] = hour.toString();
                countingNumbers["MINUTES"] = minute.toString();
                countingNumbers["SECONDS"] = second.toString();
                break;
             case "DAYS-HOURS":
                countingNumbers["DAYS"] = day.toString();
                countingNumbers["HOURS"] = hour.toString();
                countingNumbers["MINUTES"] = minute.toString();
                countingNumbers["SECONDS"] = second.toString();
                break;
             case "DAYS":
                countingNumbers["DAYS"] = day.toString();
                countingNumbers["HOURS"] = hour.toString();
                countingNumbers["MINUTES"] = minute.toString();
                countingNumbers["SECONDS"] = second.toString();
                break;

            case "HOURS-MINUTES-SECONDS":
                hour = hour + day * 24;
                countingNumbers["DAYS"] = "00";
                countingNumbers["HOURS"] = hour.toString();
                countingNumbers["MINUTES"] = minute.toString();
                countingNumbers["SECONDS"] = second.toString();
                break;
            case "MINUTES-SECONDS":
                minute = minute  + hour*60 + day * 24 *60;
                countingNumbers["DAYS"] = "00";
                countingNumbers["HOURS"] = "00";
                countingNumbers["MINUTES"] = minute.toString();
                countingNumbers["SECONDS"] = second.toString();
                break;
            case "SECONDS":
                seconds = seconds + minute*60  + hour*3600 + day * 24 *3600;
                countingNumbers["DAYS"] = "00";
                countingNumbers["HOURS"] = "00";
                countingNumbers["MINUTES"] = "00";
                countingNumbers["SECONDS"] = second.toString();
                break;

            default:
                break;
         }
         countingNumbers["HOURS"] = (countingNumbers["HOURS"].length<2) ? "0"+countingNumbers["HOURS"] : countingNumbers["HOURS"];
         countingNumbers["MINUTES"] = (countingNumbers["MINUTES"].length<2) ? "0"+countingNumbers["MINUTES"] : countingNumbers["MINUTES"];
         countingNumbers["SECONDS"] = (countingNumbers["SECONDS"].length<2) ? "0"+countingNumbers["SECONDS"] : countingNumbers["SECONDS"];
         return countingNumbers;
    }
    
////////////////
    this.buildEndingMesg = function()
    {
        console.log("[template_counting buildEndingMesg: mesg="+this.m_contentArray["counting_end_mesg"]+" font="+this.m_contentArray["counting_end_mesg_font"]+" font_size="+this.m_contentArray["counting_end_mesg_font_size"]);
        var wordWrap = true;
        var strokeColor = "FFFFFF";
        var strokeThickness = 0;
        var dropShadow = false
        var dropShadowColor = "000000"; 

        this.m_endingMesgPIXIText = DacPixi.buildTextItem(this.m_contentArray["counting_end_mesg"],this.m_contentArray["counting_end_mesg_font"],this.m_contentArray["counting_end_mesg_font_color"],this.m_contentArray["counting_end_mesg_font_size"],"left",false,true,20,20,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);

        //console.log("[template_counting buildEndingMesg: ** before x="+this.m_contentArray["counting_end_mesg_x"]+" y="+this.m_contentArray["counting_end_mesg_y"]);
 
 
        if (this.m_contentArray["counting_end_mesg_x"] === undefined) this.m_contentArray["counting_end_mesg_x"] = parseInt((this.m_width - this.m_endingMesgPIXIText.width)/2);
        if (this.m_contentArray["counting_end_mesg_y"] === undefined) this.m_contentArray["counting_end_mesg_y"] = this.m_contentArray["counting_y"];
        //console.log("[template_counting buildEndingMesg: ** after x="+this.m_contentArray["counting_end_mesg_x"]+" y="+this.m_contentArray["counting_end_mesg_y"]);
        this.m_endingMesgPIXIText.x = this.m_contentArray["counting_end_mesg_x"];//(this.m_width - this.m_titlePIXIText.width)/2;
        this.m_endingMesgPIXIText.y = this.m_contentArray["counting_end_mesg_y"];//this.m_height/3.5 - this.m_titlePIXIText.height - this.m_height/40;
        
        //this.m_titlePIXIText.x = (this.m_width - this.m_titlePIXIText.width)/2;
       //this.m_titlePIXIText.y = this.m_height/3.5 - this.m_titlePIXIText.height - this.m_height/40;
        
        this.m_stage.addChild(this.m_endingMesgPIXIText);
        
        if (this.m_playmode === "editor")
        {
            this.m_endingMesgPIXIText.interactive = true;
            this.m_endingMesgPIXIText.buttonMode = true;
        }
		
        // use the mousedown and touchstart
        this.m_endingMesgPIXIText.mousedown = this.m_endingMesgPIXIText.touchstart = function(data)
        {
            //data.originalEvent.preventDefault()
            // store a refference to the data
            // The reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = data;
            this.alpha = 0.5;
            this.dragging = true;
        };
		
        // set the events for when the mouse is released or a touch is released
        this.m_endingMesgPIXIText.mouseup = this.m_endingMesgPIXIText.mouseupoutside = this.m_endingMesgPIXIText.touchend = this.m_endingMesgPIXIText.touchendoutside = function(data)
        {
            this.alpha = 1;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;

        };
			
        // set the callbacks for when the mouse or a touch moves
        this.m_endingMesgPIXIText.mousemove = this.m_endingMesgPIXIText.touchmove = function(event)
        {
            if (this.dragging)
            {
                // need to get parent coords..
                var newPosition = event.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
                this.anchor.x = 0.5;
                this.anchor.y = 0.5;

                _this.updateEditorVariable("counting_end_mesg_x",this.position.x - (this.width/2));
                _this.updateEditorVariable("counting_end_mesg_y",this.position.y - (this.height/2));

            }
        };
                
    }
    
    this.rebuildEndingMesg= function()
    {
        if (this.m_endingMesgPIXIText != undefined)
            this.m_stage.removeChild(this.m_endingMesgPIXIText);
        this.m_endingMesgPIXIText = null;
        this.buildEndingMesg();
        
        this.m_countingContainer.alpha = 0;
    }
////////////////
 
    this.playTemplate = function()
    {
	this.animate();
        console.log("[template_counting]playTemplate isPlaying="+this.m_isPlaying+"  isLoading="+this.m_isLoading);

        if (this.m_playmode != "editor")
            this.intervalId= setInterval(this.doCounting,1000);
        this.doCounting();
        this.m_renderer.render(this.m_stage);
        TemplateBase.prototype.buildQRCode.call(_this,_this.m_contentArray['qr_text'],_this.m_contentArray['qr_size'], _this.m_contentArray['qr_color'], _this.m_contentArray['qr_x'],_this.m_contentArray['qr_y'])
 
    } 
    
    this.animate = function() 
    {
        requestAnimationFrame(animate);
        this.m_renderer.render(this.m_stage);	 
    } 
    

	
    //util
    this.get2DigitDate = function(dateStr)
    {
        return ("0" + dateStr).slice(-2);
    }
    
    this.getDate = function(str)
    {
        var arr = str.split("/");
        if(arr.length != 3)	return [];
        if(parseInt(arr[0])<1 || parseInt(arr[0])>12)
            return [];
        else
        {
            if(arr[2].length==2)
                arr[2] = "20"+arr[2];
        }
        return arr;
    }
    
    this.getTime = function(str)
    {
        var arr = str.split(":");
        if(arr.length!=2) return [];
        if(parseInt(arr[0])<0 || parseInt(arr[0])>23) return [];
        if(parseInt(arr[1])<0 || parseInt(arr[1])>59) return [];
        return arr;
    }
    
    this.getWeekShortText = function(date)
    {
        var week = "";
        switch (date.getDay()) {
            case 1 :
                week = "Mon";
                break;
            case 2 :
                week = "Tue";
                break;
            case 3 :
                week = "Wed";
                break;
            case 4 :
                week = "Thu";
                break;
            case 5 :
                week = "Fri";
                break;
            case 6 :
                week = "Sat";
                break;
            case 0 :
                week = "Sun";
                break;
        }
        return week;
    }
    
    this.getWeekLongText = function(date)
    {
        var week = "";
        switch (date.getDay()) {
            case 1 :
                week = "Monday";
                break;
            case 2 :
                week = "Tuesday";
                break;
            case 3 :
                week = "Wednesday";
                break;
            case 4 :
                week = "Thursday";
                break;
            case 5 :
                week = "Friday";
                break;
            case 6 :
                week = "Saturday";
                break;
            case 0 :
                week = "Sunday";
                break;
        }
        return week;
    }
    
    this.getMonthMM = function(date)
    {
        var month = "";
        switch (date.getMonth()) {
            case 0 :
                month = "01";
                break;
            case 1 :
                month = "02";
                break;
            case 2 :
                month = "03";
                break;
            case 3 :
                month = "04";
                break;
            case 4 :
                month = "05";
                break;
            case 5 :
                month = "06";
                break;
            case 6 :
                month = "07";
                break;
            case 7 :
                month = "08";
                break;
            case 8 :
                month = "09";
                break;
            case 9 :
                month = "10";
                break;
            case 10 :
                month = "11";
                break;
            case 11 :
                month = "12";
                break;
        }
        return month;
    }

    this.getMonthLongText = function(date)
    {
        var month = "";
        switch (date.getMonth()) {
            case 0 :
                month = "January";
                break;
            case 1 :
                month = "Febuary";
                break;
            case 2 :
                month = "March";
                break;
            case 3 :
                month = "April";
                break;
            case 4 :
                month = "May";
                break;
            case 5 :
                month = "June";
                break;
            case 6 :
                month = "July";
                break;
            case 7 :
                month = "August";
                break;
            case 8 :
                month = "September";
                break;
            case 9 :
                month = "October";
                break;
            case 10 :
                month = "November";
                break;
            case 11 :
                month = "December";
                break;
        }
        return month;
    }
    
   this.getMonthShortText = function(date)
    {
        var month = "";
        switch (date.getMonth()) {
            case 0 :
                month = "Jan";
                break;
            case 1 :
                month = "Feb";
                break;
            case 2 :
                month = "Mar";
                break;
            case 3 :
                month = "Apr";
                break;
            case 4 :
                month = "May";
                break;
            case 5 :
                month = "Jun";
                break;
            case 6 :
                month = "Jul";
                break;
            case 7 :
                month = "Aug";
                break;
            case 8 :
                month = "Sep";
                break;
            case 9 :
                month = "Oct";
                break;
            case 10 :
                month = "Nov";
                break;
            case 11 :
                month = "Dec";
                break;
        }
        return month;
    }
	
/////////////////////////////////////////////////////////////////////////////
    this.initEditView = function(fullWidget)
    {
        this.m_playmode="editor";
        

        if (this.m_zone_width != fullWidget["widget"]["dac_widget"]["content"]["zone_width"]
            || this.m_zone_height != fullWidget["widget"]["dac_widget"]["content"]["zone_height"])
        {
            this.m_zone_size_changed = 1;
            console.log("[template_counting] initEditViewzone size changed");
        }
        else
        {
            this.m_zone_size_changed = 0;
            console.log("[template_counting] initEditView zone size not changed");
        }
        
        this.m_fullWidget = fullWidget;
        this.m_wid = fullWidget.wid
        this.m_assetIdPrefix = "w"+this.m_wid+"-"+this.m_templateName+"-";
        this.m_contentArray = fullWidget["widget"]["dac_widget"]["content"];

        //console.log("initEditView  this.m_contentArray="+JSON.stringify(this.m_contentArray));

        this.m_assetArray = fullWidget.widgetAsset;
        console.log("[template_counting]initEditView wid="+this.m_wid);
        this.initTemplateFields();
        this.initTemplateUI();
        this.buildOverlayResizeHandles();
        this.playTemplate();
    }

/*
    this.resizeEditView = function(fullWidget)
    {
        this.m_playmode="editor";
        this.m_fullWidget = fullWidget;
        

        
        this.m_wid = fullWidget.wid
        this.m_assetIdPrefix = "w"+this.m_wid+"-"+this.m_templateName+"-";
        this.m_contentArray = fullWidget["widget"]["dac_widget"]["content"];

        //console.log("initEditView  this.m_contentArray="+JSON.stringify(this.m_contentArray));

        this.m_assetArray = fullWidget.widgetAsset;
        console.log("[template_announcement]initEditView wid="+this.m_wid);
        this.initTemplateFields();
        this.initTemplateUI();
        //this.buildResizeImageIcon();
        //this.buildOverlayResizeHandles();
        this.playTemplate();
    }
*/
    this.updateEditView = function(fullWidget)
    {
        console.log("[template_counting]updateEditView");

        this.m_zone_size_changed = 0;

        
        this.m_fullWidget = fullWidget;
        this.m_contentArray = fullWidget["widget"]["dac_widget"]["content"];
        this.m_assetArray = fullWidget.widgetAsset;
        console.log("[template_counting]updateEditView "+ JSON.stringify(this.m_contentArray));

        //this.setTextItem(this.m_titlePIXIText,"title");
        //this.setTextItem(this.m_datePIXIText,"event_date");
        //this.setTextItem(this.m_timePIXIText,"event_time");
        this.initTemplateFields();
        this.rebuildTitle();
        this.rebuildEventDate();
        //if (this.m_field_hide_event_time != 1)
        //    this.rebuildEventTime();
        
        if (this.m_contentArray["counting_end_mesg_show"]=== true)
        {
            this.rebuildEndingMesg();
        }
        else
        {
            this.rebuildCounting();
        }
        //this.setEventDate();
        //this.buildEventTime();
       // DacPixi.redrawRectangle(this.m_backgroundPIXIGraphics,0,0,this.m_contentArray["zone_width"],this.m_contentArray["zone_height"],this.m_contentArray["background_color"],1);

        //setOverlayColor
        DacPixi.redrawRectangle(this.m_overlayPIXIGraphics,this.m_contentArray["overlay_x"],this.m_contentArray["overlay_y"],this.m_contentArray["overlay_width"],this.m_contentArray["overlay_height"],this.m_contentArray["overlay_color"],this.m_contentArray["overlay_alpha"]);

        //background Image update
        //this.buildBackgroundImage();
        //this.rebuildBackgroundImage();
        //this.rebuildWidgetBackground();
        //this.buildWidgetBackground();
        TemplateBase.prototype.rebuildWidgetBackground.call(this)
        
        TemplateBase.prototype.buildQRCode.call(_this,_this.m_contentArray['qr_text'],_this.m_contentArray['qr_size'], _this.m_contentArray['qr_color'], _this.m_contentArray['qr_x'],_this.m_contentArray['qr_y'])
 
    }

    this.setTextItem = function(pixiText,fieldName) {

        console.log("[template_counting setTextItem: "+fieldName+"="+this.m_contentArray[fieldName]);
        pixiText.text = this.m_contentArray[fieldName];
        var boldStr = "";
        var italicStr = "";

        if (this.m_contentArray[fieldName+"_bold"])
            boldStr = "bold ";
        if (this.m_contentArray[fieldName+"_italic"])
            italicStr = "italic ";

        var style = {font: boldStr+italicStr+this.m_contentArray[fieldName+"_font_size"]+"px "+this.m_contentArray[fieldName+"_font"], fill: this.m_contentArray[fieldName+"_font_color"], align: this.m_contentArray[fieldName+"_alignment"], stroke: "#FFFFFF", strokeThickness: 0,wordWrap:true,wordWrapWidth: this.m_contentArray["zone_width"]};
        pixiText.style = style;
        
        this.m_titlePIXIText.x = (this.m_width - this.m_titlePIXIText.width)/2;
        this.m_titlePIXIText.y = this.m_height/4 - this.m_titlePIXIText.height - this.m_height/40;
    }

       
    this.updateEditorVariable = function(name,value){
        this.m_fullWidget.widget.dac_widget.content[name] = value;
        this.m_contentArray[name] = value;
        parent.updateEditorContent(this.m_fullWidget);
    }
    
    
    
    this.buildOverlayResizeHandles = function()
    {
        this.buildOverlayResizeHandle1();
        this.buildOverlayResizeHandle2();
        this.buildOverlayResizeHandle3();
        this.buildOverlayResizeHandle4();

    }
	
    this.setOverLayResizeHandlePosition = function()
    {

        _this.m_overlayResizeHandle1.position.x = _this.m_contentArray["overlay_x"];
        _this.m_overlayResizeHandle1.position.y = _this.m_contentArray["overlay_y"]; 

        _this.m_overlayResizeHandle2.position.x = _this.m_contentArray["overlay_x"]+ _this.m_contentArray["overlay_width"];
        _this.m_overlayResizeHandle2.position.y = _this.m_contentArray["overlay_y"]; 

        _this.m_overlayResizeHandle3.position.x = _this.m_contentArray["overlay_x"];
        _this.m_overlayResizeHandle3.position.y = _this.m_contentArray["overlay_y"]+ _this.m_contentArray["overlay_height"]; 

        _this.m_overlayResizeHandle4.position.x = _this.m_contentArray["overlay_x"]+ _this.m_contentArray["overlay_width"];
        _this.m_overlayResizeHandle4.position.y = _this.m_contentArray["overlay_y"]+ _this.m_contentArray["overlay_height"];  

    }

    this.buildOverlayResizeHandle1 = function()
    {

        var fillColor = "9C0000";
        var alpha = 0.3;
        this.m_overlayResizeHandle1 = DacPixi.buildResizeHandle(this.m_stage, this.m_handleWidth, this.m_handleWidth, fillColor, alpha);  
        this.m_overlayResizeHandle1.position.x = this.m_overlayPIXIGraphics.position.x;
        this.m_overlayResizeHandle1.position.y = this.m_overlayPIXIGraphics.position.y;

        this.m_overlayResizeHandle1.mousedown = this.m_overlayResizeHandle1.touchstart = function(data)
        {
            // store a refference to the data
            // The reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = data;
            this.alpha = 0.8;
            this.dragging = true;
        };

        // set the events for when the mouse is released or a touch is released
        this.m_overlayResizeHandle1.mouseup = this.m_overlayResizeHandle1.mouseupoutside = this.m_overlayResizeHandle1.touchend = this.m_overlayResizeHandle1.touchendoutside = function(data)
        {
            this.alpha = 0.3;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
            _this.updateEditorVariable("overlay_width",_this.m_contentArray["overlay_width"]);
            _this.updateEditorVariable("overlay_height",_this.m_contentArray["overlay_height"]);

        };

        // set the callbacks for when the mouse or a touch moves
        this.m_overlayResizeHandle1.mousemove = this.m_overlayResizeHandle1.touchmove = function(event)
        {
            if(this.dragging)
            {
                // need to get parent coords..
                var newPosition = event.data.getLocalPosition(this.parent); 
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;


                var widthDelta = _this.m_contentArray["overlay_x"] - this.position.x;
                var HeightDelta = _this.m_contentArray["overlay_y"] - this.position.y;

                _this.m_contentArray["overlay_x"] = this.position.x;
                _this.m_contentArray["overlay_y"] = this.position.y;
                _this.m_overlayPIXIGraphics.position.x  = this.position.x;
                _this.m_overlayPIXIGraphics.position.y  = this.position.y;

                _this.m_contentArray["overlay_width"] = _this.m_contentArray["overlay_width"] + widthDelta;
                _this.m_contentArray["overlay_height"] = _this.m_contentArray["overlay_height"] + HeightDelta;

                DacPixi.redrawRectangle(_this.m_overlayPIXIGraphics,_this.m_overlayPIXIGraphics.position.x,_this.m_overlayPIXIGraphics.position.y,_this.m_contentArray["overlay_width"],_this.m_contentArray["overlay_height"],_this.m_contentArray["overlay_color"],_this.m_contentArray["overlay_alpha"]);
                _this.m_overlayPIXIGraphics.hitArea = new PIXI.Rectangle(0,0,_this.m_contentArray["overlay_width"],_this.m_contentArray["overlay_height"]);
                _this.setOverLayResizeHandlePosition();

            }
        };
    }

	
    this.buildOverlayResizeHandle2 = function()
    {
        var fillColor = "9C0000";
        var alpha = 0.3;
        this.m_overlayResizeHandle2 = DacPixi.buildResizeHandle(this.m_stage, this.m_handleWidth, this.m_handleWidth, fillColor, alpha);

        this.m_overlayResizeHandle2.position.x = this.m_overlayPIXIGraphics.position.x + this.m_overlayPIXIGraphics.width;
        this.m_overlayResizeHandle2.position.y = this.m_overlayPIXIGraphics.position.y;

        this.m_overlayResizeHandle2.mousedown = this.m_overlayResizeHandle2.touchstart = function(data)
        {
            // store a refference to the data
            // The reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = data;
            this.alpha = 0.8;
            this.dragging = true;
        };

        // set the events for when the mouse is released or a touch is released
        this.m_overlayResizeHandle2.mouseup = this.m_overlayResizeHandle2.mouseupoutside = this.m_overlayResizeHandle2.touchend = this.m_overlayResizeHandle2.touchendoutside = function(data)
        {
            this.alpha = 0.3;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
            _this.updateEditorVariable("overlay_width",_this.m_contentArray["overlay_width"]);
            _this.updateEditorVariable("overlay_height",_this.m_contentArray["overlay_height"]);

        };

            // set the callbacks for when the mouse or a touch moves
        this.m_overlayResizeHandle2.mousemove = this.m_overlayResizeHandle2.touchmove = function(event)
        {
            if(this.dragging)
            {
                var newPosition = event.data.getLocalPosition(this.parent); 
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
                //_this.m_overlayPIXIGraphics.position.x  = this.position.x;

                _this.m_contentArray["overlay_width"] = this.position.x - _this.m_contentArray["overlay_x"];
                _this.m_contentArray["overlay_height"] = _this.m_contentArray["overlay_height"] + _this.m_contentArray["overlay_y"] - this.position.y;

                _this.m_overlayPIXIGraphics.position.y  = this.position.y;
                _this.m_contentArray["overlay_y"] = _this.m_overlayPIXIGraphics.position.y;

                DacPixi.redrawRectangle(_this.m_overlayPIXIGraphics,_this.m_overlayPIXIGraphics.position.x,_this.m_overlayPIXIGraphics.position.y,_this.m_contentArray["overlay_width"],_this.m_contentArray["overlay_height"],_this.m_contentArray["overlay_color"],_this.m_contentArray["overlay_alpha"]);
                _this.m_overlayPIXIGraphics.hitArea = new PIXI.Rectangle(0,0,_this.m_contentArray["overlay_width"],_this.m_contentArray["overlay_height"]);
                _this.setOverLayResizeHandlePosition();
            }
        };
    }
	
	
    this.buildOverlayResizeHandle3 = function()
    {
        var fillColor = "9C0000";
        var alpha = 0.3;
        this.m_overlayResizeHandle3 = DacPixi.buildResizeHandle(this.m_stage, this.m_handleWidth, this.m_handleWidth, fillColor, alpha);

        this.m_overlayResizeHandle3.position.x = this.m_overlayPIXIGraphics.position.x;
        this.m_overlayResizeHandle3.position.y = this.m_overlayPIXIGraphics.position.y + this.m_overlayPIXIGraphics.height;

        this.m_overlayResizeHandle3.mousedown = this.m_overlayResizeHandle3.touchstart = function(data)
        {
            //	data.originalEvent.preventDefault()
            // store a refference to the data
            // The reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = data;
            this.alpha = 0.8;
            this.dragging = true;
        };
		
        // set the events for when the mouse is released or a touch is released
        this.m_overlayResizeHandle3.mouseup = this.m_overlayResizeHandle3.mouseupoutside = this.m_overlayResizeHandle3.touchend = this.m_overlayResizeHandle3.touchendoutside = function(data)
        {
            this.alpha = 0.3;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
            _this.updateEditorVariable("overlay_width",_this.m_contentArray["overlay_width"]);
            _this.updateEditorVariable("overlay_height",_this.m_contentArray["overlay_height"]);
        };
		
        // set the callbacks for when the mouse or a touch moves
        this.m_overlayResizeHandle3.mousemove = this.m_overlayResizeHandle3.touchmove = function(event)
        {
            if(this.dragging)
            {
                var newPosition = event.data.getLocalPosition(this.parent); 
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;

                _this.m_contentArray["overlay_width"] = _this.m_contentArray["overlay_width"] - (this.position.x - _this.m_contentArray["overlay_x"]);
                _this.m_contentArray["overlay_height"] = this.position.y - _this.m_contentArray["overlay_y"];

                _this.m_overlayPIXIGraphics.position.x = this.position.x;
                _this.m_contentArray["overlay_x"] = _this.m_overlayPIXIGraphics.position.x;

                DacPixi.redrawRectangle(_this.m_overlayPIXIGraphics,_this.m_overlayPIXIGraphics.position.x,_this.m_overlayPIXIGraphics.position.y,_this.m_contentArray["overlay_width"],_this.m_contentArray["overlay_height"],_this.m_contentArray["overlay_color"],_this.m_contentArray["overlay_alpha"]);
                _this.m_overlayPIXIGraphics.hitArea = new PIXI.Rectangle(0,0,_this.m_contentArray["overlay_width"],_this.m_contentArray["overlay_height"]);
                _this.setOverLayResizeHandlePosition();
            }
	};
    }
	
	
    this.buildOverlayResizeHandle4 = function()
    {
        var fillColor = "9C0000";
        var alpha = 0.3;
        this.m_overlayResizeHandle4 = DacPixi.buildResizeHandle(this.m_stage, this.m_handleWidth, this.m_handleWidth, fillColor, alpha);

        this.m_overlayResizeHandle4.position.x = this.m_overlayPIXIGraphics.position.x + this.m_overlayPIXIGraphics.width;
        this.m_overlayResizeHandle4.position.y = this.m_overlayPIXIGraphics.position.y + this.m_overlayPIXIGraphics.height;

        this.m_overlayResizeHandle4.mousedown = this.m_overlayResizeHandle4.touchstart = function(data)
        {
            // data.originalEvent.preventDefault()
            // store a refference to the data
            // The reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = data;
            this.alpha = 0.8;
            this.dragging = true;
        };
		
        // set the events for when the mouse is released or a touch is released
        this.m_overlayResizeHandle4.mouseup = this.m_overlayResizeHandle4.mouseupoutside = this.m_overlayResizeHandle4.touchend = this.m_overlayResizeHandle4.touchendoutside = function(data)
        {
            this.alpha = 0.3;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
            _this.updateEditorVariable("overlay_width",_this.m_contentArray["overlay_width"]);
            _this.updateEditorVariable("overlay_height",_this.m_contentArray["overlay_height"]);

        };
		
        // set the callbacks for when the mouse or a touch moves
        this.m_overlayResizeHandle4.mousemove = this.m_overlayResizeHandle4.touchmove = function(event)
        {
            if(this.dragging)
            {
                // need to get parent coords..
                var newPosition = event.data.getLocalPosition(this.parent); 
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
                //this.anchor.x = 0.5;
                //this.anchor.y = 0.5;
                //variableArray["overlay_x"] = overlaySprite.position.x;
                //variableArray["overlay_y"] = overlaySprite.position.y;
                _this.m_contentArray["overlay_width"] = (this.position.x - _this.m_overlayPIXIGraphics.position.x);
                _this.m_contentArray["overlay_height"] = (this.position.y - _this.m_overlayPIXIGraphics.position.y);
                               
                DacPixi.redrawRectangle(_this.m_overlayPIXIGraphics,_this.m_overlayPIXIGraphics.position.x,_this.m_overlayPIXIGraphics.position.y,_this.m_contentArray["overlay_width"],_this.m_contentArray["overlay_height"],_this.m_contentArray["overlay_color"],_this.m_contentArray["overlay_alpha"]);
                _this.m_overlayPIXIGraphics.hitArea = new PIXI.Rectangle(0,0,_this.m_contentArray["overlay_width"],_this.m_contentArray["overlay_height"]);
                _this.setOverLayResizeHandlePosition();
            }
        };
    }
     

}

TemplateCounting.prototype = Object.create(TemplateBase.prototype);