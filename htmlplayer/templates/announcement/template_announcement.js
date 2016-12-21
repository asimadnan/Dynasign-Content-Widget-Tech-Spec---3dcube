function TemplateAnnouncement(debug) {
    TemplateBase.call(this);
    var _this = this;
    this.m_templateName = "announcement"; 
    this.m_dacPixi = new DacPixi(1);
        debugger;

    // define all template fields here, set default values
    this.m_field_background_color = "#000000";
    this.m_field_background_image = ""; //"http://www.dynasign.net/dynasign/websites/teamgroup/base/dss_media/image/category/car/911Carrera4S_2.jpg";//
    this.m_field_background_image_flag = true;

    this.m_field_overlay_color = "#FFFFFF";
    this.m_field_overlay_x = 100;
    this.m_field_overlay_y = 100;
    this.m_field_overlay_alpha = 0.5;
    this.m_field_overlay_width = 600;
    this.m_field_overlay_height = 400;
    this.m_field_title = "EnterTitle";
    this.m_field_title_font = "arial";
    this.m_field_title_font_size = 50;
    this.m_field_title_font_color = "#000000";
    this.m_field_title_italic = false;
    this.m_field_title_alignment = "left";
    this.m_field_title_bold = false;
    this.m_field_title_x = 100;
    this.m_field_title_y = 100;
    this.m_field_description = "Enter Description";
    this.m_field_description_font = "arial";
    this.m_field_description_font_size = 40;
    this.m_field_description_font_color = "#000000";
    this.m_field_description_italic = false;
    this.m_field_description_alignment = "left";
    this.m_field_description_bold = false;
    this.m_field_description_x = 100;
    this.m_field_description_y = 170;
    this.m_field_falling_object = "snowflake";
    this.m_field_falling_object_count = 0;
    this.m_field_background_audio_flag = false;
    this.m_field_background_audio = "";

// define content field array and asset array
    this.m_fullWidget = null;
    this.m_contentArray = null; //	this.variableArray = new Array();
    this.m_assetArray = null;

    this.m_titlePIXIText = null;
    this.m_descPIXIText = null;
    this.m_overlayPIXIGraphics = null;
    this.m_backgroundPIXIGraphics = null;
    this.m_backgroundImagePIXISprite = null;
    this.m_overlayResizeHandle1 = null;
    this.m_overlayResizeHandle2 = null;
    this.m_overlayResizeHandle3 = null;
    this.m_overlayResizeHandle4 = null;

    this.m_resizeImageIconPIXISprite = null;
    this.m_isResizeOn = false;
    this.m_lastXpos = 0;
    this.m_lastYPos = 0;
	
// pixi 
    this.m_stage = null;
    this.m_renderer = null;
    
    this.m_objInfo = {};
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
        this.m_objInfo['description'] = {};


        //layout speific
        if (this.m_layoutName == "L1")
        {
            this.m_objInfo['overlay'].x = parseInt(this.m_height/10);
            this.m_objInfo['overlay'].y = parseInt(this.m_height/10);
            this.m_objInfo['overlay'].w = this.m_width - this.m_objInfo['overlay'].x * 2;
            this.m_objInfo['overlay'].h = this.m_height - this.m_objInfo['overlay'].y * 2;
            
            if (this.m_contentArray["title_font_size"]== undefined)
                this.m_contentArray["title_font_size"] = 120;
            if (this.m_contentArray["description_font_size"]== undefined)
                this.m_contentArray["description_font_size"] = 100;
            
            this.m_objInfo['title'].font_size = parseInt(this.m_contentArray["title_font_size"]*this.m_width/this.m_contentArray["zone_width"]);
            this.m_objInfo['description'].font_size = parseInt(this.m_contentArray["description_font_size"]*this.m_height/this.m_contentArray["zone_height"]);
            this.m_handleWidth= this.m_contentArray["zone_width"]/80;

        }
        else if (this.m_layoutName == "P1")
        {
            this.m_objInfo['overlay'].x = parseInt(this.m_width/10);
            this.m_objInfo['overlay'].y = parseInt(this.m_width/10);
            this.m_objInfo['overlay'].w = this.m_width - this.m_objInfo['overlay'].x * 2;
            this.m_objInfo['overlay'].h = this.m_height - this.m_objInfo['overlay'].y * 2;
            
            this.m_objInfo['title'].font_size = parseInt(140*this.m_width/1920);
            this.m_objInfo['description'].font_size = parseInt(120*this.m_width/1920);
            this.m_handleWidth=this.m_contentArray["zone_height"]/80;
        }

       // console.log("[template_announcement]determineObjInfo title font size="+this.m_objInfo['title'].font_size);

    }

     ///////// *** init template fields *** /////////
    this.initTemplateFields = function()
    {

        console.log("[template_announcement]initTemplateFields ... ");
        this.m_zone_width = this.m_contentArray["zone_width"];
        this.m_zone_height = this.m_contentArray["zone_height"];
        if (this.m_width == null) this.m_width = this.m_zone_width;
        if (this.m_height == null) this.m_height = this.m_zone_height;
        
        if (this.m_playmode === "editor")
            this.determineObjInfo();
        //console.log("[template_announcement]initTemplateFields ....2 ");
        TemplateBase.prototype.initCommonTemplateFields.call(this);


        if (this.m_contentArray["background_color"] == undefined) this.m_contentArray["background_color"] = this.m_field_background_color;
        if (this.m_assetArray[this.m_assetIdPrefix+"background_image"] == undefined) this.m_assetArray[this.m_assetIdPrefix+"background_image"] = this.m_field_background_image;

        var asset_id = this.m_assetIdPrefix+"background_image";
        //console.log("[template_announcement]initTemplateFields m_assetArray["+asset_id+"] ="+this.m_assetArray[asset_id]);

        if (this.m_contentArray["background_image_flag"] == undefined) this.m_contentArray["background_image_flag"] = this.m_field_background_image_flag;
        if (this.m_contentArray["overlay_x"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["overlay_x"] = this.m_objInfo['overlay'].x; //this.m_field_overlay_x;
        if (this.m_contentArray["overlay_y"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["overlay_y"] = this.m_objInfo['overlay'].y; //this.m_field_overlay_y;	
        if (this.m_contentArray["overlay_width"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["overlay_width"] = this.m_objInfo['overlay'].w; //this.m_field_overlay_width;
        if (this.m_contentArray["overlay_height"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["overlay_height"] = this.m_objInfo['overlay'].h; //this.m_field_overlay_height;
        
        if (this.m_contentArray["overlay_color"] == undefined) this.m_contentArray["overlay_color"] = this.m_field_overlay_color;
        if (this.m_contentArray["overlay_alpha"] == undefined) this.m_contentArray["overlay_alpha"] = this.m_field_overlay_alpha;	

        if (this.m_contentArray["title"] == undefined) this.m_contentArray["title"] = this.m_field_title;
        if (this.m_contentArray["title_font"] == undefined) this.m_contentArray["title_font"] = this.m_field_title_font;

        //console.log("[template_announcement]initTemplateFields ...1 title_font_size="+this.m_contentArray["title_font_size"]);
        if (this.m_contentArray["title_font_size"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["title_font_size"] = this.m_objInfo['title'].font_size;
        
        //console.log("[template_announcement]initTemplateFields ...2 title_font_size="+this.m_contentArray["title_font_size"]);
        
        if (this.m_contentArray["title_font_color"] == undefined) this.m_contentArray["title_font_color"] = this.m_field_title_font_color;
        if (this.m_contentArray["title_italic"] == undefined) this.m_contentArray["title_italic"] = this.m_field_title_italic;
        if (this.m_contentArray["title_alignment"] == undefined) this.m_contentArray["title_alignment"] = this.m_field_title_alignment;
        if (this.m_contentArray["title_bold"] == undefined) this.m_contentArray["title_bold"] = this.m_field_title_bold;

        if (this.m_contentArray["description"] == undefined) this.m_contentArray["description"] = this.m_field_description;
        if (this.m_contentArray["description_font"] == undefined) this.m_contentArray["description_font"] = this.m_field_description_font ;
        //console.log("[template_announcement]initTemplateFields ...1 description_font_size="+this.m_contentArray["description_font_size"]);
        if (this.m_contentArray["description_font_size"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["description_font_size"] = this.m_objInfo['description'].font_size;
        //console.log("[template_announcement]initTemplateFields ...2 description_font_size="+this.m_contentArray["description_font_size"]);
        
        if (this.m_contentArray["description_font_color"] == undefined) this.m_contentArray["description_font_color"] = this.m_field_description_font_color;
        if (this.m_contentArray["description_italic"] == undefined) this.m_contentArray["description_italic"] = this.m_field_description_italic;
        if (this.m_contentArray["description_alignment"] == undefined) this.m_contentArray["description_alignment"] = this.m_field_description_alignment;
        if (this.m_contentArray["description_bold"] == undefined) this.m_contentArray["description_bold"] = this.m_field_description_bold;

        if (this.m_contentArray["background_audio_flag"] == undefined) this.m_contentArray["background_audio_flag"] = this.m_field_background_audio_flag;
        if (this.m_assetArray[this.m_assetIdPrefix+"background_audio"] == undefined) this.m_assetArray[this.m_assetIdPrefix+"background_audio"] = this.m_field_background_audio;
        this.m_field_background_speeed = 4;
   
    }
     ///////// *** init template UI *** /////////
    this.initTemplateUI = function()
    {
        this.m_width = this.m_zone_width; //window.innerWidth; //
        this.m_height = this.m_zone_height; //window.innerHeight; //
        console.log("[template_announcement]initTemplateUI ... m_width="+this.m_width+" m_height="+this.m_height);

        canvasNode = document.createElement("canvas");
        canvasNode.setAttribute("id", "myCanvas");
        canvasNode.style.property= "position:absolute;top:0px;";
        document.body.appendChild(canvasNode);
        // create a renderer instance
        this.m_renderer = PIXI.autoDetectRenderer(this.m_width,this.m_height, {transparent: true,view:myCanvas});
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

        //set fields
        ///this.buildBackgroundColor();
        //this.buildBackgroundImage();
        //parentClass.prototype.myMethod.call(this, arg1, arg2, ..)
        //this.buildWidgetBackground();
        TemplateBase.prototype.buildWidgetBackground.call(this);
        this.buildOverlay();
        this.buildTitleDesc();
       // TemplateBase.prototype.buildQRCode.call(_this,_this.m_contentArray['qr_text'],_this.m_contentArray['qr_size'], _this.m_contentArray['qr_color'], _this.m_contentArray['qr_x'],_this.m_contentArray['qr_y'])
 
 
    }
        

    this.buildBackgroundColor = function()
    {
        //build background color

        this.m_backgroundPIXIGraphics = new PIXI.Graphics();
        var backgroundColorHex  = "0x"+this.m_contentArray["background_color"].substring(this.m_contentArray["background_color"].indexOf("#")+1);

        console.log("[template_announcement]initTemplateUI ... backgroundGraphics m_width="+this.m_width+"  m_height="+this.m_height+" backgroundColorHex="+backgroundColorHex);
        this.m_backgroundPIXIGraphics.beginFill(backgroundColorHex);
        this.m_backgroundPIXIGraphics.drawRect(0,0,this.m_width,this.m_height);
        this.m_backgroundPIXIGraphics.alpha = 1;
        this.m_stage.addChild(this.m_backgroundPIXIGraphics);       
        this.m_backgroundPIXIGraphics.position.x = 0;
        this.m_backgroundPIXIGraphics.position.y = 0;
    }
	
    this.buildBackgroundImage = function()
    {
        if (this.m_contentArray["background_image_flag"] === true) 
        {
            console.log("[template_announcement]initTemplateUI ... draw image m_field_background_image="+this.m_assetArray[this.m_assetIdPrefix+"background_image"]);
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
            console.log("[template_announcement]initTemplateUI ... m_field_background_image_flag="+this.m_contentArray["background_image_flag"]);

        if (this.m_backgroundImagePIXISprite != null)
        {
            if (this.m_contentArray["background_image_flag"] === true) 
                this.m_backgroundImagePIXISprite.alpha = 1;
            else
                this.m_backgroundImagePIXISprite.alpha = 0;
        }

    }
	
    this.rebuildBackgroundImage = function()
    {
        if (this.m_contentArray["background_image_flag"] === true) 
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

        if (this.m_contentArray["background_image_flag"] === true) 
            this.m_backgroundImagePIXISprite.alpha = 1;
        else
            this.m_backgroundImagePIXISprite.alpha = 0;

    }
	
    this.buildOverlay = function()
    {
        console.log("[template_announcement]buildOverlay");
        this.m_overlayPIXIGraphics = new PIXI.Graphics();
        //this.m_overlayPIXIGraphics.interactive = true;
        //this.m_overlayPIXIGraphics.buttonMode = true;
        var overlayColor  = "0x"+this.m_contentArray["overlay_color"].substring(this.m_contentArray["overlay_color"].indexOf("#")+1);
        this.m_overlayPIXIGraphics.beginFill(overlayColor);
        this.m_overlayPIXIGraphics.drawRect(0,0,this.m_contentArray["overlay_width"],this.m_contentArray["overlay_height"]);
        this.m_overlayPIXIGraphics.endFill();
        this.m_overlayPIXIGraphics.hitArea = new PIXI.Rectangle(0,0,this.m_contentArray["overlay_width"],this.m_contentArray["overlay_height"]);
        this.m_overlayPIXIGraphics.alpha = 0;//m_field_overlay_alpha; 
        this.m_stage.addChild(this.m_overlayPIXIGraphics);       
        this.m_overlayPIXIGraphics.position.x = this.m_contentArray["overlay_x"];
        this.m_overlayPIXIGraphics.position.y = this.m_contentArray["overlay_y"];
        //console.log("[template_announcement]initTemplateUI ... draw overlay overlayColor="+overlayColor+"  m_field_overlay_width="+this.m_contentArray["overlay_width"]+"  m_field_overlay_height="+this.m_contentArray["overlay_height"]+" m_field_overlay_alpha="+this.m_contentArray["overlay_alpha"]+" m_width="+this.m_width);

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

	
    this.buildTitleDesc= function()
    {
        var wordWrap = true;
        var strokeColor = "FFFFFF";
        var strokeThickness = 0;
        var dropShadow = false
        var dropShadowColor = "000000"; 
        
        //this.m_titlePIXIText = DacPixi.buildTextItem(this.m_contentArray["title"],this.m_contentArray["title_font"],this.m_contentArray["title_font_color"],this.m_contentArray["title_font_size"],"left",false,true,20,20,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
  
        this.m_titlePIXIText = DacPixi.buildTextItem(this.m_contentArray["title"],this.m_contentArray["title_font"],this.m_contentArray["title_font_color"],this.m_contentArray["title_font_size"],this.m_contentArray["title_alignment"],this.m_contentArray["title_italic"],this.m_contentArray["title_bold"],this.m_contentArray["title_x"]-300,this.m_contentArray["title_y"], wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        this.m_descPIXIText = DacPixi.buildTextItem(this.m_contentArray["description"],this.m_contentArray["description_font"],this.m_contentArray["description_font_color"],this.m_contentArray["description_font_size"],this.m_contentArray["description_alignment"],this.m_contentArray["description_italic"],this.m_contentArray["description_bold"],this.m_contentArray["description_x"]-300,this.m_contentArray["description_y"],wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);

       //console.log("[template_announcement]buildTitleDesc ... title_font_size="+this.m_contentArray["title_font_size"]);


        if (this.m_contentArray["title_x"] === undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["title_x"] = this.m_contentArray["overlay_x"]+50*this.m_zone_width/1920;
        if (this.m_contentArray["title_y"] === undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["title_y"] = this.m_contentArray["overlay_y"]+50*this.m_zone_width/1920;

        if (this.m_contentArray["title_x"]< 0) this.m_contentArray["title_x"] = 0;
        if (this.m_contentArray["title_x"]> this.m_width) this.m_contentArray["title_x"] = 0;

        if (this.m_contentArray["title_y"]< 0) this.m_contentArray["title_x"] = this.m_contentArray["overlay_y"]+10;
        if (this.m_contentArray["title_y"]> this.m_height) this.m_contentArray["title_y"] = this.m_contentArray["overlay_y"]+10;
            
        this.m_titlePIXIText.x = this.m_contentArray["title_x"];//(this.m_width - this.m_titlePIXIText.width)/2;
        this.m_titlePIXIText.y = this.m_contentArray["title_y"];//this.m_height/3.5 - this.m_titlePIXIText.height - this.m_height/40;
            
        if (this.m_contentArray["description_x"] === undefined || this.m_zone_size_changed == 1)
            this.m_contentArray["description_x"] = this.m_contentArray["overlay_x"]+50*this.m_zone_width/1920;
        if (this.m_contentArray["description_y"] === undefined || this.m_zone_size_changed == 1)
            this.m_contentArray["description_y"] = parseInt(this.m_titlePIXIText.y) + parseInt(this.m_titlePIXIText.height) + parseInt(this.m_height/40);

        if (this.m_contentArray["description_x"]< 0) this.m_contentArray["description_x"] = 0;
        if (this.m_contentArray["description_x"]> this.m_width) this.m_contentArray["description_x"] = 0;

        if (this.m_contentArray["description_y"]< 0) this.m_contentArray["description_x"] = this.m_contentArray["overlay_y"]+50;
        if (this.m_contentArray["description_y"]> this.m_height) this.m_contentArray["description_y"] = this.m_contentArray["overlay_y"]+50;

        this.m_descPIXIText.x = this.m_contentArray["description_x"];//(this.m_width - this.m_titlePIXIText.width)/2;
        this.m_descPIXIText.y = this.m_contentArray["description_y"];//this.m_height/3.5 - this.m_titlePIXIText.height - this.m_height/40;



        if (this.m_playmode === "editor")
        {
            this.m_titlePIXIText.interactive = true;
            this.m_titlePIXIText.buttonMode = true;
            this.m_descPIXIText.interactive = true;
            this.m_descPIXIText.buttonMode = true;
        }

                // use the mousedown and touchstart
        this.m_titlePIXIText.mousedown = this.m_titlePIXIText.touchstart = function(data)
        {
//		data.originalEvent.preventDefault()
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

        this.m_descPIXIText.mousedown = this.m_descPIXIText.touchstart = function(data)
        {
//		data.originalEvent.preventDefault()
            // store a refference to the data
            // The reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = data;
            this.alpha = 0.5;
            this.dragging = true;
        };

                    // set the events for when the mouse is released or a touch is released
        this.m_descPIXIText.mouseup = this.m_descPIXIText.mouseupoutside = this.m_descPIXIText.touchend = this.m_descPIXIText.touchendoutside = function(data)
        {
            this.alpha = 1;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;

        };

        // set the callbacks for when the mouse or a touch moves
        this.m_descPIXIText.mousemove = this.m_descPIXIText.touchmove = function(event)
        {
            if(this.dragging)
            {
                // need to get parent coords..
                var newPosition = event.data.getLocalPosition(this.parent); 
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
                this.anchor.x = 0.5;
                this.anchor.y = 0.5;
                _this.updateEditorVariable("description_x",this.position.x - (this.width/2));
                _this.updateEditorVariable("description_y",this.position.y - (this.height/2));
            }
        };

        this.m_stage.addChild(this.m_titlePIXIText);
        this.m_stage.addChild(this.m_descPIXIText);
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
//		data.originalEvent.preventDefault()
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
                //this.anchor.x = 0.5;
                //this.anchor.y = 0.5;

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
//		data.originalEvent.preventDefault()
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
//		data.originalEvent.preventDefault()
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
//		data.originalEvent.preventDefault()
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
	
    this.buildResizeImageIcon = function()
    {
	//build resize icon image
        this.m_resizeImageIconPIXISprite = PIXI.Sprite.fromImage("/dac/img/resize.png");
        this.m_stage.addChild(this.m_resizeImageIconPIXISprite);
        this.m_resizeImageIconPIXISprite.width = 50;
        this.m_resizeImageIconPIXISprite.height = 50;
        this.m_resizeImageIconPIXISprite.anchor.x = 0.5;
        this.m_resizeImageIconPIXISprite.anchor.y = 0.5;
        this.m_resizeImageIconPIXISprite.position.x = (this.m_overlayPIXIGraphics.position.x + this.m_overlayPIXIGraphics.width)-10;
        this.m_resizeImageIconPIXISprite.position.y = (this.m_overlayPIXIGraphics.position.y + this.m_overlayPIXIGraphics.height)-10;
        this.m_resizeImageIconPIXISprite.interactive = true;
        this.m_resizeImageIconPIXISprite.buttonMode = true;
       
        this.m_resizeImageIconPIXISprite.mousedown = this.m_resizeImageIconPIXISprite.touchstart = function(data)
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
        this.m_resizeImageIconPIXISprite.mouseup = this.m_resizeImageIconPIXISprite.mouseupoutside = this.m_resizeImageIconPIXISprite.touchend = this.m_resizeImageIconPIXISprite.touchendoutside = function(data)
        {
            this.alpha = 1;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
            _this.updateEditorVariable("overlay_width",_this.m_contentArray["overlay_width"]);
            _this.updateEditorVariable("overlay_height",_this.m_contentArray["overlay_height"]);
                        
	};
		
        // set the callbacks for when the mouse or a touch moves
        this.m_resizeImageIconPIXISprite.mousemove = this.m_resizeImageIconPIXISprite.touchmove = function(event)
        {
            if(this.dragging)
            {
                // need to get parent coords..
                var newPosition = event.data.getLocalPosition(this.parent); 
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
                this.anchor.x = 0.5;
                this.anchor.y = 0.5;
                //variableArray["overlay_x"] = overlaySprite.position.x;
                //variableArray["overlay_y"] = overlaySprite.position.y;
                _this.m_contentArray["overlay_width"] = (this.position.x - _this.m_overlayPIXIGraphics.position.x);
                _this.m_contentArray["overlay_height"] = (this.position.y - _this.m_overlayPIXIGraphics.position.y);
                               
                DacPixi.redrawRectangle(_this.m_overlayPIXIGraphics, _this.m_overlayPIXIGraphics.position.x,_this.m_overlayPIXIGraphics.position.y, _this.m_contentArray["overlay_width"],_this.m_contentArray["overlay_height"],_this.m_contentArray["overlay_color"],_this.m_contentArray["overlay_alpha"]);
		_this.m_overlayPIXIGraphics.hitArea = new PIXI.Rectangle(0,0,_this.m_contentArray["overlay_width"],_this.m_contentArray["overlay_height"]);
            }
	};
    }
 
    this.playTemplate = function()
    {
        console.log("[template_annoucement]playTemplate isPlaying="+this.m_isPlaying+"  isLoading="+this.m_isLoading);
        TemplateBase.prototype.buildQRCode.call(_this,_this.m_contentArray['qr_text'],_this.m_contentArray['qr_size'], _this.m_contentArray['qr_color'], _this.m_contentArray['qr_x'],_this.m_contentArray['qr_y'])
 
        TweenLite.to(this.m_titlePIXIText.position, 2, {x:this.m_contentArray["title_x"], ease:Bounce.easeOut});
        TweenLite.to(this.m_descPIXIText.position, 2, {x:this.m_contentArray["description_x"], ease:Bounce.easeOut});
        TweenLite.to(this.m_overlayPIXIGraphics, 2, {alpha:this.m_contentArray["overlay_alpha"]});
        TweenLite.to(this.m_overlayPIXIGraphics,2, { ease: Power0.easeOut, width:this.m_contentArray["overlay_width"],ease:Bounce.easeOut,onComplete:function(){this.kill();}});

        this.animate();

        if (this.m_contentArray["background_audio_flag"]=="true")
        {
            var audio = document.getElementById("bg_audio");
            audio.src = variableArray["root_url"]+variableArray["background_music"];
            audio.play();
        }
 
    } 
	
    this.animate = function() 
    {
        requestAnimationFrame(animate);
        //this.m_dacPixi.moveFallingObjects(this.m_width, this.m_height);
        this.m_renderer.render(this.m_stage);	 
    } 
	

	
/////////////////////////////////////////////////////////////////////////////
    this.initEditView = function(fullWidget)
    {
        this.m_playmode="editor";
        

        if (this.m_zone_width != fullWidget["widget"]["dac_widget"]["content"]["zone_width"]
            || this.m_zone_height != fullWidget["widget"]["dac_widget"]["content"]["zone_height"])
        {
            this.m_zone_size_changed = 1;
            //console.log("[template_announcement] initEditViewzone size changed");
        }
        else
        {
            this.m_zone_size_changed = 0;
            //console.log("[template_announcement] initEditView zone size not changed");
        }
        
        this.m_fullWidget = fullWidget;
        this.m_wid = fullWidget.wid
        this.m_assetIdPrefix = "w"+this.m_wid+"-"+this.m_templateName+"-";
        this.m_contentArray = fullWidget["widget"]["dac_widget"]["content"];

       // console.log("initEditView  this.m_contentArray="+JSON.stringify(this.m_contentArray));

        this.m_assetArray = fullWidget.widgetAsset;
        //console.log("[template_announcement]initEditView wid="+this.m_wid);
        this.initTemplateFields();
        this.initTemplateUI();
        //this.buildResizeImageIcon();
        this.buildOverlayResizeHandles();
        this.playTemplate();
    }

    this.updateEditView = function(fullWidget)
    {
        this.m_zone_size_changed = 0;
        this.m_fullWidget = fullWidget;
        this.m_contentArray = fullWidget["widget"]["dac_widget"]["content"];
        this.m_assetArray = fullWidget.widgetAsset;
        //alert("updateEditView "+ JSON.stringify(this.m_contentArray));

        this.setTextItem(this.m_titlePIXIText,"title");
        this.setTextItem(this.m_descPIXIText,"description");
        
        //this.m_titlePIXIText = DacPixi.buildTextItem(this.m_contentArray["title"],this.m_contentArray["title_font"],this.m_contentArray["title_font_color"],this.m_contentArray["title_font_size"],this.m_contentArray["title_alignment"],this.m_contentArray["title_italic"],this.m_contentArray["title_bold"],this.m_contentArray["title_x"]-300,this.m_contentArray["title_y"], wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        //this.m_descPIXIText = DacPixi.buildTextItem(this.m_contentArray["description"],this.m_contentArray["description_font"],this.m_contentArray["description_font_color"],this.m_contentArray["description_font_size"],this.m_contentArray["description_alignment"],this.m_contentArray["description_italic"],this.m_contentArray["description_bold"],this.m_contentArray["description_x"]-300,this.m_contentArray["description_y"],wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);


        //DacPixi.redrawRectangle(this.m_backgroundPIXIGraphics,0,0,this.m_contentArray["zone_width"],this.m_contentArray["zone_height"],this.m_contentArray["background_color"],1);

        //setOverlayColor
        DacPixi.redrawRectangle(this.m_overlayPIXIGraphics,this.m_contentArray["overlay_x"],this.m_contentArray["overlay_y"],this.m_contentArray["overlay_width"],this.m_contentArray["overlay_height"],this.m_contentArray["overlay_color"],this.m_contentArray["overlay_alpha"]);

        //background Image update
        //this.buildBackgroundImage();
        //this.rebuildBackgroundImage();
        //this.rebuildWidgetBackground();
        TemplateBase.prototype.rebuildWidgetBackground.call(this);
        TemplateBase.prototype.buildQRCode.call(_this,_this.m_contentArray['qr_text'],_this.m_contentArray['qr_size'], _this.m_contentArray['qr_color'], _this.m_contentArray['qr_x'],_this.m_contentArray['qr_y'])
 
    }
	/*
	this.setTextItem = function(pixiText,fieldName) {
	
		 pixiText.text = this.m_contentArray[fieldName];
		 var boldStr = "";
		 var italicStr = "";
		 
		 if(this.m_contentArray[fieldName+"_bold"])
			boldStr = "bold ";
		 if(this.m_contentArray[fieldName+"_italic"])
			italicStr = "italic ";
			
		 console.log("setTextItem: "+fieldName+"="+this.m_contentArray[fieldName]);
			
		 var style = {font: boldStr+italicStr+this.m_contentArray[fieldName+"_font_size"]+"px "+this.m_contentArray[fieldName+"_font"], fill: this.m_contentArray[fieldName+"_font_color"], align: this.m_contentArray[fieldName+"_alignment"], stroke: "#FFFFFF", strokeThickness: 0,wordWrap:true,wordWrapWidth: this.m_contentArray["zone_width"]};
		 pixiText.style = style;
	}
	*/
    this.updateEditorVariable = function(name,value){
        this.m_fullWidget.widget.dac_widget.content[name] = value;
        this.m_contentArray[name] = value;
        parent.updateEditorContent(this.m_fullWidget);
    }


}

TemplateAnnouncement.prototype = Object.create(TemplateBase.prototype);