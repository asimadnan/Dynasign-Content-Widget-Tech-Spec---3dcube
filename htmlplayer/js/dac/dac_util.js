/////////////////////////////////////////////////	 
// v=20151003-3
/////////////////////////////////////////////////
function DacUtil() 
{
    this.protocol=window.location.protocol;
    this.host=location.host;
    this.host = this.host.replace("pub.dynasign.net", "player.dynasign.net");
    this.assetAPI = this.protocol+"//"+this.host+"/api/dac/1.0/resources/asset";
    this.assetProxy = this.protocol+"//"+this.host+"/dac/asset_proxy.php";

    var _this = this;
		

    this.setFullWidgetAsset= function(fullWidget, fieldName, location, displayName, mimeType, resolution, download, source, accountNo)
    {
        var assetId  = "w"+fullWidget.wid+"-"+fullWidget["widget"]["dac_widget"]["header"]["template"]+"-"+fieldName;
        fullWidget["widgetAsset"][assetId]=this.assetAPI + "?dkey="+accountNo+"-ABCDEF&asset=" + location;
        var content = fullWidget["widget"]["dac_widget"]["content"];
        fullWidget["widget"]["dac_widget"]["content"] = this.setAsset(content, fieldName, location, displayName, mimeType, resolution, download, source)
        return fullWidget;
    }


    this.getDacAsset = function(content, fname, accountNo)
    {
        var assets = content.dac_asset;
        if (assets == null) return null;
        var contentJson = JSON.stringify(content);
        //alert("getPreviewAsset contentJson ="+contentJson);
        var str = "";
        var dac_asset = new Array;
        for(var i=0;i< assets.length;i++){
            var fieldName = assets[i].field_name;
            if (fname == fieldName)
            {
                //alert("getPreviewAsset fname="+fname);
                var displayName = assets[i].display_name;
                var location = assets[i].location; 

                //alert("getPreviewAsset location="+location);
                dac_asset["field_name"] = assets[i].field_name;
                dac_asset["display_name"] = assets[i].display_name;
                if (location.indexOf("http") == -1)
                    dac_asset["location"] = this.assetAPI + "?dkey="+accountNo+"-ABCDEF&asset=" + location;
                else
                    dac_asset["location"] = location;
                dac_asset["mime_type"] = assets[i].mime_type;
                dac_asset["resolution"] = assets[i].resolution;
                dac_asset["download"] = assets[i].download;
                dac_asset["source"] = assets[i].source;
                return dac_asset;
            }
        }
        return null;
    }

    this.setAsset = function(content, fname, location, display_name, mime_type, resolution, download, source)
    {
        if (content.dac_asset == null) return null;
            for (var i=0;i<content.dac_asset.length;i++) 
            {
                var fieldName = content.dac_asset[i].field_name;
                if (fname == fieldName)
                {
                    if (display_name != null)
                        content.dac_asset[i].display_name = display_name;
                    if (location != null)
                        content.dac_asset[i].location = location ; 
                    if (mime_type != null)
                        content.dac_asset[i].mime_type = mime_type;
                    if (resolution != null)
                        content.dac_asset[i].resolution = resolution;
                    if (download != null)
                        content.dac_asset[i].download = download;
                    if (source != null)
                        content.dac_asset[i].source =source;

                    return content;
                }
            }
            return content;
    }
	
    this.getAssetUrl = function(content, fname, accountNo)
    {
        var assets = content.dac_asset;
        var contentJson = JSON.stringify(content);
        //alert("getPreviewAsset contentJson ="+contentJson);
        var str = "";
        var dac_asset = new Array;
        for(var i=0;i< assets.length;i++){
            var fieldName = assets[i].field_name;
            if (fname == fieldName)
            {
                //alert("getPreviewAsset fname="+fname);
                var displayName = assets[i].display_name;
                var location = assets[i].location; 

                //alert("getPreviewAsset location="+location);
                dac_asset["field_name"] = assets[i].field_name;
                dac_asset["display_name"] = assets[i].display_name;
                if (location.indexOf("http") == -1)
                        dac_asset["location"] = this.assetAPI + "?dkey="+accountNo+"-ABCDEF&asset=" + location;
                else
                        dac_asset["location"] = location;
                return dac_asset["location"];
            }
        }
        return null;
    }

    this.getAssetProxy = function(assetUrl, mime_type)
    {
        var url = this.assetProxy +"?url="+encodeURIComponent(assetUrl);// + "&mime_type="+ mime_type;
        //var url = this.assetProxy +"?url="+assetUrl;
        return url;
    }
	
	
    this.getCurrentDateTime = function() //yyyy-mm-dd hh:mm:ss
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
        hour = hour<10 ? "0"+ hour : hour;
        min = min<10 ? "0"+ min : min;
        sec = sec<10 ? "0"+ sec : sec;

        var currentDateTime =  year + "-" + month + "-" + day+" "+ hour + ":" + min + ":" + sec;
        return currentDateTime;
    }

    this.getCurrentDateTime2 = function() //yyyy-mm-dd hh:mm:ss
    {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var msec = date.getMilliseconds();

        month = month<10 ? "0" + month : month;
        day = day<10 ? "0" + day : day;
        hour = hour<10 ? "0"+ hour : hour;
        min = min<10 ? "0"+ min : min;
        sec = sec<10 ? "0"+ sec : sec;

        var currentDateTime =  year + "-" + month + "-" + day+" "+ hour + ":" + min + ":" + sec+"."+msec;
        return currentDateTime;
    }
	

