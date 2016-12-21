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
function DacWidget() 
{
    this.getContentObject = function(contentString){
        var obj = jQuery.parseJSON(contentString);
        var contentObj = obj.dac_widget.content;
        var assets = contentObj.dac_assets;
        var jsonString = JSON.stringify(contentObj);
        var str = "";
        for (var i=0;i<assets.length;i++){
            var fieldName = assets[i].field_name;
            var displayName = assets[i].display_name;
            var location = assets[i].location; 
            str += ",\""+fieldName+"\":{\"location\":\""+location+"\",\"display_name\":\""+displayName+"\"}";
        }
        jsonString = jsonString.substring(0,jsonString.lastIndexOf("}"));
        jsonString = jsonString+str+"}";
        contentObj = JSON.parse(jsonString);
        return contentObj;
    };


    this.getQueryVariable = function(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }


    this.getPreviewContentObj = function(contentString){
        var obj = jQuery.parseJSON(contentString);
        var contentObj = obj.dac_widget.content;
        var assets = contentObj.dac_assets;
        var jsonString = JSON.stringify(contentObj);
        var str = "";
        for (var i=0;i<assets.length;i++){
            var fieldName = assets[i].field_name;
            var displayName = assets[i].display_name;
            var location = assets[i].location; 
            str += ",\""+fieldName+"\":{\"location\":\""+location+"\",\"display_name\":\""+displayName+"\"}";
        }
        jsonString = jsonString.substring(0,jsonString.lastIndexOf("}"));
        jsonString = jsonString+str+"}";
        contentObj = JSON.parse(jsonString);
        return contentObj;
    }


}
