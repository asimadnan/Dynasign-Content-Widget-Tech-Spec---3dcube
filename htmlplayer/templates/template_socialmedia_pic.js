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

 function TemplateSocialMediaPic(debug) {
    TemplateBase.call(this);
    var _this = this;
    this.m_templateName = "socialmedia_pic"; 
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

    this.m_field_feed_logo = "";  
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
    
    // theme colors
    this.m_field_theme_color = "brown"; //black, blue, brown, green, red, yellow, organge
    
    this.m_pic_bg_color = "#5D4F34";
    this.m_mesg_bg_color = "#7D6E51";

    this.m_left_bg_color = "#F8F0E3";
    this.m_right_bg_color = "#DEBA6E";

    this.m_title_font_color = this.m_mesg_bg_color;

    /////////////////////////////////////
    //
    // define content field array and asset array
    this.m_totalNumberOfRectanglesVertical = null;
    this.m_totalNumberOfRectanglesHorizontal = null;
    this.m_fullWidget = null;
    this.m_contentArray = null; //	this.variableArray = new Array();
    this.m_assetArray = null;
    this.m_feedArray = null;	
    // pixi 
    this.m_designStageWidth = 900;
    this.m_designStageHeight = 506;
    this.m_designHeaderHeight = 85;
    this.m_designHrLineHeight = 3;

    this.m_leftSideWidth = 350;
    this.m_rightSideWidth = 350;

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
        console.log("[template_socialmedia_pic]setFeedLogo="+feedLogo);
    }

    this.determineObjInfo = function()
    {
        var stageRatio = this.m_width/this.m_height;
        var avatarRaito = 0.1;
        if (stageRatio <= 1.3 )
        {
            avatarRaito = 0.1;
            this.m_layoutName = "P1";
        }
        else if (stageRatio >1.3)
        {
            avatarRaito = 0.15;
            this.m_layoutName = "L1";

        }
        var avatarHeight = this.m_height*avatarRaito;

        var yConstant = null;

        //header// leaving this because a lot of sizes are based off of title width
        this.m_objInfo['feed_title'] = {};
        this.m_objInfo['feed_title'].x = this.m_width*0.035;
        this.m_objInfo['feed_title'].y = avatarHeight*0.26;
        this.m_objInfo['feed_title'].fontSize = avatarHeight*0.5; 

        //hr_line
        this.m_objInfo['hr_line'] = {};
        this.m_objInfo['hr_line'].x = this.m_width * 0.05;
        this.m_objInfo['hr_line'].y = avatarHeight;
        this.m_objInfo['hr_line'].w = this.m_width;
        this.m_objInfo['hr_line'].h = this.m_height * 0.00625;
        if (this.m_objInfo['hr_line'].h < 2) 
            this.m_objInfo['hr_line'].h = 2;
        else if (this.m_objInfo['hr_line'].h > 4) 
            this.m_objInfo['hr_line'].h = 4;

        //alert("feed_title_background h = "+this.m_objInfo['feed_title_background'].h + " hr y="+this.m_objInfo['hr_line'].y);
        //body_background
        this.m_objInfo['body_background'] = {};
        this.m_objInfo['body_background'].x = 0;
        this.m_objInfo['body_background'].y = 0;//this.m_objInfo['feed_title_background'].h; 
        this.m_objInfo['body_background'].w = this.m_width;//this.m_objInfo['feed_title_background'].w;
        this.m_objInfo['body_background'].h = this.m_height;//this.m_height - this.m_objInfo['feed_title_background'].h;//- this.m_objInfo['hr_line'].h;
        //this.m_objInfo['body_background'].fontSize = this.m_objInfo['feed_title'].fontSize*0.8; 

        //avatar
        this.m_objInfo['avatar'] = {};
        this.m_objInfo['avatar'].w = avatarHeight;
        this.m_objInfo['avatar'].h = avatarHeight;
        this.m_objInfo['avatar'].x = this.m_objInfo['feed_title'].x;
        this.m_objInfo['avatar'].y = this.m_objInfo['avatar'].h*1.4;

        yConstant = this.m_objInfo['hr_line'].y + this.m_objInfo['avatar'].h*0.4;

        //username
        this.m_objInfo['username'] = {};
        this.m_objInfo['username'].x = this.m_objInfo['avatar'].x + this.m_objInfo['avatar'].w +  this.m_objInfo['avatar'].h*0.12;
        this.m_objInfo['username'].y = this.m_objInfo['avatar'].y;//yConstant * 0.2;
        this.m_objInfo['username'].fontSize = this.m_objInfo['feed_title'].fontSize*0.7;
        //posttime
        this.m_objInfo['posttime'] = {};
        this.m_objInfo['posttime'].x = this.m_objInfo['username'].x;
        this.m_objInfo['posttime'].y = this.m_objInfo['username'].y + this.m_objInfo['username'].fontSize*1.2;//yConstant *0.23 + this.m_objInfo['username'].fontSize*1.2;
        this.m_objInfo['posttime'].fontSize = this.m_objInfo['username'].fontSize*0.6;
        //location
        this.m_objInfo['location'] = {};
        this.m_objInfo['location'].x = this.m_objInfo['username'].y;
        this.m_objInfo['location'].y = yConstant + this.m_objInfo['avatar'].h*0.03+this.m_objInfo['feed_title'].fontSize*0.8;
        this.m_objInfo['location'].fontSize = this.m_objInfo['posttime'].fontSize;
        //mesg
        this.m_objInfo['mesg'] = {};
        this.m_objInfo['mesg'].x = this.m_objInfo['avatar'].x*1;
        this.m_objInfo['mesg'].y = yConstant + this.m_objInfo['avatar'].h + this.m_objInfo['avatar'].h*0.2;
        this.m_objInfo['mesg'].w = this.m_width - this.m_objInfo['avatar'].x *2;
        this.m_objInfo['mesg'].h = this.m_objInfo['avatar'].h * 3;
        // mesg with pic
        this.m_objInfo['mesg'].x2 = this.m_objInfo['avatar'].x*1;
        this.m_objInfo['mesg'].y2 = yConstant + this.m_objInfo['avatar'].h + this.m_objInfo['avatar'].h*0.2;
        this.m_objInfo['mesg'].w2 = this.m_width/2 - this.m_objInfo['avatar'].x*1.2;
        this.m_objInfo['mesg'].h2 = this.m_objInfo['mesg'].h;
        this.m_objInfo['mesg'].fontSize = this.m_objInfo['feed_title'].fontSize*0.8; 
        //pic
        this.m_objInfo['pic'] = {};
        this.m_objInfo['pic'].w = this.m_width/2;//parseInt(this.m_objInfo['mesg'].w2);
        this.m_objInfo['pic'].h = _this.m_height-this.m_objInfo['avatar'].h*2;  //parseInt(this.m_objInfo['mesg'].w2 * 0.66);
        this.m_objInfo['pic'].x = this.m_width*0.5;//+ (this.m_width*0.5 - this.m_objInfo['pic'].w)*0.5;
        this.m_objInfo['pic'].y = this.m_objInfo['avatar'].h;//yConstant  + this.m_objInfo['avatar'].h * 0.12;

        var picMaxH = this.m_height - this.m_objInfo['feed_title'].y - this.m_objInfo['pic'].y - (40*this.m_xScale) ;

        if (this.m_objInfo['pic'].h > picMaxH) 
        {
            this.m_objInfo['pic'].h = picMaxH;
        }

        //feed_logo
        this.m_objInfo['feed_logo'] = {};
        this.m_objInfo['feed_logo'].h = this.m_objInfo['avatar'].h * 0.6;
        this.m_objInfo['feed_logo'].w = this.m_objInfo['feed_logo'].h * 1.96;
        this.m_objInfo['feed_logo'].x = this.m_width - this.m_objInfo['feed_logo'].w + this.m_objInfo['avatar'].x*0.85;
        this.m_objInfo['feed_logo'].y = this.m_height - this.m_objInfo['feed_logo'].h*0.8;


        //layout speific
        if (this.m_layoutName == "L1")
        {

        }
        else if (this.m_layoutName == "P1")
        {
            this.m_objInfo['pic'].w = this.m_width - this.m_objInfo['avatar'].x * 2;
            this.m_objInfo['pic'].h = this.m_objInfo['pic'].w * 0.56;
            this.m_objInfo['pic'].x = this.m_objInfo['avatar'].x ;
           // console.log("****************pic x="+this.m_objInfo['pic'].x);
            this.m_objInfo['pic'].y = this.m_objInfo['avatar'].y + this.m_objInfo['avatar'].h + this.m_objInfo['avatar'].h*0.2;

            this.m_objInfo['mesg'].w = this.m_width - this.m_objInfo['avatar'].x *2;
            this.m_objInfo['mesg'].h = this.m_objInfo['avatar'].h * 3;
            this.m_objInfo['mesg'].x = this.m_objInfo['mesg'].w ;
            this.m_objInfo['mesg'].y = this.m_objInfo['avatar'].y + this.m_objInfo['avatar'].h + this.m_objInfo['pic'].h;

            this.m_objInfo['mesg'].w2 = this.m_width - this.m_objInfo['avatar'].x *2;
            this.m_objInfo['mesg'].h2 = this.m_objInfo['avatar'].h * 3;
            this.m_objInfo['mesg'].x2 = this.m_objInfo['avatar'].x ;
            this.m_objInfo['mesg'].y2 = this.m_objInfo['pic'].y + this.m_objInfo['pic'].h + this.m_objInfo['avatar'].h*0.2;

        }
        else if (this.m_layoutName == "F1")
        {


        }
        console.log("[template_socialmedia_pic]determineObjInfo m_layoutName="+this.m_layoutName+" stageRatio="+stageRatio);

    }

     
     ///////// *** init template fields *** /////////
    this.initTemplateFields = function()
    {
        console.log("[template_socialmedia_pic]initTemplateFields ..... ");
        //console.log("[template_socialmedia_pic]initTemplateFields ... "+JSON.stringify(this.m_contentArray));
        if (this.m_contentArray!= null) this.m_zone_width = this.m_contentArray['zone_width'];
        if (this.m_contentArray!= null)  this.m_zone_height = this.m_contentArray['zone_height'];
        if (this.m_width == null) this.m_width = this.m_zone_width;
        if (this.m_height == null) this.m_height = this.m_zone_height;

        //this.m_layoutName = TemplateBase.prototype.determineStageSize.call(this, this.m_width, this.m_height);
        var result = this.determineObjInfo();
        this.initThemeColors();

        //this.m_xScale = this.m_width/this.m_designStageWidth;
        //this.m_yScale = this.m_height/this.m_designStageHeight;
    
        if (this.m_contentArray['qr_size'] == null) this.m_contentArray['qr_size'] = this.m_qr_size;
        if (this.m_contentArray['qr_color'] == null) this.m_contentArray['qr_color'] = this.m_qr_color;
        if (this.m_contentArray['qr_x'] == null) this.m_contentArray['qr_x'] = this.m_qr_x;
        if (this.m_contentArray['qr_y'] == null) this.m_contentArray['qr_y'] = this.m_qr_y; 
        if (this.m_contentArray['qr_text'] == null) this.m_contentArray['qr_text'] = this.m_qr_text;
        if (this.m_contentArray['qr_flag'] == null) this.m_contentArray['qr_flag'] = this.m_qr_flag;
        
        console.log("[template_socialmedia_pic]initTemplateFields layoutName = "+this.m_layoutName+" stageSize = "+ this.m_width+","+ this.m_height);
        if (this.m_contentArray['theme_color'] == null) this.m_contentArray['theme_color'] = this.m_field_theme_color;
        
        if (this.m_contentArray['feed_title_background_color'] == null) this.m_contentArray['feed_title_background_color'] = this.m_field_feed_title_background_color;
        if (this.m_contentArray['body_background_color'] == null) this.m_contentArray['body_background_color'] = this.m_field_body_background_color;

        if (this.m_contentArray['hr_line_color'] == null) this.m_contentArray['hr_line_color'] = this.m_field_hr_line_color;
        if (this.m_contentArray['posttime_font_color'] == null) this.m_contentArray['posttime_font_color'] = this.m_field_posttime_font_color;
        if (this.m_contentArray['location_font_color'] == null) this.m_contentArray['location_font_color'] = this.m_field_location_font_color;

        if (this.m_contentArray['feed_title'] == null) this.m_contentArray['feed_title'] = this.m_field_title;
        if (this.m_contentArray['feed_title_font'] == null) this.m_contentArray['feed_title_font'] = this.m_field_feed_title_font;
        if (this.m_contentArray['feed_title_font_size'] == null) this.m_contentArray['feed_title_font_size'] = this.m_field_feed_title_font_size;
        this.m_contentArray['feed_title_font_size'] = this.m_objInfo['feed_title'].fontSize;

        //if (this.m_contentArray['feed_title_font_color'] == null) 
        this.m_contentArray['feed_title_font_color'] = this.m_title_font_color;
        
        //console.log("&&&&&&&&&&&&&&&&& this.m_title_font_color="+this.m_contentArray['feed_title_font_color']+"...."+this.m_title_font_color);
        if (this.m_contentArray['feed_title_italic'] == null) this.m_contentArray['feed_title_italic'] = this.m_field_feed_title_italic;
        if (this.m_contentArray['feed_title_alignment'] == null) this.m_contentArray['feed_title_alignment'] = this.m_field_feed_title_alignment;
        if (this.m_contentArray['feed_title_bold'] == null) this.m_contentArray['feed_title_bold'] = this.m_field_feed_title_bold;
        if (this.m_contentArray['feed_title_x'] == null) this.m_contentArray['feed_title_x'] = this.m_field_feed_title_x;
        if (this.m_contentArray['feed_title_y'] == null) this.m_contentArray['feed_title_y'] = this.m_field_feed_title_y;

        if (this.m_contentArray['body'] == null) this.m_contentArray['body'] = this.m_field_body;
        if (this.m_contentArray['body_font'] == undefined) this.m_contentArray['body_font'] = this.m_field_body_font;
        //alert("body font="+this.m_contentArray['body_font']+"  this.m_field_body_font="+this.m_field_body_font);

        if (this.m_contentArray['body_font_size'] == null) this.m_contentArray['body_font_size'] = this.m_field_body_font_size;
        if (this.m_contentArray['body_font_color'] == null) this.m_contentArray['body_font_color'] = this.m_mesg_font_color;
        if (this.m_contentArray['body_italic'] == null) this.m_contentArray['body_italic'] = this.m_field_body_italic;
        if (this.m_contentArray['body_alignment'] == null) this.m_contentArray['body_alignment'] = this.m_field_body_alignment;
        if (this.m_contentArray['body_bold'] == null) this.m_contentArray['body_bold'] = this.m_field_body_bold;


        if (this.m_contentArray['post_duration'] == null) this.m_contentArray['post_duration'] = this.m_field_post_duration;

        this.m_field_feed_key = this.m_contentArray['feed_key'];
	

    }
    
    /*
    this.playIntro = function(fullWidget)
    {
        var timestamp = this.m_dacUtil.getCurrentDateTime2();		
        console.log("[template_socialmedia_pic] "+timestamp+" playIntro ... ");

        TemplateBase.prototype.initFullWidget.call(this,fullWidget);

        this.initTemplateFields();
        this.initStage();
        this.buildBodyBackground();
        this.buildFeedLogo();
        this.animate();
        var timestamp = this.m_dacUtil.getCurrentDateTime2();
        console.log("[template_socialmedia_pic] "+timestamp+" playIntro done ... ");
    }
    */
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
        console.log("[template_socialmedia_pic] "+ timestamp+" initTemplateUI ... m_width="+this.m_width+" m_height="+this.m_height);

        this.initStage();

        if (this.m_objInfo['feed_title'].hide != true)
            this.buildBodyBackground();

        this.buildTitleText();
        if (JSON.stringify(this.m_feedArray) != '{}' && this.m_feedArray != null)
        {
            if (this.m_objInfo['hr_line'].hide != true)
                this.buildHrLine();

            this.buildBody();
        }
        

                
        this.buildFeedLogo();
        var timestamp = this.m_dacUtil.getCurrentDateTime2();
        console.log("[template_socialmedia_pic] "+ timestamp+" initTemplateUI done... ");
    }
	
    this.loadProgressHandler= function (loader, resource) {
       
    }
    
    this.initThemeColors = function()
    {
        this.m_mesg_text_color = "#FFFFFF";
        //this.m_contentArray['theme_color'] = "yellow";
        if (this.m_contentArray['theme_color'] === "black")
        {
            this.m_pic_bg_color = "#000000";
            this.m_mesg_bg_color = "#222222";

            this.m_left_bg_color = "#EEEEEE";
            this.m_right_bg_color = "#555555";
            
            this.m_title_font_color = this.m_mesg_bg_color;
            this.m_mesg_font_color = "#FFFFFF";
        }
        else if (this.m_contentArray['theme_color'] === "blue")
        {
            this.m_pic_bg_color = "#003366";
            this.m_mesg_bg_color = "#006699";

            this.m_left_bg_color = "#E8FBFF";
            this.m_right_bg_color = "#0088BB";
            
            this.m_title_font_color = this.m_mesg_bg_color;
            this.m_mesg_font_color = "#FFFFFF";
        }
        else if (this.m_contentArray['theme_color'] === "brown")
        {
            this.m_pic_bg_color = "#5D4F34";
            this.m_mesg_bg_color = "#7D6E51";

            this.m_left_bg_color = "#F8F0E3";
            this.m_right_bg_color = "#DEBA6E";
            
            this.m_title_font_color = this.m_mesg_bg_color; 
            this.m_mesg_font_color = "#FFFFFF";
            
        }
        else if (this.m_contentArray['theme_color'] === "green")
        {
            this.m_pic_bg_color = "#10522F";
            this.m_mesg_bg_color = "#3E7558";//"#1E5744";

            this.m_left_bg_color = "#C1E8D3";
            this.m_right_bg_color = "#72B391";//#1E5744";
            
            this.m_title_font_color = this.m_mesg_bg_color;
            this.m_mesg_font_color = "#FFFFFF";
        }
        else if (this.m_contentArray['theme_color'] === "orange")
        {
            this.m_pic_bg_color = "#B43400";//#D64510";
            this.m_mesg_bg_color = "#D64510";//"#FB8222";//"#1E5744";

            this.m_left_bg_color = "#F2D2BD";
            this.m_right_bg_color = "#FB7922";//#1E5744";
            
            this.m_title_font_color = this.m_mesg_bg_color;
            this.m_mesg_font_color = "#FFFFFF";
        }
        else if (this.m_contentArray['theme_color'] === "red")
        {
            this.m_pic_bg_color = "#660000";
            this.m_mesg_bg_color = "#882222";//"#1E5744";

            this.m_left_bg_color = "#FFEEEE";
            this.m_right_bg_color = "bf4040";//#DD0000";//#1E5744";
            
            this.m_title_font_color = this.m_mesg_bg_color;
            this.m_mesg_font_color = "#FFFFFF";
        }
        else if (this.m_contentArray['theme_color'] === "yellow")
        {
            this.m_pic_bg_color = "#FFFFCC";
            this.m_mesg_bg_color = "#886600";//"#1E5744";

            this.m_left_bg_color = "#FFFFEE";
            this.m_right_bg_color = "#FFCC00";//#1E5744";
            
            this.m_title_font_color = this.m_mesg_bg_color;
            this.m_mesg_font_color = "#FFFFFF";
        }
        else if (this.m_contentArray['theme_color'] === "teal")
        {
            this.m_pic_bg_color = "#003333";
            this.m_mesg_bg_color = "#336666";//"#1E5744";

            this.m_left_bg_color = "#BBCCCC";
            this.m_right_bg_color = "#339999";//#1E5744";
            
            this.m_title_font_color = this.m_mesg_bg_color;
            this.m_mesg_font_color = "#FFFFFF";
        }
        else if (this.m_contentArray['theme_color'] === "bloody_orange")
        {
            this.m_pic_bg_color = "#812816";
            this.m_mesg_bg_color = "#B45B49";//"#1E5744";

            this.m_left_bg_color = "#F6F3EA";
            this.m_right_bg_color = "#F18D6D";//F5DF94";//#1E5744";
            
            this.m_title_font_color = this.m_mesg_bg_color;
            this.m_mesg_font_color = "#FFFFFF";
        }
        else if (this.m_contentArray['theme_color'] === "rainbow")
        {
            this.m_pic_bg_color = "#FF1300";
            this.m_mesg_bg_color = "#0018FF";//"#1E5744";

            this.m_left_bg_color = "#FFFF33";
            this.m_right_bg_color = "#33CC66";//F5DF94";//#1E5744";
            
            this.m_title_font_color = this.m_mesg_bg_color;
            this.m_mesg_font_color = "#FFFFFF";
        }
        else if (this.m_contentArray['theme_color'] === "ocean")
        {
            this.m_pic_bg_color = "#446633";
            this.m_mesg_bg_color = "#627C85";//"#1E5744";

            this.m_left_bg_color = "#9EBBA1";
            this.m_right_bg_color = "#758E97";
            
            this.m_title_font_color = this.m_mesg_bg_color;
            this.m_mesg_font_color = "#FFFFFF";
        }
        else if (this.m_contentArray['theme_color'] === "sunrise")
        {
            this.m_pic_bg_color = "#CF4844";
            this.m_mesg_bg_color = "#B33A36";//"#1E5744";

            this.m_left_bg_color = "#F6F3EA";
            this.m_right_bg_color = "#DC8439";
            
            this.m_title_font_color = this.m_mesg_bg_color;
            this.m_mesg_font_color = "#FFFFFF";
        }
        else if (this.m_contentArray['theme_color'] === "seashore")
        {
            this.m_pic_bg_color = "#43687F";
            this.m_mesg_bg_color = "#7D6A5C";//"#1E5744";

            this.m_left_bg_color = "#F8F6F3";
            this.m_right_bg_color = "#D4CCAD";
            
            this.m_title_font_color = this.m_mesg_bg_color;
            this.m_mesg_font_color = "#FFFFFF";
        }
    }
