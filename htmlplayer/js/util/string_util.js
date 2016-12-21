function StringUtil(){

	this.trimString = function(str) {
		return str.replace(/(^\s+)|(\s+$)/g, "");
	}
}