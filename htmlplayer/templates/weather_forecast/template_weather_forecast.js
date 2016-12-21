function TemplateWeatherForecast(debug) {
    TemplateBase.call(this);
    var _this = this;
    this.m_templateName = "weather_forecast"; 
    this.m_dacPixi = new DacPixi(1);

// define content field array and asset array
    this.m_fullWidget = null;
    this.m_contentArray = null; //	this.variableArray = new Array();
    this.m_assetArray = null;
    this.m_feedArray = null;

    this.m_widgetBackground = new WidgetBackground();
    
    this.weatherObj = null;

    this.m_stage = null;
    this.m_renderer = null;
    this.m_objPixi = {};
    this.m_locationContainer = new PIXI.Container(); // location name and datetime
    this.m_currentContainer = new PIXI.Container();  // icon, temp, text
    this.m_forecastContainer = new PIXI.Container(); // all days
    this.m_forecastDayContainerArray = []; //each element is one day
    
    this.m_objInfo = {};
    this.m_stageRatio = 1.2;
  
    this.m_field_feed_logo = "../../templates/weather_forecast/media/accuweather.png";  

    /////////*** init template fields***/////////
    this.initTemplateFields = function()
    {

        console.log("[template_"+this.m_templateName+"]initTemplateFields ... ");
        //console.log("[template_"+this.m_templateName+"]m_contentArray"+JSON.stringify(this.m_contentArray));
        
        this.m_width = window.innerWidth; 
        this.m_height = window.innerHeight; 

        this.m_zone_width = this.m_contentArray["zone_width"];
        this.m_zone_height = this.m_contentArray["zone_height"];

        this.determineObjInfo();

        TemplateBase.prototype.initCommonTemplateFields.call(this);

    }
    
    
    this.determineObjInfo = function()
    {
        this.m_stageRatio = this.m_width/this.m_height;

        this.m_objInfo['location_name'] = {};
        this.m_objInfo['current_temp'] = {};
        this.m_objInfo['current_icon'] = {};
        this.m_objInfo['forecast_overlay'] = {};
        this.m_objInfo['forecast'] = {};

        
        this.m_objInfo['feed_logo'] = {};

        
        if (this.m_stageRatio >=5.0) //landscape bar
        {
            this.m_objInfo['feed_logo'].h = 0.9 * this.m_height;
            this.m_objInfo['feed_logo'].w = 1.33 * this.m_objInfo['feed_logo'].h ;
            this.m_objInfo['feed_logo'].y = 0.04 * this.m_height;
            this.m_objInfo['feed_logo'].x = this.m_width - this.m_objInfo['feed_logo'].y - this.m_objInfo['feed_logo'].w;
            this.m_objInfo['location_name'].font_size = this.m_objInfo['feed_logo'].h *0.2;

        }
        else if (this.m_stageRatio >= 2 && this.m_stageRatio < 5.0) // long landspace
        {
            this.m_objInfo['feed_logo'].w = 0.2 * this.m_height;
            this.m_objInfo['feed_logo'].h = 0.75 * this.m_objInfo['feed_logo'].w ;
            this.m_objInfo['feed_logo'].y = 0.0185 * this.m_height;
            this.m_objInfo['feed_logo'].x = this.m_width - this.m_objInfo['feed_logo'].y - this.m_objInfo['feed_logo'].w;
            this.m_objInfo['location_name'].font_size = this.m_objInfo['feed_logo'].h *0.4; 

        }
        else if (this.m_stageRatio >= 0.8 && this.m_stageRatio < 2) //landscape -> square -> fat portrait
        {
            this.m_objInfo['feed_logo'].w = 0.2 * this.m_height;
            this.m_objInfo['feed_logo'].h = 0.75 * this.m_objInfo['feed_logo'].w ;
            this.m_objInfo['feed_logo'].y = 0.0185 * this.m_height;
            this.m_objInfo['feed_logo'].x = this.m_width - this.m_objInfo['feed_logo'].y - this.m_objInfo['feed_logo'].w;
            this.m_objInfo['location_name'].font_size = this.m_objInfo['feed_logo'].h *0.4;
        }     
        else if (this.m_stageRatio >= 0.3 && this.m_stageRatio < 0.8) //portrait -> tall portrait
        {
            this.m_objInfo['feed_logo'].w = 0.2 * this.m_width;  //use width
            this.m_objInfo['feed_logo'].h = 0.75 * this.m_objInfo['feed_logo'].w ;
            this.m_objInfo['feed_logo'].y = 0.0185 * this.m_height;
            this.m_objInfo['feed_logo'].x = this.m_width - this.m_objInfo['feed_logo'].y - this.m_objInfo['feed_logo'].w;
            this.m_objInfo['location_name'].font_size = this.m_objInfo['feed_logo'].h *0.4;
        }
        else if (this.m_stageRatio < 0.3) //portrait bar
        {
            this.m_objInfo['feed_logo'].w = 0.25 * this.m_width;  //use width
            this.m_objInfo['feed_logo'].h = 0.75 * this.m_objInfo['feed_logo'].w ;
            //this.m_objInfo['feed_logo'].y = this.m_height - this.m_objInfo['feed_logo'].h - 0.01 * this.m_height;
            this.m_objInfo['feed_logo'].y = 0.01 * this.m_height;
            //this.m_objInfo['feed_logo'].x = 0.05 * this.m_width;
            this.m_objInfo['feed_logo'].x = this.m_width - this.m_objInfo['feed_logo'].y*0.05 - this.m_objInfo['feed_logo'].w;
            this.m_objInfo['location_name'].font_size = this.m_width *0.1;
        }
        else
        { // won't be here
            this.m_objInfo['feed_logo'].w = 0.2 * this.m_width;  //use width
            this.m_objInfo['feed_logo'].h = 0.75 * this.m_objInfo['feed_logo'].w ;
            this.m_objInfo['feed_logo'].y = 0.0185 * this.m_height;
            this.m_objInfo['feed_logo'].x = this.m_width - this.m_objInfo['feed_logo'].y - this.m_objInfo['feed_logo'].w;
            this.m_objInfo['location_name'].font_size = this.m_objInfo['feed_logo'].h *0.4;

        }
        
        this.m_objInfo['forecast'].width = this.m_width - this.m_objInfo['location_name'].font_size *0.2;
        this.m_objInfo['forecast'].x = this.m_objInfo['location_name'].font_size *0.1;
       // console.log("[template_"+this.m_templateName+"]determineObjInfo weather font size="+this.m_objInfo['current_temp'].font_size);

    }


     ///////// *** init template UI *** /////////
    this.initTemplateUI = function()
    {
        console.log("[template_"+this.m_templateName+"]initTemplateUI ... m_width="+this.m_width+" m_height="+this.m_height);
	//init transparent pixi stage
        canvasNode = document.createElement("canvas");
        canvasNode.setAttribute("id", "pixiCanvas");
        canvasNode.style.property= "position:absolute;top:0px;";
        document.body.appendChild(canvasNode);
        // create a renderer instance
        this.m_renderer = PIXI.autoDetectRenderer(this.m_width,this.m_height, {transparent: true,view:pixiCanvas});
        this.m_renderer.view.style.display = "block";
        this.m_renderer.view.style.width = "100%";
        this.m_renderer.view.style.height = "100%";
        this.m_renderer.view.style.position = "absolute";
        this.m_renderer.view.style.top = "0px";
        // add the renderer view element to the DOM
        document.body.appendChild(this.m_renderer.view);

        this.m_stage = new PIXI.Container();
	//Use standard widget background
        TemplateBase.prototype.buildWidgetBackground.call(this);
        this.readWeather();
        if(this.weatherObj!=null)
        {
            var update = false;
            
            if (this.m_stageRatio > 5.0) //landscape bar
            {
                this.buildLocationDatetimeContainer(update);

                this.buildForecastContainer(update);
                this.buildFeedLogo();
            }
            else
            {
                this.buildLocationDatetimeContainer(update);
                this.buildCurrentContainer(update);
                this.buildForecastContainer(update);
                this.buildFeedLogo();
            }
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
            this.weatherObj.CurrentWeatherText = feedObj.feed_items.current_weather.WeatherText;
            //alert(this.weatherObj.CurrentTempF);
            this.weatherObj.CurrentTempC = feedObj.feed_items.current_weather.Temperature.Metric.Value;
            this.weatherObj.CurrentIcon = feedObj.feed_items.current_weather.WeatherIcon;
            //if (this.weatherObj.CurrentIcon.toString().length == 1)
            //    this.weatherObj.CurrentIcon = "0"+this.weatherObj.CurrentIcon.toString();
            //else
                //this.weatherObj.CurrentIcon = this.weatherObj.CurrentIcon.toString();

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

                this.weatherObj.ForecastItems.push(item);
            }
        }
    }
    
    this.buildFeedLogo = function()
    {
        if (this.m_field_feed_logo != null)
        {
            if (this.m_playmode === "editor") 
                this.m_field_feed_logo = "../../htmlplayer/templates/weather_forecast/media/accuweather.png";
            //alert(this.m_field_feed_logo);
            //console.log("[template_"+this.m_templateName+"] buildFeedLogo playmode="+this.m_playmode +" feed_logo="+this.m_field_feed_logo);
            this.m_objPixi['feed_logo'] = PIXI.Sprite.fromImage(this.m_field_feed_logo);
            if (this.m_objPixi['feed_logo'] != null)
            {
                this.m_stage.addChild(this.m_objPixi['feed_logo']);
                this.m_objPixi['feed_logo'].width = this.m_objInfo['feed_logo'].w;
                this.m_objPixi['feed_logo'].height = this.m_objInfo['feed_logo'].h;
                //this.m_objPixi['feed_logo'].anchor.x = 0.5;
                //this.m_objPixi['feed_logo'].anchor.y = 0.5;

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

            }
        }

    }


    this.buildLocationDatetimeContainer = function(update)
    {
        var curDatetime = this.getCurrentDateTime();
        
        var wordWrap = true;
        var strokeColor = "FFFFFF";
        var strokeThickness = 0;
        var dropShadow = false
        var dropShadowColor = "000000"; 
        var locationStr = this.m_contentArray["location_name"];
        var wordWrapWidth = this.m_width - 40;

        this.m_contentArray["location_name_font_size"] = this.m_objInfo['location_name'].font_size;
        
        this.m_objPixi['location_name'] = DacPixi.rebuildTextItem(this.m_objPixi['location_name'],locationStr,this.m_contentArray["location_name_font"],this.m_contentArray["location_name_font_color"],this.m_objInfo['location_name'].font_size,"left",this.m_contentArray["location_name_italic"],this.m_contentArray["location_name_bold"],20,20,wordWrap, wordWrapWidth,strokeColor,strokeThickness, dropShadow, dropShadowColor);

        this.m_objPixi['location_name'].x = this.m_objInfo['location_name'].font_size *0.2 ;
        this.m_objPixi['location_name'].y = this.m_objPixi['location_name'].x *1.8;

        //datetime
        var bold = false;
        this.m_contentArray["datetime_font_size"] = this.m_objInfo['location_name'].font_size *0.8;

        this.m_objPixi['datetime'] = DacPixi.rebuildTextItem(this.m_objPixi['datetime'],curDatetime,this.m_contentArray["datetime_font"],this.m_contentArray["datetime_font_color"],this.m_contentArray["datetime_font_size"],"left",this.m_contentArray["datetime_italic"],this.m_contentArray["datetime_bold"],20,20,wordWrap, this.m_width - 40,strokeColor,strokeThickness, dropShadow, dropShadowColor);
//this.m_objPixi['datetime'].x = this.m_objInfo['location_name'].font_size *0.8 + this.m_objPixi['location_name'].width;
//this.m_objPixi['datetime'].y = this.m_objPixi['location_name'].x *1.8 + this.m_objPixi['location_name'].height - this.m_objPixi['datetime'].height;

        if (this.m_stageRatio > 4 && this.m_stageRatio < 5.0)
        {
            this.m_objPixi['datetime'].x = this.m_objPixi['location_name'].x +  this.m_objPixi['location_name'].width*1.1;
            this.m_objPixi['datetime'].y = this.m_objPixi['location_name'].y*1.3;
        }
        else if (this.m_stageRatio >= 5.0)
        {
            this.m_objPixi['datetime'].x = this.m_objPixi['location_name'].x;
            this.m_objPixi['datetime'].y = this.m_objPixi['location_name'].y + this.m_objPixi['location_name'].height*1.1;
        }
        else
        {
            this.m_objPixi['datetime'].x = this.m_objPixi['location_name'].x;
            this.m_objPixi['datetime'].y = this.m_objPixi['location_name'].y + this.m_objPixi['location_name'].height*1.1;
        }
        
        // overlay
        if (update == false)
            this.m_objPixi['location_overlay'] = new PIXI.Graphics();
        else
            this.m_objPixi['location_overlay'].clear();
        var overlayColor  = "0x"+this.m_contentArray["location_overlay_color"].substring(this.m_contentArray["location_overlay_color"].indexOf("#")+1);
        
        var overlayWidth,overlayHeight,overlayPosY; 
        if (this.m_stageRatio > 4 && this.m_stageRatio < 5.0)
        {
            overlayWidth = (this.m_objPixi['location_name'].width + this.m_objPixi['datetime'].width)*1.2;
            overlayHeight =  this.m_objPixi['location_name'].height*1.2;
            overlayPosY =  this.m_objPixi['location_name'].y*0.9;
        }
        else if (this.m_stageRatio >= 5.0)
        {
            overlayWidth = this.m_objPixi['location_name'].width >= this.m_objPixi['datetime'].width ? this.m_objPixi['location_name'].width : this.m_objPixi['datetime'].width;
            overlayWidth += this.m_objPixi['location_name'].x*3;

            overlayHeight =  this.m_objPixi['location_name'].height + this.m_objPixi['datetime'].height*1.2;
            overlayHeight *= 1.1;
            overlayPosY =  this.m_objPixi['location_name'].y*0.5;
        }
        else
        {
            overlayWidth = this.m_objPixi['location_name'].width >= this.m_objPixi['datetime'].width ? this.m_objPixi['location_name'].width : this.m_objPixi['datetime'].width;
            overlayWidth += this.m_objPixi['location_name'].x*3;

            overlayHeight =  this.m_objPixi['location_name'].height + this.m_objPixi['datetime'].height*1.2;
            overlayHeight *= 1.1;
            overlayPosY =  this.m_objPixi['location_name'].y*0.9;          
        }
        
        

        console.log("[template_"+this.m_templateName+"]###overlayWidth="+overlayWidth+" loc width="+this.m_objPixi['location_name'].width)

        this.m_objPixi['location_overlay'].beginFill(overlayColor);
        radius = 6;
        this.m_objPixi['location_overlay'].drawRoundedRect(0,0,overlayWidth,overlayHeight, radius);
        this.m_objPixi['location_overlay'].endFill();
        this.m_objPixi['location_overlay'].alpha = this.m_contentArray["location_overlay_alpha"];
        
        //alert(this.m_contentArray["location_overlay_alpha"]);
     

        this.m_objPixi['location_overlay'].position.x = -3;
        this.m_objPixi['location_overlay'].position.y = overlayPosY;
        
        if (update == false) 
        {
            this.m_locationConaitiner = new PIXI.Container();
            this.m_locationConaitiner.addChild(this.m_objPixi['location_overlay']); 
            this.m_locationConaitiner.addChild(this.m_objPixi['location_name']);
            this.m_locationConaitiner.addChild(this.m_objPixi['datetime']);


            this.m_stage.addChild(this.m_locationConaitiner);
        }
        
        //alert("curDatetime="+curDatetime+" this.m_objPixi['location_overlay'].width="+this.m_objPixi['location_overlay'].width+"...this.m_objPixi['location_overlay'].height="+this.m_objPixi['location_overlay'].height);
        //alert("curDatetime="+curDatetime+" this.m_locationConaitiner.width="+this.m_locationConaitiner.width+"...this.m_locationConaitiner.height="+this.m_locationConaitiner.height);
        

    }
    
    this.getCurrentDateTime = function() //mm/dd hh:mm
    {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();

        month = month<10 ? "0" + month : month;
        day = day<10 ? "0" + day : day;
        
        min = min<10 ? "0"+ min : min;
        sec = sec<10 ? "0"+ sec : sec;
        
        var ampm = hour >= 12 ? 'pm' : 'am';
        console.log("[template_"+this.m_templateName+"]datetime="+this.m_contentArray["datetime_format"]);
        if (this.m_contentArray["datetime_format"] == null) this.m_contentArray["datetime_format"]= "mm/dd h12:mi";
        
        if (this.m_contentArray["datetime_format"]== "mm/dd h12:mi")
        {
            if (hour >12) hour = hour - 12;
        }
        else
        {
            ampm = "";
        }
        //hour = hour<10 ? "0"+ hour : hour;
        var currentDateTime =  month + "/" + day+" "+ hour + ":" + min + " " + ampm;
        
        return currentDateTime;

    }
    
    this.buildCurrentContainer = function(update)
    {
        var currentIcon = "/ds_widget/media/feed/weather/v"+this.weatherObj.CurrentIcon+".png";
        //var currentIcon = "/ds_widget/htmlplayer/templates/weather_forecast/Rain_Occasional.png";
        if (update == false)
            this.m_objPixi['current_icon'] = PIXI.Sprite.fromImage(currentIcon);
        if (this.m_objPixi['current_icon'] != null)
        {

            this.m_objPixi['current_icon'].width = this.m_objPixi['location_overlay'].height*2;
            this.m_objPixi['current_icon'].height = this.m_objPixi['current_icon'].width;
            //this.m_objPixi['current_icon'].anchor.x = 0.5;
            //this.m_objPixi['current_icon'].anchor.y = 0.5;
            this.m_objPixi['current_icon'].position.x = this.m_objPixi['location_overlay'].width*0.5;
            this.m_objPixi['current_icon'].position.y = this.m_objPixi['location_overlay'].position.y + this.m_objPixi['location_overlay'].height;

        }
        
        var wordWrap = true;
        var strokeColor = "FFFFFF";
        var strokeThickness = 0;
        var dropShadow = false;
        var dropShadowColor = "000000"; 
        var currentTemp = this.weatherObj.CurrentTempF+"°F";
        if(this.m_contentArray["temp_unit"] == "C")
            currentTemp = this.weatherObj.CurrentTempC+"°C";
        //alert("[template_weather]current temperature: "+currentTemp + ",&#8451;");
        fontSize = this.m_objInfo['location_name'].font_size * 2;
        this.m_objPixi['current_temp'] = DacPixi.rebuildTextItem(this.m_objPixi['current_temp'], currentTemp,this.m_contentArray["current_temp_font"],this.m_contentArray["current_temp_font_color"],fontSize,"left",this.m_contentArray["current_temp_italic"],this.m_contentArray["current_temp_bold"],20,20,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        
        fontSize = this.m_objInfo['location_name'].font_size *1.2;
        this.m_objPixi['current_text'] = DacPixi.rebuildTextItem(this.m_objPixi['current_text'],this.weatherObj.CurrentWeatherText,this.m_contentArray["current_temp_font"],this.m_contentArray["current_temp_font_color"],fontSize,"left",this.m_contentArray["current_temp_italic"],this.m_contentArray["current_temp_bold"],20,20,wordWrap, this.m_width,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        
        // position current icon, temp, text
        //if (this.m_stageRatio >= 2 && this.m_stageRatio <= 4) // long landspace
        if (this.m_stageRatio >= 2 ) // long landspace including horizontal bar
        {
            this.m_objPixi['current_icon'].position.x = this.m_width *0.25;
            this.m_objPixi['current_icon'].anchor.x = 0.5;
            this.m_objPixi['current_icon'].position.y = this.m_objPixi['location_overlay'].position.y + this.m_objPixi['location_overlay'].height*1.1;
            
            this.m_objPixi['current_temp'].x = this.m_objPixi['current_icon'].position.x + this.m_objPixi['current_icon'].width*0.6;
            this.m_objPixi['current_temp'].y = this.m_objPixi['current_icon'].position.y*1.1;
            //this.m_objPixi['current_temp'].anchor.x = 0.5;
            this.m_objPixi['current_text'].x = this.m_objPixi['current_temp'].x;
            this.m_objPixi['current_text'].y =  this.m_objPixi['current_temp'].y + this.m_objPixi['current_temp'].height;
            //this.m_objPixi['current_text'].anchor.x = 0.5;
  
        }
        else if (this.m_stageRatio >= 0.8 && this.m_stageRatio < 2) //landscape -> square -> fat portrait
        {

            //this.m_objPixi['current_icon'].anchor.y = 0.5;
            this.m_objPixi['current_icon'].position.x = this.m_width * 0.20 * this.m_stageRatio;
            this.m_objPixi['current_icon'].anchor.x = 0.5;
            this.m_objPixi['current_icon'].position.y = this.m_objPixi['location_overlay'].position.y + this.m_objPixi['location_overlay'].height*1.1;
            
            this.m_objPixi['current_temp'].x = this.m_objPixi['current_icon'].position.x + this.m_objPixi['current_icon'].width*0.6;
            this.m_objPixi['current_temp'].y = this.m_objPixi['current_icon'].position.y*1.1;
            //this.m_objPixi['current_temp'].anchor.x = 0.5;
            this.m_objPixi['current_text'].x = this.m_objPixi['current_temp'].x;
            this.m_objPixi['current_text'].y =  this.m_objPixi['current_temp'].y + this.m_objPixi['current_temp'].height;
            //this.m_objPixi['current_text'].anchor.x = 0.5;
        }     
        //else if (this.m_stageRatio >= 0.3 && this.m_stageRatio < 0.8) //portrait -> tall portrait
        else if (this.m_stageRatio < 0.8) //portrait -> tall portrait
        {
            this.m_objPixi['current_icon'].position.x = this.m_width *0.5;
            this.m_objPixi['current_icon'].anchor.x = 0.5;
            this.m_objPixi['current_icon'].position.y = this.m_objPixi['location_overlay'].position.y + this.m_objPixi['location_overlay'].height*1.2;
            
            this.m_objPixi['current_temp'].x = this.m_objPixi['current_icon'].position.x;
            this.m_objPixi['current_temp'].anchor.x = 0.5;
            this.m_objPixi['current_temp'].y = this.m_objPixi['current_icon'].position.y + this.m_objPixi['current_icon'].height*1.2;
            
            this.m_objPixi['current_text'].x = this.m_objPixi['current_icon'].position.x;
            this.m_objPixi['current_text'].anchor.x = 0.5;
            this.m_objPixi['current_text'].y =  this.m_objPixi['current_temp'].y + this.m_objPixi['current_temp'].height;
            
        }
        
        if (update == false)
        {

            this.m_currentConaitiner = new PIXI.Container();

            this.m_currentConaitiner.addChild(this.m_objPixi['current_icon']);
            this.m_currentConaitiner.addChild(this.m_objPixi['current_temp']);
            this.m_currentConaitiner.addChild(this.m_objPixi['current_text']);

            this.m_stage.addChild(this.m_currentConaitiner);
        }
    }

    
    this.setCurrentIconSize = function (img)
    {
        img.style.visibility = "visible";
        img.width = this.m_objPixi['location_overlay'].height*1.8;
        img.height = img.width;
    }
    
    this.buildForecastContainer = function(update)
    {
        //this.m_objInfo['forecast'].y = this.m_objPixi['current_temp'].y + this.m_objPixi['current_temp'].height*2.3;
        //alert("currentConaitiner.y="+this.m_currentConaitiner.y+"  currentConaitiner.height="+this.m_currentConaitiner.height+"  currentIcon.y="+this.m_objPixi['current_icon'].y+"iconConaitiner.height="+this.m_objPixi['current_icon'].height);
        if (this.m_objPixi['current_icon'] != null)
        {
            this.m_objInfo['forecast'].y = this.m_objPixi['current_icon'].y + this.m_currentConaitiner.height * 1.05;
            this.m_objInfo['forecast'].height = this.m_height - this.m_objInfo['forecast'].y;
        }
        else
        {

            this.m_objInfo['forecast'].x = this.m_objPixi['location_overlay'].width*1.01;
            this.m_objInfo['forecast'].y = 0;
            this.m_objInfo['forecast'].width = this.m_width - this.m_objInfo['forecast'].x - this.m_objInfo['feed_logo'].w*1.08;
            this.m_objInfo['forecast'].height = this.m_height;
            //alert(this.m_objInfo['forecast'].y);
        }
       // alert("h="+this.m_height+" forecast w="+this.m_objInfo['forecast'].width+ " h="+this.m_objInfo['forecast'].height+" y="+this.m_objInfo['forecast'].y);

      //alert("h="+this.m_height+" forecast h="+this.m_objInfo['forecast'].height+" y="+this.m_objInfo['forecast'].y);
        //position current icon, temp, text
        if (this.m_stageRatio >= 5.0) // Landscape bar
        {
            this.setLBarForecastDayColumnSize();
            this.buildLBarForecastColumns(update);
        }
        else if (this.m_stageRatio >= 2 && this.m_stageRatio <5.0) // long landspace 
        { // use column format
            this.setForecastDayColumnSize();
            this.buildForecastColumns(update);
        }
        else if (this.m_stageRatio >= 0.8 && this.m_stageRatio < 2) //landscape -> square -> fat portrait
        { // use column format
            this.setForecastDayColumnSize();
            this.buildForecastColumns();
        }     
       // else if (this.m_stageRatio >= 0.3 && this.m_stageRatio < 0.8) //portrait -> tall portrait
        else if (this.m_stageRatio < 0.8) //portrait -> tall portrait
        { // use row format
            this.setForecastDayRowSize();
            this.buildForecastRows(update);
        }
        
    }
    
    
    this.buildLBarForecastColumns = function(update)
    {
        for (var i=0;i<this.m_contentArray["forecast_days"];i++)
        {
            var x = this.m_objInfo['forecast'].margin *(i+1) + this.m_objInfo['forecast'].day_width * i + this.m_objInfo['forecast'].x;
            this.buildForecastDayOverlay(i,x,this.m_objInfo['forecast'].y,this.m_objInfo['forecast'].day_width,this.m_objInfo['forecast'].day_height);
            
            //console.log("[template_"+this.m_templateName+"]buildForecastColumns i="+i+" x="+x+" width="+this.m_objInfo['forecast'].day_width);
            var ratio = this.m_objInfo['forecast'].day_width/this.m_objInfo['forecast'].day_height;
            if (ratio <=1.8)
                this.buildForecastDayColumn(i,x,this.m_objInfo['forecast'].y,this.m_objInfo['forecast'].day_width,this.m_objInfo['forecast'].day_height);
            else
                this.buildForecastDayRow(i,x, this.m_objInfo['forecast'].y,this.m_objInfo['forecast'].day_width,this.m_objInfo['forecast'].day_height);
        }

    }
    
    this.buildForecastColumns = function(update)
    {
        for (var i=0;i<this.m_contentArray["forecast_days"];i++)
        {
            var x = this.m_objInfo['forecast'].margin *(i+1) + this.m_objInfo['forecast'].day_width * i;
            this.buildForecastDayOverlay(i,x,this.m_objInfo['forecast'].y,this.m_objInfo['forecast'].day_width,this.m_objInfo['forecast'].day_height);
            
            //console.log("[template_"+this.m_templateName+"]buildForecastColumns i="+i+" x="+x+" width="+this.m_objInfo['forecast'].day_width);
            this.buildForecastDayColumn(i,x,this.m_objInfo['forecast'].y,this.m_objInfo['forecast'].day_width,this.m_objInfo['forecast'].day_height);
        }

    }
    
    this.buildForecastRows = function(update)
    {
        for (var i=0;i<this.m_contentArray["forecast_days"];i++)
        {
            var y = this.m_objInfo['forecast'].y+this.m_objInfo['forecast'].margin *(i+1) + this.m_objInfo['forecast'].day_height * i;
            this.buildForecastDayOverlay(i,this.m_objInfo['forecast'].x,y,this.m_objInfo['forecast'].day_width,this.m_objInfo['forecast'].day_height);
            this.buildForecastDayRow(i,this.m_objInfo['forecast'].x,y,this.m_objInfo['forecast'].day_width,this.m_objInfo['forecast'].day_height);
        }
        
    }
    
    this.setLBarForecastDayColumnSize = function()
    {
        //console.log("[template_"+this.m_templateName+"]**m_width="+this.m_width+" forecast width="+this.m_objInfo['forecast'].width+" num="+this.m_contentArray["forecast_days"]);
        this.m_objInfo['forecast'].margin = this.m_objPixi['location_overlay'].position.y;
        this.m_objInfo['forecast'].day_width = (this.m_objInfo['forecast'].width-this.m_objInfo['forecast'].margin *(parseInt(this.m_contentArray["forecast_days"])-1))/this.m_contentArray["forecast_days"] ;
        this.m_objInfo['forecast'].day_height = this.m_objInfo['forecast'].height;
    }
    
    this.setForecastDayColumnSize = function()
    {
        //console.log("[template_"+this.m_templateName+"]**m_width="+this.m_width+" forecast width="+this.m_objInfo['forecast'].width+" num="+this.m_contentArray["forecast_days"]);
        this.m_objInfo['forecast'].margin = this.m_objInfo['forecast'].x;
        this.m_objInfo['forecast'].day_width = (this.m_objInfo['forecast'].width-this.m_objInfo['forecast'].margin *(parseInt(this.m_contentArray["forecast_days"])-1))/this.m_contentArray["forecast_days"] ;
        this.m_objInfo['forecast'].day_height = this.m_objInfo['forecast'].height;
    }
    
    this.setForecastDayRowSize = function()
    {
        this.m_objInfo['forecast'].margin = this.m_objInfo['forecast'].x;
        this.m_objInfo['forecast'].day_width = this.m_objInfo['forecast'].width;
        this.m_objInfo['forecast'].day_height = (this.m_objInfo['forecast'].height-this.m_objInfo['forecast'].margin *(parseInt(this.m_contentArray["forecast_days"])+1))/this.m_contentArray["forecast_days"];
    }
    
    this.buildForecastDayOverlay = function(i,x,y,w,h)
    {
        if (this.m_objPixi['forecast_day_overlay'+i] == null)
            this.m_objPixi['forecast_day_overlay'+i] = new PIXI.Graphics();
        else
            this.m_objPixi['forecast_day_overlay'+i].clear();

        var overlayColor  = "0x"+this.m_contentArray["forecast_overlay_color"].substring(this.m_contentArray["forecast_overlay_color"].indexOf("#")+1);
        this.m_objPixi['forecast_day_overlay'+i].beginFill(overlayColor);
        this.m_objPixi['forecast_day_overlay'+i].drawRect(0,0,w,h);
        this.m_objPixi['forecast_day_overlay'+i].endFill();
        this.m_objPixi['forecast_day_overlay'+i].alpha = this.m_contentArray["forecast_overlay_alpha"];
        
        this.m_stage.addChild(this.m_objPixi['forecast_day_overlay'+i]);       
        this.m_objPixi['forecast_day_overlay'+i].position.x = x;
        this.m_objPixi['forecast_day_overlay'+i].position.y = y;
          
        return this.m_objPixi['forecast_day_overlay'+i];
   
    }
    
    this.buildForecastDayColumn = function(i,x,y,w,h)
    {
        var update = true;
        if (this.m_forecastDayContainerArray[i]==null)
        {
            this.m_forecastDayContainerArray[i] = new PIXI.Container();
            update = false;
        }

        var scale = this.m_objInfo['forecast'].day_width;
        if (this.m_objInfo['forecast'].day_width > this.m_objInfo['forecast'].day_height) 
            scale = this.m_objInfo['forecast'].day_height;
        
        var forecastItem = this.weatherObj.ForecastItems[i];
        

        
        var dayIcon = "/ds_widget/media/feed/weather/v"+forecastItem.Icon+".png";
        if (update == false)
            this.m_objPixi['day'+i+'_icon'] = PIXI.Sprite.fromImage(dayIcon);
        if (this.m_objPixi['day'+i+'_icon'] != null)
        {
            this.m_objPixi['day'+i+'_icon'].width = scale*0.6;
            this.m_objPixi['day'+i+'_icon'].height = this.m_objPixi['day'+i+'_icon'].width;
            this.m_objPixi['day'+i+'_icon'].anchor.x = 0.5;
            this.m_objPixi['day'+i+'_icon'].anchor.y = 0.5;
            this.m_objPixi['day'+i+'_icon'].position.x = this.m_objInfo['forecast'].day_width/2;
            this.m_objPixi['day'+i+'_icon'].position.y = this.m_objInfo['forecast'].day_height/2;
            if (update == false)
                this.m_forecastDayContainerArray[i].addChild(this.m_objPixi['day'+i+'_icon']);
        }
 
        var wordWrap = true;
        var strokeColor = "FFFFFF";
        var strokeThickness = 0;
        var dropShadow = false;
        var dropShadowColor = "000000";
        var day_text = "";
        if(i == 0)
            day_text = "TODAY";
        else
            day_text = forecastItem.Day;

        var fontSize = scale/5;
        
        this.m_objPixi['day'+i+'_label'] = DacPixi.rebuildTextItem(this.m_objPixi['day'+i+'_label'],day_text,this.m_contentArray["forecast_day_font"],this.m_contentArray["forecast_day_font_color"],fontSize,"center",this.m_contentArray["forecast_day_italic"],this.m_contentArray["forecast_day_bold"],20,20,wordWrap, this.m_width / 3,strokeColor,strokeThickness, dropShadow, dropShadowColor);


        this.m_objPixi['day'+i+'_label'].x = this.m_objInfo['forecast'].day_width/2;
        this.m_objPixi['day'+i+'_label'].y = this.m_objInfo['forecast'].margin *3;
        this.m_objPixi['day'+i+'_label'].anchor.x = 0.5;

        if (update == false)
            this.m_forecastDayContainerArray[i].addChild(this.m_objPixi['day'+i+'_label']);
  
        var temp_text = "";
        if (this.m_contentArray["temp_unit"] == "C")
            temp_text = forecastItem.HighC + "°/"+forecastItem.LowC + "°";
        else
            temp_text = forecastItem.HighF + "°/"+forecastItem.LowF + "°";
        var fontSize = scale/5;

        this.m_objPixi['day'+i+'_temp']  = DacPixi.rebuildTextItem(this.m_objPixi['day'+i+'_temp'],temp_text,this.m_contentArray["forecast_temp_font"],this.m_contentArray["forecast_temp_font_color"],fontSize,"left",this.m_contentArray["forecast_temp_italic"],this.m_contentArray["forecast_temp_bold"],20,20,wordWrap, this.m_width / 3,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        
        //this["m_forecastTemp"+i+"PIXIText"].height = 90 * f_h/110;
        this.m_objPixi['day'+i+'_temp'].x = this.m_objInfo['forecast'].day_width/2;
        this.m_objPixi['day'+i+'_temp'].y = this.m_objInfo['forecast'].day_height - this.m_objInfo['forecast'].margin *3 - this.m_objPixi['day'+i+'_temp'].height;
        this.m_objPixi['day'+i+'_temp'].anchor.x = 0.5;
        if (update == false)
        {
            this.m_forecastDayContainerArray[i].addChild(this.m_objPixi['day'+i+'_temp']);
        }

        this.m_stage.addChild(this.m_forecastDayContainerArray[i]);
        this.m_forecastDayContainerArray[i].position.x = x;
        this.m_forecastDayContainerArray[i].position.y = y;
			
    }
    
    this.buildForecastDayRow = function(i,x,y,w,h)
    {
        var update = true;
        if (this.m_forecastDayContainerArray[i] == null)
        {
            this.m_forecastDayContainerArray[i] = new PIXI.Container();
            update = false;
        }
        
        var ratio = this.m_objInfo['forecast'].day_width/this.m_objInfo['forecast'].day_height;

        var forecastItem = this.weatherObj.ForecastItems[i];
        
        var dayIcon = "/dac/media/feed/weather/v"+forecastItem.Icon+".png";
        if (update == false)
            this.m_objPixi['day'+i+'_icon'] = PIXI.Sprite.fromImage(dayIcon);
        if (this.m_objPixi['day'+i+'_icon'] != null)
        {
            this.m_objPixi['day'+i+'_icon'].width = this.m_objInfo['forecast'].day_height*0.9;
            this.m_objPixi['day'+i+'_icon'].height = this.m_objPixi['day'+i+'_icon'].width;
            this.m_objPixi['day'+i+'_icon'].anchor.x = 0.5;
            this.m_objPixi['day'+i+'_icon'].anchor.y = 0.5;
            this.m_objPixi['day'+i+'_icon'].position.x = this.m_objInfo['forecast'].day_width/2;
            this.m_objPixi['day'+i+'_icon'].position.y = this.m_objInfo['forecast'].day_height/2;
            if (update == false)
                this.m_forecastDayContainerArray[i].addChild(this.m_objPixi['day'+i+'_icon']);
        }
 
        var wordWrap = true;
        var strokeColor = "FFFFFF";
        var strokeThickness = 0;
        var dropShadow = false;
        var dropShadowColor = "000000";
        var day_text = "";
        if(i == 0)
            day_text = "TODAY";
        else
            day_text = forecastItem.Day;

        var fontSize = fontSize = (ratio/3.5) * this.m_objInfo['forecast'].day_height/4;

        this.m_objPixi['day'+i+'_label'] = DacPixi.rebuildTextItem(this.m_objPixi['day'+i+'_label'],day_text,this.m_contentArray["forecast_day_font"],this.m_contentArray["forecast_day_font_color"],fontSize,"center",this.m_contentArray["forecast_day_italic"],this.m_contentArray["forecast_day_bold"],20,20,wordWrap, this.m_width / 3,strokeColor,strokeThickness, dropShadow, dropShadowColor);

        this.m_objPixi['day'+i+'_label'].x = this.m_objInfo['forecast'].margin*3*ratio/3;
        this.m_objPixi['day'+i+'_label'].y = this.m_objInfo['forecast'].day_height/2;
        this.m_objPixi['day'+i+'_label'].anchor.y = 0.5;
        if (update == false)
            this.m_forecastDayContainerArray[i].addChild(this.m_objPixi['day'+i+'_label']);
  
        var temp_text = "";
        if (this.m_contentArray["temp_unit"] == "C")
            temp_text = forecastItem.HighC + "°/"+forecastItem.LowC + "°";
        else
            temp_text = forecastItem.HighF + "°/"+forecastItem.LowF + "°";
        var fontSize = (ratio/3.5) * this.m_objInfo['forecast'].day_height/4;
        
        this.m_objPixi['day'+i+'_temp']  = DacPixi.rebuildTextItem(this.m_objPixi['day'+i+'_temp'],temp_text,this.m_contentArray["forecast_temp_font"],this.m_contentArray["forecast_temp_font_color"],fontSize,"left",this.m_contentArray["forecast_temp_italic"],this.m_contentArray["forecast_temp_bold"],20,20,wordWrap, this.m_width / 3,strokeColor,strokeThickness, dropShadow, dropShadowColor);
        
        //this["m_forecastTemp"+i+"PIXIText"].height = 90 * f_h/110;
        //this.m_objPixi['day'+i+'_temp'].x = this.m_objInfo['forecast'].width - this.m_objInfo['forecast'].margin *3 - this.m_objPixi['day'+i+'_temp'].width;
        this.m_objPixi['day'+i+'_temp'].x = this.m_objInfo['forecast'].day_width - this.m_objInfo['forecast'].margin *3 - this.m_objPixi['day'+i+'_temp'].width;
        this.m_objPixi['day'+i+'_temp'].y = this.m_objInfo['forecast'].day_height/2;
        this.m_objPixi['day'+i+'_temp'].anchor.y = 0.5;
        if (update == false)
        {
            this.m_forecastDayContainerArray[i].addChild(this.m_objPixi['day'+i+'_temp']);
           
        }
        //this.m_forecastDayContainerArray[i] = this.buildForecastDayOverlay(update,i,x,y,w,h);
        //if (update == false)
        //    this.m_forecastDayContainerArray[i].addChild(this.m_objPixi['forecast_day_overlay'+i]);
        
        this.m_stage.addChild(this.m_forecastDayContainerArray[i]);
        this.m_forecastDayContainerArray[i].position.x = x;
        this.m_forecastDayContainerArray[i].position.y = y;
			
    }
	
	
    PIXI.Texture.Draw = function (cb) {
        var canvas = document.createElement('canvas');
        if (typeof cb == 'function') cb(canvas);
        return PIXI.Texture.fromCanvas(canvas);
    }

 
    this.playTemplate = function()
    {
        console.log("[template_"+this.m_templateName+"]playTemplate isPlaying="+this.m_isPlaying+"  isLoading="+this.m_isLoading);

        //this.intervalId=setInterval("refresh()",100);
        console.log("[template_"+this.m_templateName+"]start")

        //PIXI
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
        for (i = 0; i<5;i++)
        {
            if (this.m_forecastDayContainerArray[i]!=null)
                this.m_stage.removeChild(this.m_forecastDayContainerArray[i]);
            if (this.m_objPixi['forecast_day_overlay'+i] != null)
                this.m_stage.removeChild(this.m_objPixi['forecast_day_overlay'+i]);
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
        //console.log("[template_"+this.m_templateName+"] initEditViewzone size changed");
        }
        else
        {
            this.m_zone_size_changed = 0;
            //console.log("[template_"+this.m_templateName+"] initEditView zone size not changed");
        }

        this.m_fullWidget = fullWidget;
        this.m_wid = fullWidget.wid
        this.m_assetIdPrefix = "w"+this.m_wid+"-"+this.m_templateName+"-";
        this.m_contentArray = fullWidget["widget"]["dac_widget"]["content"];
        this.m_feedArray = fullWidget["feed"];

        console.log("[template_"+this.m_templateName+"]initEditView  this.m_contentArray="+JSON.stringify(this.m_contentArray));


        this.m_assetArray = fullWidget.widgetAsset;
        console.log("[template_"+this.m_templateName+"]initEditView  this.m_assetArray="+JSON.stringify(this.m_assetArray));
        //alert(JSON.stringify(this.m_assetArray));
        console.log("[template_"+this.m_templateName+"]initEditView wid="+this.m_wid);
        this.initTemplateFields();
        this.initTemplateUI();

        this.playTemplate();
    }

    this.updateEditView = function(fullWidget)
    {
        this.m_zone_size_changed = 0;

        this.m_playmode="editor";
        this.m_fullWidget = fullWidget;
        this.m_wid = fullWidget.wid;

        this.m_contentArray = fullWidget["widget"]["dac_widget"]["content"];
        this.m_assetArray = fullWidget.widgetAsset;
        this.m_feedArray = fullWidget["feed"];
        //alert("updateEditView "+ JSON.stringify(this.m_contentArray));
        
        this.clearForecast();
        this.updateWeather();
        
        TemplateBase.prototype.rebuildWidgetBackground.call(this);
        TemplateBase.prototype.buildQRCode.call(_this,_this.m_contentArray['qr_text'],_this.m_contentArray['qr_size'], _this.m_contentArray['qr_color'], _this.m_contentArray['qr_x'],_this.m_contentArray['qr_y'])
 
    }
    
    this.updateWeather = function()
    {
        //this.readWeather();
        if(this.weatherObj!=null)
        {
            var update = true;
            this.buildLocationDatetimeContainer(update);
            this.buildCurrentContainer(update);
            this.buildForecastContainer(update);
        }
    }
        
    this.updateEditorVariable = function(name,value){
        this.m_fullWidget.widget.dac_widget.content[name] = value;
        this.m_contentArray[name] = value;
        parent.updateEditorContent(this.m_fullWidget);
    }
}

TemplateWeatherForecast.prototype = Object.create(TemplateBase.prototype);