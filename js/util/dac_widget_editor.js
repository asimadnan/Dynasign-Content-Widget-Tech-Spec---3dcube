function DacWidgetEditor() 
{
    var _this = this;
    this.uiObj = {};
    this.content = {};
    this.feedArray = {};
    this.feedSource = "";
    this.translationList = {};
    this.translationList["Widget Price and Licensed Devices"] = "Widget Price and Licensed Devices";
    this.translationList["Number of Devices You Like to Play this Widget on"]="Number of Devices You Like to Play this Widget on";
    this.translationList["Unit Price"]="Unit Price";
    this.translationList["Your Unit Price After Discount"] = "Your Unit Price After Discount";
    this.translationList["Volume Discount"] = "Volume Discount";
    this.translationList["Total Monthly Price"] = "Total Monthly Price";
    this.translationList["Unit price is per month per device. Volume discount is based on the number of devices"] = "Unit price is per month per device. Volume discount is based on the number of devices";
 
    this.translationList["Widget Size"] = "Widget Size";
    this.translationList["Set Size"] = "Set Size";
    this.translationList["Set the widget size to be the same as the zone size on screen"] = "Set the widget size to be the same as the zone size on screen";
    
    this.translationList["Background"] = "Background";
    this.translationList["Background Image"] = "Background Image";
    this.translationList["Background Alpha"] = "Background Alpha";
    this.translationList["Background Theme"] = "Background Theme";
    this.translationList["Background Color"] = "Background Color";
    this.translationList["Upload"] = "Upload";
    this.translationList["Select"] = "Select";
    this.translationList["Overlay Color"] = "Overlay Color";
    this.translationList["Overlay Alpha"] = "Overlay Alpha";
    this.translationList["Color"] = "Color";
    this.translationList["Alpha"] = "Alpha";
    
    this.translationList["Select from Server"] = "Select from Server";
    this.translationList["Upload from Local Drive"] = "Upload from Local Drive";
    this.translationList["Image Alpha"] = "Image Alpha";
    
    this.translationList["QR Code"] = "QR Code";
    this.translationList["Use Widget URL"] = "Use Widget URL";
    this.translationList["Use Text or URL entered below"] = "Use Text or URL entered below";
    this.translationList["Enter Text or URL for your QR Code"] = "Enter Text or URL for your QR Code";
    this.translationList["Show QR Code"] = "Show QR Code";
    this.translationList["QR Code Color"] = "QR Code Color";
    this.translationList["Date Time Display Format Like"] = "Date Time Display Format Like";
    this.translationList["Date Display Format Like"] = "Date Display Format Like";
    this.translationList["Time Display Format Like"] = "Time Display Format Like";
    
    this.translationList["New Feed"] = "New Feed";
    this.translationList["Please select a feed"] = "Please select a feed";
    this.translationList["Feed"] = "Feed";
    this.translationList["Load"] = "Load";
    
    this.standardPalette =  [
            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"], 
            ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", 
            "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", 
            "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", 
            "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", 
            "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", 
            "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
            "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
            "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
            "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", 
            "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
        ];
        
    this.qrCodePalette = [
        ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
        ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
    ];

        
    this.hasBackgroundTab = false;
    this.hasBackgroundOverlay = false;
    this.hasQRTab = false;
    this.initList = [];
    this.IdValList = [];
    
    this.setTranslationList = function(list)
    {
        
        this.translationList = list;
    }
    
    this.setUIObj = function(uiObj)
    {
        this.uiObj = uiObj;
    }
    
    this.setContent = function(contentObj)
    {
        this.content = contentObj;
    }
    
    this.setFeed = function(feedArray, feedSource)
    {
        this.feedArray = feedArray;
        this.feedSource = feedSource;
    }
    
    this.startEditor = function()
    {
        var tabs = this.buildTabs();
        $('#accordion').html(tabs);
        this.initEditor();

    }
    
    this.initEditor = function()
    {
        if (_this.hasBackgroundTab == true)
            _this.initStandardBackgroundTab();
        if (this.hasQRTab == true)
            _this.initQRCode();

        for (var i=0; i<this.initList.length; i++)
        {
            var initObj = this.initList[i];

            var method = initObj["method"];
            var id = initObj["id"];
            if (method == "initTextArea")
            {
                _this.initTextArea(id);
            }
            else if (method == "initTextInput")
            {
                _this.initTextInput(id);
            }
            else if (method == "initTextStyle")
            {
                _this.initTextStyle(id);
            }
            else if (method == "initCheckbox")
            {
                _this.initCheckbox(id);
            }
            else if (method == "initRadio")
            {
                _this.initRadio(id);
            }
            else if (method == "initOverlay")
            {
                _this.initOverlay(id);
            }
            else if (method == "initColorPicker")
            {
                _this.initStandardColorPicker(id);
            }
            else if (method == "initCombobox")
            {
                _this.initCombobox(id);
            }
            else if (method == "initDateTimePicker")
            {
                _this.initDateTimePicker(id);
            }
            else if (method == "initDatePicker")
            {
                _this.initDatePicker(id);
            }
            else if (method == "initTimePicker")
            {
                _this.initTimePicker(id);
            }
            else if (method == "initDropzone")
            {
                _this.initDropzone(id);
            }
            else if (method == "initWidgetPriceLicense")
            {
                _this.initWidgetPriceLicense();
            }
        }
    }
    
    this.addInitEvent=function(method, id)
    {
        var initObj = {"method":method, "id":id};
        this.initList.push(initObj);
    }
    
    this.buildTabs = function()
    {
        var widgetPriceLicenseTab = this.buildWidgetPriceLicenseTab();
       
        var widgetSizeTab = this.buildWidgetSizeTab();
        var backgroundTab = "";
        var qrTab = "";
        var standardTabs = this.uiObj["standard_tabs"];
        for (var i=0; i<standardTabs.length; i++)
        {
            var tab = standardTabs[i];
            var tab_id = tab["tab_id"];
            if (tab_id === "background")
            {
                var overlay = tab["overlay"];
                if (overlay == null) overlay = false;
                this.hasBackgroundOverlay = overlay;
                backgroundTab = this.buildStanardBackgroundTab(overlay);
                this.hasBackgroundTab = true;
            }
            else if (tab_id === "qr")
            {
                qrTab = this.buildQRCodeTab();
                this.hasQRTab = true;
            }
        }
        
        var customTabs = "";
        var tabs = this.uiObj["custom_tabs"];
        for (var i=0; i<tabs.length; i++)
        {
            var tab = tabs[i];
            var tab_id = tab["tab_id"];
            customTabs += this.buildTab(tab); 
        }
        
        var str = widgetPriceLicenseTab + widgetSizeTab + backgroundTab + customTabs + qrTab;
        //var str = widgetSizeTab + backgroundTab + customTabs + qrTab;
        //console.log("tabs="+str);
        return str;
        
    }
    
    this.buildTab = function(tab)
    {
        var tabId = tab["tab_id"];
        var tabName = tab["tab_name"];
        var str = '<h3>&nbsp;&nbsp;&nbsp;' + tabName+'</h3>';
        
        var groups = tab["groups"];
        var tabBody = "";
        var hr = '<hr style = "width:100%; border: 0; height: 1px;  background: #FFF; background-image: linear-gradient(to right, #fff, #fff, #fff);">';
        for (var i=0; i<groups.length; i++)
        {
            var group = groups[i];
            var fields = group["fields"]; 
            var groupBody = this.buildFields(fields);
            if (i==0)
                tabBody += this.buildGroup(group, groupBody); 
            else
                tabBody += hr + this.buildGroup(group, groupBody); 
        }
        str += '<div id="tab_'+ tabId +'">'+tabBody+'</div>';
        return str;
        
    }
    
    this.buildGroup = function(group, groupBody)
    {
        var groupId = group["group_id"];
        var groupName = group["group_name"];
        var isOpen = group["open"]; 

        var displayStyle = ""
        var chevronClass = "class=\"glyphicon glyphicon-minus-sign\"";
        var str = "";
        if(!isOpen){
           displayStyle = "style=\"display:none;\"";
           chevronClass = "class=\"glyphicon glyphicon-plus-sign\"";
        }
        if (groupName != null && groupName != "")
            str +="<h5><span  id=\""+groupId+"_chevron\" "+chevronClass+" onclick='showHideGroup(\""+groupId+"\")' style=\"cursor:hand;\"></span><span onclick=\"showHideGroup()\" style=\"cursor:hand;\">&nbsp;"+groupName+"</span></h5>";
        //str +="<hr/>";
        str +="<hr style = 'width:100%; border: 0; height: 1px;  background: #333; background-image: linear-gradient(to right, #992200, #ccc, #fff);'>";
        str +="<div id=\""+groupId+"\" "+displayStyle+">"
        str += groupBody;
        str +="</div>";
        
        return str;
    }
    
    this.buildFields = function(fields)
    {
        var str = "";
        for (var i=0; i<fields.length; i++)
        {
            var field = fields[i];
            if (field != null)
                str += this.buildField(field); 
        }
        return str;
    }
    
    this.buildField = function(field)
    {
        var str = "";
        var fieldId = field["field_id"];
        var fieldName = field["field_name"];
        var type = field["field_type"];
        var component = field["component"];
        
        console.log("buildField: fieldId="+fieldId+" fieldName="+fieldName+" type="+type+" component="+component);

        if (component == "textarea")
        {
            var fieldWidth = field["field_width"];
            var fieldHeight = field["field_height"];

            var fontType = field["font_type"];
            var fontSize = field["font_size"];
            var color = field["color"];
            var bold = field["bold"];
            var italic = field["italic"];
            var underline = field["underline"];
            var align = field["align"];

            str = this.buildTextArea(fieldId,fieldName, fieldWidth, fieldHeight,fontType,fontSize,color, bold,italic,align);
            this.addInitEvent("initTextArea", fieldId);
            
        }
        else if (component == "input" || component == "text_input")
        {
            var placeholder = field["placeholder"];
            var fieldWidth = field["field_width"];
            var maxlength = field["maxlength"];
            var fontType = field["font_type"];
            var fontSize = field["font_size"];
            var color = field["color"];
            var bold = field["bold"];
            var italic = field["italic"];
            var underline = field["underline"];
            var align = field["align"];
            str = this.buildTextInput(fieldId,fieldName,fieldWidth, maxlength,fontType,fontSize,color, bold,italic,align, placeholder);
            this.addInitEvent("initTextInput", fieldId);
        }
        else if (component == "text_style")
        {
            var fontType = field["font_type"];
            var fontSize = field["font_size"];
            var color = field["color"];
            var bold = field["bold"];
            var italic = field["italic"];
            var underline = field["underline"];
            var align = field["align"];
            str = this.buildTextStyle(fieldId,fieldName, fontType,fontSize,color,bold,italic,align);
            this.addInitEvent("initTextStyle", fieldId);
        }
        else if (component == "range")
        {
            var valList = this.getValList(field["val_list"]);
            var fieldWidth = field["field_width"];
            str = this.buildRange(fieldId,fieldName, fieldWidth,  valList);
        }
        else if (component == "select")
        {
            var valList = this.getValList(field["val_list"]);
            var fieldWidth = field["field_width"];
            str = this.buildSelectionList(fieldId,fieldName, fieldWidth,  valList);
        }
        else if (component == "feed_select")
        {
            var fieldWidth = field["field_width"];
            str = this.buildFeedSelectionList();

        }
        else if (component == "combo")
        {
            var valList = this.getValList(field["val_list"]);
            var fieldWidth = field["field_width"];
            str = this.buildCombobox(fieldId, fieldName,fieldWidth, valList);
            this.IdValList[fieldId] = valList;
            this.addInitEvent("initCombobox", fieldId);
        }
        else if (component == "checkbox")
        {
            var valList = this.getValList(field["val_list"]);
            str = this.buildCheckbox(fieldId, fieldName, valList);
            this.addInitEvent("initCheckbox", fieldId);
        }
        else if (component == "radio")
        {
            var valList = this.getValList(field["val_list"]);
            str = this.buildRadio(fieldId, fieldName, valList)
            this.addInitEvent("initRadio", fieldId);
        }
        else if (component == "number_plus_minus")
        {
            
        }
        else if (component == "overlay" || component == "overlay_rectangle")
        {
            str = this.buildOverlay(fieldId, fieldName);
            this.addInitEvent("initOverlay", fieldId);
        }
        else if (component == "color")
        {
            str = this.buildColorPicker(fieldId,fieldName);
            this.addInitEvent("initColorPicker", fieldId);
        }
        else if (component == "datetime")
        {
            var fontType = field["font_type"];
            var fontSize = field["font_size"];
            var color = field["color"];
            var bold = field["bold"];
            var italic = field["italic"];
            var underline = field["underline"];
            var align = field["align"];
            var display_format = field["display_format"];
            str = this.buildDateTimePicker(fieldId, fieldName, display_format,fontType,fontSize,color,bold,italic,align);
            this.addInitEvent("initDateTimePicker", fieldId);
        }
        else if (component == "date")
        {
            var fontType = field["font_type"];
            var fontSize = field["font_size"];
            var color = field["color"];
            var bold = field["bold"];
            var italic = field["italic"];
            var underline = field["underline"];
            var align = field["align"];
            var display_format = field["display_format"];
            str = this.buildDatePicker(fieldId, fieldName, display_format,fontType,fontSize,color,bold,italic,align);
            this.addInitEvent("initDatePicker", fieldId);
        }
        else if (component == "time")
        {
            var fontType = field["font_type"];
            var fontSize = field["font_size"];
            var color = field["color"];
            var bold = field["bold"];
            var italic = field["italic"];
            var underline = field["underline"];
            var align = field["align"];
            var display_format = field["display_format"];
            str = this.buildTimePicker(fieldId, fieldName, display_format,fontType,fontSize,color,bold,italic,align);
            this.addInitEvent("initTimePicker", fieldId);
        }
        else if (component == "dropzone")
        {
            var thumbnail = this.content[fieldId];
            if (thumbnail == null) thumbnail = "";
            str = this.buildDropzone(fieldId, fieldName, type,"single",1, thumbnail, false);
            this.addInitEvent("initDropzone", fieldId);
        }
        else if (component == "hidden ")
        {
            
        }
        str = "<table><tr><td>" + str+"</td></tr></table>";
        //alert(str);
        return str;
    }
    
    this.getValList = function(valListId)
    {
        var valList = this.uiObj["val_lists"][valListId];
        if (valList == null) valList = [];
        return valList;
    }

    this.showHideGroup = function(groupId)
    {
        if($('#'+groupId).is(":visible")){
            $('#'+groupId).hide(400);
            $('#'+groupId+"_chevron").attr('class', 'glyphicon glyphicon-plus-sign');
        }
        else{
             $('#'+groupId).show(400);
             $('#'+groupId+"_chevron").attr('class', 'glyphicon glyphicon-minus-sign');
        }
    }
    
// text input ///////////////////////////////////////////////////////////////////////////////////////////
    this.buildTextInput = function(fieldId,fieldDisplayName,fieldWidth, maxlength, fontType,fontSize,color, bold,italic, align, placeholder ) 
    {
        if (placeholder == null) placeholder = "";
        var str = "";

        str +='<div style="float:left;margin-top: 5px;margin-bottom: 5px;" >';
	str +='<span class="daclabel daclabel-default">'+fieldDisplayName+'</span>';
        str +='<div style="margin-top:3px;margin-bottom:0px" >';
    	str +='<input class="form-control" type="text" id="'+fieldId+'" placeholder="'+placeholder+'" style="width:'+fieldWidth+'px; height:30px;" value="" size="'+fieldWidth+'" maxlength="'+maxlength+'"></input>';
        
        if (fontType!=null || fontSize!=null  || color!=null || bold!=null || italic!=null || align!= null)
        {
            str += this.buildTextStyle(fieldId,null, fontType,fontSize,color,bold,italic,align);
        }
        str +='</div>';
        str +='</div>';


        return str; 
    }
    
    this.initTextInput=function(fieldId)
    {
        $('#'+fieldId).val(this.content[fieldId]);

        _this.initTextStyle(fieldId);

        _this.addEventHandlerUpdateWidgetField(fieldId, "input");

    }
    
    
// textarea ///////////////////////////////////////////////////////////////////////////////////////////
    this.buildTextArea = function(fieldId,fieldName, fieldWidth, fieldHeight,fontType,sizeSize,color, bold,italic, align)
    {
        var str = "";
        str +='<div style="float:left;margin-bottom: 15px;" >';
	str +='<span class="daclabel daclabel-default">'+fieldName+'</span>';
        str +='<div style="margin-top:5px;margin-bottom:0px" >';
	str +='<textarea class="form-control" style="width:'+fieldWidth+'px; height:'+fieldHeight+'px" rows="2" cols="60" id="'+fieldId+'"></textarea>';
        str += this.buildTextStyle(fieldId,null,fontType,sizeSize,color,bold,italic,align);
        str +='</div>';
        str +='</div>';

        return str; 
    }
    

    this.initTextArea=function(fieldId)
    {
        $('#'+fieldId).val(this.content[fieldId]);

        _this.initTextStyle(fieldId);
        _this.addEventHandlerUpdateWidgetField(fieldId, "textarea");

    }
    
// Range ///////////////////////////////////////////////////////////////////////////////////////////
    this.buildRange = function(fieldId,fieldName, fieldWidth)
    {
        var str = "";
        str +='<div style="float:left;margin-bottom: 15px;" >';
	str +='<span class="daclabel daclabel-default">'+fieldName+'</span>';
        str +='<div style="margin-top:5px;margin-bottom:0px" >';
	str +='<input type="range" class="form-control" style="width:'+fieldWidth+'px; " id="'+fieldId+'"></input>';
        

        str +='</div>';
        str +='</div>';

        return str; 
    }
    

    this.initRange=function(fieldId)
    {
        $('#'+fieldId).val(this.content[fieldId]);

        _this.addEventHandlerUpdateWidgetField(fieldId, "range");

    }
    
// text_style ///////////////////////////////////////////////////////////////////////////////////////////
    this.buildTextStyle = function(fieldId,fieldName,fontType,sizeSize,color,bold,italic, align)
    {
        //var str ='<div style="margin-bottom:50px; margin-top:15px;">';
        var str ='<div style="margin-bottom:0px; margin-top:5px;">';
        if (fieldName != null && fieldName != "")
            str +='<span class="daclabel daclabel-default" style="float: left; margin-left:0px;">'+fieldName+'  </span><br> ';
	str +='<div style="float:left; margin-bottom:5px; margin-top:1px;">';
	if (fontType != null)
            str +='<input id="'+fieldId+'_font" type="text" value="Arial" class="form-control"  style="text-align:left;margin-top:0px;width:130px;height:30px" size="20" onchange="updateWidgetField(\''+fieldId+'_font\',this.value)">';
        if (sizeSize!= null)
            str +='<input id="'+fieldId+'_font_size" type="text" value="100" class="form-control" style="text-align:left;height:30px" onchange="updateWidgetField(\''+fieldId+'_font_size\',this.value)" size="2">';
        if (color!= null)
            str +='&nbsp;<input type="text" id="'+fieldId+'_font_color" value="#000000" style="margin-top: 0px; height:30px" onchange="updateWidgetField(\''+fieldId+'_font_color\',this.value)"/>';
	//str +='<div class="btn-group btn-group-sm" role="group">';
        
        var btn_style = "dac-btn-boolean-off";
        if (this.content[fieldId+"_bold"] == true) 
            btn_style = "dac-btn-boolean-on";
        else
            btn_style = "dac-btn-boolean-off";
            
        if (bold!= null)
            str +='<button type="button" class="'+btn_style+'" style="color:#000000; margin-top: 0px; margin-left:5px; min-width: 35px;" onclick="toggleBooleanButton(\''+fieldId+'_bold\',this)" ><span class="glyphicon glyphicon-bold"></span></button>';
        
        if (this.content[fieldId+"_italic"] == true) 
            btn_style = "dac-btn-boolean-on";
        else
            btn_style = "dac-btn-boolean-off";
        if (italic!= null)
            str +='<button type="button" class="'+btn_style+'"  style="color:#000000; min-width: 35px;" onclick="toggleBooleanButton(\''+fieldId+'_italic\',this)"><span class="glyphicon glyphicon-italic"></span></button>';

        var left_style = "dac-btn-boolean-on";
        var center_style = "dac-btn-boolean-off";
        var right_style = "dac-btn-boolean-off";
        if (this.content[fieldId+"_align"] == "left")
        {
            left_style = "dac-btn-boolean-on";
            center_style = "dac-btn-boolean-off";
            right_style = "dac-btn-boolean-off";
        }
        else if (this.content[fieldId+"_align"] == "center")
        {
            left_style = "dac-btn-boolean-off";
            center_style = "dac-btn-boolean-on";
            right_style = "dac-btn-boolean-off";
        }
        else if (this.content[fieldId+"_align"] == "right")
        {
            left_style = "dac-btn-boolean-off";
            center_style = "dac-btn-boolean-off";
            right_style = "dac-btn-boolean-on";
        }
        
        if (align != null)
        {
            str +='<button id="'+fieldId+'_align_left" type="button" class="'+left_style+'" style="color:#000000; min-width: 35px;" onclick="toggleTextAlignButton(\''+fieldId+'_align\',\'left\')"><span class="glyphicon glyphicon-align-left"></span></button>';
            str +='<button id="'+fieldId+'_align_center" type="button" class="'+center_style+'" style="color:#000000; min-width: 35px;" onclick="toggleTextAlignButton(\''+fieldId+'_align\',\'center\')"><span class="glyphicon glyphicon-align-center"></span></button>';
            str +='<button id="'+fieldId+'_align_right" type="button" class="'+right_style+'" style="color:#000000; min-width: 35px;" onclick="toggleTextAlignButton(\''+fieldId+'_align\',\'right\')"><span class="glyphicon glyphicon-align-right"></span></button>';
        }
	//str +='</div>';
	str +='</div>';
	str +='</div>';
        return str;  
    } 
    
    this.initTextStyle=function(fieldId)
    {
        this.initFontTypeCombox('#'+fieldId+'_font');
        $('#'+fieldId+'_font').attr('value', this.content[fieldId+"_font"]);

        $('#'+fieldId+'_font_size').combobox(['50','60','70','80','90','100','110','115','120','125','130','135','140']); 
        $('#'+fieldId+'_font_size').attr('value', this.content[fieldId+"_font_size"]);
        //alert(fieldId + "_font_size="+this.content[fieldId+"_font_size"]);
                
        this.initStandardColorPicker(fieldId+'_font_color',true);
        $('#'+fieldId+'_font_color').spectrum("set", this.content[fieldId+"_font_color"]);
        

        _this.addEventHandlerUpdateWidgetField(fieldId, "input");
    }
    
    
    this.buildCheckbox = function(fieldId, fieldName)
    { 
        var str = "";
        str +='<div style="float:left;margin-bottom: 5px;" >';
        str +='<input id="'+fieldId+'" style="position: relative;bottom: 2px;vertical-align: middle;float:left; margin-right: 1px;" type="checkbox"  onClick="toggleBooleanField(\''+fieldId+'\', this.checked)">';
	str +='<span class="daclabel daclabel-default">'+fieldName+'</span> ';
        str +='</div>';

        return str;
    }
    
    this.initCheckbox=function(fieldId)
    {
        //_this.addEventHandlerUpdateWidgetField(fieldId, "input");
        if (this.content[fieldId] == true)  $("#"+ fieldId).prop( "checked", true );
        _this.addEventHandlerUpdateWidgetField(fieldId, "input");
    }
    
    this.buildRadio = function(fieldId, fieldName, valList)
    { 
        //alert("1"+fieldId);
        var radioStr = "";
        for (var i=0; i<valList.length; i++)
        {
            var obj = valList[i];
            var res = obj.split("|");
            var key = res[0];
            var val = res[1];
            if (val == null) val = key;
            var checked = "";
            if (key == this.content[fieldId]) checked = " checked";
            
            radioStr +='<label><input type="radio" id="'+fieldId+'" name="name_'+fieldId+'" value="'+key+'"  style="margin-top:5px;width:40px;height:20px" size="20" onchange="updateWidgetField(\''+fieldId+'\',this.value)" '+checked+'>'+val +' </label>';
        }
        var str = "";
        str +='<div style="float:left;margin-bottom: 5px;" >';
	str +='<span class="daclabel daclabel-default">'+fieldName+'</span> ';
        
	str +='<div style="margin-top:0px;margin-bottom:0px">';

	str +=radioStr
	str +='</div>';

        str +='</div>';

        return str;
    }
    
    this.initRadio=function(fieldId)
    {

    }
 
    this.buildColorPicker = function(fieldId,fieldName)
    {
        var str = "";
        str +='<div style="float:left;margin-right: 10px;margin-bottom: 15px;">';
        str +='<span class="daclabel daclabel-default">'+fieldName+'</span>';
        str +='<div style="margin-top:3px;">';
        str +='<input id="'+fieldId+'" type="text" onchange="updateWidgetField(\''+fieldId+'\',this.value);"/>';
        str +='</div>';
        str +='</div>';
        return str;       
    }    
    
    this.buildBackgroundColor = function()
    {
        var str = "";
        str +='<div style="float:left;margin-right: 10px;margin-bottom: 15px;">';
        str +='<span class="daclabel daclabel-default">'+this.translationList["Background Color"]+'</span>';
        str +=' <div style="margin-top:3px;">';
        str +='<input type="text" id="background_color" value="#000000" onchange="updateWidgetField(\'background_color\',this.value);"/>';
        str +='</div>';
        str +='</div>';
        return str;  
    }
    
    this.initStandardColorPicker = function(fieldId, showSelectionPalette)
    {
        this.initColorPicker(fieldId, this.standardPalette, showSelectionPalette)
    }
    
    this.initColorPicker = function(fieldId, paletteArray, showSelectionPalette)
    {
        $("#"+fieldId).spectrum({
            showInput: true,
            className: "full-spectrum",
            showInitial: true,
            showPalette: true,
            showSelectionPalette: showSelectionPalette,
            maxPaletteSize: 10,
            preferredFormat: "hex",
            localStorageKey: "spectrum.demo",
            showButtons: true,
            showAlpha: false,
            hideAfterPaletteSelect:true,
            preferredFormat: "hex",

            move: function (color) {

            },
            show: function () {

            },
            beforeShow: function () {

            },
            hide: function () {

            },
            change: function() {

            },
            palette: paletteArray
        });
        $('#'+fieldId).spectrum("set", this.content[fieldId]);
     }
    

   
    this.buildTextInputCheckboxOption = function(fieldId, fieldDisplayName, font,size,color, bold,italic, checkboxName, checkboxDisplayName)
    { 
        var str = "";
        str +='<div style="float:left;margin-bottom: 15px;" >';
	str +='<span class="daclabel daclabel-default">'+fieldDisplayName+'</span> ';
        str +='<span class="daclabel daclabel-default" style="float:right; margin-top: 0px; height:20px;padding-top:3px">'+checkboxDisplayName+'</span>';
        str +='<input id="'+checkboxName+'" style="font-size:20px;float:right; margin-right: 1px; " type="checkbox"  onClick="toggleBooleanField(\''+checkboxName+'\', this.checked)">';

        str +='<div style="margin-top:5px;margin-bottom:0px" >';
	str +='<input class="form-control" type="text" id="'+fieldId+'" style="width:100%; height:30px" value="" size="200" maxlength="200"></input>';
        str +='</div>';
        str +='</div>';
        
        if (font== true || size == true || color==true || bold == true || italic==true)
            str += this.buildFontStyle(fieldId,fieldDisplayName,font,size,color, bold,italic);
        
        return str;
    }

    
// SelectionList ///////////////////////////////////////////////////////////////////////////////////////////
    this.buildSelectionList = function(fieldId,fieldName, fieldWidth, valList)
    {
        var list = '<select class="form-control" style="height:30px; width:'+fieldWidth+'px" id="'+fieldId+'"  onChange="updateWidgetField(\''+fieldId+'\',this.value)">';
        for (var i=0; i<valList.length; i++)
        {
            var obj = valList[i];
            var res = obj.split("|");
            var key = res[0];
            var val = res[1];
            if (val == null) val = key;
            var selected = "";
            if (key == this.content[fieldId]) selected = " selected ";
            list += '<option value="'+key+'" '+selected+'>'+val+'</option>';
        }
        list +='</select>';
        
        var str = "";
        str +='<div style="float:left;margin-top:5px;margin-bottom: 1px;margin-right:1px;" class="input-group-sm">';
        str +='<span class="daclabel daclabel-default">'+fieldName+'</span>';
        str +='<div style="margin-top:3px;margin-bottom:0px" class="class="col-md-3" input-group-sm">';
        str += list;
        str +='</div>';
        str +='</div>';
        return str; 
 
    }
    
    this.initSelectionList=function(fieldId)
    {

    }
 
    
    this.buildSelectionListCheckBox = function(fieldId,fieldDisplayName, selectArray, checkboxName, checkboxDisplayName)
    {
        var list = '<select class="form-control" style="height:30px" id="'+fieldId+'"  onChange="updateWidgetField(\''+fieldId+'\',this.value)">';
        for (key in selectArray)
        {
            list += '<option value="'+key+'" >'+selectArray[key]+'</option>';
        }
        list +='</select>';
        
        var str = "";
        str +='<div style="float:left;margin-bottom: 15px;" class="input-group-sm">';
        str +='<span class="daclabel daclabel-default">'+fieldDisplayName+'</span>';
        str +='<span class="daclabel daclabel-default" style="float:right; margin-top: 0px; height:20px;padding-top:3px">'+checkboxDisplayName+'</span>';
        str +='<input id="'+checkboxName+'" style="font-size:20px;float:right; margin-right: 1px; " type="checkbox"  onClick="toggleBooleanField(\''+checkboxName+'\', this.checked)">';

        str +=' <div style="margin-top:5px;margin-bottom:0px" class="class="col-md-3" input-group-sm">';
        str += list;
        str +='</div>';
        str +='</div>';
        return str; 
    }
    
    this.buildFeedSelectionList = function()
    {
        var txtNewFeed = this.translationList["New Feed"];
        var feedKey0 = "select0";
        var displayName0 = this.translationList["Please select a feed"];
        var list = '<span><select class="form-control" style="width: 450px; height:28px; margin-right:10px;" id="feed_key"  onChange="updateFeedKey(\'feed_key\',this.value)">';
        list += '<option value="'+feedKey0+'" >'+displayName0+'</option>';
        var feedKey = "";
        for (i=0; i<this.feedArray.length; i++)
        {
            feed = this.feedArray[i];
            feedKey = feed["FEED_KEY"];
            feedName = feed["FEED_NAME"];   
            //displayName = feedKey+" ("+feedName+")";
            displayName = feedName+" ("+feedKey+")";
            list += '<option value="'+feedKey+'" >'+displayName+'</option>';
        }
        list +='</select>';
        //feedSource = this.findFeedSource(feedKey);
        var feedConfigUrl = 'feed_config.php?f='+this.feedSource;
        list +='<button id="new_feed_button" class="dac-btn-sm"  style="margin-top:3px;"  onclick="location.href=\''+feedConfigUrl+'\';" >'+txtNewFeed+'</button></span>';
        
        var txtFeed = this.translationList["Feed"];
        var txtLoad = this.translationList["Load"];
        var str = "";
        str +='<div style="float:left;margin-bottom: 15px;" class="input-group-sm">';
        str +='<span class="daclabel daclabel-default">'+txtFeed+'</span>';
        str +=' <div style="margin-top:5px;margin-bottom:0px" class="class="col-md-3" input-group-sm"><span>';
        str += list;
        //str +='<button id="loadButton" type="button" class="dac-btn-sm" style="float:left; margin-left:0px; margin-top:5px;"><span class="glyphicon glyphicon-refresh" style="background-color: transparent;"></span>&nbsp;'+txtLoad+'</button></span>';
        str +='</div>';
        str +='</div>';
        return str; 
    }
    
    
    this.buildCombobox = function(fieldId, fieldName, fieldWidth) //not used
    {
        if (fieldWidth == null) fieldWidth = 200;
        var str = "";
        str +='<div style="float:left;margin-top:5px;margin-bottom: 1px;margin-right:1px;" class="input-group-sm">';
        str +='<span class="daclabel daclabel-default">'+fieldName+'</span>';
        str +=' <div style="margin-top:2px;margin-bottom:0px" class="input-group-sm">';
        str +='<input class="form-control" type="text" id="'+fieldId+'" maxlength="200" style="float:left;width:'+fieldWidth+'px;height:30px" value="" onchange="updateWidgetField(\''+fieldId+'\',this.value)" ></input>';
        str +='</div>';
        str +='</div>';
        return str;  
    }
    
    this.initCombobox = function(fieldId)
    {
        var valList = this.IdValList[fieldId];
        $('#'+fieldId).combobox(valList);  
        $('#'+fieldId).val(this.content[fieldId]);
    }
    
    this.initFontTypeCombox = function(fieldId)
    {
       $(fieldId).combobox([
           'Arial',
           'Bradley Hand ITC',
           'Calibri',
           'Cambria',
           'Century Gothic',
           'Comic Sans MS',
           'Times New Roman',
           'Verdana'
       ]);  
    }
  
    this.buildOverlay = function(fieldId, fieldName)
    {
        var txtOverlayColor = fieldName + " " + this.translationList["Color"];
        var txtOverlayAlpha  = fieldName + " " + this.translationList["Alpha"];
        var overlayColor = this.buildColorPicker(fieldId+"_color",txtOverlayColor,"float:left;margin-right: 10px;margin-bottom: 20px");
        var overlayAlpha = this.buildAlphaPicker(fieldId+"_alpha",txtOverlayAlpha);
        var str = "";
        str += '<div style="margin-top:5px;">'+overlayColor+overlayAlpha+'</div>';
        return str;
    }
    
    this.initOverlay=function(fieldId)
    {
        this.initStandardColorPicker(fieldId+'_color',true);

        $('#'+fieldId+'_color').spectrum('set', this.content[fieldId+'_color']);
        $('#'+fieldId+'_alpha').val(this.content[fieldId+'_alpha']);

        _this.addEventHandlerUpdateWidgetField(fieldId, 'input');
        _this.addEventHandlerUpdateWidgetField(fieldId, 'select');

    }

    
    this.buildAlphaPicker = function(fieldId,fieldName)
    {
        //begin image alpha //
	var str ='<div style="float:left;margin-bottom:10px;">';
	str +='<span class="daclabel daclabel-default" >'+fieldName+'</span>';
	str +='<div style="margin-top:3px;">';
	//str +='<select id="'+fieldId+'" onChange="updateWidgetField(\''+fieldId+'\',(parseInt(this.options[this.selectedIndex].value))/10)">';
	str +='<select style="height:28px;" id="'+fieldId+'" onChange="updateWidgetField(\''+fieldId+'\',this.options[this.selectedIndex].value)">';
	//str +='<option value="0">0% (Completely Transparent)</option>';
        str +='<option value="0">0%</option>';
	str +='<option value="0.1">10%</option>';
	str +='<option value="0.2">20%</option>';
	str +='<option value="0.3">30%</option>';
	str +='<option value="0.4">40%</option>';
	str +='<option value="0.5">50%</option>';
	str +='<option value="0.6">60%</option>';
	str +='<option value="0.7">70%</option>';
	str +='<option value="0.8">80%</option>';
	str +='<option value="0.9">90%</option>';
	//str +='<option value="1">100% (Not Transparent At All)</option>';
	str +='<option value="1">100%</option>';
	str +=' </select>';
	str +='</div>';
	str +='</div> ';
        return str;
        //end image alpha //  
        
    }
    
    this.buildDatePicker = function(fieldId,fieldName,displayFormat,fontType,fontSize,color,bold,italic,align)
    {
        var formatStr = ""; 
        if (displayFormat == "std")
        {
            var txtDisplayFormat = this.translationList["Date Display Format Like"];
            formatStr =  this.buildDateFormatSelection(fieldId, txtDisplayFormat);
        }

        var str = "";

        //str += '<div>';
        str +='<div style="float:left;margin-top: 0px; margin-right: 10px;margin-bottom: 10px;">';
        str +='<span class="daclabel daclabel-default"">'+fieldName+'</span>';
        str +='<div style="margin-top:2px;">';
        str +='<input style="width:100px;height:30px;  padding:6px;" type="text" id="'+fieldId+'_date"  onchange="updateWidgetField(\''+fieldId+'_date\',this.value);" >';
        str += formatStr;
        if (fontType!=null || fontSize!=null  || color!=null || bold!=null || italic!=null || align!= null)
        {
            str += this.buildTextStyle(fieldId+"_date",null, fontType,fontSize,color,bold,italic,align);
        }
        
        str +='</div>';


        str +='</div>';

       // str +='</div>';
        
        return str;              
    }
    
    this.initDatePicker=function(fieldId)
    {
        $('#'+fieldId+'_date').datepicker();
        $('#'+fieldId+'_date').datepicker("option", "dateFormat","mm/dd/yy");
        $('#'+fieldId+'_date').datepicker("setDate", new Date(this.content[fieldId+'_date']) );
        
        _this.initTextStyle(fieldId+"_date");
        _this.addEventHandlerUpdateWidgetField(fieldId, 'input');
        _this.addEventHandlerUpdateWidgetField(fieldId, 'select');

    }
    
    this.buildTimePicker = function(fieldId,fieldName,displayFormat,fontType,fontSize,color,bold,italic,align)
    {
        var formatStr = ""; 
        if (displayFormat == "std")
        {
            var txtDisplayFormat = this.translationList["Time Display Format Like"];
            formatStr =  this.buildTimeFormatSelection(fieldId, txtDisplayFormat);
        }

        var str = "";

        str +='<div style="float:left;margin-top: 0px; margin-right: 10px;margin-bottom: 10px;">';
        str +='<span class="daclabel daclabel-default">'+fieldName+'</span>';
        str +='<div style="margin-top:-2px;">';
        str +='<input style="height:30px;" type="time" id="'+fieldId+'_time"  name="hrs1" placeholder="hrs:mins" value="00:00" pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?" class="inputs duration t1 time hrs" required="">';
        str += formatStr;
        if (fontType!=null || fontSize!=null  || color!=null || bold!=null || italic!=null || align!= null)
        {
            str += this.buildTextStyle(fieldId+"_time",null, fontType,fontSize,color,bold,italic,align);
        }
        
        str +='</div>';


        str +='</div>';

        
        return str;         
    }
    
    this.initTimePicker=function(fieldId)
    {
        _this.initTextStyle(fieldId+"_time");
        _this.addEventHandlerUpdateWidgetField(fieldId, 'input');
        _this.addEventHandlerUpdateWidgetField(fieldId, 'select');
    }

    this.buildDateTimePicker = function(fieldId,fieldName,displayFormat,fontType,fontSize,color,bold,italic,align)
    {
        var formatStr = ""; 
        if (displayFormat == "std")
        {
            var txtDisplayFormat = this.translationList["Date Time Display Format Like"];
            formatStr =  this.buildDateTimeFormatSelection(fieldId, txtDisplayFormat);
        }

        var str = "";

        //str += '<div>';
        str +='<div style="float:left;margin-top: 0px; margin-right: 10px;margin-bottom: 10px;">';
        str +='<span class="daclabel daclabel-default"">'+fieldName+'</span>';
        str +='<div style="margin-top:-2px;">';
        str +='<input style="width:100px;height:30px;  padding:6px;" type="text" id="'+fieldId+'_date"  onchange="updateWidgetField(\''+fieldId+'_date\',this.value);" >';
        str +=' <input style="height:30px;" type="time" id="'+fieldId+'_time"  name="hrs1" placeholder="hrs:mins" value="00:00" pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?" class="inputs duration t1 time hrs" required="">';
        str += formatStr;
        if (fontType!=null || fontSize!=null  || color!=null || bold!=null || italic!=null || align!= null)
        {
            str += this.buildTextStyle(fieldId+"_datetime",null, fontType,fontSize,color,bold,italic,align);
        }
        
        str +='</div>';


        str +='</div>';

       // str +='</div>';
        
        return str;             
    }
    
    this.initDateTimePicker=function(fieldId)
    {
        $('#'+fieldId+'_date').datepicker();
        $('#'+fieldId+'_date').datepicker("option", "dateFormat","mm/dd/yy");
        $('#'+fieldId+'_date').datepicker("setDate", new Date(this.content[fieldId+'_date']) );
        $('#'+fieldId+'_time').attr('value', this.content[fieldId+'_time']);
    
        _this.initTextStyle(fieldId+"_datetime");
        
        _this.addEventHandlerUpdateWidgetField(fieldId, 'input');
        _this.addEventHandlerUpdateWidgetField(fieldId, 'select');
    }
    
 /////////////////////////////////
    this.buildDateFormatSelection = function(fieldId,fieldName)
    {
        var str = "";

        str +='<div style="float:left;margin-top: -48px; margin-left:220px;margin-bottom: 10px;">';
        str +='<span class="daclabel daclabel-default">'+fieldName+'</span>';
        str +=' <div style="margin-top:3px;">';
        str +=' <select style="height: 30px;" id="'+fieldId+'_date_format" onChange="updateWidgetField(\''+fieldId+'_date_format\''+',this.options[this.selectedIndex].value)">';
        str +=' <option value="mmmm/dd/yyyy">December 25, 2016</option>';
        str +=' <option value="mmm/dd/yyyy">Dec 25, 2016</option>';
        str +=' <option value="eeee,mmmm/dd/yyyy">Sunday, December 25, 2016</option>';
        str +=' <option value="eee,mmm/dd/yyyy">Sun, Dec 25, 2016</option>';
        str +=' <option value="mm/dd/yyyy">12/25/2016</option>';
        str +=' <option value="dd/mm/yyyy">25/12/2016</option>';
        str +=' <option value="yyyy-mm-dd">2016-12-25</option>';

        str +=' </select>';
        str +='</div>';

        str +='</div>';
        return str;             
    }


    this.buildTimeFormatSelection = function(fieldId,fieldName)
    {
        var str = "";

        str +='<div style="float:right;margin-top: -14px; margin-left:10px;margin-bottom: 10px;">';
        str +='<span class="daclabel daclabel-default">'+fieldName+'</span>';
        str +=' <div style="margin-top:3px;">';
        str +=' <select style="height: 30px;" id="'+fieldId+'_time_format" onChange="updateWidgetField(\''+fieldId+'_time_format\''+',this.options[this.selectedIndex].value)">';

        str +=' <option value="h12:mi">02:00 PM</option>';
        str +=' <option value="h12:mi:ss">02:00:00 PM</option>';
        str +=' <option value="h24:mi">14:00</option>';
        str +=' <option value="h24:mi:ss">14:00:00</option>';

        str +=' </select>';
        str +='</div>';

        str +='</div>';
        return str;             
    }

    this.buildDateTimeFormatSelection = function(fieldId,fieldName)
    {
        var str = "";
        //str +='<div style="float:right;margin-top: 5px;margin-bottom: 5px;" >';
        str +='<div style="float:left;margin-top: -58px; margin-left:220px;margin-bottom: 10px;">';
        str +='<span class="daclabel daclabel-default">'+fieldName+'</span>';
        str +=' <div style="margin-top:3px;">';
        str +=' <select style="height: 30px;" id="'+fieldId+'_datetime_format" onChange="updateWidgetField(\''+fieldId+'_datetime_format\''+',this.options[this.selectedIndex].value)">';
        str +=' <option value="mmmm/dd/yyyy">December 25, 2016</option>';
        str +=' <option value="mmm/dd/yyyy">Dec 25, 2016</option>';
        str +=' <option value="eeee,mmmm/dd/yyyy">Sunday, December 25, 2016</option>';
        str +=' <option value="eee,mmm/dd/yyyy">Sun, Dec 25, 2016</option>';
        str +=' <option value="mmmm/dd/yyyy h12:mi">December 25, 2016 02:00pm</option>';
        str +=' <option value="mmm/dd/yyyy h12:mi">Dec 25, 2016 02:00pm</option>';
        str +=' <option value="eee,mmm/dd/yyyy h12:mi">Sun, Dec 25, 2016 02:00pm</option>';
        str +=' <option value="mm/dd/yyyy">12/25/2016</option>';
        str +=' <option value="mm/dd/yyyy h12:mi">12/25/2016 02:00pm</option>';
        str +=' <option value="dd/mm/yyyy">25/12/2016</option>';
        str +=' <option value="dd/mm/yyyy h12:mi">25/12/2016 02:00pm</option>';
        str +=' <option value="yyyy-mm-dd">2016-12-25</option>';
        str +=' <option value="yyyy-mm-dd h12:mi">2016-12-25 02:00pm </option>';

        str +=' </select>';
        str +='</div>';

        str +='</div>';
        return str;             
    }
    
    this.buildInputGroup = function(field1Id, field1Name, field1Width
            ,field2Id, field2Name, field2Width
            ,field3Id, field3Name, field3Width
            ,field4Id, field4Name, field4Width )
    { 
        //txtFontStyle = this.translator->translate("Font Style");
        var str = "";
        str +='<div style="float:left;margin-bottom: 15px;" >';
	str +='<span class="daclabel daclabel-default">'+field1Name+'</span>';
        str +='<div style="margin-top:5px;margin-bottom:0px;margin-right:10px" >';
	str +='<input class="form-control" type="text" id="'+field1Id+'" style="width:'+field1Width+'px; height:30px" value="" size="'+field1Width+'" maxlength="200"></input>';
        str +='</div>';
        str +='</div>';
        
        str +='<div style="float:left;margin-bottom: 15px;" >';
	str +='<span class="daclabel daclabel-default">'+field2Name+'</span>';
        str +='<div style="margin-top:5px;margin-bottom:0px;margin-right:10px" >';
	str +='<input class="form-control" type="text" id="'+field2Id+'" style="width:'+field2Width+'px; height:30px" value="" size="'+field2Width+'" maxlength="200"></input>';
        str +='</div>';
        str +='</div>';

        str +='<div style="float:left;margin-bottom: 15px;" >';
        str +='<span class="daclabel daclabel-default">'+field3Name+'</span>';
        str +='<div style="margin-top:5px;margin-bottom:0px;margin-right:10px" >';
	str +='<input class="form-control" type="text" id="'+field3Id+'" style="width:'+field3Width+'px; height:30px" value="" size="'+field3Width+'" maxlength="200"></input>';
        str +='</div>';
        str +='</div>';
        
        str +='<div style="float:left;margin-bottom: 15px;" >';
        str +='<span class="daclabel daclabel-default">'+field4Name+'</span>';
        str +='<div style="margin-top:5px;margin-bottom:0px;margin-right:10px" >';
	str +='<input class="form-control" type="text" id="'+field4Id+'" style="width:'+field4Width+'px; height:30px" value="" size="'+field4Width+'" maxlength="200"></input>';
        str +='</div>';
        str +='</div>';

        return str;
    }
    
    
    this.buildDropzone = function(fieldId,fieldName,fieldType, selectOption,maxAssets,thumbnail, useCheckBox) //id should be field name
    {
        var txtAssetBrowser = this.translationList["Select from Server"];
        var txtUpload = this.translationList["Upload from Local Drive"];
        var txtImageAlpha = this.translationList["Image Alpha"];
        var str = "";
        if (useCheckBox === true)  
        {
            str +='<div style="margin-top:5px; margin-bottom:4px;">';
            str +='<input id="'+fieldId+'_flag" style="font-size:20px;" type="checkbox" checked onClick="toggleBooleanField(\''+fieldId+'_flag\', this.checked)">';
            str +='<span class="daclabel daclabel-default" >'+fieldName+'</span>';
            str +='</div>';
        }
        else 
        {
            str +='<div style="margin-top:5px;"><span class="daclabel daclabel-default" style="float: left;">'+fieldName+'</span></div>';
        }

	str +='<div style="float: left" id="dropzone_'+fieldId+'">';

	str +='<div class="dropzone-previews" style="width:440px; margin-top:0px;margin-left:6px">';
	str +='<div class="dz-preview dz-processing dz-success dz-image-preview" style="float:left;  margin-left:0px; width:114px; height:114px; margin-top:0px;">'; 
        
	str +='<div class="dz-details" style="float:left">';
	//str +='<div class="dz-filename"><span data-dz-name=""></span></div>';    

	str +='<img data-dz-thumbnail="" id="dropzone_'+fieldId+'_placeholder" alt="" src="'+thumbnail+'">';  
	str +='</div>';  
	str +='</div>'; 

	str +='<div style="float:right; width:230px; margin-right:75px; display: inline-block;">';
	str +='<div><button type="button" style="width:180px;" class="dac-btn-sm" id="dropzone_'+fieldId+'_upload">'+txtUpload+'</button>';
	str +='<button type="button" style="width:180px;" class="dac-btn-sm" id="dropzone_'+fieldId+'_assetbrowser" onclick=openAssetBrowserPopup("'+fieldId+'","'+fieldType+'","'+selectOption+'","'+maxAssets+'")>'+txtAssetBrowser+'</button>';
	str +='</div>';
      
        
	str +='<div id="dropzone_'+fieldId+'_fileName" style="margin-top:10px;margin-bottom:0px; word-break: break-all;"></div>';
	str +='<div class="dz-size" data-dz-size="" id="dropzone_'+fieldId+'_fileType"></div>';
	str +='<div class="dz-size" data-dz-size="" id="dropzone_'+fieldId+'_resolution"></div>';
	str +='</div>';
       
        
	str +='</div>';
	str +='</div>';
        
        return str; 
    }
    
    this.initDropzone = function(fieldId)
    {
        initUploadDropzone(fieldId, 500, ".jpg, .png");
    }
    
    this.buildHRline = function()
    {
        var str='<hr style = "width:100%; border: 0; height: 2px;  background: #333; background-image: linear-gradient(to right, #ccc, #998888, #eee);">';
        return str;
    }
    
    
    this.buildBackgroundTheme = function()
    {
        var txtBackgroundTheme = this.translationList["Background Theme"];
        var str = "";
        str +='<div style="float:left; margin-left:10px;margin-right:10px;">';
        str +='<span class="daclabel daclabel-default" >'+txtBackgroundTheme+' </span>';
        str +='<div style="margin-top:3px;">';
        str +='<select id="background_theme" style="height:28px;" onChange="updateWidgetField(\'background_theme\',(this.options[this.selectedIndex].value))">';
        str +='<option value="0">Solid Color</option>';
        str +='<option value="motion_gradient">Motion Gradient</option>';
        str +='<option value="sliding_gradient">Sliding Gradient</option>';
        str +='<option value="sliding_bars">Sliding Bars</option>';
        str +='<option value="sliding_bars_spacing">Sliding Bars with Spacing</option>';
        str +='<option value="falling_snow">Falling Snow</option>';
        str +='<option value="bouncing_balls">Bouncing Balls</option>';
        str +='<option value="falling_bubbles">Falling Bubbles</option>';
        str +='<option value="rising_bubbles">Rising Bubbles</option>';
        str +='<option value="lightbeam">Light Beams</option>';
       // str +='<option value="abstract_triangle">abstract_triangle</option>';
        str +='</select>';
        str +='</div>';
        str +='</div>';
        return str;
    }

// Standard Background with overlay = true/false
    this.buildStanardBackgroundTab = function(overlay)
    {
        //var overlay = tab["overlay"];
        var txtBackground = this.translationList["Background"];
        var txtBackgroundImage = this.translationList["Background Image"];
        var txtBackgroundAlpha = this.translationList["Background Alpha"];
        var txtBackgroundTheme = this.translationList["Background Theme"];
        var txtBackgroundColor = this.translationList["Background Color"];
        var txtUpload = this.translationList["Upload"];
        var txtAssetBrowser = this.translationList["Select"];
        var txtOverlayColor = this.translationList["Overlay Color"];
        var txtOverlayAlpha = this.translationList["Overlay Alpha"];

        var hrLine = this.buildHRline();
        var thumbnail = null;
        var dropZoneBackgroundImage = this.buildDropzone("background_image",txtBackgroundImage, "image","single",1, thumbnail, true); //hide display name

        var backgroundImageAlpha = this.buildAlphaPicker("background_alpha",txtBackgroundAlpha);
        var backgroundTheme= this.buildBackgroundTheme();
        var backgroundColor = this.buildColorPicker("background_color",txtBackgroundColor,"float:left; margin-left: 10px; margin-right: 10px; margin-bottom: 20px;");

        var bgStr = dropZoneBackgroundImage+backgroundImageAlpha+backgroundTheme+backgroundColor;
        var str = "";
        if (overlay == true)
        {
            overlayColor = this.buildColorPicker("overlay_color",txtOverlayColor,"float:left;margin-right: 10px;margin-bottom: 20px");
            overlayAlpha = this.buildAlphaPicker("overlay_alpha",txtOverlayAlpha);
            str = '<h3>&nbsp;&nbsp;&nbsp;'+txtBackground+'</h3>';
            str += '<div>'+bgStr+hrLine+overlayColor+overlayAlpha+'</div>';
        }
        else 
        {
            str = '<h3>&nbsp;&nbsp;&nbsp;'+txtBackground+'</h3>';
            str += '<div>'+bgStr+'</div>';
        }
        return str;
    }


    this.initStandardBackgroundTab = function()
    {
        initUploadDropzone("background_image", 500, ".jpg, .png");
        $('#background_image_flag').attr('checked', this.content["background_image_flag"]);
        if (this.content["background_theme"] == undefined) this.content["background_theme"] = "0"
        $("#background_theme").val(this.content["background_theme"]);

        if (this.content["background_alpha"] == undefined) this.content["background_alpha"] = "1"
        $("#background_alpha").val(this.content["background_alpha"]);

        this.initStandardColorPicker("background_color", true);
        $("#background_color").spectrum("set", this.content["background_color"]);
        
        if (this.hasBackgroundOverlay == true)
        {
            this.initStandardColorPicker("overlay_color",true);
            $("#overlay_color").spectrum("set", this.content.overlay_color);
            $('#overlay_alpha').val(this.content.overlay_alpha);
        }
    }
    
    this.buildCalendarEventSelection = function()
    {
        var txtDisplayOption = this.translationList["Event Filter"];
        var checkboxDisplayName = this.translationList["Exclude Expired Events"];
        var selectArray = [];
        selectArray["all_events"] = this.translationList["Display All Events"];
        selectArray["today_only"] = this.translationList["Display Events for Today Only"];
        selectArray["tomorrow_only"] = this.translationList["Display Events for Tomorrow Only"];
        selectArray["this_week_only"] = this.translationList["Display Events for This Week Only"];
        selectArray["this_month_only"] = this.translationList["Display Events for This Month Only"];
        var str = this.buildSelectionListCheckBox("display_option",txtDisplayOption, selectArray, "exclude_expired", checkboxDisplayName);
 
        return str;
    }

// build QR Tab
    this.buildQRCodeTab = function()
    {
        var txtQRCode =this.translationList["QR Code"];
        var txtQRCodeWidget = this.translationList["Use Widget URL"];
        var txtQRCodeMesg = this.translationList["Use Text or URL entered below"];
        var txtQRCodeMesg2 = this.translationList["Enter Text or URL for your QR Code"];
        var txtShowQRCode = this.translationList["Show QR Code"];

        var txtQRCodeColor = this.translationList["QR Code Color"];
        
        var str = '<h3>&nbsp;&nbsp;&nbsp;'+txtQRCode+'</h3>';
        
        str +='<div style="float:left;margin-bottom: 15px;" >';
	//str +='<input id="qr_option_widget" style="font-size:20px;float:left; margin-right: 1px; " type="radio" checked name="qr_option" onClick="updateWidgetField(\'qr_option\', \'mesg\')"><span class="daclabel daclabel-default" style=" margin-right: 10px;">'+txtQRCodeWidget+'</span> ';
	//str +='<input id="qr_option_mesg" style="font-size:20px; margin-right: 1px;" type="radio" name="qr_option" onClick="updateWidgetField(\'qr_option\', \'mesg\')"><span class="daclabel daclabel-default">'+txtQRCodeMesg+'</span> ';
        str +='<span class="daclabel daclabel-default">'+txtQRCodeMesg2+'</span> ';
        str +='<span class="daclabel daclabel-default" style="float:right; margin-top: 0px; height:20px;padding-top:3px">'+txtShowQRCode+'</span>';
        str +='<input id="qr_flag" style="font-size:20px;float:right; margin-right: 1px; " type="checkbox"  onClick="toggleBooleanField(\'qr_flag\', this.checked)">';

        
        str +='<div style="margin-top:5px;margin-bottom:10px" >';
	//str +='<input class="form-control" type="text" id="qr_text" onchange="updateWidgetField(\'qr_text\',this.value);"/ style="width:100%; height:30px" value="" size="200" maxlength="200"></input>';
	str +='<input class="form-control" type="text" id="qr_text"  style="width:100%; height:30px" value="" size="200" maxlength="200"></input>';
        str +='</div>';
        
        var divStyle="float:left;margin-top: 0px; margin-right: 10px;margin-bottom: 10px;";

        var fieldId = "qr_color";
        str +='<div style="'+divStyle+'">';
	str +='<span class="daclabel daclabel-default">'+txtQRCodeColor+'</span> ';
        str +=' <div style="margin-top:5px;">';
        str +='<input type="text" id="'+fieldId+'"  onchange="updateWidgetField(\''+fieldId+'\',this.value);"/>';
        str +='</div>';
        str +='</div>';
        str +='</div>';

        //str += this.buildTextInputCheckboxOption("qr_code", txtQRCodeMesg, false,false,false, false,false, "rq_flag", txtShowQRCode);

        return str;
    }
    
    
    this.initQRCode = function()
    {
        // QR code //
        if (this.content.qr_text == undefined) this.content.qr_text = "http://www.dynasign.net"
        $('#qr_text').attr('value', this.content.qr_text);

        this.initColorPicker("qr_color", this.qrCodePalette, true);
        $("#qr_color").spectrum("set", this.content.qr_color);	
        $('#qr_flag').attr('checked', this.content.qr_flag);

        if (this.content.qr_option == "widget")
            $('#qr_option_widget').attr('checked', true);
        else
            $('#qr_option_mesg').attr('checked', true);
        
        $( "#qr_text" ).on('input', function() {

            _this.addEventHandlerUpdateWidgetField("qr_text", "input");
        });
    
    }


    // widget size tab
    this.buildWidgetSizeTab = function ()
    {
        var zone_width = this.content["zone_width"];
        var zone_height = this.content["zone_height"];
        var zone_size_str = zone_width + '|' + zone_height;
        var str = '<h3>&nbsp;&nbsp;&nbsp;'+this.translationList["Widget Size"]+'</h3><div>';
        str += '<div class=\"dropdown2\">'; // if using "dropdown" will lead to dropdown problem
        str += '<span><input id="input_zone_width" maxlength="5" style="width:60px; height:30px;"  value="'+zone_width+'"></input> x <input id="input_zone_height" maxlength="5" style="width:60px;height:30px;" value="'+zone_height+'"></input></span>';
        str += '<button class="btn" data-toggle="dropdown"  style="color: #CCCCCC; min-width: 30px; width: 33px;">';
        str += '<span class="caret" style="color:#333333"></span></button>';

        str += '<ul class="dropdown-menu list-dropdown-menu" style="margin-left: 30px; margin-top:-128px;">';
        str += '<li><a href="#" onclick="changeZoneSize(\'3840|2160\');">3840 x 2160 (landscape)</a></li>';
        str += '<li><a href="#" onclick="changeZoneSize(\'1920|1080\');">1920 x 1080 (landscape)</a></li>';
        str += '<li><a href="#" onclick="changeZoneSize(\'1280|720\');">1280 x 720 (landscape</a></li>';
        str += '<li><a href="#" onclick="changeZoneSize(\'2160|3840\');">2160 x 3840 (portrait)</a></li>';
        str += '<li><a href="#" onclick="changeZoneSize(\'1080|1920\');">1080 x 1920 (portrait)</a></li>';
        str += '<li><a href="#" onclick="changeZoneSize(\'720|1280\');">720 x 1280 (portrait)</a></li>';

        str += '</ul>';
        
        str += '<div style="float:right;margin-right:230px;"><button type="button" class="dac-btn-sm" onclick=\'changeZoneSize($("#input_zone_width").val()+"|"+$("#input_zone_height").val())\'>'+this.translationList["Set Size"]+'</button></div>';

        str += '<div style="margin-top:10px;">'+this.translationList["Set the widget size to be the same as the zone size on screen"]+'</div>';
        str += '</div>';
  
        str += '</div>';
        
        return str;  

    }
    
    // widget price and license tab
    this.buildWidgetPriceLicenseTab = function()
    {
        //var unitPrice = dac_util_DSPrice::getWidgetVolumeDiscountUnitPrice(priceJson, licensedPlayers);
        var txtWidgetPrice = this.translationList["Widget Price and Licensed Devices"];
        var txtLicensedPlayers = this.translationList["Number of Devices You Like to Play this Widget on"];
        var txtUnitPrice = this.translationList["Unit Price"];
        var txtYourUnitPrice = this.translationList["Your Unit Price After Discount"];
        var txtVolumeDiscount= this.translationList["Volume Discount"];
        var txtTotalWidgetPrice= this.translationList["Total Monthly Price"];
        
        var txtNote = this.translationList["Unit price is per month per device. Volume discount is based on the number of devices"];
        

        var str = '<h3>&nbsp;&nbsp;&nbsp;'+txtWidgetPrice+'</h3>';

        str +='<div style="float:left;margin-bottom: 15px;" >';

        str = "";
        str+='<div style="float:left; margin-left: 0px;">';
        str +='<span class="daclabel daclabel-default" >'+txtLicensedPlayers+' </span>';
        str +='<div style="margin-top:5px;">';

        str +='<div class="col-md-1 input-group-sm" >';
        str +='<div class="input-group">';
        str +='<span class="input-group-btn">';
        str +='<button id="licensed_players_minus" type="button" class="btn btn-default btn-number"  data-type="minus" data-field="quant[1]" style="margin-left:-14px">';
        str +='<span class="glyphicon glyphicon-minus"></span>';
        str +='</button>';
        str +='</span>';
        str +='<input type="text" name="quant[1]" class="form-control input-number" id="licensed_players" value="1" min="1" max="99999">';
        str +='<span class="input-group-btn">';
        str +='<button id="licensed_players_plus"  type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">';
        str +='<span class="glyphicon glyphicon-plus"></span>';
        str +=' </button>';
        str +='</span>';
        str +='</div>';
        str +='</div>';
        str +='</div>';
        str +='</div>';
        var licensePlayersStr = str;
   
        var unitPriceStr = "";
        unitPriceStr+='<div style="float:left; margin-left: 0px; margin-top: 10px;">';
        unitPriceStr +='<span class="daclabel daclabel-default" >'+txtUnitPrice+' </span>';
        unitPriceStr +='<div style="margin-top:5px;">';
        unitPriceStr +='<input type="text"  class="form-control" id="unit_price" value="0" readonly="readonly"  style="text-align: right; width:62px" /> ';
        unitPriceStr +='</div>';
        unitPriceStr +='</div>';
        
        var discountStr = "";
        discountStr+='<div style="float:left; margin-left: 10px; margin-top: 10px;">';
        discountStr +='<span class="daclabel daclabel-default" >'+txtVolumeDiscount+' </span>';
        discountStr +='<div style="margin-top:5px;">';
        discountStr +='<input type="text"  class="form-control" id="volume_discount" value="0%" readonly="readonly"  style="text-align: right; width:62px" /> ';
        discountStr +='</div>';
        discountStr +='</div>';
        
        var yourUnitPirceStr = "";
        yourUnitPirceStr+='<div style="float:left; margin-left: 10px; margin-top: 10px;">';
        yourUnitPirceStr +='<span class="daclabel daclabel-default" >'+txtYourUnitPrice+' </span>';
        yourUnitPirceStr +='<div style="margin-top:5px;">';
        yourUnitPirceStr +='<input type="text"  class="form-control" id="your_unit_price" value="0%" readonly="readonly"  style="text-align: right; width:62px" /> ';
        yourUnitPirceStr +='</div>';
        yourUnitPirceStr +='</div>';
        
        var totalPriceStr = "";
        totalPriceStr+='<div style="float:left; margin-left: 10px; margin-top: 10px;">';
        totalPriceStr +='<span class="daclabel daclabel-default" >'+txtTotalWidgetPrice+' </span>';
        totalPriceStr +='<div style="margin-top:5px;">';
        totalPriceStr +='<input type="text"  class="form-control"  id="total_widget_price" value="2" readonly="readonly"  style="color:#9C0000;  margin-left:0px; text-align: right; width:100px" /> ';
        totalPriceStr +='</div>';
        totalPriceStr +='</div>';
        
        var hrStr='<hr style = "width:100%; border: 0; height: 2px;  background: #fff;">';
        var noteStr = '<span class="daclabel daclabel-default" style="float:left; margin-left: 0px; margin-bottom: 0px; margin-top: 0px;" >'+txtNote+'</span>';
        
        //volumeDiscount = "5 - 24: 10% off, 25 - 49: 20% off, 50 - 99: 28% off, <br> 100 - 499: 35% off, 500 - 999: 50% off, 1000 or more: 60% off";
        
       // volumeDiscountHtml = '<span style="float:left; margin-left: 0px; margin-bottom: 0px; margin-top: 3px; color: #FF8822" >'+volumeDiscount+'</span>';
        
        var str = '<h3>&nbsp;&nbsp;&nbsp;'+txtWidgetPrice+'</h3>';
        str += '<div>'+licensePlayersStr+unitPriceStr+discountStr+yourUnitPirceStr+totalPriceStr+hrStr+noteStr+'</div>';
        
        this.addInitEvent("initWidgetPriceLicense", "");

        return str;
    }
    
    this.initWidgetPriceLicense = function()
    {
        //if (this.content["licensed_players"] == null) this.content["licensed_players"] = 1;
       // $("#licensed_players").val(this.content["licensed_players"]);

        $("#licensed_players_minus").on('click', function() {
            //console.log("click on minus...........................................")
            var input = $("#licensed_players");
            var currentVal = parseInt(input.val());
            //console.log("before minus currentVal="+currentVal);
            if (!isNaN(currentVal)) {

                if(currentVal > input.attr('min')) {
                    newVal = currentVal - 1;
                    input.val(newVal);
                    changeLicensedPlayers();
                } 
                if(parseInt(input.val()) == input.attr('min')) {
                   //$("#licensed_players_minus").attr('disabled', true);
                }
            }
        });

        $("#licensed_players_plus").on('click', function() {
           // console.log("click on plus...........................................")
            var input = $("#licensed_players");
            var currentVal = parseInt(input.val());
            //console.log("before plus currentVal="+currentVal);

            if (!isNaN(currentVal)) {

                if(currentVal < input.attr('max')) {
                    newVal = currentVal + 1;
                    input.val(newVal);
                    //$("#licensed_players_minus").attr('disabled', false);
                    changeLicensedPlayers();
                }
                if(parseInt(input.val()) == input.attr('max')) {
                    //$(this).attr('disabled', true);
                    //$("#licensed_players_plus").attr('disabled', true);
                }
            }

        });

        var el = document.getElementById("licensed_players");
        el.addEventListener("keydown", function (e) {
                // Allow: backspace, delete, tab, escape, enter and .

                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                     // Allow: Ctrl+A
                    (e.keyCode == 65 && e.ctrlKey === true) || 
                     // Allow: home, end, left, right
                    (e.keyCode >= 35 && e.keyCode <= 39)) {
                         // let it happen, don't do anything
                         return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    console.log("stop the keypress "+e.keyCode);
                    changeLicensedPlayers();
                    e.preventDefault();
                }
            });
            
        $("#licensed_players").change(function() 
        {
            changeLicensedPlayers();
        });
            
            //
            //
          
    }
    
    
    this.findFeedSource = function(feedKey,  global_feed_map)
    {
       //global_dss3ac_root;
        //global_feed_map; //global_feed_map = array("twitter"=>"TW", "yelp"=>"YP", "insta"=>"IN", "googlecal"=>"GC", "facebook"=>"FB");
        

        feedSourceCode = substr(feedKey, 0, 2);
        feedSource = "";
        for ( key in global_feed_map) {

            if (global_feed_map[key] == feedSourceCode)
            {

                feedSource = key;
            }
        }
        return feedSource;
    }
    
    
    // event handler ///////////////////////////////
    this.addEventHandlerUpdateWidgetField = function(fieldId, eventName)
    {
        var el = document.getElementById("accordion");
        el.addEventListener(eventName, function(){updateWidgetField(fieldId,$( "#"+fieldId ).val())}, false);
    }


    this.getPreviewContentObj = function(contentString){
        var obj = jQuery.parseJSON(contentString);
        var contentObj = obj.dac_widget+content;
        var assets = contentObj.dac_assets;
        var jsonString = JSON.stringify(contentObj);
        var str = "";
        for (var i=0;i<assets+length;i++){
            var fieldId = assets[i]+field_name;
            var displayName = assets[i]+display_name;
            var location = assets[i]+location; 
            str += ",\""+fieldId+"\":{\"location\":\""+location+"\",\"display_name\":\""+displayName+"\"}";
        }
        jsonString = jsonString.substring(0,jsonString+lastIndexOf("}"));
        jsonString = jsonString+str+"}";
        contentObj = JSON.parse(jsonString);
        return contentObj;
    }
    
    this.getContentObject = function(contentString){
        var obj = jQuery.parseJSON(contentString);
        var contentObj = obj.dac_widget+content;
        var assets = contentObj.dac_assets;
        var jsonString = JSON.stringify(contentObj);
        var str = "";
        for (var i=0;i<assets.length;i++){
            var fieldId = assets[i]+field_name;
            var displayName = assets[i]+display_name;
            var location = assets[i]+location; 
            str += ",\""+fieldId+"\":{\"location\":\""+location+"\",\"display_name\":\""+displayName+"\"}";
        }
        jsonString = jsonString+substring(0,jsonString+lastIndexOf("}"));
        jsonString = jsonString+str+"}";
        contentObj = JSON.parse(jsonString);
        return contentObj;
    };


}