/////////////////////////////////
    this.getQueryVariable = function(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable)
            {
                return pair[1];
            }
        }
        return null;
    }
	
    this.getVideoChanId = function(idField)
    {
        var index = idField.indexOf(" ");
        if (index > 0)
            id = idField.substring(0, index);
        else 
            id = idField;
        return id;
    }
		
    this.launchFullScreen = function(element) {
        if(element.requestFullScreen) {
            element.requestFullScreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
    }
		
    this.exitFullscreen = function() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
    }

    this.scaleImage = function(srcwidth, srcheight, targetwidth, targetheight, fLetterBox) {

        var result = { width: 0, height: 0, fScaleToTargetWidth: true };

        if ((srcwidth <= 0) || (srcheight <= 0) || (targetwidth <= 0) || (targetheight <= 0)) {
                return result;
        }

        // scale to the target width
        var scaleX1 = targetwidth;
        var scaleY1 = (srcheight * targetwidth) / srcwidth;

        // scale to the target height
        var scaleX2 = (srcwidth * targetheight) / srcheight;
        var scaleY2 = targetheight;

        // now figure out which one we should use
        var fScaleOnWidth = (scaleX2 > targetwidth);
        if (fScaleOnWidth) {
                fScaleOnWidth = fLetterBox;
        }
        else {
           fScaleOnWidth = !fLetterBox;
        }

        if (fScaleOnWidth) {
                result.width = Math.floor(scaleX1);
                result.height = Math.floor(scaleY1);
                result.fScaleToTargetWidth = true;
        }
        else {
                result.width = Math.floor(scaleX2);
                result.height = Math.floor(scaleY2);
                result.fScaleToTargetWidth = false;
        }
        result.targetleft = Math.floor((targetwidth - result.width) / 2);
        result.targettop = Math.floor((targetheight - result.height) / 2);

        return result;
    }
	
	//hex: a hex color value such as #123456? (the hash is optional)
	//lum: the luminosity factor, i.e. -0.1 is 10% darker, 0.2 is 20% lighter, etc.
    this.getGradientColor = function (hex, lum)
    {
        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2,2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00"+c).substr(c.length);
        }
        return rgb;
    }
	
	
    this.removeURL= function (text)
    {
        //text = text.replace(/^(\[url=)?(https?:\/\/)?(www\.|\S+?\.)(\S+?\.)?\S+$\s*/mg, '');
        //text = text.replace(/^\s*(\[\s*url\s*=\s*)?(http?:\/\/)?(www\.|\S+?\.)(\S+?\.)?\S+\s*$\s*/mg, '');
        //text = text.replace(/^(\[url=)?(https?:\/\/)?(www\.|\S+?\.)(\S+?\.)?[^.\s]+$\s*/mg, '');
        //text = text.replace(/.*?:\/\//g, "");
        if (text != undefined && text != null)
        {
            text = text.replace( /(?:\bhttps?:\/\/|\bwww\.|\[url)\S+\s*/g, '' );
            text = text.trim();
            //text = text.replace(/:$/, "") + ".";
            if (text.substr(text.length - 1, 1) == ':') 
                text = text.substr(0, text.length - 1) + '.';
        }

        return text;
    }
	
    //pollFunc(sendHeartBeat, 60000, 1000);
    this.pollFunc = function(fn, timeout, interval) 
    {
        var startTime = (new Date()).getTime();
        interval = interval || 1000,
        canPoll = true;

        (function p() {
            canPoll = ((new Date).getTime() - startTime ) <= timeout;
            if (!fn() && canPoll)  { // ensures the function exucutes
                    setTimeout(p, interval);
            }
        })();
    }
	
    this.getIFrameSize = function () 
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
        
    this.decodeHtmlSymbols = function (str) 
    {
        newString = str;
        if(str != null)
        {
            newString = str.replace(/&amp;/g, '&');
            newString = newString.replace(/&lt;/g, '<');
            newString = newString.replace(/&gt;/g, '>');
        }
        
        return newString
    }


}


