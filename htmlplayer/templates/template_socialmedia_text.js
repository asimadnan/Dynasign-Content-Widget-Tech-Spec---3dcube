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

 function TemplateSocialMediaText(debug) {
	TemplateBase.call(this);
	var _this = this;
    this.m_templateName = "soical_media_text"; 
	this.m_dacPixi = new DacPixi(1);

// stage size: L1, P1, F1
//  objects:
// header
// feed_title_background
// hr_line
// body_background
// username
// avatar
// location
// posttime
// mesg
// feed_logo

// startColor, endColor
// startAlpha, endAlpha


// define all template fields here, set default values
	this.m_feed = {};
	this.m_field_feed_key;
	this.m_field_post_duration;
	
	this.m_field_feed_title_background_color;
	this.m_field_body_background_color;
	this.m_field_hr_line_color = "#e59966";
	this.m_field_location_font_color = "#e59966";
	this.m_field_posttime_font_color = "#e59966";

	this.m_field_feed_logo = "../../templates/twitter/media/twitter_logo_295x150.png";  

	this.m_field_feed_logo_scale_x = 0;

	this.m_field_feed_title = "";
	this.m_field_feed_title_font = "arial";
	this.m_field_feed_title_font_size = 40;
	this.m_field_feed_title_font_color = "#FFFFFF";
	this.m_field_feed_title_italic = false;
	this.m_field_feed_title_alignment = "left";
	this.m_field_feed_title_bold = false;
	this.m_field_feed_title_x;
	this.m_field_feed_title_y;
		
	this.m_field_body = "";
	this.m_field_body_font = "arial";
	this.m_field_body_font_size = 25;
	this.m_field_body_font_color = "#FFFFFF";
	this.m_field_body_italic;
	this.m_field_body_alignment;
	this.m_field_body_bold;
	this.m_field_body_x;
	this.m_field_body_y;

// define content field array and asset array
	this.m_fullWidget = null;
    this.m_contentArray = null; 
    this.m_assetArray = null;
    this.m_feedArray = null;	
// pixi 
    this.m_stage = null;
	this.m_renderer = null;
	
	this.m_objInfo = {};
	this.m_objPixi = {};
	this.m_postSlides = [];
	this.m_postSlides2 = [];

	this.m_playPostSlidesFlag = 1;
	this.m_buildPostSlidesFlag = 1;
	this.m_buildBodyDone = 1;
	this.m_readyToSwitchPostSlides = 0;

	this.m_footerSprite = null;
	this.m_slideCounter = -1;
	this.m_hasStarted = false;
	
	this.m_gradientX0Pos = 0;
	this.m_gradientY0Pos = 50;
	
	this.readyToPlay = 0;
	
	this.m_firstPostPicFlag = 0;
	this.m_numPostsPerView = 2;
	this.m_currentPostsPerView = 2;

    this.m_postPIXI = {
         'name': [],
         'avatar':[],
	     'posttime':[],
         'location': [],
         'mesg':[],
         'pic':[],
         'picBorder':[]
    }; 
	
	this.setFeedLogo = function(feedLogo)
	{
		this.m_field_feed_logo = feedLogo;  
	}


	this.determineObjInfo = function()
	{
		var stageRatio = this.m_width/this.m_height;
		var avatarRaito = 0.3;
		if (stageRatio <= 1.3 )
		{
			avatarRaito = 0.3;
			this.m_layoutName = "P1";
		}
		else if (stageRatio >1.3)
		{
			avatarRaito = 0.3;
			this.m_layoutName = "L1";
	
			if (stageRatio <=4) 
			{
				avatarRaito = 0.3;
				this.m_layoutName = "L1";
			}
			else
			{
				avatarRaito = 0.6;
				this.m_layoutName  = "F1";
			}
		
		}
		var avatarHeight = this.m_height*avatarRaito;
		if (avatarHeight > this.m_width*avatarRaito)
			avatarHeight = this.m_width*avatarRaito;

		//feed_title
		this.m_objInfo['feed_title'] = {};
		this.m_objInfo['feed_title'].x = this.m_width*0.035;
		this.m_objInfo['feed_title'].y = avatarHeight/8;
		this.m_objInfo['feed_title'].fontSize = avatarHeight/4; 
		
		//hr_line
		this.m_objInfo['hr_line'] = {};
		this.m_objInfo['hr_line'].x = this.m_width * 0.05;
		this.m_objInfo['hr_line'].y = avatarHeight/2;
		this.m_objInfo['hr_line'].w = this.m_width;
		this.m_objInfo['hr_line'].h = this.m_height * 0.00625;
		if (this.m_objInfo['hr_line'].h < 2) 
			this.m_objInfo['hr_line'].h = 2;
		else if (this.m_objInfo['hr_line'].h > 3) 
			this.m_objInfo['hr_line'].h = 3;
			

		//body_background
		this.m_objInfo['body_background'] = {};
		this.m_objInfo['body_background'].x = 0;
		this.m_objInfo['body_background'].y = 0;
		this.m_objInfo['body_background'].w = this.m_width;//this.m_objInfo['feed_title_background'].w;
		this.m_objInfo['body_background'].h = this.m_height;//this.m_height - this.m_objInfo['feed_title_background'].h;//- this.m_objInfo['hr_line'].h;
		//this.m_objInfo['body_background'].fontSize = this.m_objInfo['feed_title'].fontSize*0.8; 
		
		//post background
		this.m_objInfo['post_background'] = {};
		this.m_objInfo['post_background'].w = this.m_width - avatarHeight/8;
		this.m_objInfo['post_background'].h = avatarHeight*1.2;
		this.m_objInfo['post_background'].x = avatarHeight/16;
		this.m_objInfo['post_background'].y = this.m_objInfo['hr_line'].y + avatarHeight*0.1;
		
		
		var bodyHeight = this.m_objInfo['body_background'].h - this.m_objInfo['hr_line'].y - avatarHeight*0.3;
		if (bodyHeight > this.m_objInfo['post_background'].h)
			this.m_numPostsPerView = bodyHeight/this.m_objInfo['post_background'].h | 0;
		else
			this.m_numPostsPerView = 1;
		console.log("m_numPostsPerView="+this.m_numPostsPerView+" bodyHeight="+bodyHeight + " post h="+this.m_objInfo['post_background'].h);

		//avatar
		this.m_objInfo['avatar'] = {};
		this.m_objInfo['avatar'].w = avatarHeight;
		this.m_objInfo['avatar'].h = avatarHeight;
		this.m_objInfo['avatar'].x = this.m_objInfo['feed_title'].x;
		this.m_objInfo['avatar'].y = this.m_objInfo['hr_line'].y + this.m_objInfo['avatar'].h*0.2;
		
		//alert("this.m_xScale = "+this.m_xScale +" avatar w = "+this.m_objInfo['avatar'].w);
		//alert("headerRaito ="+headerRaito+" feed_title_background h = "+this.m_objInfo['feed_title_background'].h + " hr y="+this.m_objInfo['hr_line'].y+" avatar w = "+this.m_objInfo['avatar'].w);
		
		//username
		this.m_objInfo['username'] = {};
		this.m_objInfo['username'].x = this.m_objInfo['avatar'].x + this.m_objInfo['avatar'].w +  this.m_objInfo['avatar'].h*0.05;
		this.m_objInfo['username'].y = this.m_objInfo['avatar'].y*0.97;
		this.m_objInfo['username'].fontSize = this.m_objInfo['feed_title'].fontSize*0.5;
		//posttime
		this.m_objInfo['posttime'] = {};
		this.m_objInfo['posttime'].x = this.m_objInfo['username'].x+this.m_objInfo['avatar'].w;
		this.m_objInfo['posttime'].y = this.m_objInfo['username'].y*1.0;//this.m_objInfo['username'].y + this.m_objInfo['username'].fontSize*1.2;
		this.m_objInfo['posttime'].fontSize = this.m_objInfo['username'].fontSize*0.8;
		//location
		this.m_objInfo['location'] = {};
		this.m_objInfo['location'].x = this.m_objInfo['username'].y;
		this.m_objInfo['location'].y = this.m_objInfo['avatar'].y + this.m_objInfo['avatar'].h*0.03+this.m_objInfo['feed_title'].fontSize*0.8;
		this.m_objInfo['location'].fontSize = this.m_objInfo['posttime'].fontSize;
		//mesg
		this.m_objInfo['mesg'] = {};
		this.m_objInfo['mesg'].x = this.m_objInfo['username'].x;
		this.m_objInfo['mesg'].y = this.m_objInfo['username'].y + this.m_objInfo['username'].fontSize*1.2;;//this.m_objInfo['username'].y + this.m_objInfo['username'].fontSize*2;
		this.m_objInfo['mesg'].w = this.m_width - this.m_objInfo['avatar'].w - this.m_objInfo['avatar'].x*3;
		this.m_objInfo['mesg'].h = this.m_objInfo['avatar'].h * 3;
		this.m_objInfo['mesg'].fontSize = this.m_objInfo['feed_title'].fontSize*0.6;
		
		//feed_logo
		this.m_objInfo['feed_logo'] = {};
		this.m_objInfo['feed_logo'].h = this.m_objInfo['avatar'].h * 0.4;
		this.m_objInfo['feed_logo'].w = this.m_objInfo['feed_logo'].h * 1.96;
		this.m_objInfo['feed_logo'].x = this.m_width - this.m_objInfo['feed_logo'].w + this.m_objInfo['avatar'].w*0.4;
		this.m_objInfo['feed_logo'].y = this.m_objInfo['feed_logo'].h;
		
		console.log("avatarHeight h="+avatarHeight+"  logo w="+this.m_objInfo['feed_logo'].w+" x="+this.m_objInfo['feed_logo'].x+" y="+this.m_objInfo['feed_logo'].y)
		
		
		//layout speific
		if (this.m_layoutName == "L1")
		{
		
		}
		else if (this.m_layoutName == "P1")
		{

			
		}
		else if (this.m_layoutName == "F1")
		{
		

	
			
		}
		console.log("[template_socialmedia_text]determineObjInfo m_layoutName="+this.m_layoutName+" stageRatio="+stageRatio);

	}

     
     ///////// *** init template fields *** /////////
    this.initTemplateFields = function()
	{
		console.log("[template_socialmedia_text]initTemplateFields ..... ");
		//console.log("[template_socialmedia_text]initTemplateFields ... "+JSON.stringify(this.m_contentArray));
		if (this.m_contentArray!= null) this.m_zone_width = this.m_contentArray['zone_width'];
		if (this.m_contentArray!= null)  this.m_zone_height = this.m_contentArray['zone_height'];
		if (this.m_width == null) this.m_width = this.m_zone_width;
		if (this.m_height == null) this.m_height = this.m_zone_height;
		
		//this.m_layoutName = TemplateBase.prototype.determineStageSize.call(this, this.m_width, this.m_height);
		var result = this.determineObjInfo();
		
		//this.m_xScale = this.m_width/this.m_designStageWidth;
		//this.m_yScale = this.m_height/this.m_designStageHeight;
		
		console.log("[template_socialmedia_text]initTemplateFields layoutName = "+this.m_layoutName+" stageSize = "+ this.m_width+","+ this.m_height);
		
		if (this.m_contentArray['feed_title_background_color'] == null) this.m_contentArray['feed_title_background_color'] = this.m_field_feed_title_background_color;
		if (this.m_contentArray['body_background_color'] == null) this.m_contentArray['body_background_color'] = this.m_field_body_background_color;

                this.m_contentArray['body_background_gradient_color'] = this.m_dacUtil.getGradientColor(this.m_contentArray['body_background_color'], 0.5)

		if (this.m_contentArray['hr_line_color'] == null) this.m_contentArray['hr_line_color'] = this.m_field_hr_line_color;
		if (this.m_contentArray['posttime_font_color'] == null) this.m_contentArray['posttime_font_color'] = this.m_field_posttime_font_color;
		if (this.m_contentArray['location_font_color'] == null) this.m_contentArray['location_font_color'] = this.m_field_location_font_color;

		if (this.m_contentArray['feed_title'] == null) this.m_contentArray['feed_title'] = this.m_field_title;
		if (this.m_contentArray['feed_title_font'] == null) this.m_contentArray['feed_title_font'] = this.m_field_feed_title_font;
		if (this.m_contentArray['feed_title_font_size'] == null) this.m_contentArray['feed_title_font_size'] = this.m_field_feed_title_font_size;
		this.m_contentArray['feed_title_font_size'] = this.m_objInfo['feed_title'].fontSize;
		
		if (this.m_contentArray['feed_title_font_color'] == null) this.m_contentArray['feed_title_font_color'] = this.m_field_feed_title_font_color;
		if (this.m_contentArray['feed_title_italic'] == null) this.m_contentArray['feed_title_italic'] = this.m_field_feed_title_italic;
		if (this.m_contentArray['feed_title_alignment'] == null) this.m_contentArray['feed_title_alignment'] = this.m_field_feed_title_alignment;
		if (this.m_contentArray['feed_title_bold'] == null) this.m_contentArray['feed_title_bold'] = this.m_field_feed_title_bold;
		if (this.m_contentArray['feed_title_x'] == null) this.m_contentArray['feed_title_x'] = this.m_field_feed_title_x;
		if (this.m_contentArray['feed_title_y'] == null) this.m_contentArray['feed_title_y'] = this.m_field_feed_title_y;
		
		if (this.m_contentArray['body'] == null) this.m_contentArray['body'] = this.m_field_body;
		if (this.m_contentArray['body_font'] == undefined) this.m_contentArray['body_font'] = this.m_field_body_font;
		//alert("body font="+this.m_contentArray['body_font']+"  this.m_field_body_font="+this.m_field_body_font);

		if (this.m_contentArray['body_font_size'] == null) this.m_contentArray['body_font_size'] = this.m_field_body_font_size;
		if (this.m_contentArray['body_font_color'] == null) this.m_contentArray['body_font_color'] = this.m_field_body_font_color;
		if (this.m_contentArray['body_italic'] == null) this.m_contentArray['body_italic'] = this.m_field_body_italic;
		if (this.m_contentArray['body_alignment'] == null) this.m_contentArray['body_alignment'] = this.m_field_body_alignment;
		if (this.m_contentArray['body_bold'] == null) this.m_contentArray['body_bold'] = this.m_field_body_bold;


		if (this.m_contentArray['post_duration'] == null) this.m_contentArray['post_duration'] = this.m_field_post_duration;
		
		this.m_field_feed_key = this.m_contentArray['feed_key'];

	
    }
	
    this.playIntro = function(fullWidget)
    {
        var timestamp = this.m_dacUtil.getCurrentDateTime2();		
        console.log("[template_socialmedia_text] "+timestamp+" playIntro ... ");

        TemplateBase.prototype.initFullWidget.call(this,fullWidget);


        this.initTemplateFields();
        this.initStage();
        this.buildBodyBackground();
        this.buildFeedLogo();
        this.animate();
        var timestamp = this.m_dacUtil.getCurrentDateTime2();
        console.log("[template_socialmedia_text] "+timestamp+" playIntro done ... ");
    }
	
    this.initStage = function()
    {
        if (this.m_stage == null)
        {
            //this.m_width = this.m_zone_width; //window.innerWidth; //
            //this.m_height = this.m_zone_height; //window.innerHeight; //
            // create a renderer instance
            this.m_renderer = PIXI.autoDetectRenderer(this.m_width,this.m_height);
            this.m_renderer.view.style.display = "block";
            this.m_renderer.view.style.width = "100%";
            this.m_renderer.view.style.height = "100%";
            // add the renderer view element to the DOM
            document.body.appendChild(this.m_renderer.view);

            this.m_stage = new PIXI.Container();
            //added this line to remove blur on text
            PIXI.RESOLUTION = window.devicePixelRatio;
        }
    }
	
	
     
     ///////// *** init template UI *** /////////
    this.initTemplateUI = function()
    {
        var timestamp = this.m_dacUtil.getCurrentDateTime2();
        console.log("[template_socialmedia_text] "+ timestamp+" initTemplateUI ... m_width="+this.m_width+" m_height="+this.m_height);

        this.initStage();

        if (this.m_objInfo['feed_title'].hide != true)
            this.buildBodyBackground();
        //this.buildHeaderBackground();

        this.buildTitleText();
        if (JSON.stringify(this.m_feedArray) != '{}' && this.m_feedArray != null)
        {
            if (this.m_objInfo['hr_line'].hide != true)
                this.buildHrLine();
            //start loading all assets
            //PIXI.loader.add('logo',this.m_feed_logo).on("progress", this.loadProgressHandler).load(this.setupImages);

            this.buildBody();
        }
        this.buildFeedLogo();
        var timestamp = this.m_dacUtil.getCurrentDateTime2();
        console.log("[template_socialmedia_text] "+ timestamp+" initTemplateUI done... ");
    }
	
    this.loadProgressHandler= function (loader, resource) {
        //Display the file `url` currently being loaded
        //console.log("loading: " + resource.url); 
        //Display the precentage of files currently loaded
        //console.log("progress: " + loader.progress + "%"); 
        //console.log("loading: " + resource.name);
    }
	
    this.buildHeaderBackground = function()
    {
        var width = this.m_objInfo['feed_title_background'].w;
        var height = this.m_objInfo['feed_title_background'].h;
        console.log("[template_socialmedia_text]buildHeaderBackground headerHeight = "+height+ " bgcolor="+this.m_contentArray['feed_title_background_color']);
        var alpha = 1;
        this.m_objPixi['feed_title_background'] = DacPixi.drawRectangle(0, 0, width, height , this.m_contentArray['feed_title_background_color'], alpha, null, null);

        this.m_objPixi['feed_title_background'].position.x = 0;
        this.m_objPixi['feed_title_background'].position.y = 0;

        this.m_stage.addChild(this.m_objPixi['feed_title_background']);
    }
	
	
    this.buildPostBackground = function()
    {
        var width = this.m_objInfo['post_background'].w;
        var height = this.m_objInfo['post_background'].h;

        var alpha = 0.1;
        var radius = 6;
        var lineWidth = 2; 
        var lineColor = "#9c0000"; 
        var bgColor = this.m_contentArray['hr_line_color'];//"#9c0000"; //
        this.m_objPixi['post_background'] = DacPixi.drawRoundedRect(0, 0, width, height, bgColor, alpha, lineWidth, lineColor, radius);

        this.m_objPixi['post_background'].position.x = this.m_objInfo['post_background'].x;
        this.m_objPixi['post_background'].position.y = this.m_objInfo['post_background'].y;

        return this.m_objPixi['post_background'];
    }

    this.buildHrLine = function()
    {
        var height = this.m_objInfo['hr_line'].h;
        var alpha = 1;
        var y = this.m_objInfo['hr_line'].y;

        var startWidth = this.m_objInfo['hr_line'].w;//this.m_objInfo['hr_line'].w * 0.05;
        if (this.m_playmode ==="editor") startWidth = this.m_objInfo['hr_line'].w;
        this.m_objPixi['hr_line'] = DacPixi.drawRectangle(0, y, startWidth, height , this.m_contentArray['hr_line_color'], alpha, null, null);

        this.m_objPixi['hr_line'].position.x = 0;
        this.m_objPixi['hr_line'].position.y = 0;
        this.m_stage.addChild(this.m_objPixi['hr_line']);
       
        if (this.m_playmode != "editor")
        {
            this.m_objPixi['hr_line2'] = DacPixi.drawRectangle(0, y, this.m_objInfo['hr_line'].w, height, this.m_contentArray['hr_line_color'], 0.5, null, null);
            this.m_stage.addChild(this.m_objPixi['hr_line2']);
        }
        

    }
	
    this.buildBodyBackground = function()
    {
        var width = this.m_objInfo['body_background'].w;
        var height = this.m_objInfo['body_background'].h;
        var x = this.m_objInfo['body_background'].x;
        var y = this.m_objInfo['body_background'].y;
        var alpha = 1;
        //console.log("[template_socialmedia_text]buildBodyBackground bgcolor="+this.m_contentArray['body_background_color']);
        this.m_objPixi['body_background'] = DacPixi.drawRectangle(x, y, width, height , this.m_contentArray['body_background_color'], alpha, null, null);
        this.m_stage.addChild(this.m_objPixi['body_background']);
        if (this.m_playmode !="editor")
        {
            var color1 = _this.m_contentArray['body_background_color'];
            var color2 = _this.m_contentArray['body_background_gradient_color'];
            if (color1.indexOf("#") != 0) color1 = "#" + color1;
            if (color2.indexOf("#") != 0) color2 = "#" + color2;
            if (color2 == null)
                color2 = this.m_dacUtil.getGradientColor(color1, 0.9);

            // gradient
            this.m_objPixi['body_background_gradient'] = new PIXI.Sprite(PIXI.Texture.Draw(function (canvas) {
                canvas.width = _this.m_width*2;//1000;   
                canvas.height = _this.m_height*2;//1000;
                var ctx = canvas.getContext('2d');  //get  canvas 2D context
                ctx.rect(0, 0,canvas.width,canvas.height);
                // create radial gradient

                var x0 = width * 1.2;
                var y0 = height * 1.1;
                var x1 = width * 1.2;
                var y1 = height * 1.1;
                var r0 = 0;
                var r1 = width;
                if (width<height) r1 = height;

                //alert("x0=" + x0);

                var grd = ctx.createRadialGradient(x0, y0, r0, y1, y1, r1); //createRadialGradient(x0, y0, r0, x1, y1, r1);
                //var grd = ctx.createLinearGradient(0, 0, 290, 290); //createLinearGradient(x0, y0, x1, y1);

                grd.addColorStop(0, color2); 
                grd.addColorStop(1, color1);
                ctx.fillStyle = grd;
                ctx.fill();
            }));

            this.m_stage.addChild(this.m_objPixi['body_background_gradient']);
            this.m_objPixi['body_background_gradient'].position.x=0;
            this.m_objPixi['body_background_gradient'].position.y=0;//this.m_gradientY0Pos; 
            this.m_objPixi['body_background_gradient'].alpha = .9;  
        }

    }

    PIXI.Texture.Draw = function (cb) {
        var canvas = document.createElement('canvas');
        if (typeof cb == 'function') cb(canvas);
        return PIXI.Texture.fromCanvas(canvas);
    }
	
    this.buildTitleText= function()
    {
        var align= this.m_contentArray['feed_title_alignment'];
        var italic = this.m_contentArray['feed_title_italic'];
        var bold = this.m_contentArray['feed_title_bold'];
        var x = this.m_objInfo['feed_title'].x;//this.m_contentArray["feed_title_x"]-300;
        var y = this.m_objInfo['feed_title'].y;//this.m_contentArray["feed_title_y"];

        if (this.m_contentArray['feed_title_x'] != 0)  x = this.m_contentArray['feed_title_x'];

        var wordWrap = true;
        var strokeColor = "#000000";
        var strokeThickness = 0;
        var dropShadow = false
        var dropShadowColor = "#000000";
        console.log("[template_socialmedia_text]buildTitleText font color="+this.m_contentArray['feed_title_font_color']);
        this.m_objPixi['feed_title']= DacPixi.buildTextItem(this.m_contentArray['feed_title'],this.m_contentArray['feed_title_font'],this.m_contentArray['feed_title_font_color'],this.m_objInfo['feed_title'].fontSize,align,italic,bold,x,y,wordWrap,this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
//var centerOfStage = this.m_width/2;
        //var centerOfTitle = m_objPixi['feed_title'].width/2;
        this.m_objPixi['feed_title'].position.x = x; //20*_this.m_xScale;//10;//centerOfStage - centerOfTitle;
        this.m_objPixi['feed_title'].position.y = y;//-100;		
		//this.m_objPixi['feed_title'].scale = 1;
	this.m_objPixi['feed_title'].alpah = 1;
		
		//this.m_objPixi['feed_title'].interactive = true;
		//this.m_objPixi['feed_title'].buttonMode = true;
/*

		this.m_objPixi['feed_title'].mousedown = this.m_objPixi['feed_title'].touchstart = function(data)
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
		this.m_objPixi['feed_title'].mouseup = this.m_objPixi['feed_title'].mouseupoutside = this.m_objPixi['feed_title'].touchend = this.m_objPixi['feed_title'].touchendoutside = function(data)
		{
			this.alpha = 1;
			this.dragging = false;
			// set the interaction data to null
			this.data = null;
						
		};
			
		// set the callbacks for when the mouse or a touch moves
		this.m_objPixi['feed_title'].mousemove = this.m_objPixi['feed_title'].touchmove = function(event)
		{
			if (this.dragging)
			{
				// need to get parent coords..
				var newPosition = event.data.getLocalPosition(this.parent);
				this.position.x = newPosition.x;
				//this.position.y = _this.m_objInfo['feed_title'].y;//newPosition.y;
				this.anchor.x = 0.5;
				//this.anchor.y = 0.5;
	   
				_this.updateEditorVariable("feed_title_x",this.position.x - (this.width/2));
				//_this.updateEditorVariable("feed_title_y",this.position.y - (this.height/2));
								
								
			}
		};
*/		
		
			
        this.m_stage.addChild(this.m_objPixi['feed_title']);

    }
	
	
	this.buildFeedLogo = function()
	{
	//build resize icon image

		if (this.m_field_feed_logo != null)
		{

			if (this.m_playmode === "editor") 
				this.m_field_feed_logo = "../../htmlplayer/templates/twitter/media/twitter_logo_295x150.png";

			//console.log("[template_socialmedia_text] buildFeedLogo playmode="+this.m_playmode +" feed_logo="+this.m_field_feed_logo);
			this.m_objPixi['feed_logo'] = PIXI.Sprite.fromImage(this.m_field_feed_logo);
			if (this.m_objPixi['feed_logo'] != null)
			{
				this.m_stage.addChild(this.m_objPixi['feed_logo']);
				this.m_objPixi['feed_logo'].width = this.m_objInfo['feed_logo'].w;
				this.m_objPixi['feed_logo'].height = this.m_objInfo['feed_logo'].h;
				this.m_objPixi['feed_logo'].anchor.x = 0.5;
				this.m_objPixi['feed_logo'].anchor.y = 0.5;

				this.m_objPixi['feed_logo'].position.x = this.m_objInfo['feed_logo'].x;
				this.m_objPixi['feed_logo'].position.y = this.m_objInfo['feed_logo'].y;
				//this.m_objPixi['feed_logo'].interactive = true;
				//this.m_objPixi['feed_logo'].buttonMode = true;
				
				var shadow 	= new PIXI.filters.DropShadowFilter();
				shadow.color 	= 0x0000;
				shadow.distance = 5;
				shadow.alpha 	= 0.55;
				shadow.angle 	= 45;
				shadow.blur 	= 5;
				this.m_objPixi['feed_logo'].filters = [shadow];


			}
		}

	}
	/*
    this.setupImages = function (loader, resource) 
	{
      console.log("All files loaded");
     
      if(resource.logo){
          this.m_footer_sprite = new PIXI.Sprite(resource.logo.texture);
          this.m_stage.addChildAt(this.m_footer_sprite, 1);
          this.m_footer_sprite.scale.x = this.m_feed_logo_xscale;
	      this.m_footer_sprite.scale.y = this.m_feed_logo_yscale;
	      this.m_footer_sprite.position.y = this.m_height - this.m_footer_sprite.height;
	      this.m_footer_sprite.position.x = this.m_width - this.m_footer_sprite.width;
      }
    }
	*/
    this.movePostOnStage = function ()
    {
        var currretPostSlides = null;
        if(_this.m_hasStarted==true)
        {
            _this.movePostOffStage();

            if (_this.m_readyToSwitchPostSlides == 1)
            {
                //switch
                if (_this.m_playPostSlidesFlag ==1)
                {
                    console.log("[template_socialmedia_text]************movePostOnStage swicth from 1 to 2");
                    _this.m_playPostSlidesFlag = 2;
                }
                else
                {
                    console.log("[template_socialmedia_text]************movePostOnStage swicth from 2 to 1");
                    _this.m_playPostSlidesFlag = 1;
                }
                _this.m_readyToSwitchPostSlides = 0;
            }

            if (_this.m_playPostSlidesFlag == 1 && _this.m_buildBodyDone == 1)
            {
                console.log("[template_socialmedia_text]movePostOnStage play a1");
                currretPostSlides = _this.m_postSlides;
            }
            else if (_this.m_playPostSlidesFlag == 2 && _this.m_buildBodyDone == 1)
            {
                console.log("[template_socialmedia_text]movePostOnStage play a2");
                currretPostSlides = _this.m_postSlides2;
            }
        }
        else
        {
            currretPostSlides = _this.m_postSlides;
            _this.m_hasStarted=true;
        }
	    
	// _this.m_slideCounter++;

	    
	//  if(_this.m_slideCounter >= currretPostSlides.length)
	//       _this.m_slideCounter = 0;
	//
		
        if (_this.m_playmode!="editor")    //Power0.easeOut
        {
            //var hrLineT = new TimelineMax();
            //hrLineT.to(_this.m_objPixi['hr_line'],_this.m_contentArray['post_duration'], { ease: Power0.easeNone, width:_this.m_objInfo['hr_line'].w,onComplete:function(){this.kill();_this.m_objPixi['hr_line'].width = 0;}});
            //////
            var t0 = new TimelineMax({onComplete:function(){this.kill();}});
            t0.to(_this.m_objPixi['body_background_gradient'],2, { ease: Power0.eaeNone, alpha:0.9})
               .to(_this.m_objPixi['body_background_gradient'],8, { ease: Power0.eaeNone, alpha:0.1});

            var xMove = - _this.m_width * 0.2;
            var yMove = - _this.m_height * 0.2;
            var t1 = new TimelineMax({onComplete:function(){this.kill();}});
            t1.to(_this.m_objPixi['body_background_gradient'].position,2, { ease: Power0.eaeNone, x: xMove, y: yMove})
                .to(_this.m_objPixi['body_background_gradient'].position,8, { ease: Power0.eaeNone, x:0, y:0});
            //////

            var t = new TimelineMax();
            var i=0;

            if(_this.m_slideCounter >= currretPostSlides.length-1)
                    _this.m_slideCounter = -1;
            while (_this.m_slideCounter+1 < currretPostSlides.length && i<_this.m_numPostsPerView)
            {
                    _this.m_slideCounter++;
                    var postSlide = currretPostSlides[_this.m_slideCounter];
                    var ypos = i * (_this.m_objInfo['avatar'].y+_this.m_objInfo['avatar'].h*0.6);
                    _this.showPost(t, postSlide, 0.5, ypos);
                    i++;
                    console.log("movePostOnStage _this.m_slideCounter="+_this.m_slideCounter+" i="+i+" currretPostSlides.length="+currretPostSlides.length+" m_numPostsPerView="+_this.m_numPostsPerView);

            }
            _this.m_currentPostsPerView = i;

            t=null;
        }
        else
        {
            var t = new TimelineMax();
            var i=1;
            while (_this.m_slideCounter+1 < currretPostSlides.length && i<=_this.m_numPostsPerView)
            {
                _this.m_slideCounter++;
                var postSlide = currretPostSlides[_this.m_slideCounter];
                var ypos = (i - 1) * (_this.m_objInfo['avatar'].y+_this.m_objInfo['avatar'].h*0.6);
                _this.showPost(t, postSlide, 0.1, ypos);
                i++;

            }
            t=null;
            /*

            if (_this.m_slideCounter+1 < currretPostSlides.length)
            {
                    var postSlide2 = currretPostSlides[_this.m_slideCounter+1];
                    postSlide2.visible = true;
                    var t = new TimelineMax();
                    t.to(postSlide2.position,0.1, {ease: Elastic.easeOut.config(2.5, 0.4), y: this.m_objInfo['avatar'].y+this.m_objInfo['avatar'].h*0.6, onComplete:function(){this.kill()}});
            }
            */
        }
    }
	
	this.showPost = function(timeline, postSlide, duration, ypos)
	{
            if (postSlide != null)
            {
                    postSlide.visible = true;
                    timeline.to(postSlide.position,duration, {ease: Elastic.easeOut.config(2.5, 0.4), y: ypos, onComplete:function(){}});
            }
	}
	
	this.hidePost = function(timeline, postSlide, duration)
	{
		if (postSlide != null)
		{
			postSlide.visible = false;
			var tmpLocation =  - _this.m_height*2;
			timeline.to(postSlide.position,duration, {ease: Elastic.easeOut.config(2.5, 0.4), y: tmpLocation, onComplete:function(){}});
		}
	}
	
	this.movePostOffStage = function ()
	{
		var currretPostSlides = null;

		if (_this.m_playPostSlidesFlag == 1 && _this.m_buildBodyDone == 1)
			currretPostSlides = _this.m_postSlides;
		else if (_this.m_playPostSlidesFlag == 2 && _this.m_buildBodyDone == 1)
			currretPostSlides = _this.m_postSlides2;
			
		var t = new TimelineMax();
		var i = 0;
		var hideIndex = _this.m_slideCounter;
		console.log("[template_socialmedia_text]movePostOffStage m_slideCounter="+_this.m_slideCounter);
		while (i<_this.m_currentPostsPerView && hideIndex>=0 && hideIndex<currretPostSlides.length)
		{
			console.log("*******************hideIndex="+hideIndex);
			var postSlide = currretPostSlides[hideIndex];
			_this.hidePost(t, postSlide, 1);
			hideIndex--;
			i++;
		}
			
		_this.m_objPixi['feed_logo'].anchor.x = 0.5;
		_this.m_objPixi['feed_logo'].anchor.y = 0.5;
		//console.log("*******************feed_logo scale.x="+_this.m_objPixi['feed_logo'].scale.x);
		
		if (_this.m_field_feed_logo_scale_x == 0)		
			_this.m_field_feed_logo_scale_x = _this.m_objPixi['feed_logo'].scale.x;
		var t1 = new TimelineMax();
	    t1.to(_this.m_objPixi['feed_logo'].scale,1, {ease: Power0.easeNone, x: -_this.m_field_feed_logo_scale_x,onComplete:function(){this.kill()}})
		  .to(_this.m_objPixi['feed_logo'].scale,8, {ease: Power0.easeNone, x: _this.m_field_feed_logo_scale_x,onComplete:function(){this.kill()}});

		//t1.to(_this.m_objPixi['feed_logo'].scale,10, {ease: Back.easeOut.config(1.3), x: 1,onComplete:function(){this.kill()}});


	}
	
	this.buildBody = function()
	{
		console.log("[template_socialmedia_text]buildBody");

		if (JSON.stringify(this.m_feedArray) != '{}' && this.m_feedArray != null)
		{
			var feedObj= this.m_feedArray;
			//console.log("[template_socialmedia_text] buildBody favored_posts.length="+feedObj.feed_posts.favored_posts.length);
			//console.log("[template_socialmedia_text] buildBody this.m_feedAssetArray="+JSON.stringify(this.m_feedAssetArray));
			//increment favorite backwards because array.push items
			
			var posts = feedObj.feed_posts.favored_posts.concat(feedObj.feed_posts.approved_posts);
			console.log("[template_socialmedia_text] buildBody post count="+posts.length);
			var i= 0;
			while (i<posts.length)
			{
				var postContainer = new PIXI.Container();

				var postObj = posts[i];
				if (postObj == null) 
				{
					console.log("postObj is null i="+i);
					i++;
					continue;
				}
				var  avatar = postObj.avatar; 
				if (avatar != null)
				{
					if (this.m_cache != 1)
					{
						avatar = this.m_dacUtil.getAssetProxy(avatar,"");
					}
					else
					{
						var asset_id = this.m_field_feed_key + "-" + postObj.avatar;
						avatar = this.m_feedAssetArray[asset_id];
					}
				}
				this.buildPost(postContainer, postObj.username,avatar,postObj.posttime,postObj.location,postObj.text[0]); 
				//console.log("[template_socialmedia_text] buildBody i="+i+":  "+ postObj.username+","+ postObj.posttime+", "+postObj.text[0]);
				i++;
			}

	   }

	}

	this.buildPost = function(postContainer, username,avatar,posttime,location,mesg)
	{
		var align= "left";
		var italic = false;
		var bold = false;
		var x = this.m_objInfo['username'].x;//this.m_width;
		var y = this.m_objInfo['username'].y;//120 * this.m_yScale;
		var wordWrap = true;
		var strokeColor = "#000000";
		var strokeThickness = 0;
		var dropShadow = false
		var dropShadowColor = "#000000"; 
		var font = this.m_contentArray['body_font'];
		var fontSize = this.m_objInfo['mesg'].fontSize;//this.m_contentArray['body_font_size'] * this.m_yScale;
		
		
		var postContainer = new PIXI.Container();
		var postBg = this.buildPostBackground();
		postContainer.addChild(postBg); 
		
		//console.log("[template_socialmedia_text] buildPost username="+username+" avatar="+avatar+"   pic="+pic);
        //username
        var usernameSprite = DacPixi.buildTextItem(username,font,this.m_contentArray['body_font_color'],this.m_objInfo['username'].fontSize,align,italic,bold,x,y,wordWrap,this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
		//console.log("[template_socialmedia_text] usernameSprite width, height="+usernameSprite.width + ","+usernameSprite.height+ " usernameSprite x="+usernameSprite.x );
		postContainer.addChild(usernameSprite);  //index=0

		//posttime
		var localPostTimeStr = "";
		if (posttime != null)   //Sun Oct 04 13:56:30 +0000 2015
		{ 
                    /*
			var dateArray = posttime.split(" ");
			//utcPostTime =  dateArray[1]+" "+dateArray[2]+" "+dateArray[5]+" "+dateArray[3]+" "+dateArray[4];
			utcPostTime =  dateArray[1]+" "+dateArray[2]+" "+dateArray[5]+" "+dateArray[3];
			localPostTime = new Date(utcPostTime);
			//localPostTimeStr = localPostTime.toLocaleString();
			
			var d = localPostTime.toLocaleDateString();
			var t = localPostTime.toLocaleTimeString();
			t = t.replace(/\u200E/g, '');
			t = t.replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2');
			localPostTimeStr = d + ' ' + t;
                    */
                   /*
                        localPostTime = new Date(posttime+" UTC");
                        var d = localPostTime.toLocaleDateString();
                        var t = localPostTime.toLocaleTimeString();
                        t = t.replace(/\u200E/g, '');
                        t = t.replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2');
                        localPostTimeStr = d + ' ' + t; //localPostTime.toString()
                        */
                        var momentTime = moment(posttime, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en');
                        localPostTimeStr = momentTime.format('MMM D YYYY, h:mm a');
		}
				
		x = usernameSprite.x + usernameSprite.width  + this.m_objInfo['avatar'].w*0.1;   //this.m_width* this.m_xScale;
		y = usernameSprite.y + usernameSprite.height*0.1;   //this.m_objInfo['posttime'].y;//150 * this.m_yScale;
		
		//console.log("[template_socialmedia_text] posttime x, y="+x + ","+y);
        //var locationFontSize = parseInt(this.m_contentArray['body_font_size'])*0.7* this.m_yScale;
		//console.log("[template_socialmedia_text]buildPost location_font_color = "+this.m_contentArray['location_font_color']);
        var posttimeSprite = DacPixi.buildTextItem(localPostTimeStr,font,this.m_contentArray['posttime_font_color'],this.m_objInfo['posttime'].fontSize,align,italic,bold,x,y,wordWrap,this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        //this.m_stage.addChild(posttimeSprite); 
		postContainer.addChild(posttimeSprite);  //index=1
        //location
		if (location == null || location == "null") location = "";
		x = this.m_objInfo['location'].x;//this.m_width* this.m_xScale;
		y = this.m_objInfo['location'].y;//150 * this.m_yScale;
        var locationFontSize = parseInt(this.m_contentArray['body_font_size'])*0.7* this.m_yScale;
		//console.log("[template_socialmedia_text]buildPost location_font_color = "+this.m_contentArray['location_font_color']);
        var locationSprite = DacPixi.buildTextItem(location,font,this.m_contentArray['location_font_color'],this.m_objInfo['location'].fontSize,align,italic,bold,x,y,wordWrap,this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        //this.m_stage.addChild(locationSprite); 
		postContainer.addChild(locationSprite);  //index=2
        
        //avatar
		//console.log("[template_socialmedia_text] build_post avatar= "+avatar);

		if (avatar != undefined && avatar != null)
		{
			var userAvatar = PIXI.Sprite.fromImage(avatar);
			//var userTexture = PIXI.Texture.fromImage(avatar);
			//userTexture.crossOrigin = 'anonymous';
			//var userAvatar = new PIXI.Sprite(userTexture);
			userAvatar.position.x = this.m_objInfo['avatar'].x;//this.m_width;//50;
			userAvatar.position.y = this.m_objInfo['avatar'].y;//120  * this.m_yScale;
			
			userAvatar.width = this.m_objInfo['avatar'].w;//this.m_width;//50;
			userAvatar.height = this.m_objInfo['avatar'].h;//120  * this.m_yScale;
			
			var avatarScale = 1.6;
			//userAvatar.scale.x = avatarScale*this.m_xScale;
			//userAvatar.scale.y = avatarScale*this.m_xScale;
			//this.m_stage.addChild(userAvatar);
			postContainer.addChild(userAvatar);  //index=3
		}
		else
			console.log("[template_socialmedia_text] build_post avatar undefined "+avatar+ "..."+username+"   "+mesg);
			
        //mesg
		var mesgWidth = this.m_objInfo['mesg'].w;
		x = this.m_objInfo['mesg'].x;
		y = this.m_objInfo['mesg'].y;


		//alert("body color="+this.m_contentArray['body_font_color']);
		//console.log("[template_socialmedia_text] mesg1 = "+mesg);
                if (mesg ==  null ) mesg = "";
		mesg = this.m_dacUtil.removeURL(mesg);
                mesg = this.m_dacUtil.decodeHtmlSymbols(mesg);
		//console.log("[template_socialmedia_text] mesg2 = "+mesg);
                var mesgSprite = DacPixi.buildTextItem(mesg,font,this.m_contentArray['body_font_color'],this.m_objInfo['mesg'].fontSize,align,italic,bold,x,y,wordWrap,mesgWidth,strokeColor,strokeThickness, dropShadow, dropShadowColor);
		//this.m_stage.addChild(mesgSprite); 
		postContainer.addChild(mesgSprite);  //index=4
		
		//console.log("[template_socialmedia_text] build_post mesg size="+mesgSprite.width+","+mesgSprite.height);
		
                this.m_postPIXI.name.push(usernameSprite);
		this.m_postPIXI.posttime.push(posttimeSprite);
		this.m_postPIXI.location.push(locationSprite);
		this.m_postPIXI.avatar.push(userAvatar);
		this.m_postPIXI.mesg.push(mesgSprite);

	
		this.m_stage.addChild(postContainer);
		postContainer.position.x = 0;
		postContainer.position.y = this.m_height+200;
		//console.log("postContainer start x="+postContainer.position.x);
		postContainer.visible = false;
		
		if (this.m_buildPostSlidesFlag ==1)
			this.m_postSlides.push(postContainer);
		else
			this.m_postSlides2.push(postContainer);
	
			
    }
	
	
	
	this.moveGradientBG=function(){
        var newX = 0;
        //console.log(_this.m_objPixi['body_background_gradient'].position.x);
        if(_this.m_objPixi['body_background_gradient'].position.x<0)
           newX = _this.m_width-200;
        else
            newX = -400; 
        var t0 = new TimelineMax({onComplete:function(){this.kill();_this.moveGradientBG()}});
		//t0.to(gsprite.position,5, {ease: Back.easeOut.config(2.5), x:newX,y:gradientY1Pos});
		//t0.to(_m_objPixi['body_background_gradient'].position,10, { ease: Sine.easeInOut, x:newX, y:_this.m_gradientY0Pos});
		//t0.to(_this.m_objPixi['body_background_gradient'].position,10, { ease: Power0.eaeNone, x:newX, y:_this.m_gradientY0Pos});
		t0.to(_this.m_objPixi['body_background_gradient'],2, { ease: Power0.eaeNone, alpha:0.1})
		   .to(_this.m_objPixi['body_background_gradient'],10, { ease: Power0.eaeNone, alpha:0.9});
		   
        var t1 = new TimelineMax({onComplete:function(){this.kill();_this.moveGradientBG()}});
		t1.to(_this.m_objPixi['body_background'],2, { ease: Power0.eaeNone, alpha:0.5})
		   .to(_this.m_objPixi['body_background'],10, { ease: Power0.eaeNone, alpha:1});


    }
	

     
 
	this.playTemplate = function()
	{
        console.log("[template_socialmedia_text]playTemplate isPlaying="+this.m_isPlaying);

		this.animate();
			
		if (JSON.stringify(this.m_feedArray) != '{}' && this.m_feedArray != null)
		{
			//show title and kill transition
			//var t0 = new TimelineMax({onComplete:function(){this.kill()}});
			//t0.to(this.m_objPixi['feed_title'].position,0.7, {ease: Back.easeOut.config(2.5), y:_this.m_objInfo['feed_title'].endY});
			
			TweenLite.from(this.m_objPixi['feed_title'].position, 1, {y:-200,  ease:Bounce.easeOut});
			//TweenLite.from(this.m_objPixi['feed_title'], 0.7, {alpha:0,  ease: Back.easeOut.config(2.5)});
			if (this.m_playmode!="editor") 
				setInterval(this.movePostOnStage,this.m_contentArray['post_duration']*1000);
				
			//this.moveGradientBG();
			this.movePostOnStage();
		}

	} 
	
	this.animate = function() 
	{
		requestAnimationFrame(animate);

		this.m_renderer.render(this.m_stage);	 
	} 
	
/////////////////////////////////////////////////////////////////////////////
/*
	this.setTextItem = function(pixiText,fieldName) {
	
		 pixiText.text = this.m_contentArray[fieldName];
		 var boldStr = "";
		 var italicStr = "";
		 
		 if(this.m_contentArray[fieldName+"_bold'])
			boldStr = "bold ";
		 if(this.m_contentArray[fieldName+"_italic'])
			italicStr = "italic ";
			
		 console.log("setTextItem: "+fieldName+"="+this.m_contentArray[fieldName]);
	     var color = this.m_contentArray[fieldName+"_font_color'];
		if (color==undefined) color = "#FFFFFF";
		if (color.indexOf("#")!= 0) color = "#"+color;
		 var style = {font: boldStr+italicStr+this.m_contentArray[fieldName+"_font_size']+"px "+this.m_contentArray[fieldName+"_font'], fill: color, align: this.m_contentArray[fieldName+"_alignment'], stroke: "#FFFFFF", strokeThickness: 0,wordWrap:true,wordWrapWidth: this.m_contentArray['zone_width']};
		 pixiText.style = style;
	}
*/

    this.updateEditView = function(fullWidget, fieldName, value)
    {
        this.m_cache = 0;
        this.m_fullWidget = fullWidget;
        this.m_fullWidget['widget']['dac_widget']['content'][fieldName]=value;
        this.m_contentArray = fullWidget['widget']['dac_widget']['content'];
        this.m_assetArray = fullWidget.widgetAsset;


        console.log("[template_socialmedia_text]updateEditView.."+fieldName+"="+ value);
        this.setTextItem(_this.m_objPixi['feed_title'],'feed_title');

        if (_this.m_objPixi['body_background'] != null)
            DacPixi.redrawRectangle(_this.m_objPixi['body_background'],_this.m_objInfo['body_background'].x,_this.m_objInfo['body_background'].y,_this.m_objInfo['body_background'].w,_this.m_objInfo['body_background'].h,_this.m_contentArray['body_background_color'],1);
        //DacPixi.redrawRectangle(_this.m_objPixi['feed_title_background'],0,0,_this.m_objInfo['feed_title_background'].w,_this.m_objInfo['feed_title_background'].h,_this.m_contentArray['feed_title_background_color'],1);
		
	
        var height = _this.m_objInfo['hr_line'].h;
        var y = _this.m_objInfo['hr_line'].y;
        if (height < 3) height = 3;
        width = _this.m_objInfo['hr_line'].w;
        if (_this.m_objPixi['hr_line'] != null)
            DacPixi.redrawRectangle(_this.m_objPixi['hr_line'],0,y,width, height,_this.m_contentArray['hr_line_color'],1);
	
        //set body text style
        if (fieldName === 'body_font_color' || fieldName === 'body_font')
        {
            var boldStr = "";
            var italicStr = "";
            if (this.m_contentArray['body_bold'])
                boldStr = "bold ";
            if (this.m_contentArray['body_italic'])
                italicStr = "italic ";
				
            var mesgWidth = this.m_objInfo['mesg'].w;
            x = this.m_objInfo['mesg'].x;//this.m_width;
            y = this.m_objInfo['mesg'].y;//210 * this.m_yScale;
            if (this.m_postPIXI.pic[0] != null && this.m_postPIXI.pic[0] != "" && this.m_layoutName != "F1")
            {
                mesgWidth = this.m_objInfo['mesg'].w2;
                x = this.m_objInfo['mesg'].x2;
                y = this.m_objInfo['mesg'].y2;
            }
				
            var color = this.m_contentArray['body_font_color'];
            if (color==undefined) color = "#FFFFFF";
            if (color.indexOf("#")!= 0) color = "#"+color;
            var font_size = _this.m_objInfo['mesg'].fontSize;
            var style = {font: boldStr+italicStr+font_size+"px "+this.m_contentArray['body_font'], fill: color, align: this.m_contentArray['body_alignment'], stroke: "#FFFFFF", strokeThickness: 0,wordWrap:true,wordWrapWidth: mesgWidth};
            //console.log("[template_socialmedia_text]updateEditView..body style"+JSON.stringify(style));
            for (var i=0; i< _this.m_numPostsPerView; i++)
            {
                this.m_postPIXI.name[i].style = style;
                this.m_postPIXI.mesg[i].style = style;
            }
            //style{"font":"53px arial","fill":"#45818e","stroke":"#FFFFFF","strokeThickness":0,"wordWrap":true,"wordWrapWidth":1740}
            //style{"font":"37px arial","color":"#ff0000","stroke":"#FFFFFF","strokeThickness":0,"wordWrap":true,"wordWrapWidth":"1920"}
        }
		
        // posttime
        if (fieldName === 'posttime_font_color')
        {
            var boldStr = "";
            var italicStr = "";
            /*
            if(this.m_contentArray['location_bold'])
                    boldStr = "bold ";
            if(this.m_contentArray['location_italic'])
                    italicStr = "italic ";
                    */
            var color = this.m_contentArray['posttime_font_color'];
			
		//alert(color);

            if (color==undefined) color = "#FFFFFF";
            if (color.indexOf("#")!= 0) color = "#"+color;

            var factor = 0.7;
            var posttime_font_size = _this.m_objInfo['posttime'].fontSize;
            var style = {font: boldStr+italicStr+posttime_font_size+"px "+this.m_contentArray['body_font'], fill: color, align: this.m_contentArray['body_alignment'], stroke: "#FFFFFF", strokeThickness: 0,wordWrap:true,wordWrapWidth: this.m_contentArray['zone_width']};
            //console.log("[template_socialmedia_text]updateEditView..location style"+JSON.stringify(style));
            //var locationPixi = this.m_postSlides[0].getChildAt(2);

            for (var i=0; i< _this.m_numPostsPerView; i++)
            {
                this.m_postPIXI.posttime[i].style = style;
            }
        }

    }
	
	this.updateWidget = function(fullWidget)
	{
		var timestamp = this.m_dacUtil.getCurrentDateTime2();		
		console.log("[template_socialmedia_text] "+timestamp+" updateWidget ..... current play postSlides="+this.m_playPostSlidesFlag);
		
		//TemplateBase.prototype.initAndPlayTemplate.call(this,fullWidget);
		//TemplateBase.prototype.initTemplate.call(this,fullWidget);
		TemplateBase.prototype.initFullWidget.call(this,fullWidget);
		this.initTemplateFields();
		if (this.m_playPostSlidesFlag ==1)
		{
			this.m_buildPostSlidesFlag = 2;
			// clean up all postSlides2 first before fill again
			while (this.m_postSlides2.length >0)
			{
				var container = this.m_postSlides2.pop();
				container.destroy(true); 
			}
		}
		else
		{
			// clean up all postSlides1 first before fill again
			this.m_buildPostSlidesFlag = 1;
			while (this.m_postSlides.length >0)
			{
				var container = this.m_postSlides.pop();
				container.destroy(true); 
			}

		}
		this.m_buildBodyDone = 0;
		this.buildBody();
		this.m_buildBodyDone = 1;
		this.m_readyToSwitchPostSlides = 1;
		
		var timestamp = this.m_dacUtil.getCurrentDateTime2();
		console.log("[template_socialmedia_text] "+timestamp+" updateWidget done ..... new postSlides="+this.m_buildPostSlidesFlag);
	
	}
	
	this.updateEditorVariable = function(name,value){
		console.log("[template_socialmedia_text] updateEditorVariable name="+name+" value="+value);
		 this.m_fullWidget.widget.dac_widget.content[name] = value;
		 this.m_contentArray[name] = value;
		 parent.sendUpdatesToWidget(this.m_fullWidget);
	}
        
	
/*
PIXI.Graphics.prototype.updateLineStyle = function(lineWidth, color, alpha)
{
    // console.log('lineUpdate');
    var len = this.graphicsData.length;
    for (var i = 0; i < len; i++) {
        var data = this.graphicsData[i];
        if (data.lineWidth && lineWidth) {
            data.lineWidth = lineWidth;
        }
        if (data.lineColor && color) {
            data.lineColor = color;
        }
        if (data.alpha && alpha) {
            data.alpha = alpha;
        }
        this.dirty = true;
        this.clearDirty = true;
    }


    // return this;
};
*/

}

TemplateSocialMediaText.prototype = Object.create(TemplateBase.prototype);