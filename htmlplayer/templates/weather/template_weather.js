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

 function TemplateWeather(debug) {
    TemplateBase.call(this);
    var _this = this;
    this.m_templateName = "weather"; 
	this.m_dacPixi = new DacPixi(1);
	
    //define all template fields here, set default values
    this.m_field_background_color = "#990000";
    this.m_field_background_image = ""; //"http://www.dynasign.net/dynasign/websites/teamgroup/base/dss_media/image/category/car/911Carrera4S_2.jpg";//
    this.m_field_background_image_flag = true;

    this.m_field_location_overlay_color = "FFFFFF";
    this.m_field_location_overlay_alpha = 0.6;
    this.m_field_forecast_overlay_color = "FFFFFF";
    this.m_field_forecast_overlay_alpha = 0.6;
    this.m_field_layer_on = true;

    this.m_field_unit = "C";

    this.m_field_location = "";
    this.m_field_location_name = "New York";
    this.m_field_location_name_font = "Arial";
    //this.m_field_location_name_font_size = 80;
    this.m_field_location_name_font_color = "#FFFFFF";
    this.m_field_location_name_bold = true;
    this.m_field_location_name_italic = true;
    this.m_field_location_name_align = "center";
    this.m_field_location_mode = "city";
	
    //this.m_field_country = "United States";
    //this.m_field_country_code = "us";

    this.m_field_current_temp_font = "Arial";
    this.m_field_current_temp_font_color = "#FFFFFF";
    //this.m_field_current_temp_font_size = 100;
    this.m_field_current_temp_bold = true;
    this.m_field_current_temp_italic = true;
    //this.m_field_current_temp_x = 200;
    //this.m_field_current_temp_y = 200;
    //this.m_field_current_icon_x = 200;
    //this.m_field_current_icon_y = 200;
    this.m_field_current_icon = "";
	
    //this.m_field_forecast_layout = "landscape";
    //this.m_field_forecast_width = 170;
    //this.m_field_forecast_height = 63;
    this.m_field_forecast_day_font_color = "#FFFFFF";
    this.m_field_forecast_day_font = "Arial";
    //this.m_field_forecast_day_font_size = 38;
    this.m_field_forecast_day_bold = true;
    this.m_field_forecast_day_italic = true;
    //this.m_field_forecast_temp_font_size = 38;
    this.m_field_forecast_temp_font_color = "#FFFFFF";
    this.m_field_forecast_temp_font = "Arial";
    this.m_field_forecast_temp_bold = true;
    this.m_field_forecast_temp_italic = true;
    this.m_field_forecast_icon1 = "";
    this.m_field_forecast_icon2 = "";
    this.m_field_forecast_icon3 = "";
    this.m_field_forecast_icon4 = "";
    this.m_field_forecast_icon5 = "";

    this.m_field_forecast_days = 3;
	
    this.m_field_sponsor_font = "Arial";
    //this.m_field_sponsor_font_size = 20;
    this.m_field_sponsor_font_color = "#FFFFFF";

// define content field array and asset array
    this.m_fullWidget = null;
    this.m_contentArray = null; //	this.variableArray = new Array();
    this.m_assetArray = null;
    this.m_feedArray = null;
	
    this.sponor_text = "AccuWeather® powered by Dynasign®";
    this.landscape_height = 330;
    this.layoutScale;

    this.m_locationPIXIText = null;
    this.m_currentTempPIXIText = null;
    this.m_currentConditionSprite = null;

    this.m_day1PIXIText = null;
    this.m_day2PIXIText = null;
    this.m_day3PIXIText = null;
    this.m_day4PIXIText = null;
    this.m_day5PIXIText = null;
    this.m_forecastTemp1PIXIText = null;
    this.m_forecastTemp2PIXIText = null;
    this.m_forecastTemp3PIXIText = null;
    this.m_forecastTemp4PIXIText = null;
    this.m_forecastTemp5PIXIText = null;
    this.m_icon1Sprite = null;
    this.m_icon2Sprite = null;
    this.m_icon3Sprite = null;
    this.m_icon4Sprite = null;
    this.m_icon5Sprite = null;
    this.m_seperator1PIXISprite = null;
    this.m_seperator2PIXISprite = null;
    this.m_seperator3PIXISprite = null;
    this.m_seperator4PIXISprite = null;
	
    this.m_sponsorPIXIText = null;

    this.m_locationOverlayPIXIGraphics = null;
    this.m_forecastOverlayPIXIGraphics = null;
    this.m_backgroundPIXIGraphics = null;
    this.m_backgroundImagePIXISprite = null;

    this.m_resizeImageIconPIXISprite = null;
    this.m_isResizeOn = false;
    this.m_lastXpos = 0;
    this.m_lastYPos = 0;

    this.m_layoutName;
		
//  pixi 
    this.m_stage = null;
    this.m_renderer = null;
    
    this.m_objInfo = {};
    this.m_handleWidth=20;
    this.m_widgetBackground = new WidgetBackground();

    this.weatherObj = null;

    //var img_currentIntervalID = null;
    var see_flag1 = null;
    var see_flag2 = null;
    var see_flag3 = null;
    var see_flag4 = null;
    var see_flag5 = null;

    this.determineObjInfo = function()
    {
        var stageRatio = this.m_height/this.m_width;

        if (stageRatio >= 1.2 )
        {
            this.m_layoutName = "P1";
        }
        else if (stageRatio < 1.2)
        {

            this.m_layoutName = "L1";

        }
        this.m_objInfo['forecast'] = {};
        this.m_objInfo['location_name'] = {};
        this.m_objInfo['current_temp'] = {};
        this.m_objInfo['current_icon'] = {};
        this.m_objInfo['sponsor'] = {};

	this.m_objInfo['sponsor'].font_size = 15 * this.m_width / 1024;

        //layout speific
        if (this.m_layoutName == "L1")
        {
            this.m_objInfo['location_name'].font_size = 50 * this.m_width / 1024;
            this.m_objInfo['forecast'].forecast_day_font_size = 50 * this.m_width / 1024;
            this.m_objInfo['forecast'].forecast_temp_font_size = 50 * this.m_width / 1024;
            this.m_objInfo['current_icon'].x = this.m_width/2 - 300 * Math.min(_this.m_width/1024,this.m_height/768) - 10;
            this.m_objInfo['current_icon'].y = 100 * this.m_height / 768;
            this.m_objInfo['current_temp'].x = this.m_width/2;
            this.m_objInfo['current_temp'].y = 130 * this.m_height / 768;
            this.m_objInfo['current_temp'].font_size = 125 * Math.min(this.m_width / 1024, this.m_height / 768);
        }
        else if (this.m_layoutName == "P1")
        {
            this.m_objInfo['location_name'].font_size = 50 * this.m_height / 768;
            this.getForecastHeight();
            this.m_objInfo['forecast'].forecast_day_font_size = 40 * this.m_objInfo['forecast'].forecast_height / 130;
            this.m_objInfo['forecast'].forecast_temp_font_size = 40 * this.m_objInfo['forecast'].forecast_height / 130;
            this.m_objInfo['current_icon'].x = this.m_width/2 - 300 * Math.min(_this.m_width/1024,_this.m_height/768) - 10;
            this.m_objInfo['current_icon'].y = 150 * this.m_height / 768;
            this.m_objInfo['current_temp'].x = this.m_width/2;
            this.m_objInfo['current_temp'].y = 180 * this.m_height / 768;
            this.m_objInfo['current_temp'].font_size = 130 * Math.min(this.m_width / 1024, this.m_height / 768);
        }

       // console.log("[template_weather]determineObjInfo weather font size="+this.m_objInfo['current_temp'].font_size);

    }
    
    this.getForecastWidth = function()
    {
        this.m_objInfo['forecast'].forecast_width = (this.m_width - 20) / this.m_contentArray["forecast_days"];
        if (this.m_objInfo['forecast'].forecast_width > this.landscape_height * this.m_height / 768)
            this.m_objInfo['forecast'].forecast_width = this.landscape_height * this.m_height / 768;
    }
    
    this.getForecastHeight = function()
    {
        this.m_objInfo['forecast'].forecast_height = this.m_height / 2 / this.m_contentArray["forecast_days"];
        if (this.m_objInfo['forecast'].forecast_height > this.m_width / 3)
            this.m_objInfo['forecast'].forecast_height = this.m_width / 3;
    }
    
    /////////*** init template fields***/////////
    this.initTemplateFields = function()
    {
        console.log("[template_countdown]initTemplateFields ... ");
        console.log("[template_countdown]m_contentArray"+this.m_contentArray);
        this.m_zone_width = this.m_contentArray["zone_width"];
        this.m_zone_height = this.m_contentArray["zone_height"];
        if (this.m_width == null) this.m_width = this.m_zone_width;
        if (this.m_height == null) this.m_height = this.m_zone_height;
        this.layoutScale = document.body.clientWidth / this.m_width;
		
        if (this.m_playmode === "editor")
            this.determineObjInfo();
        //console.log("[template_announcement]initTemplateFields ....2 ");
        TemplateBase.prototype.initCommonTemplateFields.call(this);
		
        if (this.m_contentArray["background_color"] === undefined) this.m_contentArray["background_color"] = this.m_field_background_color;
        if (this.m_assetArray[this.m_assetIdPrefix+"background_image"] === null) this.m_assetArray[this.m_assetIdPrefix+"background_image"] = this.m_field_background_image;

        var asset_id = this.m_assetIdPrefix+"background_image";
        //console.log("[template_countdown]initTemplateFields m_assetArray["+asset_id+"] ="+this.m_assetArray[asset_id]);

        if (this.m_contentArray["background_image_flag"] === null) this.m_contentArray["background_image_flag"] = this.m_field_background_image_flag;

        if (this.m_contentArray["location_overlay_color"] === null) this.m_contentArray["location_overlay_color"] = this.m_field_overlay_color;
        if (this.m_contentArray["location_overlay_alpha"] === null) this.m_contentArray["location_overlay_alpha"] = this.m_field_location_overlay_alpha;
        if (this.m_contentArray["forecast_overlay_alpha"] === null) this.m_contentArray["forecast_overlay_alpha"] = this.m_field_forecast_overlay_alpha;
        if (this.m_contentArray["layer_on"] == null) this.m_contentArray["layer_on"] = this.m_field_layer_on;
        if (this.m_contentArray["temp_unit"] == null) this.m_contentArray["temp_unit"] = this.m_field_unit;
        


        if (this.m_contentArray["location"] == null) this.m_contentArray["location"] = this.m_field_location;
        if (this.m_contentArray["location_name"] == null) this.m_contentArray["location_name"] = this.m_field_location_name;
        if (this.m_contentArray["location_name_font"] == null) this.m_contentArray["location_name_font"] = this.m_field_location_name_font;	
        if (this.m_contentArray["location_name_font_size"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["location_name_font_size"] = this.m_objInfo['location_name'].font_size;
        if (this.m_contentArray["location_name_font_color"] == null) this.m_contentArray["location_name_font_color"] = this.m_field_location_name_font_color;
        if (this.m_contentArray["location_name_bold"] == null) this.m_contentArray["location_name_bold"] = this.m_field_location_name_bold;
        if (this.m_contentArray["location_name_italic"] == null) this.m_contentArray["location_name_italic"] = this.m_field_location_name_italic;
        if (this.m_contentArray["location_name_align"] == null) this.m_contentArray["location_name_align"] = this.m_field_location_name_align;
        
        //if (this.m_contentArray["country"] === null) this.m_contentArray["country"] = this.m_field_country;
        //if (this.m_contentArray["country_code"] === null) this.m_contentArray["country_code"] = this.m_field_country_code;
        if (this.m_contentArray["current_temp_font"] == null) this.m_contentArray["current_temp_font"] = this.m_field_current_temp_font;
        if (this.m_contentArray["current_temp_font_color"] == null) this.m_contentArray["current_temp_font_color"] = this.m_field_current_temp_font_color;	
        if (this.m_contentArray["current_temp_font_size"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["current_temp_font_size"] = this.m_objInfo['current_temp'].font_size;	
        if (this.m_contentArray["current_temp_x"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["current_temp_x"] = this.m_objInfo['current_temp'].x;
        if (this.m_contentArray["current_temp_y"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["current_temp_y"] = this.m_objInfo['current_temp'].y;	
        if (this.m_contentArray["current_icon_x"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["current_icon_x"] = this.m_objInfo['current_icon'].x;
        if (this.m_contentArray["current_icon_y"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["current_icon_y"] = this.m_objInfo['current_icon'].y;
		
        /*if (this.m_contentArray["forecast_width"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["forecast_width"] = this.m_objInfo['forecast'].forecast_width;
        if (this.m_contentArray["forecast_height"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["forecast_height"] = this.m_objInfo['forecast'].forecast_height;*/
        if (this.m_contentArray["forecast_day_font_color"] == null) this.m_contentArray["forecast_day_font_color"] = this.m_field_forecast_day_font_color;
        if (this.m_contentArray["forecast_day_font"] == null) this.m_contentArray["forecast_day_font"] = this.m_field_forecast_day_font;
        if (this.m_contentArray["forecast_day_font_size"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["forecast_day_font_size"] = this.m_objInfo['forecast'].forecast_day_font_size;
        if (this.m_contentArray["forecast_temp_font_size"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["forecast_temp_font_size"] = this.m_objInfo['forecast'].forecast_temp_font_size;
        if (this.m_contentArray["forecast_temp_font_color"] == null) this.m_contentArray["forecast_temp_font_color"] = this.m_field_forecast_temp_font_color;
        if (this.m_contentArray["forecast_temp_font"] == null) this.m_contentArray["forecast_temp_font"] = this.m_field_forecast_temp_font;
        if (this.m_contentArray["forecast_days"] == null) this.m_contentArray["forecast_days"] = this.m_field_forecast_days;
        if (this.m_contentArray["sponsor_font"] == null) this.m_contentArray["sponsor_font"] = this.m_field_sponsor_font;

        if (this.m_contentArray["sponsor_font_size"] == undefined || this.m_zone_size_changed == 1) 
            this.m_contentArray["sponsor_font_size"] = this.m_objInfo['sponsor'].font_size;
        if (this.m_contentArray["sponsor_font_color"] == null) this.m_contentArray["sponsor_font_color"] = this.m_field_sponsor_font_color;
    }
     
     ///////// *** init template UI *** /////////
    this.initTemplateUI = function()
    {
        this.m_width = this.m_zone_width; //window.innerWidth; //
        this.m_height = this.m_zone_height; //window.innerHeight; //
        console.log("[template_countdown]initTemplateUI ... m_width="+this.m_width+" m_height="+this.m_height);
	
        canvasNode = document.createElement("canvas");
        canvasNode.setAttribute("id", "myCanvas");
        canvasNode.style.property= "position:absolute;top:0px;";
        document.body.appendChild(canvasNode);
        // create a renderer instance
        this.m_renderer = PIXI.autoDetectRenderer(this.m_width,this.m_height, {transparent: true,view:myCanvas});
        this.m_renderer.view.style.display = "block";
        this.m_renderer.view.style.width = "100%";
        this.m_renderer.view.style.height = "100%";
        this.m_renderer.view.style.position = "absolute";
        this.m_renderer.view.style.top = "0px";
        // add the renderer view element to the DOM
        document.body.appendChild(this.m_renderer.view);

        this.m_stage = new PIXI.Container();
		//set fields
        TemplateBase.prototype.buildWidgetBackground.call(this);
        this.readWeather();
        if(this.weatherObj!=null)
        {
            this.buildLocation();
            this.buildCurrent();
            this.buildForecast();
            this.buildSponsor();
        }
    }
	
    this.readWeather = function()
    {
        //alert(this.m_feedArray)
        this.weatherObj = null;
        if (JSON.stringify(this.m_feedArray) != '{}' && this.m_feedArray != null)
        {
            this.weatherObj = new Object();
            var feedObj= this.m_feedArray;

            this.weatherObj.CurrentTempF = feedObj.feed_items.current_weather.Temperature.Imperial.Value;
            //alert(this.weatherObj.CurrentTempF);
            this.weatherObj.CurrentTempC = feedObj.feed_items.current_weather.Temperature.Metric.Value;
            this.weatherObj.CurrentIcon = feedObj.feed_items.current_weather.WeatherIcon;
            if (this.weatherObj.CurrentIcon.toString().length == 1)
                this.weatherObj.CurrentIcon = "0"+this.weatherObj.CurrentIcon.toString();
            else
                this.weatherObj.CurrentIcon = this.weatherObj.CurrentIcon.toString();

            this.weatherObj.ForecastItems = [];
            for(var i = 0;i<feedObj.feed_items.forecast_weather.DailyForecasts.length;i++)
            {
                var obj = feedObj.feed_items.forecast_weather.DailyForecasts[i];
                var item = new Object();
                item.Day = this.convertDatetoWeek(obj.Date);
                if(obj.Temperature.Minimum.Unit == "F")
                {
                    item.LowF = parseInt(obj.Temperature.Minimum.Value);
                    item.HighF = parseInt(obj.Temperature.Maximum.Value);
                    item.LowC = parseInt((item.LowF - 32)/1.8);
                    item.HighC = parseInt((item.HighF - 32)/1.8);
                }
                else
                {
                    item.LowC = parseInt(obj.Temperature.Minimum.Value);
                    item.HighC = parseInt(obj.Temperature.Maximum.Value);
                    item.LowF = parseInt(item.LowC * 1.8 + 32);
                    item.HighF = parseInt(item.HighC * 1.8 + 32);
                }
                item.Icon = obj.Day.Icon;
                if(item.Icon.toString().length == 1)
                    item.Icon = "0"+item.Icon.toString();
                else
                    item.Icon = item.Icon.toString();
                this.weatherObj.ForecastItems.push(item);
            }
        }
    }

    this.buildLocation = function()
    {
        // build text first to get the text height before build overlay
        this.buildLocationText();
        this.buildLocationOverLay();
        
        //add overlay to stage first to make sure text is on top
        this.m_stage.addChild(this.m_locationOverlayPIXIGraphics);       
        this.m_locationOverlayPIXIGraphics.position.x = 0;
        this.m_locationOverlayPIXIGraphics.position.y = 0;
        
        this.m_stage.addChild(this.m_locationPIXIText);
    }

    this.buildLocationText = function()
    {
        if (this.m_locationPIXIText != null)
            this.m_stage.removeChild(this.m_locationPIXIText);
        
        var wordWrap = true;
        var strokeColor = "FFFFFF";
        var strokeThickness = 0;
        var dropShadow = false
        var dropShadowColor = "000000"; 
        console.log("[template_weather]location: "+this.m_contentArray["location_name"])
        this.m_locationPIXIText = DacPixi.buildTextItem(this.m_contentArray["location_name"],this.m_contentArray["location_name_font"],this.m_contentArray["location_name_font_color"],this.m_contentArray["location_name_font_size"],"left",this.m_contentArray["location_name_italic"],this.m_contentArray["location_name_bold"],20,20,wordWrap, this.m_width - 40,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        this.m_locationPIXIText.x = 20 + (this.m_width - 40 - this.m_locationPIXIText.width)/2;
        this.m_locationPIXIText.y = 17;

    }
    
    this.buildLocationOverLay = function()
    {
        if (this.m_locationOverlayPIXIGraphics != null)
            this.m_stage.removeChild(this.m_locationOverlayPIXIGraphics);
        
        //if (this.m_contentArray["layer_on"] == true)
        {
            this.m_locationOverlayPIXIGraphics = new PIXI.Graphics();
            var overlayColor  = "0x"+this.m_contentArray["location_overlay_color"].substring(this.m_contentArray["location_overlay_color"].indexOf("#")+1);

            this.m_locationOverlayPIXIGraphics.beginFill(overlayColor);
            this.m_locationOverlayPIXIGraphics.drawRect(0,0,this.m_width,this.m_locationPIXIText.height*1.6);
            this.m_locationOverlayPIXIGraphics.endFill();
            this.m_locationOverlayPIXIGraphics.alpha = this.m_contentArray["location_overlay_alpha"];
        }
    }
    
    this.buildCurrent = function()
    {
        this.buildCurrentTemp();
        this.buildCurrentIcon();
    }

    this.buildCurrentTemp = function()
    {
        if (this.m_currentTempPIXIText != null)
            this.m_stage.removeChild(this.m_currentTempPIXIText);
        var wordWrap = true;
        var strokeColor = "FFFFFF";
        var strokeThickness = 0;
        var dropShadow = false;
        var dropShadowColor = "000000"; 
        var currentTemp = this.weatherObj.CurrentTempF+"°F";
        if(this.m_contentArray["temp_unit"] == "C")
            currentTemp = this.weatherObj.CurrentTempC+"°C";
        //console.log("[template_weather]current temperature: "+currentTemp + ",&#8451;");
        this.m_currentTempPIXIText = DacPixi.buildTextItem(currentTemp,this.m_contentArray["current_temp_font"],this.m_contentArray["current_temp_font_color"],this.m_contentArray["current_temp_font_size"],"left",this.m_contentArray["current_temp_italic"],this.m_contentArray["current_temp_bold"],20,20,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        this.m_currentTempPIXIText.x = this.m_width/2 + 10;
        if (this.m_height / this.m_width > 1.2)
            this.m_currentTempPIXIText.y = 180 * this.m_height / 768;
        else
            this.m_currentTempPIXIText.y = 130 * this.m_height / 768;
        this.m_stage.addChild(this.m_currentTempPIXIText);
    }
    
    this.buildCurrentIcon = function()
    {
        if (this.m_currentConditionSprite != null)
            document.body.removeChild(this.m_currentConditionSprite);

        this.m_currentConditionSprite = new Image();
        document.body.appendChild(this.m_currentConditionSprite);
        //if (this.m_assetArray[this.m_assetIdPrefix+"current_icon"] != null)
        //{
            this.m_currentConditionSprite.style.visibility = "hidden";
            this.m_currentConditionSprite.style.position = "absolute";
            this.m_currentConditionSprite.src = "Rain_Occasional.png";//this.m_assetArray[this.m_assetIdPrefix+"current_icon
            this.m_currentConditionSprite.onload = function() {
                _this.adjustCurrentIcon(this);
            }

            this.m_currentConditionSprite.style.left = (this.m_width/2 - 300 * Math.min(this.m_width/1024,this.m_height/768) - 10) * this.layoutScale;
            if (this.m_height / this.m_width > 1.2)
                this.m_currentConditionSprite.style.top = 150 * this.m_height / 768 * this.layoutScale;
            else
                this.m_currentConditionSprite.style.top = 120 * this.m_height / 768 * this.layoutScale;
        //}
    }
    
    this.adjustCurrentIcon = function (img)
    {
        img.style.visibility = "visible";
        img.width = 300 * Math.min(_this.m_width/1024,_this.m_height/768) * _this.layoutScale;
    }
	
    this.buildSponsor = function()
    {
        if (this.m_sponsorPIXIText != null)
            this.m_stage.removeChild(this.m_sponsorPIXIText);
        var wordWrap = true;
        var strokeColor = "FFFFFF";
        var strokeThickness = 0;
        var dropShadow = false;
        var dropShadowColor = "000000";

        this.m_sponsorPIXIText = DacPixi.buildTextItem(this.sponor_text,this.m_contentArray["sponsor_font"],this.m_contentArray["sponsor_font_color"],this.m_contentArray["sponsor_font_size"],"left",false,true,20,20,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        this.m_sponsorPIXIText.x = this.m_width - this.m_sponsorPIXIText.width - 5;
        this.m_sponsorPIXIText.y = this.m_height - this.m_sponsorPIXIText.height - 5;
        this.m_stage.addChild(this.m_sponsorPIXIText);
    }
	
    this.buildForecast = function()
    {
        this.clearForecast();
        if(this.weatherObj != null)
        {
            if(this.m_height > this.m_width * 1.2)
                this.forecastPortraitMode();
            else
                this.forecastLandscapeMode();
        }
    }
        
    this.buildForecastOverlay = function(w,h)
    {
        if (this.m_forecastOverlayPIXIGraphics != null)
            this.m_stage.removeChild(this.m_forecastOverlayPIXIGraphics);
        //if(this.m_contentArray["layer_on"] == true)
        {
            this.m_forecastOverlayPIXIGraphics = new PIXI.Graphics();
            var overlayColor  = "0x"+this.m_contentArray["forecast_overlay_color"].substring(this.m_contentArray["forecast_overlay_color"].indexOf("#")+1);
            this.m_forecastOverlayPIXIGraphics.beginFill(overlayColor);
            this.m_forecastOverlayPIXIGraphics.drawRect(0,this.m_height - h,w,h);
            this.m_forecastOverlayPIXIGraphics.endFill();
            this.m_forecastOverlayPIXIGraphics.alpha = this.m_contentArray["forecast_overlay_alpha"];
            this.m_stage.addChild(this.m_forecastOverlayPIXIGraphics);       
            this.m_forecastOverlayPIXIGraphics.position.x = 0;
            this.m_forecastOverlayPIXIGraphics.position.y = 0;
        }
    }
    
    this.forecastLandscapeMode = function()
    {
        this.getForecastWidth();
 
		
        var start_x = (this.m_width - this.m_contentArray["forecast_days"]*this.m_objInfo['forecast'].forecast_width)/2;
        var f_h = this.landscape_height*this.m_height/768;
        this.buildForecastOverlay(this.m_width, f_h);

        for(var i = 1;i<=5;i++)
        {
            var forecastItem = this.weatherObj.ForecastItems[i - 1];
            var f_x = start_x + (i-1)*this.m_objInfo['forecast'].forecast_width;
            var f_y = this.m_height - parseInt(this.landscape_height*this.m_height/768);

            var wordWrap = true;
            var strokeColor = "FFFFFF";
            var strokeThickness = 0;
            var dropShadow = false;
            var dropShadowColor = "000000";
            var day_text = "";
            if(i == 1)
                day_text = "TODAY";
            else
                day_text = forecastItem.Day;
            this["m_day"+i+"PIXIText"] = DacPixi.buildTextItem(day_text,this.m_contentArray["forecast_day_font"],this.m_contentArray["forecast_day_font_color"],this.m_contentArray["forecast_day_font_size"],"left",this.m_contentArray["forecast_day_italic"],this.m_contentArray["forecast_day_bold"],20,20,wordWrap, this.m_objInfo['forecast'].forecast_width - 20,strokeColor,strokeThickness, dropShadow, dropShadowColor);
            this["m_day"+i+"PIXIText"].x = f_x + 10 + (this.m_objInfo['forecast'].forecast_width - 20 - this["m_day"+i+"PIXIText"].width)/2;
            this["m_day"+i+"PIXIText"].y = f_y + 15;
            this.m_stage.addChild(this["m_day"+i+"PIXIText"] );
            if(i>this.m_contentArray["forecast_days"])
                this["m_day"+i+"PIXIText"].visible = false;

            var temp_text = "";
            if(this.m_contentArray["temp_unit"] == "C")
                temp_text = forecastItem.HighC + "° / "+forecastItem.LowC + "°";
            else
                temp_text = forecastItem.HighF + "° / "+forecastItem.LowF + "°";
            this["m_forecastTemp"+i+"PIXIText"]  = DacPixi.buildTextItem(temp_text,this.m_contentArray["forecast_temp_font"],this.m_contentArray["forecast_temp_font_color"],this.m_contentArray["forecast_temp_font_size"],"left",this.m_contentArray["forecast_temp_italic"],this.m_contentArray["forecast_temp_bold"],20,20,wordWrap, this.m_objInfo['forecast'].forecast_width - 20,strokeColor,strokeThickness, dropShadow, dropShadowColor);
            this["m_forecastTemp"+i+"PIXIText"].x = f_x + 10 + (this.m_objInfo['forecast'].forecast_width - 20 - this["m_forecastTemp"+i+"PIXIText"].width)/2;
            this["m_forecastTemp"+i+"PIXIText"].y = f_y + f_h - this["m_forecastTemp"+i+"PIXIText"].height - 25;
            this.m_stage.addChild(this["m_forecastTemp"+i+"PIXIText"]);
            if(i>this.m_contentArray["forecast_days"])
                this["m_forecastTemp"+i+"PIXIText"].visible = false;

            this["m_icon"+i+"Sprite"] = new Image();
            this["m_icon"+i+"Sprite"].name = i.toString();
            this["m_icon"+i+"Sprite"].style.position = "absolute";
            document.body.appendChild(this["m_icon"+i+"Sprite"]);
            //if (this.m_assetArray[this.m_assetIdPrefix+"forecast_icon"+i] != null)
            if(2==2)
            {
                var _this = this;
                if(i>this.m_contentArray["forecast_days"])
                    this["m_icon"+i+"Sprite"].style.visibility = "hidden";
                else
                {
                    this["m_icon"+i+"Sprite"].src = "Rain_Occasional.png"///this.m_assetArray[this.m_assetIdPrefix+"forecast_icon"+i];
                    this["m_icon"+i+"Sprite"].onload = function()
                    {
                        var i = parseInt(this.name);
                        adjustImg(i,"landscape",this)
                    }
                }
            }

            if (i < this.m_contentArray["forecast_days"])
            {

                this["m_seperator"+i+"PIXISprite"] = new PIXI.Sprite(PIXI.Texture.Draw(function (canvas) {
                    canvas.width = _this.m_width;//1000;   
                    canvas.height = _this.m_height;//1000;
                    var ctx = canvas.getContext('2d');  //get  canvas 2D context
                    var s_x = parseInt(f_x) + parseInt(_this.m_objInfo['forecast'].forecast_width) - 2;
                    ctx.rect(s_x, f_y, 2, f_h);

                    // create radial gradient

                    var grd = ctx.createRadialGradient(parseInt(f_x) + parseInt(_this.m_objInfo['forecast'].forecast_width) - 1, parseInt(f_y) + parseInt(f_h)/2, 1, parseInt(f_x) + parseInt(_this.m_objInfo['forecast'].forecast_width) - 1, parseInt(f_y) + parseInt(f_h)/2, parseInt(f_h)/2);

                    grd.addColorStop(0, "rgba(153,153,153,.9)"); 
                    grd.addColorStop(1, "rgba(153,153,153,0)");
                    //grd.addColorStop(0, "rgba(0,0,0,.9)"); 
                    //grd.addColorStop(1, "rgba(0,0,0,0)");
                    ctx.fillStyle = grd;
                    ctx.fill();
                }));

                this.m_stage.addChild(this["m_seperator"+i+"PIXISprite"]);
            }
        }
    }
    
    this.forecastPortraitMode = function()
    {
        this.getForecastHeight();

        var h = this.m_contentArray["forecast_days"]*this.m_objInfo['forecast'].forecast_height;
        this.buildForecastOverlay(this.m_width,h);

        var f_h = this.m_objInfo['forecast'].forecast_height;
        var start_y = this.m_height - this.m_contentArray["forecast_days"]*f_h;
		
        for(var i = 1;i<=5;i++)
        {
            var forecastItem = this.weatherObj.ForecastItems[i - 1];
            var f_x = 0;
            var f_y = this.m_height - f_h * (this.m_contentArray["forecast_days"] - (i - 1));

            var wordWrap = true;
            var strokeColor = "FFFFFF";
            var strokeThickness = 0;
            var dropShadow = false;
            var dropShadowColor = "000000";
            var day_text = "";
            if(i == 1)
                day_text = "TODAY";
            else
                day_text = forecastItem.Day;
            this["m_day"+i+"PIXIText"] = DacPixi.buildTextItem(day_text,this.m_contentArray["forecast_day_font"],this.m_contentArray["forecast_day_font_color"],this.m_contentArray["forecast_day_font_size"],"center",false,true,20,20,wordWrap, this.m_width / 3,strokeColor,strokeThickness, dropShadow, dropShadowColor);
            //this["m_day"+i+"PIXIText"].width = 220 * this.m_width / 1024;
            //this["m_day"+i+"PIXIText"].height = 90 * f_h / 110;
            this["m_day"+i+"PIXIText"].x = f_x + this.m_width / 3;
            this["m_day"+i+"PIXIText"].y = f_y + (this.m_objInfo['forecast'].forecast_height - this["m_day"+i+"PIXIText"].height)/2;
            this.m_stage.addChild(this["m_day"+i+"PIXIText"]);
            if (i>this.m_contentArray["forecast_days"])
                this["m_day"+i+"PIXIText"].visible = false;
			
            var temp_text = "";
            if(this.m_contentArray["temp_unit"] == "C")
                temp_text = forecastItem.HighC + "° / "+forecastItem.LowC + "°";
            else
                temp_text = forecastItem.HighF + "° / "+forecastItem.LowF + "°";
            this["m_forecastTemp"+i+"PIXIText"]  = DacPixi.buildTextItem(temp_text,this.m_contentArray["forecast_temp_font"],this.m_contentArray["forecast_temp_font_color"],this.m_contentArray["forecast_temp_font_size"],"left",false,true,20,20,wordWrap, this.m_width / 3,strokeColor,strokeThickness, dropShadow, dropShadowColor);
            var forecast_w = this.m_width - this.m_width/3 - 180 * this.m_width/1024 - 20;
            //this["m_forecastTemp"+i+"PIXIText"].height = 90 * f_h/110;
            this["m_forecastTemp"+i+"PIXIText"].x = f_x + this.m_width*2/3;//this["m_day"+i+"PIXIText"].x + this["m_day"+i+"PIXIText"].width + (forecast_w - this["m_forecastTemp"+i+"PIXIText"].width)/2;
            this["m_forecastTemp"+i+"PIXIText"].y = f_y + (this.m_objInfo['forecast'].forecast_height - this["m_day"+i+"PIXIText"].height)/2;
            this.m_stage.addChild(this["m_forecastTemp"+i+"PIXIText"]);
            if (i>this.m_contentArray["forecast_days"])
                this["m_forecastTemp"+i+"PIXIText"].visible = false;
			
            this["m_icon"+i+"Sprite"] = new Image();
            this["m_icon"+i+"Sprite"].name = i.toString();
            this["m_icon"+i+"Sprite"].style.position = "absolute";
            document.body.appendChild(this["m_icon"+i+"Sprite"]);
			//if (this.m_assetArray[this.m_assetIdPrefix+"forecast_icon"+i] != null)
            if(2==2)
            {
                var _this = this;
                if(i>this.m_contentArray["forecast_days"])
                    this["m_icon"+i+"Sprite"].style.visibility = "hidden";
                else
                {
                    this["m_icon"+i+"Sprite"].src = "Rain_Occasional.png"///this.m_assetArray[this.m_assetIdPrefix+"forecast_icon"+i];
                    this["m_icon"+i+"Sprite"].onload = function()
                    {
                        var i = parseInt(this.name);
                        adjustImg(i,"portrait",this)
                    }
                }
            }
			
            if(i < this.m_contentArray["forecast_days"])
            {
                this["m_seperator"+i+"PIXISprite"] = new PIXI.Sprite(PIXI.Texture.Draw(function (canvas) {
                    canvas.width = _this.m_width;//1000;   
                    canvas.height = _this.m_height;//1000;
                    var ctx = canvas.getContext('2d');  //get  canvas 2D context
                    var s_y = parseInt(f_y) + parseInt(f_h) - 2;
                    ctx.rect(0, s_y, _this.m_width, 2);

                    // create radial gradient

                    var grd = ctx.createRadialGradient(_this.m_width/2, s_y + 1, 1, _this.m_width/2, s_y + 1, _this.m_width/2);

                    grd.addColorStop(0, "rgba(153,153,153,.9)"); 
                    grd.addColorStop(1, "rgba(153,153,153,0)");
                    //grd.addColorStop(0, "rgba(0,0,0,.9)"); 
                    //grd.addColorStop(1, "rgba(0,0,0,0)");
                    ctx.fillStyle = grd;
                        ctx.fill();
                }));

                this.m_stage.addChild(this["m_seperator"+i+"PIXISprite"]);
            }
        }
    }
    
    function adjustImg(i,mode,icon)
    {
        icon.style.visibility="visible";
        switch(mode)
        {
            case "landscape":
            {
                var start_x = (_this.m_width - _this.m_contentArray["forecast_days"]*_this.m_objInfo['forecast'].forecast_width)/2;
                var forecastHeight = _this.landscape_height*_this.m_height/768;
                var actualX = start_x + (i-1)*_this.m_objInfo['forecast'].forecast_width;
                var actualY = _this.m_height - parseInt(_this.landscape_height*_this.m_height/768);
                var day_txt = _this["m_day"+i+"PIXIText"];
                var forecast_txt = _this["m_forecastTemp"+i+"PIXIText"];
                var imageWidth = _this.m_objInfo['forecast'].forecast_width - 20 * _this.m_width/1024;
                var imageHeight = (forecast_txt.y - day_txt.y - day_txt.height) - 20 *_this.m_height/768;
                icon.width = Math.min(imageWidth,imageHeight) * _this.layoutScale;
                var icon_x = actualX + _this.m_objInfo['forecast'].forecast_width/2;
                var icon_y = day_txt.y + day_txt.height + (forecast_txt.y - day_txt.y - day_txt.height)/2;
                icon.style.top = (icon_y * _this.layoutScale - icon.height/2);
                icon.style.left = (icon_x * _this.layoutScale - icon.width/2);
                //console.log(f3 + "  " + f4 + "  " + "  " + icon.height + "  " +icon_y)
                break;
            }
            case "portrait":
            {
                var rowHeight = _this.m_objInfo['forecast'].forecast_height; // 80
                var actualX = 0; // 0
                var actualY = _this.m_height - rowHeight * (_this.m_contentArray["forecast_days"] - (i - 1)); // i = 1, 768-320=448
                var day_txt = _this["m_day"+i+"PIXIText"];
                var imageHeight = rowHeight * 0.8; // 64

                var scaleRowY = (actualY + 0.08 * rowHeight) * _this.layoutScale;
                var scaleRowHeight = rowHeight * _this.layoutScale;

                icon.height = imageHeight * _this.layoutScale;
                icon.style.top = scaleRowY + (scaleRowHeight - icon.height) / 2;
                icon.style.left = day_txt.x * _this.layoutScale / 2 - icon.width / 2;
                break;
            }
        }
    }
	
    PIXI.Texture.Draw = function (cb) {
        var canvas = document.createElement('canvas');
        if (typeof cb == 'function') cb(canvas);
        return PIXI.Texture.fromCanvas(canvas);
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
	
    this.updateWeather = function()
    {
        this.readWeather();
        if (this.weatherObj!=null)
        {
            this.rebuildCurrentTemp();
            this.rebuildCurrentIcon();
            this.rebuildForecast();
        }
    }
        
    this.rebuildCurrentTemp = function()
    { 
        var currentTemp = this.weatherObj.CurrentTempF+"°F";
        if(this.m_contentArray["temp_unit"] == "C")
            currentTemp = this.weatherObj.CurrentTempC+"°C";

        this.m_currentTempPIXIText.text = currentTemp;
        this.setTextStyle(this.m_currentTempPIXIText,"current_temp");
        this.m_currentTempPIXIText.x = this.m_width/2 + 10;
        if (this.m_height / this.m_width > 1.2)
            this.m_currentTempPIXIText.y = 180 * this.m_height / 768;
        else
            this.m_currentTempPIXIText.y = 130 * this.m_height / 768;
    }
        
    this.rebuildCurrentIcon = function()
    {
        this.m_currentConditionSprite.src = "";
        //if(this.m_assetArray[this.m_assetIdPrefix+"current_icon"]!=null)
        if(2==2)
        {
            this.m_currentConditionSprite.src = "Cloudy_Partly_Hail.png";
            this.m_currentConditionSprite.onload= function() {
                _this.adjustCurrentIcon(this);
            }
            this.m_currentConditionSprite.style.left = (this.m_width/2 - 300 * Math.min(this.m_width/1024,this.m_height/768) - 10) * this.layoutScale;
            if(this.m_height / this.m_width > 1.2)
                this.m_currentConditionSprite.style.top = 150 * this.m_height / 768 * this.layoutScale;
            else
                this.m_currentConditionSprite.style.top = 100 * this.m_height / 768 * this.layoutScale;
        }
    }
        
    this.rebuildForecastOverlay = function(w,h)
    {
        DacPixi.redrawRectangle(this.m_forecastOverlayPIXIGraphics,0,this.m_height - h,w,h,this.m_contentArray["forecast_overlay_color"],this.m_contentArray["forecast_overlay_alpha"]);
    }

    this.rebuildForecast = function()
    {
        if(this.weatherObj != null)
        {
            if(this.m_height > this.m_width * 1.2)
                this.updateForecastPortraitMode();
            else
                this.updateForecastLandscapeMode();
        }
    }
        
    this.updateForecastLandscapeMode = function()
    {
        this.getForecastWidth();

        var start_x = (this.m_width - this.m_contentArray["forecast_days"]*this.m_objInfo['forecast'].forecast_width)/2;
        var f_h = this.landscape_height*this.m_height/768;
        this.rebuildForecastOverlay(this.m_width, f_h);

        for(var m = 1;m<=5;m++)
        {
            if(this["m_seperator"+m+"PIXISprite"]!=null)
                this.m_stage.removeChild(this["m_seperator"+m+"PIXISprite"]);
        }
        for(var i = 1;i<=5;i++)
        {
            if(i>this.m_contentArray["forecast_days"])
            {
                this["m_day"+i+"PIXIText"].visible = false;
                this["m_forecastTemp"+i+"PIXIText"].visible = false;
                this["m_icon"+i+"Sprite"].style.visibility = "hidden";
            }
            else
            {
                var forecastItem = this.weatherObj.ForecastItems[i - 1];
                var f_x = start_x + (i-1)*this.m_objInfo['forecast'].forecast_width;
                var f_y = this.m_height - f_h;

                var day_text = "";
                if(i == 1)
                        day_text = "TODAY";
                else
                        day_text = forecastItem.Day;
                this["m_day"+i+"PIXIText"].text = day_text;
                this.setTextStyle(this["m_day"+i+"PIXIText"],"forecast_day");
                this["m_day"+i+"PIXIText"].x = f_x + 10 + (this.m_objInfo['forecast'].forecast_width - 20 - this["m_day"+i+"PIXIText"].width)/2;
                this["m_day"+i+"PIXIText"].y = f_y + 5;
                this["m_day"+i+"PIXIText"].visible = true;

                var temp_text = "";
                if(this.m_contentArray["temp_unit"] == "C")
                        temp_text = forecastItem.HighC + "° / "+forecastItem.LowC + "°";
                else
                        temp_text = forecastItem.HighF + "° / "+forecastItem.LowF + "°";
                this["m_forecastTemp"+i+"PIXIText"].text = temp_text;
                this.setTextStyle(this["m_forecastTemp"+i+"PIXIText"],"forecast_temp");
                this["m_forecastTemp"+i+"PIXIText"].x = f_x + 10 + (this.m_objInfo['forecast'].forecast_width - 20 - this["m_forecastTemp"+i+"PIXIText"].width)/2;
                this["m_forecastTemp"+i+"PIXIText"].y = f_y + f_h - this["m_forecastTemp"+i+"PIXIText"].height - 20;
                this["m_forecastTemp"+i+"PIXIText"].visible = true;

                //if (this.m_assetArray[this.m_assetIdPrefix+"forecast_icon"+i] != null)
                if(2==2)
                {
                    this["m_icon"+i+"Sprite"].src = "";
                    this["m_icon"+i+"Sprite"].src = "Cloudy_Partly_Hail.png"
                    this["m_icon"+i+"Sprite"].onload = function()
                    {
                        var i = parseInt(this.name);
                        adjustImg(i,"landscape",this);
                    }
                }
                if(i != this.m_contentArray["forecast_days"])
                {
                    this["m_seperator"+i+"PIXISprite"] = new PIXI.Sprite(PIXI.Texture.Draw(function (canvas) {
                        canvas.width = _this.m_width;//1000;   
                        canvas.height = _this.m_height;//1000;
                        var ctx = canvas.getContext('2d');  //get  canvas 2D context
                        var s_x = parseInt(f_x) + parseInt(_this.m_objInfo['forecast'].forecast_width) - 2;
                        ctx.rect(s_x, f_y, 2, f_h);

                        //console.log(s_x+" "+f_y+" "+" "+f_h)

                        // create radial gradient

                        var grd = ctx.createRadialGradient(parseInt(f_x) + parseInt(_this.m_objInfo['forecast'].forecast_width) - 1, parseInt(f_y) + parseInt(f_h)/2, 1, parseInt(f_x) + parseInt(_this.m_objInfo['forecast'].forecast_width) - 1, parseInt(f_y) + parseInt(f_h)/2, parseInt(f_h)/2);

                        grd.addColorStop(0, "rgba(153,153,153,.9)"); 
                        grd.addColorStop(1, "rgba(153,153,153,0)");
                        //grd.addColorStop(0, "rgba(0,0,0,.9)"); 
                        //grd.addColorStop(1, "rgba(0,0,0,0)");
                        ctx.fillStyle = grd;
                        ctx.fill();
                    }));

                    this.m_stage.addChild(this["m_seperator"+i+"PIXISprite"]);
                }

            }
        }
    }
        
    this.updateForecastPortraitMode = function()
    {
        this.getForecastHeight();

        var h = this.m_contentArray["forecast_days"]*this.m_objInfo['forecast'].forecast_height;
        this.rebuildForecastOverlay(this.m_width,h);

        var f_h = this.m_objInfo['forecast'].forecast_height;
        var start_y = this.m_height - this.m_contentArray["forecast_days"]*f_h;

        for(var m = 1;m<=5;m++)
        {
            if  (this["m_seperator"+m+"PIXISprite"]!=null)
                this.m_stage.removeChild(this["m_seperator"+m+"PIXISprite"]);
        }
            
        for (var i = 1;i<=5;i++)
        {
            if(i>this.m_contentArray["forecast_days"])
            {
                this["m_day"+i+"PIXIText"].visible = false;
                this["m_forecastTemp"+i+"PIXIText"].visible = false;
                this["m_icon"+i+"Sprite"].style.visibility = "hidden";
            }
            else
            {
                var forecastItem = this.weatherObj.ForecastItems[i - 1];
                var f_x = 0;
                var f_y = this.m_height - f_h * (this.m_contentArray["forecast_days"] - (i - 1));

                var day_text = "";
                if(i == 1)
                        day_text = "TODAY";
                else
                        day_text = forecastItem.Day;
                this["m_day"+i+"PIXIText"].text = day_text;
                this.setTextStyle(this["m_day"+i+"PIXIText"],"forecast_day");
                this["m_day"+i+"PIXIText"].x = f_x + this.m_width / 3;
                this["m_day"+i+"PIXIText"].y = f_y + (this.m_objInfo['forecast'].forecast_height - this["m_day"+i+"PIXIText"].height)/2;
                this["m_day"+i+"PIXIText"].visible = true;

                var temp_text = "";
                if(this.m_contentArray["temp_unit"] == "C")
                    temp_text = forecastItem.HighC + "° / "+forecastItem.LowC + "°";
                else
                    temp_text = forecastItem.HighF + "° / "+forecastItem.LowF + "°";
                this["m_forecastTemp"+i+"PIXIText"].text = temp_text;
                this.setTextStyle(this["m_forecastTemp"+i+"PIXIText"],"forecast_temp");
                var forecast_w = this.m_width - this.m_width/3 - 180 * this.m_width/1024 - 20;
                this["m_forecastTemp"+i+"PIXIText"].x = f_x + this.m_width*2/3;//this["m_day"+i+"PIXIText"].x + this["m_day"+i+"PIXIText"].width + (forecast_w - this["m_forecastTemp"+i+"PIXIText"].width)/2;
                this["m_forecastTemp"+i+"PIXIText"].y = f_y + (this.m_objInfo['forecast'].forecast_height - this["m_day"+i+"PIXIText"].height)/2;
                this["m_forecastTemp"+i+"PIXIText"].visible = true;


                //if (this.m_assetArray[this.m_assetIdPrefix+"forecast_icon"+i] != null)
                if(2==2)
                {
                    this["m_icon"+i+"Sprite"].src = "";
                    this["m_icon"+i+"Sprite"].src = "Cloudy_Partly_Hail.png"///this.m_assetArray[this.m_assetIdPrefix+"forecast_icon"+i];
                    this["m_icon"+i+"Sprite"].onload = function()
                    {
                        var i = parseInt(this.name);
                        adjustImg(i,"portrait",this);
                    }
                }

                if(i != this.m_contentArray["forecast_days"])
                {
                    this["m_seperator"+i+"PIXISprite"] = new PIXI.Sprite(PIXI.Texture.Draw(function (canvas) {
                        canvas.width = _this.m_width;//1000;   
                        canvas.height = _this.m_height;//1000;
                        var ctx = canvas.getContext('2d');  //get  canvas 2D context
                        var s_y = parseInt(f_y) + parseInt(f_h) - 2;
                        ctx.rect(0, s_y, _this.m_width, 2);

                        // create radial gradient

                        var grd = ctx.createRadialGradient(_this.m_width/2, s_y + 1, 1, _this.m_width/2, s_y + 1, _this.m_width/2);

                        grd.addColorStop(0, "rgba(153,153,153,.9)"); 
                        grd.addColorStop(1, "rgba(153,153,153,0)");
                        //grd.addColorStop(0, "rgba(0,0,0,.9)"); 
                        //grd.addColorStop(1, "rgba(0,0,0,0)");
                        ctx.fillStyle = grd;
                        ctx.fill();
                    }));

                    this.m_stage.addChild(this["m_seperator"+i+"PIXISprite"]);
                }
            }
        }
    }
 
    this.playTemplate = function()
    {
        console.log("[template_weather]playTemplate isPlaying="+this.m_isPlaying+"  isLoading="+this.m_isLoading);

        //this.intervalId=setInterval("refresh()",100);
        console.log("start")

        //PIXI模块刷新必备
        this.animate();
        //this.refresh();
        this.m_renderer.render(this.m_stage);
    } 
	
    this.animate = function() 
    {
        requestAnimationFrame(animate);
        //this.m_dacPixi.moveFallingObjects(this.m_width, this.m_height);
        this.m_renderer.render(this.m_stage);	 
    } 
	
    this.refresh = function()
    {
    }
	
    //util
    this.convertDatetoWeek = function(date_str)
    {
        var date = new Date();
        var date_string = date_str.substring(0,10);
        date.setFullYear(parseInt(date_string.substring(0,4)));
        date.setMonth(parseInt(date_string.substring(5,7)) - 1);
        date.setDate(parseInt(date_string.substring(8,10)));
        var week = "";
        switch(date.getDay())
        {
            case 1:
                week = "MON";
                break;
            case 2:
                week = "TUE";
                break;
            case 3:
                week = "WED";
                break;
            case 4:
                week = "THU";
                break;
            case 5:
                week = "FRI";
                break;
            case 6:
                week = "SAT";
                break;
            case 0:
                week = "SUN";
                break;
        }
        return week;
    }
	
    this.clearForecast = function()
    {
        for(i = 1;i<=5;i++)
        {
            if(this["m_day"+i+"PIXIText"]!=null)
            {
                this.m_stage.removeChild(this["m_day"+i+"PIXIText"]);
            }
            if(this["m_forecastTemp"+i+"PIXIText"]!=null)
            {
                this.m_stage.removeChild(this["m_forecastTemp"+i+"PIXIText"]);
            }
            if(this["m_icon"+i+"PIXISprite"]!=null)
            {
                this.m_stage.removeChild(this["m_icon"+i+"PIXISprite"]);
            }
            if(this["m_seperator"+i+"PIXISprite"]!=null)
            {
                this.m_stage.removeChild(this["m_seperator"+i+"PIXISprite"]);
            }
        }
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
        this.m_feedArray = fullWidget["feed"];

        console.log("initEditView  this.m_contentArray="+JSON.stringify(this.m_contentArray));

        this.m_assetArray = fullWidget.widgetAsset;
        console.log("[template_announcement]initEditView wid="+this.m_wid);
        this.initTemplateFields();
        this.initTemplateUI();
        //this.buildResizeImageIcon();
        //this.buildOverlayResizeHandles();
        this.playTemplate();
    }


    this.resizeEditView = function(fullWidget)
    {
        this.m_playmode="editor";
        this.m_zone_size_changed = 0;

        this.m_fullWidget = fullWidget;
        this.m_wid = fullWidget.wid
        this.m_assetIdPrefix = "w"+this.m_wid+"-"+this.m_templateName+"-";
        this.m_contentArray = fullWidget["widget"]["dac_widget"]["content"];
        this.m_feedArray = fullWidget["feed"];

        //console.log("initEditView  this.m_contentArray="+JSON.stringify(this.m_contentArray));

        this.m_assetArray = fullWidget.widgetAsset;
        console.log("[template_announcement]initEditView wid="+this.m_wid);
        this.initTemplateFields();
        this.initTemplateUI();
        //this.buildResizeImageIcon();
        //this.buildOverlayResizeHandles();
        this.playTemplate();
    }

    this.updateEditView = function(fullWidget)
    {
        this.m_zone_size_changed = 0;

        this.m_playmode="editor";
        this.m_fullWidget = fullWidget;
        this.m_wid = fullWidget.wid;
		
        this.m_zone_width = this.m_contentArray["zone_width"];
        this.m_zone_height = this.m_contentArray["zone_height"];
        this.m_width = this.m_zone_width;
        this.m_height = this.m_zone_height;
        this.layoutScale = document.body.clientWidth / this.m_width;

        this.m_contentArray = fullWidget["widget"]["dac_widget"]["content"];
        this.m_assetArray = fullWidget.widgetAsset;
        this.m_feedArray = fullWidget["feed"];
        //alert("updateEditView "+ JSON.stringify(this.m_contentArray));


        this.setTextItem(this.m_locationPIXIText,"location_name");
        this.m_locationPIXIText.x = 20 + (this.m_width - 40 - this.m_locationPIXIText.width)/2;
        this.m_locationPIXIText.y = 17;
        
        this.setTextStyle(this.m_sponsorPIXIText,"sponsor");
        this.updateWeather();
        /*this.setTextStyle(this.m_currentTempPIXIText,"current_temp");
        for(var i = 1;i<=5;i++)
        {
                this.setTextStyle(this["m_day"+i+"PIXIText"],"forecast_day");
                this.setTextStyle(this["m_day"+i+"PIXIText"],"forecast_temp");
        }*/

        //alert(this.m_contentArray["background_color"])
        ///DacPixi.redrawRectangle(this.m_backgroundPIXIGraphics,0,0,this.m_contentArray["zone_width"],this.m_contentArray["zone_height"],this.m_contentArray["background_color"],1);

        //setLayerColor
        //alert(this.m_width+"  "+this.m_locationPIXIText.height+"   "+this.m_contentArray["location_overlay_color"]+"  "+this.m_contentArray["location_overlay_alpha"]);
        DacPixi.redrawRectangle(this.m_locationOverlayPIXIGraphics,0,0,this.m_width,this.m_locationPIXIText.height + 40,this.m_contentArray["location_overlay_color"],this.m_contentArray["location_overlay_alpha"]);

        TemplateBase.prototype.rebuildWidgetBackground.call(this);
        TemplateBase.prototype.buildQRCode.call(_this,_this.m_contentArray['qr_text'],_this.m_contentArray['qr_size'], _this.m_contentArray['qr_color'], _this.m_contentArray['qr_x'],_this.m_contentArray['qr_y'])
 
    }
        
    this.updateEditorVariable = function(name,value){
        this.m_fullWidget.widget.dac_widget.content[name] = value;
        this.m_contentArray[name] = value;
        parent.updateEditorContent(this.m_fullWidget);
    }
}

TemplateWeather.prototype = Object.create(TemplateBase.prototype);