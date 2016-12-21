function TemplateSample(debug) {
    TemplateBase.call(this);
    var _this = this;
    this.m_templateName = "sample"; 

    //Set TemplateStageType
    //
    this.templateStageType = "PixiNonTransparent"; 
    this.templateStageType = "HtmlCanvas"; 
    this.templateStageType = "HtmlNonCanvas"; 
    this.templateStageType = "PixiTransparent";

    // pixi stage
    this.m_stage = null;
    // html context stage
    this.m_ctx = null;
    // define content field array and asset array
    this.m_fullWidget = null;
    this.m_contentArray = null; //this.variableArray = new Array();
    this.m_assetArray = null;
    this.m_objInfo = {};
    // use standard background
    this.m_widgetBackground = new WidgetBackground();
    
    // define template field default values
    this.m_field_background_color = "#000000";
    this.m_field_background_image = "";
    this.m_field_background_image_flag = true;

     ///////// *** init template fields *** /////////
    this.initTemplateFields = function()
    {

        console.log("[template_sample]initTemplateFields ... ");
        this.m_zone_width = this.m_contentArray["zone_width"];
        this.m_zone_height = this.m_contentArray["zone_height"];
        if (this.m_width == null) this.m_width = this.m_zone_width;
        if (this.m_height == null) this.m_height = this.m_zone_height;
        debugger;
        //if (this.m_playmode === "editor")
        this.determineObjInfo();
        //console.log("[template_announcement]initTemplateFields ....2 ");
        TemplateBase.prototype.initCommonTemplateFields.call(this);

        if (this.m_contentArray["background_color"] == undefined) this.m_contentArray["background_color"] = this.m_field_background_color;
        if (this.m_assetArray[this.m_assetIdPrefix+"background_image"] == undefined) this.m_assetArray[this.m_assetIdPrefix+"background_image"] = this.m_field_background_image;

        var asset_id = this.m_assetIdPrefix+"background_image";

        if (this.m_contentArray["background_image_flag"] == undefined) this.m_contentArray["background_image_flag"] = this.m_field_background_image_flag;

    }
    
    //calculate object sizes and positions for different zone sizes
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
        
       // this.m_objInfo['overlay'] = {};
       // this.m_objInfo['title'] = {};
       // this.m_objInfo['description'] = {};

        //layout speific
        if (this.m_layoutName == "L1")
        {
            //if (this.m_contentArray["title_font_size"]== undefined)
            //    this.m_contentArray["title_font_size"] = 120;

            //this.m_objInfo['title'].font_size = parseInt(this.m_contentArray["title_font_size"]*this.m_width/this.m_contentArray["zone_width"]);
        }
        else if (this.m_layoutName == "P1")
        {
            this.m_objInfo['title'].font_size = parseInt(140*this.m_width/1920);
        }
    }
     
     ///////// *** init template UI *** /////////
    this.initTemplateUI = function()
    {
        //alert(window.innerWidth+"="+$(window).width());
        this.m_width = window.innerWidth; //  $(window).width();
        this.m_height = window.innerHeight; // $(window).height();

        console.log("[template_announcement]initTemplateUI ... m_width="+this.m_width+" m_height="+this.m_height);
        //document.body.innerHTML ='<div style="position:absolute;width:100%;height:100%;opacity:0.5;z-index:100;background:#990000;"></div>';
        
        if (this.templateStageType == "PixiTransparent" || this.templateStageType == "PixiNonTransparent")
        {
            this.initPixiStage();
        }
        else if (this.templateStageType == "HtmlCanvas")
        {
            this.initHtmlCanvasStage();
        }
        else if (this.templateStageType == "HtmlNonCanvas")
        {
            this.initHtmlNonCanvasStage();
        }
        // use standard widget background
        TemplateBase.prototype.buildWidgetBackground.call(this);

        this.buildTemplate();
 
    }

    this.initPixiStage= function()
    {

        var canvasNode = document.createElement("canvas");
        canvasNode.setAttribute("id", "pixiCanvas");
        canvasNode.style.property= "position:absolute;top:10px;left:0px; width:100%;height:100%;";
        document.body.appendChild(canvasNode);

        if (this.templateStageType == "PixiTransparent")
            this.m_renderer = PIXI.autoDetectRenderer(this.m_width,this.m_height, {transparent: true,view:pixiCanvas});
            // create a renderer instance with transparent pixi canvas for standard background to show
        else if (this.templateStageType == "PixiNonTransparent")
            this.m_renderer = PIXI.autoDetectRenderer(this.m_width,this.m_height);
            // create a renderer instance with non-transparent pixi canvas

        if (this.m_renderer != null)
        {
            this.m_renderer.view.style.display = "block";
            this.m_renderer.view.style.width = "100%";
            this.m_renderer.view.style.height = "100%";
            this.m_renderer.view.style.position = "absolute";
            this.m_renderer.view.style.top = "0px";
            document.body.appendChild(this.m_renderer.view);
            this.m_stage = new PIXI.Container();
        }
        var align = "left";
        var italic = true;
        var bold = false;
        var x=10;
        var y = 10;
        var wordWrap = true;
        var strokeColor = "FFFFFF";
        var strokeThickness = 0;
        var dropShadow = false
        var dropShadowColor = "000000"; 
        var fontColor = "FFFFFF";
        var fontSize = 30;
        var wordWrapWidth = this.m_width - 20;
        var mesg1PixiText = DacPixi.buildTextItem('Hello from Pixi Stage',"Arial",fontColor,fontSize,align,italic,bold,x,y,wordWrap, wordWrapWidth,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        var y = 50;
        var mesg2PixiText = DacPixi.buildTextItem('Do your tricks here ...',"Arial",fontColor,fontSize,align,italic,bold,x,y,wordWrap, wordWrapWidth,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        this.m_stage.addChild(mesg1PixiText);
        this.m_stage.addChild(mesg2PixiText);
    }
    
    this.initHtmlCanvasStage= function()
    {

        var canvasNode = document.createElement("canvas");
        canvasNode.setAttribute("id", "htmlCanvas");
        canvasNode.width = this.m_width;
        canvasNode.height = this.m_height;
        canvasNode.style.position = "absolute";
        //canvas.style.zIndex   = 8;
        document.body.appendChild(canvasNode);
        this.m_ctx = canvasNode.getContext("2d");
        
       /*
        this.m_ctx.fillStyle="#"+this.m_contentArray["background_color"];
        var w = this.m_width; //$(window).width()
        var h = this.m_height; //$(window).height()
        this.m_ctx.fillRect(10,10,w,h);
        */
        
        this.m_ctx.font = "26px Arial";
        this.m_ctx.fillStyle ="#FFFFFF";
        this.m_ctx.fillText("Hello from Html Canvas Stage", 10, 50);
        this.m_ctx.fillText("Do your tricks here ...", 10, 100);
        //this.m_ctx.strokeText("Hello world from Html Canvas Stage", 10, 50);
    }
    
    this.initHtmlNonCanvasStage= function()
    {
        var divNode = document.createElement("div");
        divNode.setAttribute("id", "mainDiv");
        document.body.appendChild(divNode);
        var div = document.getElementById('mainDiv');
        div.style = "position:absolute;color:#EEEEEE;font-size:26px;padding:10px;"
        div.innerHTML = div.innerHTML + 'Hello from Html Non Canvas Stage <br>Do your tricks here ...';
    }
	
    this.buildTemplate= function()
    {

        //document.body.innerHTML +='<div style="position:absolute;top:10px;left:0px;width:100%;height:100%;opacity:1;z-index:-1000000;background:#990000;color:#FFFFFF;font-size:50px;">Hello</div>';

    }

    this.playTemplate = function()
    {

        TemplateBase.prototype.buildQRCode.call(_this,_this.m_contentArray['qr_text'],_this.m_contentArray['qr_size'], _this.m_contentArray['qr_color'], _this.m_contentArray['qr_x'],_this.m_contentArray['qr_y'])
 
        if (this.templateStageType == "PixiTransparent" || this.templateStageType == "PixiNonTransparent")
            this.animate(); // need this for pixi

    } 
	
    // for pixi only
    this.animate = function() 
    {
        requestAnimationFrame(animate);
        this.m_renderer.render(this.m_stage);	 
    } 
    /////////

	
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

        this.initTemplateFields();
        this.initTemplateUI();

        this.playTemplate();
    }

    this.updateEditView = function(fullWidget)
    {
        this.m_zone_size_changed = 0;
        this.m_fullWidget = fullWidget;
        this.m_contentArray = fullWidget["widget"]["dac_widget"]["content"];
        this.m_assetArray = fullWidget.widgetAsset;

        TemplateBase.prototype.rebuildWidgetBackground.call(this);
        TemplateBase.prototype.buildQRCode.call(_this,_this.m_contentArray['qr_text'],_this.m_contentArray['qr_size'], _this.m_contentArray['qr_color'], _this.m_contentArray['qr_x'],_this.m_contentArray['qr_y'])
 
    }

    this.updateEditorVariable = function(name,value){
        this.m_fullWidget.widget.dac_widget.content[name] = value;
        this.m_contentArray[name] = value;
        parent.updateEditorContent(this.m_fullWidget);
    }


}

TemplateSample.prototype = Object.create(TemplateBase.prototype);