/*
    this.buildHeaderBackground = function()
    {
        var width = this.m_objInfo['feed_title_background'].w;
        var height = this.m_objInfo['feed_title_background'].h;
        console.log("[template_socialmedia_pic]buildHeaderBackground headerHeight = "+height+ " bgcolor="+this.m_left_bg_color);
        var alpha = 1;
        this.m_objPixi['feed_title_background'] = DacPixi.drawRectangle(0, 0, width, height , this.m_left_bg_color, alpha, null, null);

        this.m_objPixi['feed_title_background'].position.x = 0;
        this.m_objPixi['feed_title_background'].position.y = 0;

        this.m_stage.addChild(this.m_objPixi['feed_title_background']);
    }
*/
    this.buildHrLine = function()
    {
        var height = this.m_objInfo['hr_line'].h;
        var alpha = 1;
        var y = this.m_objInfo['hr_line'].y;
        var height = this.m_objInfo['hr_line'].h;
        if (height < 3) height = 3;
        var startWidth = this.m_objInfo['hr_line'].w * 0.05;
        //if (this.m_playmode ==="editor") startWidth = this.m_objInfo['hr_line'].w;
        //this.m_objPixi['hr_line'] = DacPixi.drawRectangle(0, y, startWidth, height , this.m_contentArray['hr_line_color'], alpha, null, null);

        //this.m_objPixi['hr_line'].position.x = 0;
        //this.m_objPixi['hr_line'].position.y = 0;
        //this.m_stage.addChild(this.m_objPixi['hr_line']);
        //if (this.m_playmode !="editor")
        //{
    //      this.m_objPixi['hr_line2'] = DacPixi.drawRectangle(0, y, this.m_objInfo['hr_line'].w, height, this.m_contentArray['hr_line_color'], 0.5, null, null);
//          this.m_stage.addChild(this.m_objPixi['hr_line2']);
    //	}

    }
	
    this.buildBodyBackground = function()
    {
        var width = this.m_objInfo['body_background'].w;
        var height = this.m_objInfo['body_background'].h;
        var x = this.m_objInfo['body_background'].x;
        var y = this.m_objInfo['body_background'].y;
        var alpha = 1;
        //console.log("[template_socialmedia_pic]buildBodyBackground bgcolor="+this.m_contentArray['body_background_color']);
        this.m_objPixi['body_background'] = DacPixi.drawRectangle(x, y, width, height , this.m_contentArray['body_background_color'], alpha, null, null);
        this.m_stage.addChild(this.m_objPixi['body_background']);


        ///EDIT HERE!!!!!*********
        this.m_objPixi['introBackground'] = DacPixi.drawRectangle(x, y,_this.m_width,_this.m_height , this.m_left_bg_color, alpha, null, null);
        this.m_stage.addChild(this.m_objPixi['introBackground']);

        //build the squares for intro
        var stageRatio = this.m_width/this.m_height;
        this.m_totalNumberOfRectanglesHorizontal = 12;
        this.m_totalNumberOfRectanglesVertical = 6;
        var rectangleSpacing = 3;
        var rectangleWidth = ((_this.m_width-(this.m_totalNumberOfRectanglesHorizontal*rectangleSpacing))/this.m_totalNumberOfRectanglesHorizontal);
        var rectangleHeight = ((_this.m_height-(this.m_totalNumberOfRectanglesVertical*rectangleSpacing))/this.m_totalNumberOfRectanglesVertical);
        var currentXPos = 0;
        var currentYPos = 0;

        // add the rectangles to the stage
        for (var i=0;i<this.m_totalNumberOfRectanglesVertical;i++)
        { 
            for(var j=0;j<this.m_totalNumberOfRectanglesHorizontal;j++)
            {
                var xPos = (rectangleWidth*j)+rectangleSpacing*j;
                var yPos = (rectangleHeight*i)+rectangleSpacing*i;
                this.m_objPixi['rectangle'+i+''+j] = DacPixi.drawRectangle(xPos,yPos,rectangleWidth,rectangleHeight, this.m_right_bg_color,0, null, null);
                this.m_stage.addChild(this.m_objPixi['rectangle'+i+''+j]);
            }
        }

        this.m_objPixi['headerLeftOne'] = DacPixi.drawRectangle(x, y,0.1,this.m_objInfo['avatar'].h*1.3 , this.m_left_bg_color, alpha, null, null);
        this.m_stage.addChild(this.m_objPixi['headerLeftOne']);

        this.m_objPixi['headerRightOne'] = DacPixi.drawRectangle(_this.m_width*.8, y,_this.m_width*.2,this.m_objInfo['avatar'].h*1.3 , this.m_right_bg_color, 0, null, null);
        this.m_stage.addChild(this.m_objPixi['headerRightOne']);
        this.m_objPixi['headerRightOne'].alpha = 0

        this.m_objPixi['footerLeftOne'] = DacPixi.drawRectangle(x, _this.m_height-this.m_objInfo['avatar'].h,0.1,this.m_objInfo['avatar'].h*1.3, this.m_left_bg_color, alpha, null, null);
        this.m_stage.addChild(this.m_objPixi['footerLeftOne']);

        this.m_objPixi['footerRightOne'] = DacPixi.drawRectangle(_this.m_width*.5, _this.m_height-this.m_objInfo['avatar'].h,_this.m_width*0.5,this.m_objInfo['avatar'].h*1.3 , this.m_right_bg_color, 1, null, null);
        this.m_stage.addChild(this.m_objPixi['footerRightOne']);
        this.m_objPixi['footerRightOne'].alpha = 0;

        this.m_objPixi['bodyLeft'] = DacPixi.drawRectangle(0,this.m_objInfo['avatar'].h,_this.m_width, _this.m_height-(this.m_objInfo['avatar'].h*2), this.m_mesg_bg_color, 0, null, null);
        this.m_stage.addChild(this.m_objPixi['bodyLeft']);
        this.m_objPixi['bodyLeft'].alpha = 0;

        //this.m_objPixi['bodyRight'] = DacPixi.drawRectangle(_this.m_width*.5,this.m_objInfo['avatar'].h,_this.m_width, _this.m_height-(this.m_objInfo['avatar'].h*2), this.m_pic_bg_color, 1, null, null);
       // this.m_stage.addChild(this.m_objPixi['bodyRight']);
        //this.m_objPixi['bodyRight'].alpha = 0;

        //this.m_objPixi['bodyRight'].position.x = 0;

        if (this.m_playmode !="editor")
        {

        }
        

    }

    PIXI.Texture.Draw = function (cb) 
    {
        var canvas = document.createElement('canvas');
        if (typeof cb == 'function') cb(canvas);
        return PIXI.Texture.fromCanvas(canvas);
    }
	
    this.buildTitleText= function()
    {
        console.log("[template_socialmedia_pic]buildTitleText font color="+this.m_contentArray['feed_title_font_color']);
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

        this.m_objPixi['feed_title']= DacPixi.buildTextItem(this.m_contentArray['feed_title'],this.m_contentArray['feed_title_font'],this.m_contentArray['feed_title_font_color'],this.m_objInfo['feed_title'].fontSize,align,italic,bold,x,y,wordWrap,this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        //var centerOfStage = this.m_width/2;
        //var centerOfTitle = m_objPixi['feed_title'].width/2;
        this.m_objPixi['feed_title'].position.x = x; //20*_this.m_xScale;//10;//centerOfStage - centerOfTitle;
        this.m_objPixi['feed_title'].position.y = -220;		
        //this.m_objPixi['feed_title'].scale = 1;
        this.m_objPixi['feed_title'].alpah = 1;
        this.m_stage.addChild(this.m_objPixi['feed_title']);

    }
	
	
    this.buildFeedLogo = function()
    {
    //build resize icon image
        if (this.m_field_feed_logo != null)
        {
            if (this.m_playmode === "editor") 
                feed_logo = "../../htmlplayer/templates/"+this.m_templateName+"/media/" + this.m_field_feed_logo;
            else 
                feed_logo = "../../templates/"+this.m_templateName+"/media/" + this.m_field_feed_logo;
            
            console.log("[template_socialmedia_pic] buildFeedLogo playmode="+this.m_playmode +" feed_logo="+feed_logo);
            this.m_objPixi['feed_logo'] = PIXI.Sprite.fromImage(feed_logo);
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
                shadow.distance = 3;
                shadow.alpha 	= 0.55;
                shadow.angle 	= 45;
                shadow.blur 	= 5;
                this.m_objPixi['feed_logo'].filters = [shadow];
                
                this.m_objPixi['feed_logo'].alpha = 0;
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
                    console.log("[template_socialmedia_pic]************movePostOnStage swicth from 1 to 2");
                    _this.m_playPostSlidesFlag = 2;
                }
                else
                {
                    console.log("[template_socialmedia_pic]************movePostOnStage swicth from 2 to 1");
                    _this.m_playPostSlidesFlag = 1;
                }
                _this.m_readyToSwitchPostSlides = 0;
            }

            if (_this.m_playPostSlidesFlag == 1 && _this.m_buildBodyDone == 1)
            {
                console.log("[template_socialmedia_pic]movePostOnStage play a1");
                currretPostSlides = _this.m_postSlides;
            }
            else if (_this.m_playPostSlidesFlag == 2 && _this.m_buildBodyDone == 1)
            {
                console.log("[template_socialmedia_pic]movePostOnStage play a2");
                currretPostSlides = _this.m_postSlides2;
            }
        }
        else
        {
            currretPostSlides = _this.m_postSlides;
            _this.m_hasStarted=true;
        }

        _this.m_slideCounter++;


        if(_this.m_slideCounter >= currretPostSlides.length)
            _this.m_slideCounter = 0;

            //

        var postSlide = currretPostSlides[_this.m_slideCounter];
        postSlide.visible = true;
        postSlide.position.x=0;
        
        _this.m_objPixi['feed_logo'].alpha = 1;

    }

    this.movePostOffStage = function ()
    {
        var currretPostSlides = null;

        if (_this.m_playPostSlidesFlag == 1 && _this.m_buildBodyDone == 1)
            currretPostSlides = _this.m_postSlides;
        else if (_this.m_playPostSlidesFlag == 2 && _this.m_buildBodyDone == 1)
            currretPostSlides = _this.m_postSlides2;

        var postSlide = currretPostSlides[_this.m_slideCounter];
        var t = new TimelineMax();
        var tmpLocation = - _this.m_width*2;
        postSlide.position.x = tmpLocation;
        postSlide.visible = false;
    //t.to(postSlide.position,1, {ease: Back.easeOut.config(1.3), x:tmpLocation,onComplete:function(){this.kill(); postSlide.visible = false;}})


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
        console.log("[template_socialmedia_pic]buildBody...");

        if (JSON.stringify(this.m_feedArray) != '{}' && this.m_feedArray != null)
        {
            var feedObj= this.m_feedArray;
            //console.log("[template_socialmedia_pic] buildBody favored_posts.length="+feedObj.feed_posts.favored_posts.length);
            //console.log("[template_socialmedia_pic] buildBody this.m_feedAssetArray="+JSON.stringify(this.m_feedAssetArray));
            //increment favorite backwards because array.push items
            for(var i=feedObj.feed_posts.favored_posts.length-1;i>=0;i--)
            {
                var postObj = feedObj.feed_posts.favored_posts[i];
                var avatar = postObj.avatar; 

                var pic = postObj.picture.default[0];
                if (this.m_cache != 1)
                {
                    avatar = this.m_dacUtil.getAssetProxy(avatar,"");
                    if (pic != null && pic != "") 
                        pic = this.m_dacUtil.getAssetProxy(pic,"");

                }
                else
                {
                    var asset_id = this.m_field_feed_key + "-" + postObj.avatar;
                    avatar = this.m_feedAssetArray[asset_id];
                    if (pic != null && pic != "") 
                    {
                        pic = this.m_field_feed_key + "-" + pic;
                        pic = this.m_feedAssetArray[pic];
                    }
                }
                //console.log("[template_socialmedia_pic] buildBody favored_posts username="+postObj.username+ "avatar key="+asset_id+" avatar obj url="+avatar);
                this.buildPost(postObj.username,avatar,postObj.posttime,postObj.location,postObj.text[0], pic); 

            }
            //increment favorite backwards because array.push items
            //for (var i=feedObj.feed_posts.approved_posts.length-1;i>=0;i--)
            for (var i=0; i<feedObj.feed_posts.approved_posts.length;i++)
            {
                var postObj = feedObj.feed_posts.approved_posts[i];     
                var avatar = postObj.avatar; 
                var pic = postObj.picture.default[0];
                if (this.m_cache != 1)
                {
                    avatar = this.m_dacUtil.getAssetProxy(avatar,"");
                    if (pic != null && pic != "") 
                        pic = this.m_dacUtil.getAssetProxy(pic,"");

                }
                else
                {
                    var asset_id = this.m_field_feed_key + "-" + postObj.avatar;
                    avatar = this.m_feedAssetArray[asset_id];
                    if (pic != null && pic != "") 
                    {
                        pic = this.m_field_feed_key + "-" + pic;
                        pic = this.m_feedAssetArray[pic];
                    }
                }
                //console.log("[template_socialmedia_pic] buildBody approved_posts username="+postObj.username+ " i="+i);
                this.buildPost(postObj.username,avatar,postObj.posttime,postObj.location,postObj.text[0], pic); 


            }
       }

    }
    
    this.buildPost = function(username,avatar,posttime,location,mesg,pic)
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
		
	console.log("[template_socialmedia_pic] buildPost username="+username+" avatar="+avatar+"   pic="+pic);
        //username
        var usernameSprite = DacPixi.buildTextItem(username,font,this.m_contentArray['body_font_color'],this.m_objInfo['username'].fontSize,align,italic,bold,x,y,wordWrap,this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        //this.m_stage.addChild(usernameSprite); 
	postContainer.addChild(usernameSprite);  //index=0
	//posttime
        var localPostTimeStr = "";
        if (posttime != null && posttime != "")   //Sun Oct 04 13:56:30 +0000 2015
        { 
            console.log("posttime="+posttime);
           // localPostTime = new Date(posttime+" UTC");
            //var d = localPostTime.toLocaleDateString();
            //var t = localPostTime.toLocaleTimeString();
           // t = t.replace(/\u200E/g, '');
           // t = t.replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2');
           // localPostTimeStr = d + ' ' + t; //localPostTime.toString()
            
            if (this.m_templateName == "instagram")
            {
                localPostTimeStr = posttime;
                
            }
            else
            {
                var momentTime = moment(posttime, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en');
                localPostTimeStr = momentTime.format('MMM D YYYY, h:mm a');
            }

				
            x = this.m_objInfo['posttime'].x;//this.m_width* this.m_xScale;
            y = this.m_objInfo['posttime'].y;//150 * this.m_yScale;
            //var locationFontSize = parseInt(this.m_contentArray['body_font_size'])*0.7* this.m_yScale;
                    //console.log("[template_socialmedia_pic]buildPost location_font_color = "+this.m_contentArray['location_font_color']);
            var posttimeSprite = DacPixi.buildTextItem(localPostTimeStr,font,this.m_contentArray['posttime_font_color'],this.m_objInfo['posttime'].fontSize,align,italic,bold,x,y,wordWrap,this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
            //this.m_stage.addChild(posttimeSprite); 
            postContainer.addChild(posttimeSprite);  //index=1
        }
        //location
        if (location == null || location == "null") location = "";
        x = this.m_objInfo['location'].x;//this.m_width* this.m_xScale;
        y = this.m_objInfo['location'].y;//150 * this.m_yScale;
        var locationFontSize = parseInt(this.m_contentArray['body_font_size'])*0.7* this.m_yScale;
		//console.log("[template_socialmedia_pic]buildPost location_font_color = "+this.m_contentArray['location_font_color']);
        var locationSprite = DacPixi.buildTextItem(location,font,this.m_contentArray['location_font_color'],this.m_objInfo['location'].fontSize,align,italic,bold,x,y,wordWrap,this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        //this.m_stage.addChild(locationSprite); 
	postContainer.addChild(locationSprite);  //index=2
        
        //avatar
	//console.log("[template_socialmedia_pic] build_post avatar= "+avatar);

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
            console.log("[template_socialmedia_pic] build_post avatar undefined "+avatar+ "..."+username+"   "+mesg);

        
        //mesg
        var mesgWidth = this.m_objInfo['mesg'].w;
        x = this.m_objInfo['mesg'].x;
        y = this.m_objInfo['mesg'].y;
        if (pic != null && pic != "" )
        {
            mesgWidth = this.m_objInfo['mesg'].w2;
            x = this.m_objInfo['mesg'].x2;
            y = this.m_objInfo['mesg'].y2;
        }
        else if (pic == null && this.m_layoutName == "P1")
        {
            x = this.m_objInfo['pic'].x;
            y = this.m_objInfo['pic'].y;
        }
        
       // this.m_objPixi['bodyRight'].position.x = 0;
       // DacPixi.redrawRectangle(_this.m_overlayPIXIGraphics,_this.m_contentArray["overlay_x"],_this.m_contentArray["overlay_y"],_this.m_contentArray["overlay_width"],_this.m_contentArray["overlay_height"],_this.m_contentArray["overlay_color"],_this.m_contentArray["overlay_alpha"]);
       
       // if (this.m_layoutName == "P1")
       //     DacPixi.redrawRectangle(_this.m_objPixi['bodyRight'], 0,_this.m_objInfo['avatar'].h,_this.m_width, _this.m_height-(_this.m_objInfo['avatar'].h*2), _this.m_pic_bg_color, 0);

 
        fontSize = this.m_contentArray['body_font_size'] * this.m_yScale;
        //alert("body color="+this.m_contentArray['body_font_color']);
        //console.log("[template_socialmedia_pic] mesg1 = "+mesg);
        if (mesg == null) mesg = "";
        mesg = this.m_dacUtil.removeURL(mesg);
        mesg = this.m_dacUtil.decodeHtmlSymbols(mesg);
        //console.log("[template_socialmedia_pic] mesg2 = "+mesg);
        var mesgSprite = DacPixi.buildTextItem(mesg,font,this.m_contentArray['body_font_color'],this.m_objInfo['mesg'].fontSize,align,italic,bold,x,y,wordWrap,mesgWidth,strokeColor,strokeThickness, dropShadow, dropShadowColor);
		//this.m_stage.addChild(mesgSprite); 
	postContainer.addChild(mesgSprite);  //index=4
		
	//console.log("[template_socialmedia_pic] build_post mesg size="+mesgSprite.width+","+mesgSprite.height);
		
        //pic
        var picSprite = null;
        var picBorderPixi = null;
        if (pic != null && pic != "" )
        {
            console.log("[template_socialmedia_pic]buildPost yes pic");
            //this.m_objPixi['bodyRight'].alpha = 1;
            _this.loadPostPic(pic, postContainer);

        }
        else
        {
            //this.m_objPixi['bodyRight'].alpha = 0;
            console.log("[template_socialmedia_pic]buildPost no pic");
            
        }

        this.m_postPIXI.name.push(usernameSprite);
        this.m_postPIXI.posttime.push(posttimeSprite);
        this.m_postPIXI.location.push(locationSprite);
        this.m_postPIXI.avatar.push(userAvatar);
        this.m_postPIXI.mesg.push(mesgSprite);
        //this.m_postPIXI.pic.push(picSprite); 

        this.m_stage.addChild(postContainer);
        postContainer.position.x = this.m_width+500;
        postContainer.position.y = 0;
        //console.log("postContainer start x="+postContainer.position.x);
        postContainer.visible = false;

        if (this.m_buildPostSlidesFlag ==1)
            this.m_postSlides.push(postContainer);
        else
            this.m_postSlides2.push(postContainer);
			
    }
    
    this.playTemplate = function()
    {
        console.log("[template_socialmedia_pic]playTemplate isPlaying="+this.m_isPlaying);
        this.animate();
        if (JSON.stringify(this.m_feedArray) != '{}' && this.m_feedArray != null)
        {
            //if (this.m_playmode!="editor") 
             //setInterval(this.movePostOnStage,this.m_contentArray['post_duration']*1000);
            this.buildSquareIntro();
                //this.movePostOnStage();
        }

    } 
	
	
    this.displayPost = function()
    {
        if (this.m_playmode !="editor")
            setInterval(this.movePostOnStage,this.m_contentArray['post_duration']*1000);
        _this.movePostOnStage();

    }
	

    this.buildSquareIntro = function()
    {
        for (var i=0;i<this.m_totalNumberOfRectanglesVertical;i++)
        { 
            var tmpArray = Array();
            var staggerInSeconds = 0.19;
            var delayInSeconds = i*staggerInSeconds;
            var delayInSecondsTwo = (this.m_totalNumberOfRectanglesHorizontal + this.m_totalNumberOfRectanglesVertical)*staggerInSeconds;

            for(var j=0;j<this.m_totalNumberOfRectanglesHorizontal;j++)
            {
                tmpArray[j] = this.m_objPixi['rectangle'+i+''+j]; 
            }

            if(i==0)
                TweenMax.staggerTo(tmpArray, 1, {alpha:1}, staggerInSeconds);
            else
                TweenMax.staggerTo(tmpArray, 1, {alpha:1,delay:delayInSeconds}, staggerInSeconds);
        }

        var t1 = new TimelineMax();
        var t2 = new TimelineMax();
        var t3 = new TimelineMax();
        var t4 = new TimelineMax();
        var t5 = new TimelineMax();
        //t0.to(this.m_objPixi['rectangle'+i+''+j],.3, {ease: Back.easeOut.config(1.3),alpha:1,onComplete:function(){this.kill();}});
            //this.m_objPixi['rectangle'+i+''+j].alpha=1;

        t1.to(this.m_objPixi['headerLeftOne'],2, {ease: Back.easeOut.config(1.3),delay:delayInSecondsTwo, width:_this.m_width*.8,onComplete:function(){this.kill();}});
        t1.to(this.m_objPixi['headerRightOne'],2, {ease: Back.easeOut.config(1.3), alpha:1,onComplete:function(){this.kill();}});
        t2.to(this.m_objPixi['footerLeftOne'],2, {ease: Back.easeOut.config(1.3),delay:delayInSecondsTwo, width:_this.m_width*.5,onComplete:function(){this.kill();_this.displayPost();TemplateBase.prototype.buildQRCode.call(_this,_this.m_contentArray['qr_text'],_this.m_contentArray['qr_size'], _this.m_contentArray['qr_color'], _this.m_contentArray['qr_x'],_this.m_contentArray['qr_y'])}});
        t2.to(this.m_objPixi['footerRightOne'],2, {ease: Back.easeOut.config(1.3), alpha:1,onComplete:function(){this.kill();}});
        /*  this is the logic that will allow the draw function
                this.m_objPixi['bodyLeft'].clear();
                var pixiFillColor  = "0x000000"; 
            this.m_objPixi['bodyLeft'].beginFill(pixiFillColor);
            this.m_objPixi['bodyLeft'].drawRect(0,0, 500, 500);
        this.m_objPixi['bodyLeft'].endFill();
        */

        t3.to(this.m_objPixi['bodyLeft'],5, {ease: Back.easeOut.config(1.3),delay:delayInSecondsTwo,alpha:1,onComplete:function(){this.kill();}});
        //t4.to(this.m_objPixi['bodyRight'],5, {ease: Back.easeOut.config(1.3),delay:delayInSecondsTwo,alpha:1,onComplete:function(){this.kill();}});
       
       
        t5.to(this.m_objPixi['feed_title'],5, {ease: Back.easeOut.config(1.3),delay:delayInSecondsTwo,y:this.m_objInfo['feed_title'].y,onComplete:function(){this.kill();}});

    }
	

    this.animate = function() 
    {
        requestAnimationFrame(animate);
        this.m_renderer.render(this.m_stage);	 
    } 
	

    this.updateEditView = function(fullWidget, fieldName, value)
    {
        this.m_cache = 0;
        this.m_fullWidget = fullWidget;
        this.m_fullWidget['widget']['dac_widget']['content'][fieldName]=value;
        this.m_contentArray = fullWidget['widget']['dac_widget']['content'];
        this.m_assetArray = fullWidget.widgetAsset;

        console.log("[template_socialmedia_pic]updateEditView.."+fieldName+"="+ value);
        
        TemplateBase.prototype.buildQRCode.call(_this,_this.m_contentArray['qr_text'],_this.m_contentArray['qr_size'], _this.m_contentArray['qr_color'], _this.m_contentArray['qr_x'],_this.m_contentArray['qr_y'])
        
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
            //console.log("[template_socialmedia_pic]updateEditView..body style"+JSON.stringify(style));

            this.m_postPIXI.name[0].style = style;
            this.m_postPIXI.mesg[0].style = style;
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
            //console.log("[template_socialmedia_pic]updateEditView..location style"+JSON.stringify(style));
            //var locationPixi = this.m_postSlides[0].getChildAt(2);
            this.m_postPIXI.posttime[0].style = style;
            //locationPixi.style = style;
        }

    }
	
    this.updateWidget = function(fullWidget)
    {
        var timestamp = this.m_dacUtil.getCurrentDateTime2();		
        console.log("[template_socialmedia_pic] "+timestamp+" updateWidget ..... current play postSlides="+this.m_playPostSlidesFlag);

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
        console.log("[template_socialmedia_pic] "+timestamp+" updateWidget done ..... new postSlides="+this.m_buildPostSlidesFlag);
    }
	
    this.updateEditorVariable = function(name,value){
        console.log("[template_socialmedia_pic] updateEditorVariable name="+name+" value="+value);
        this.m_fullWidget.widget.dac_widget.content[name] = value;
        this.m_contentArray[name] = value;
        parent.sendUpdatesToWidget(this.m_fullWidget);
    }
    
    this.loadPostPic= function(pic, postContainer)
    {
       console.log("[template_socialmedia_pic]loadPostPic pic="+pic);
       
        var picBg = DacPixi.drawRectangle(_this.m_width*.5,this.m_objInfo['avatar'].h,_this.m_width, _this.m_height-(this.m_objInfo['avatar'].h*2), this.m_pic_bg_color, 1, null, null);
        if (this.m_layoutName == "L1")
            postContainer.addChild(picBg); 
        

        var img = new Image();
        img.onload = function() {
            var srcWidth = this.width;
            var srcHeight = this.height;
            //console.log("[template_socialmedia_pic]loadPostPic pic orignal size="+this.width+","+this.height);
            
            var maxWidth = _this.m_objInfo['pic'].w;
            var maxHeight = _this.m_objInfo['pic'].h;
            var newSize = _this.calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight)

            var picSprite = PIXI.Sprite.fromImage(pic);
            //console.log("[template_socialmedia_pic]loadPostPic maxSize="+maxWidth+","+this.height);
           // console.log("[template_socialmedia_pic]loadPostPic  newSize="+newSize["width"]+","+newSize["height"]);
            
            var imgX = _this.m_objInfo['pic'].x + (maxWidth - newSize["width"])* 0.5;
            var imgY = _this.m_objInfo['pic'].y + (maxHeight - newSize["height"])* 0.5;
            
            picSprite.position.x = imgX;//_this.m_objInfo['pic'].x;
            picSprite.position.y = imgY;//_this.m_objInfo['pic'].y;
            
            //alert("pic x="+picSprite.position.x+ "  pic y="+picSprite.position.y);
            //var picScale = 1.6;
            //picSprite.scale.x = picScale*this.m_xScale;
            //picSprite.scale.y = picScale*this.m_yScale;
            picSprite.width = newSize["width"];//_this.m_objInfo['pic'].w;//800;
            picSprite.height = newSize["height"];//_this.m_objInfo['pic'].h;//600;


            //drop shadow
            var shadow 	= new PIXI.filters.DropShadowFilter();
            shadow.color = 0x0000;
            shadow.distance = 2;
            shadow.alpha 	= 0.55;
            shadow.angle 	= 45;
            shadow.blur 	= 5;
            picSprite.filters 	= [shadow];
            postContainer.addChild(picSprite); 
            //this.m_stage.addChild(picSprite);
            _this.m_postPIXI.pic.push(picSprite); 
            
        }
        img.src = pic;

    }
    
    this.calculateAspectRatioFit=function(srcWidth, srcHeight, maxWidth, maxHeight) {
        var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return { width: parseInt(srcWidth*ratio), height: parseInt(srcHeight*ratio) };
    }  
    
    
   this.getDateTimeFromUnixTime = function (UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;// + ':' + sec ;
        return time;
}

}

TemplateSocialMediaPic.prototype = Object.create(TemplateBase.prototype);