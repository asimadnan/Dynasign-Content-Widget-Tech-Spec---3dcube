window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       ||
		  window.webkitRequestAnimationFrame ||
		  window.mozRequestAnimationFrame    ||
		  window.oRequestAnimationFrame      ||
		  window.msRequestAnimationFrame     ||
		  function(/* function */ callback, /* DOMElement */ element){
		  window.setTimeout(callback, 1000 / 60);
		};
	  })();


function AnimationUtil(){
	var elementName = "";
	var elementMoveProperty = "";
	var startPosition = 0;
	var speed = 0;
	var endPosition = 0;
	var boolIncrease = true;
	var self = this;
	var isAnimationEnd = false;
	var speedProportion = 1.0;

	this.moveElement = function(elementName,elementMoveProperty,startPosition,speed,endPosition,boolIncrease){
		this.elementName = elementName;
		this.elementMoveProperty = elementMoveProperty;
		this.startPosition = startPosition;
		this.speed = speed;
		this.endPosition = endPosition;
		this.boolIncrease = boolIncrease;
		self.animate();
		
	}

	this.moveElementGraduallySlower = function(elementName,elementMoveProperty,startPosition,speedProportion,endPosition,boolIncrease){
		this.elementName = elementName;
		this.elementMoveProperty = elementMoveProperty;
		this.startPosition = startPosition;
		this.speedProportion = speedProportion;
		this.endPosition = endPosition;
		this.boolIncrease = boolIncrease;
		self.animateGraduallySlower();
		
	}
	

	this.animate = function () {

		self.move();
		if(!this.isAnimationEnd)
			requestAnimFrame( self.animate );


	}

	this.move = function (){

		if(this.boolIncrease){
			if((this.endPosition - this.startPosition) > this.speed && this.startPosition < this.endPosition){
				this.startPosition = this.startPosition + this.speed;
				$("#"+this.elementName).css(this.elementMoveProperty, this.startPosition +"px");
			}
			else
			{
				this.startPosition = this.endPosition;
				$("#"+this.elementName).css(this.elementMoveProperty, this.startPosition +"px");
				this.isAnimationEnd = true;
			}
		}
		else{
			if((this.startPosition - this.endPosition) > this.speed && this.startPosition > this.endPosition){
				this.startPosition = this.startPosition - this.speed;
				$("#"+this.elementName).css(this.elementMoveProperty, this.startPosition +"px");
			}
			else
			{
				this.startPosition = this.endPosition;
				$("#"+this.elementName).css(this.elementMoveProperty, this.startPosition +"px");
				this.isAnimationEnd = true;
			}
		}
	}

	this.animateGraduallySlower = function () {

		self.moveGraduallySlower ();
		if(!this.isAnimationEnd)
			requestAnimFrame( self.animateGraduallySlower );


	}

	this.moveGraduallySlower = function (){

		if(this.boolIncrease){
			
			if((this.endPosition - this.startPosition) > 1 && this.startPosition < this.endPosition){
				this.startPosition = this.startPosition + (this.endPosition - this.startPosition)*this.speedProportion;
				$("#"+this.elementName).css(this.elementMoveProperty, this.startPosition +"px");
			}
			else
			{
				this.startPosition = this.endPosition;
				$("#"+this.elementName).css(this.elementMoveProperty, this.startPosition +"px");
				this.isAnimationEnd = true;
			}
		}
		else{
			if((this.startPosition - this.endPosition) > 1 && this.startPosition > this.endPosition){
				//this.startPosition = this.startPosition - this.speed;
				this.startPosition = this.startPosition - (this.startPosition - this.endPosition)*this.speedProportion;
				$("#"+this.elementName).css(this.elementMoveProperty, this.startPosition +"px");
			}
			else
			{
				this.startPosition = this.endPosition;
				$("#"+this.elementName).css(this.elementMoveProperty, this.startPosition +"px");
				this.isAnimationEnd = true;
			}
		}
	}

	this.fadeOut = function (elem, speed, opacity){ 
	speed = speed || 20; 
	opacity = opacity || 0; 
	var val = 100; 
	(function(){
		iBase.SetOpacity(elem, val); 
		val -= 5;
		if (val >= opacity) { 
			setTimeout(arguments.callee, speed); 
		}else if (val < 0) { 
			iBase.Id(elem).style.display = "none"; 
		} 
	})(); 
	} 

	this.fadeInWithTwoElement = function (elema,elemb, speed, opacity){ 
		speed = speed || 20; 
		opacity = opacity || 100; 
		iBase.Id(elema).style.display = ""; 
		iBase.SetOpacity(elema, 0); 
		var val = 0; 
		(function(){ 
			iBase.SetOpacity(elema, val); 
			val += 5; 
			if (val <= opacity) { 
				setTimeout(arguments.callee, speed) 
		  } else
		  {
			  iBase.Id(elemb).style.display = "none"; 
		  }

		})(); 
	 } 

	 this.fadeIn =function (elem, speed, opacity){
		speed = speed || 20;
		opacity = opacity || 100;
		iBase.Id(elem).style.display = ""; 
		iBase.SetOpacity(elem, 0);
		var val = 0;
		(function(){
			iBase.SetOpacity(elem, val);
			val += 5;
			if (val <= opacity) {
				setTimeout(arguments.callee, speed)
			}
		})();
	}
}


