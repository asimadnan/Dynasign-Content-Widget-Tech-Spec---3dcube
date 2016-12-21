function AppUtil() {

	var self = this;
	
	this.runPrefixMethod = function(element, method) {
		var usablePrefixMethod;
		["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
			alert(1);
				if (usablePrefixMethod) return;
				if (prefix === "") {
					method = method.slice(0,1).toLowerCase() + method.slice(1);
				}
				var typePrefixMethod = typeof element[prefix + method];
				
				if (typePrefixMethod + "" !== "undefined") {
					if (typePrefixMethod === "function") {
						usablePrefixMethod = element[prefix + method]();
					} else {
						usablePrefixMethod = element[prefix + method];
					}
				}
			});
		return usablePrefixMethod;
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
	
	this.getParameter = function (param){
		var query = window.location.search;
		
		var iLen = param.length;
		var iStart = query.indexOf(param);
		if (iStart == -1)
		   return "";
		iStart += iLen + 1;
		var iEnd = query.indexOf("&", iStart);
		if (iEnd == -1)
		   return query.substring(iStart); 
		return query.substring(iStart, iEnd);
	}
}

