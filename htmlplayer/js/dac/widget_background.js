function WidgetBackground() {
    //var shape;
    var _this = this;
    this.body;
    this.stage = null;
    this.ObjectCanvas = null;
    this.bgColorCanvas = null;
    //color overlay adjustment
    this.lum = 0.2;


    this.createCanvas = function(){
        _this.body = document.getElementsByTagName("body")[0];
        //create a canvas
        _this.ObjectCanvas = document.createElement('canvas');
        _this.ObjectCanvas.id = "ObjectCanvas";

        //create canvas2
        _this.bgColorCanvas = document.createElement('canvas');
        _this.bgColorCanvas.id = "bgColorCanvas";

        _this.body.appendChild(_this.ObjectCanvas);
        _this.body.appendChild(_this.bgColorCanvas);
    }

    this.clearStage = function(){
        if(_this.stage!=null) {
            _this.stage.removeAllChildren();
            _this.stage.update();
        }
        var canvas = document.getElementById('bgColorCanvas');
        var canvas2 = document.getElementById('ObjectCanvas');
        _this.body.removeChild(canvas);
        _this.body.removeChild(canvas2);

        //_this.stage.remove();
    }

    this.play = function (theme, bgcolor, bgimage,imgalpha) {

        console.log("[WidgetBackground]play ...theme="+theme+" bgcolor="+bgcolor + "imgaplha=" +imgalpha);
        this.createCanvas();
        this.buildImageColorBackground(bgcolor,bgimage, imgalpha);
        _this.playTheme(theme);
    }

    this.replay = function (theme, bgcolor, bgimage,imgalpha) {
        console.log("[WidgetBackground]replay...theme="+theme+" bgcolor="+bgcolor+ " bgimage="+bgimage);
        _this.clearStage();
        _this.createCanvas();

        _this.buildImageColorBackground(bgcolor,bgimage, imgalpha);
        _this.playTheme(theme);
    }

    this.buildImageColorBackground = function(bgcolor, bgimage, imgalpha)
    {
        console.log("[WidgetBackground]buildImageColorBackground...bgcolor="+bgcolor+ " bgimage="+bgimage);
        var viewportWidth = $(window).width();
        var viewportHeight = $(window).height();
        var length = viewportWidth + "px " + viewportHeight + "px";

        _this.ObjectCanvas.style.backgroundColor = bgcolor;
        _this.ObjectCanvas.style.position = "absolute";

        if(bgimage!=null) {
            bgimage  = 'url('+ bgimage+')';
            //set canvas background image and make it full size
            _this.ObjectCanvas.style.backgroundImage = bgimage;
            _this.ObjectCanvas.style.backgroundSize = length;//"contain";//"cover";
        }
        _this.ObjectCanvas.style.zIndex = -5;

        _this.ObjectCanvas.style.opacity = imgalpha;
        _this.ObjectCanvas.width = viewportWidth;
        _this.ObjectCanvas.height = viewportHeight;

        //set canvas2 color to be bgcolor and make z-index < z-index of canvas1 so it is right under canvas 1
        _this.bgColorCanvas.style.backgroundColor = bgcolor;
        _this.bgColorCanvas.style.position = "absolute";
        _this.bgColorCanvas.width = viewportWidth;
        _this.bgColorCanvas.height = viewportHeight;
        _this.bgColorCanvas.style.zIndex = -10;
    }



    this.playTheme = function (theme) {

        switch (theme) {
            case "motion_gradient":
                var numBars = 1;
                var barSpacing = 0;
                this.slidingBars(numBars, barSpacing);//sliding_bars
                break;
            case "sliding_gradient":
                var numBars = 5;
                var barSpacing = 0;
                this.slidingBars(numBars, barSpacing);//sliding_bars
                break;
            case "sliding_bars":
                var numBars = 5;
                var barSpacing = 1;
                this.slidingBars(numBars, barSpacing);//sliding_bars
                break;
            case "sliding_bars_spacing":
                var numBars = 8;
                var barSpacing = 5;
                this.slidingBars(numBars, barSpacing);//sliding_bars
                break;
            case "bouncing_balls":
                var direction = 1;//0start from top,1 start from bottom
                this.bouncingBalls(direction);//bouncing_balls
                break;
            case "falling_snow":
                var flakeCount = 50;
                var direction = 0;
                _this.snowflake(flakeCount, direction);//snow_fall
                break;
            case "4":
                var flakeCount = 50;
                var direction = 1;
                _this.snowflake(flakeCount,direction);//snow_up,not working
                break;
            case "falling_bubbles":
                var direction = 0;
                this.bubble(direction);//bubble_fall
                break;
            case "rising_bubbles":
                direction = 1;
                this.bubble(direction);//bubble_up
                break;
            case "7":
                this.playTheme5();//line-density
                break;
            case "lightbeam":
                var speed = 60;
                this.lightbeam(speed);//line-circle
                break;
            case "abstract_triangle":
                this.abstract_triangle();
                break;
        }
    }

    this.getGradientColor = function (hex, lum) {
        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }

        return rgb;
    }

    this.rgb2hex = function (rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }

        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    function convertHex(hex,opacity){
        hex = hex.replace('#','');
        r = parseInt(hex.substring(0,2), 16);
        g = parseInt(hex.substring(2,4), 16);
        b = parseInt(hex.substring(4,6), 16);

        result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return result;
    }

    this.lightenDarkenColor = function(col, amt) {  // amt > 0 lighten, amt <0 darken
        var usePound = false;
        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }
        var num = parseInt(col, 16);
        var r = (num >> 16) + amt;
        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }
        var b = ((num >> 8) & 0x00FF) + amt;
        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }
        var g = (num & 0x0000FF) + amt;
        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }

    this.slidingBars = function (numBars, barSpacing) {

        console.log("[WidgetBackground]SlidingBar");
        var duration = 8000;
        //createjs.Ticker.removeAllEventListeners();
        var darkColor,lightColor,recHeight,recLength,recCount,duration,gap;

        hex = this.rgb2hex(_this.ObjectCanvas.style.backgroundColor);
        lum = _this.lum;
        darkColor = this.getGradientColor(hex, lum-0.85);
        lightColor = this.lightenDarkenColor(hex,50); //500
        recCount = numBars;//1;
        gap = barSpacing;//1;
        recHeight = Math.floor(_this.ObjectCanvas.height / recCount)-gap;
        if (recCount == 1)
            recHeight  =  _this.ObjectCanvas.height * 1.5;
        recLength = _this.ObjectCanvas.width*2;

        _this.stage = new createjs.Stage(_this.ObjectCanvas.id);

        recCount = recCount + 1;

        for (var i = 0; i < recCount; i++) {
            rect = new createjs.Shape();
            rect.graphics.beginLinearGradientFill([darkColor, lightColor, darkColor], [0.25,0.7,0.98], 0, 0, recLength/1.5, 0);
            rect.graphics.drawRect(20, 40, recLength, recHeight);//(,,length,width)
            rect.alpha = 0.6;
            rect.x = -100;
            rect.y = -40 + i * (recHeight+gap);
            _this.stage.addChild(rect);
            createjs.Tween.get(rect, {loop: true})
                .to({x: -recLength/3, alpha: 0.6}, duration - 500 * i, createjs.Ease.quadInOut)
                //.wait(300)
                .to({x: -100, alpha: 0.6}, duration + 500 * i, createjs.Ease.quadInOut);

        }
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", tick);
        function tick(event) {
            // draw the updates to _this.stage:
            _this.stage.update(event);
        }

    }

    this.bouncingBalls = function (direction) {
        console.log("[WidgetBackground]bouncingBalls");
        var duration = 5500;
        //control units
        var circle_count = 12;
        var wh = $(window).height();
        if (wh > $(window).width()) wh = $(window).width();
        //console.log("[WidgetBackground]bouncingBalls wh="+wh);

        var radiusMax = wh/4;//180;
        var radiusMin = radiusMax/4;

        var circleMovementHeight = 0;
        var circleStartY = $(window).height();

        _this.stage = new createjs.Stage(_this.ObjectCanvas.id);

        if(direction == 0) {
            circleStartY = 0;
            circleMovementHeight = _this.ObjectCanvas.height;
        }

        hex = this.rgb2hex(_this.ObjectCanvas.style.backgroundColor);
        lum = 0.2;//_this.lum;
        var cirColors = this.getGradientColor(hex, lum); //this.lightenDarkenColor(hex, 2);//
        //bouncing circles
        for (var i = 0; i <circle_count; i++) {
            var circle = new createjs.Shape();
            circle.graphics.beginFill(this.getGradientColor(cirColors,Math.random()*0.3));
            circle.graphics.drawCircle(0, 0, Math.floor(Math.random() * (radiusMax - radiusMin + 1)) + radiusMin/2);
            //position of circle
            circle.angle = Math.random()*340 + 20;
            circle.x = Math.random() *Math.cos(circle.angle*radiusMin) *radiusMin+(_this.ObjectCanvas.width/circle_count)*i;
            circle.y = Math.random() * _this.ObjectCanvas.height;

            // circle.velX = sprite.x - fixedX;
            circle.velY = Math.random() * 20 - 5;
            _this.stage.addChild(circle);

            //set speed
            createjs.Tween.get(circle, {loop: true})
                .to({y: circleStartY, alpha: 0.6}, createjs.Ease.quadInOut)
                .wait(45)
                .to({
                    y: circleMovementHeight,
                    x: circle.x + (Math.floor(Math.random() * 2) == 1 ? 1 : -1) * 2*circle.angle,
                    alpha: 0.6
                }, duration, createjs.Ease.quadInOut)
                .wait(45)
                .to({y: circleStartY, x: circle.x, alpha: 0.6}, duration, createjs.Ease.quadInOut);

            console.log("i=" + i);
        }
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", _this.stage);
    }

    this.snowflake = function(flakeCount, direction){

        console.log("[WidgetBackground]snowflake...");
        var flakeCount = 50;
        var movingWidth = 0.3; //0.9
        var mX = -100;
        var mY = -100;
        var canvas = document.getElementById('ObjectCanvas');
        var ctx = canvas.getContext("2d");
        var flakes = [];

        function snow() {
            // console.log("[WidgetBackground]snow...");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < flakeCount; i++) {
                var flake = flakes[i],
                    x = mX,
                    y = mY,
                    minDist = 150,
                    x2 = flake.x,
                    y2 = flake.y;

                var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
                    dx = x2 - x,
                    dy = y2 - y;

                if (dist < minDist) {
                    var force = minDist / (dist * dist),
                        xcomp = (x - x2) / dist,
                        ycomp = (y - y2) / dist,
                        deltaV = force / 2;

                    flake.velX -= deltaV * xcomp;
                    flake.velY -= deltaV * ycomp;

                } else {
                    flake.velX *= movingWidth; //0.98
                    if (flake.velY <= flake.speed) {
                        flake.velY = flake.speed
                    }
                    flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                }
                flake.opacity = 0.2;
                ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
                flake.y += flake.velY;
                flake.x += flake.velX;

                if (flake.y >= canvas.height || flake.y <= 0) {
                    resetSnow(flake);
                }


                if (flake.x >= canvas.width || flake.x <= 0) {
                    resetSnow(flake);
                }

                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
                ctx.fill();
            }
            requestAnimationFrame(snow);
        };

        function resetSnow(flake) {
            flake.x = Math.floor(Math.random() * canvas.width);
            flake.y = 0;
            flake.size = (Math.random() * 3) + 2;
            flake.speed = (Math.random() * 0.4) + 0.0;
            flake.velY = flake.speed;
            flake.velX = 0;
            flake.opacity = (Math.random() * 0.5) + 0.1; //0.3
        }

        function init() {
            for (var i = 0; i < flakeCount; i++) {
                var x = Math.floor(Math.random() * canvas.width),
                    y = Math.floor(Math.random() * canvas.height),
                    size = (Math.random() * 3) + 2,
                    speed = (Math.random() * 0.4) + 0.2,
                    opacity = (Math.random() * 0.5) + 0.3;

                flakes.push({
                    speed: speed,
                    velY: speed,
                    velX: 0,
                    x: x,
                    y: y,
                    size: size,
                    stepSize: (Math.random()) / 30,
                    step: 0,
                    opacity: opacity
                });
            }
            snow();
        };
        init();
    }

    this.bubble = function (direction){

        //createjs.Ticker.removeAllEventListeners();
        console.log("[WidgetBackground]bubble");
        var speed = 3;
        var MAX;
        var CJS = createjs;
        var circles = [];
        var canvas = document.getElementById('ObjectCanvas');
        var hex,lum,hue;
        var radiusBase;

        _this.stage = new CJS.Stage(canvas);
        _this.stage.compositeOperation = "lighter";
        CJS.Ticker.setFPS(60);


        hex = this.rgb2hex(_this.ObjectCanvas.style.backgroundColor);
        lum = 0.3;
        hue = this.getGradientColor(hex, lum);


        if (hex === hue && hex === "#000000")
            hue = "#333333";

        MAX =  Math.floor(_this.stage.canvas.width / 30); //number of circles
        radiusBase = Math.floor(_this.stage.canvas.width / 10);

        //shape creation
        for(var i = 0, l = MAX; i < l; i++) {
            circles[i] = createCircle( radiusBase,hue);
            _this.stage.addChild(circles[i]);
        }
        CJS.Ticker.addEventListener("tick",handleTick);
        //updateCircle
        function handleTick(event) {
            for(var i = 0, l = MAX - 1; i < l; i++) {
                var circle = circles[i];
                if(direction == 0){
                    circle.x += circle.vx;
                    circle.y -= circle.vy;
                    circle.rotation += circle.vr;
                    circle.alpha -= 0.002*Math.random();


                    if (circle.alpha <= 0 || circle.y > _this.stage.canvas.height*2) {
                        circle.x = Math.random() * _this.stage.canvas.width;
                        circle.y = -(circle.radius * 3);
                        circle.alpha = 1 - Math.random()*speed/40;
                    }
                }else{
                    circle.x += circle.vx;
                    circle.y += circle.vy;
                    circle.rotation += circle.vr;
                    circle.alpha -= 0.002*Math.random();

                    if (circle.alpha <= 0 || circle.y < -circle.radius * 2) {
                        circle.x = Math.random() * _this.stage.canvas.width;
                        circle.y = _this.stage.canvas.height +(circle.radius * 3);
                        circle.alpha = 1 - Math.random()*speed/40;
                    }
                }

                if(circle.alpha <= 0) {
                    _this.stage.removeChild(circle);
                    i--;
                }
            }
            _this.stage.update(event);
        }


        function createCircle(radiusBase4,hue4){
            var shape = new CJS.Shape();
            var topline = 0; //distance
            var wh = $(window).height();
            if (wh > $(window).width()) wh = $(window).width();
            var radiusMax = $(window).height()/6;//180;
            var radiusMin = radiusMax/4;
            var radius = Math.random() * (radiusMax-radiusMin ) + radiusMin ;
            //var radius = Math.random() * radiusBase4 + 30;

            shape.graphics.beginFill(hue4);
            shape.graphics.drawCircle(radius, radius, radius);
            shape.radius = radius;

            shape.alpha = Math.random();

            //position
            shape.x = Math.random() * _this.stage.canvas.width;
            if(direction==0){
                shape.y = - (radius * 2) - (Math.random() * 600)-topline;
            }
            else{
                shape.y = _this.stage.canvas.height + (radius * 1) + (Math.random() * 600)-topline;
            }

            //speed
            var speed =1/(11 - 4) ;
            shape.vx = (Math.random() - Math.random()) * 0.3*speed;
            shape.vy =  -3 * (Math.random() + 0.9)*2*speed;
            shape.vr =  (Math.random() - Math.random()) * 0.4;
            shape.va = Math.random() * 0.02*3*speed + 0.05;

            var hue = Math.random() * 80;
            //blur filter
            if(shape.radius>100){
                var blurVal = [8, 12, 24][Math.floor( Math.random()*10)];
                var blurFilter = new CJS.BlurFilter(blurVal, blurVal, 1);
                shape.filters = [blurFilter];
                shape.cache(0, 0, radius *2, radius *2);
            }
            if (shape.radius>10&&shape.radius<=100){
                var blurVal = [4, 8, 16][Math.floor( Math.random()*6 )];
                var blurFilter = new CJS.BlurFilter(blurVal, blurVal, 1);
                shape.filters = [blurFilter];
                shape.cache(0, 0, radius *2, radius *2);
            }


            return shape;
        }

    }

    this.playTheme5 = function (){

        var width, height, largeHeader, canvas, ctx, lines, target, size, animateHeader = true;
        var density = 10;
        var color = this.rgb2hex(_this.ObjectCanvas.style.backgroundColor,30);
        var counter = 0;

        color = this.lightenDarkenColor(color,+200);
        // Main
        initHeader();
        addListeners();
        initAnimation();

        function initHeader() {
            width = _this.ObjectCanvas.width ;
            height = _this.ObjectCanvas.height;
            size = width > height ? height : width;
            target = {x: 0, y: height};

            canvas = document.getElementById('ObjectCanvas');
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');
            // create particles
            lines = [];
            for(var i = 0; i < density; i++) {
                var l = new Line(Math.random()*360,color);
                console.log(color);
                lines.push(l);
            }
        }

        function initAnimation() {
            animate();
        }

        // Event handling
        function addListeners() {
            window.addEventListener('scroll', scrollCheck);
            window.addEventListener('resize', resize);
        }

        function scrollCheck() {
            if(document.body.scrollTop > height) animateHeader = false;
            else animateHeader = true;
        }

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            size = width > height ? height : width;
            largeHeader.style.height = height+'px';
            canvas.width = width;
            canvas.height = height;
        }

        function animate() {
            //console.log(counter++);
            if(animateHeader) {
                if(counter>10){
                    ctx.clearRect(0,0,width,height);
                    counter -=10;
                }
                //
                for(var i in lines) {
                    lines[i].draw();
                }
            }
            setTimeout(function() {
                requestAnimationFrame(animate);
            }, 2000 / _this.speed);
        }

        // Canvas manipulation
        function Line(angle,color) {
            var _this = this;
            // constructor
            (function() {
                _this.angle = angle;
                _this.LineColor= color;
            })();

            this.draw = function() {


                var r1 = Math.random()*(size < 800 ? 800 : size)*0.8;
                var r2 = Math.random()*(size < 800 ? 800 : size)*0.8;
                var x1 = r1*Math.cos(_this.angle*(Math.PI/180)) + width*0.5;
                var y1 = r1*Math.sin(_this.angle*(Math.PI/180)) + height*0.48;
                var x2 = r2*Math.cos(_this.angle*(Math.PI/180)) + width*0.5;
                var y2 = r2*Math.sin(_this.angle*(Math.PI/180)) + height*0.48;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                //ctx.strokeStyle = 'rgba(255,193,127,'+(0.5+Math.random()*0.5)+')';
                ctx.strokeStyle =   _this.LineColor;
                ctx.stroke();
                ctx.globalAlpha = 0.2;
                ctx.lineWidth=10*Math.random();
                ctx.beginPath();
                //ctx.arc(x1, y1, 2, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgba(255,165,70,'+(0.5+Math.random()*0.5)+')';
                ctx.fill();

                _this.angle += Math.random();

            };
        }
    };

    this.lightbeam = function(speed){


        var width, height, largeHeader, canvas, ctx, lines, target, size, animateHeader = true;
        var color = this.rgb2hex(_this.ObjectCanvas.style.backgroundColor,30);

        color = this.lightenDarkenColor(color,+200);

        // Main
        initHeader();
        addListeners();
        initAnimation();

        function initHeader() {
            width = window.innerWidth;
            height = window.innerHeight;
            size = width > height ? height : width;
            target = {x: 0, y: height};

            canvas = document.getElementById('ObjectCanvas');
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');


            // create particles
            lines = [];
            for(var i = 0; i < 90; i++) {
                var l = new Line(Math.random()*360,color);
                console.log(color);
                lines.push(l);
            }
        }

        function initAnimation() {
            animate();
        }

        // Event handling
        function addListeners() {
            window.addEventListener('scroll', scrollCheck);
            window.addEventListener('resize', resize);
        }

        function scrollCheck() {
            if(document.body.scrollTop > height) animateHeader = false;
            else animateHeader = true;
        }

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            size = width > height ? height : width;
            largeHeader.style.height = height+'px';
            canvas.width = width;
            canvas.height = height;
        }

        function animate() {

            if(animateHeader) {
                ctx.clearRect(0,0,width,height);
                //
                for(var i in lines) {
                    lines[i].draw();
                }
            }
            // speed = 60;
            setTimeout(function() {
                requestAnimationFrame(animate);
            }, 1000 / speed);
        }

        // Canvas manipulation
        function Line(angle,color) {
            var _this = this;
            // constructor
            (function() {
                _this.angle = angle;
                _this.LineColor= color;
            })();

            this.draw = function() {

                var r1 = Math.random()*(size < 800 ? 800 : size)*0.8;
                var r2 = Math.random()*(size < 800 ? 800 : size)*0.8;
                var x1 = r1*Math.cos(_this.angle*(Math.PI/180)) + width*0.5;
                var y1 = r1*Math.sin(_this.angle*(Math.PI/180)) + height*0.48;
                var x2 = r2*Math.cos(_this.angle*(Math.PI/180)) + width*0.5;
                var y2 = r2*Math.sin(_this.angle*(Math.PI/180)) + height*0.48;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                //ctx.strokeStyle = 'rgba(255,193,127,'+(0.5+Math.random()*0.5)+')';
                ctx.strokeStyle = _this.LineColor;
                ctx.stroke();
                ctx.globalAlpha = 0.2;
                ctx.lineWidth=2*Math.random();
                ctx.beginPath();
                //ctx.arc(x1, y1, 2, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgba(255,165,70,'+(0.5+Math.random()*0.5)+')';
                ctx.fill();

                _this.angle += Math.random();

            };
        }
    }

    this.abstract_triangle = function(){
        var  ctx,width,height,triangles,MAX_Tri,canvas,width,height,FPS,fillColor,triColor,speedTri,radius,tradius,offsetX,offsetY, max;

        width = window.innerWidth;
        height = window.innerHeight;

        MAX_Tri = 50;
        radius = 500;
        tradius = width/2;
        offsetX = width/2;
        offsetY = height/2;
        max = 160;//160;
        FPS = 30;

        fillColor = this.rgb2hex(_this.ObjectCanvas.style.backgroundColor);
        fillColor= convertHex(fillColor,50);
        triColor = this.rgb2hex(_this.ObjectCanvas.style.backgroundColor);
        triColor =  this.lightenDarkenColor(triColor,50); //this.lightenDarkenColor(triColor,+100);
        triColor = convertHex(triColor,50);
        canvas = document.getElementById('ObjectCanvas');

        speedTri = 2;//1-10

        init();
        //addListeners();
        //initAnimation();

        function init() {

            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext("2d");
            triangles = [];

            // create set of actors
            for (var i = 0; i < MAX_Tri; i++) {
                var tri = new Triangle();
                var angle = Math.random() * Math.PI * 2;
                var distance = Math.random() * radius;
                var speed = Math.random() * speedTri;

                tri.x = Math.cos(angle) * distance;
                tri.y = Math.sin(angle) * distance;
                tri.incX = Math.cos(angle) * speed;
                tri.incY = Math.sin(angle) * speed;

                triangles.push(tri);
            }



            function animate(){
                setInterval(tick, 1000 / FPS);
            }

            function tick() {
                var obj = null;
                var obj2 = null;
                var dx = 0;
                var dy = 0;

                this.clear();
                radius += (tradius - radius) * 0.2;

                // draw each triangles
                for (var i = 0; i < MAX_Tri; i++) {

                    obj = triangles[i];
                    for (var j = i + 1; j < MAX_Tri; ++j) {
                        obj2 = triangles[j];
                        dx = obj.x - obj2.x;
                        dy = obj.y - obj2.y;
                        var dif = Math.sqrt(dx * dx + dy * dy);

                        if (dif < max) {
                            ctx.lineWidth = (max - dif) * 0.05;
                            ctx.beginPath();
                            ctx.moveTo(offsetX + obj.x, offsetY + obj.y);
                            ctx.lineTo(offsetX + obj2.x, offsetY + obj2.y);
                            ctx.stroke();
                        }
                    }

                    // move current obj
                    obj.x += obj.incX;
                    obj.y += obj.incY;
                    var objDistance = Math.sqrt((obj.x * obj.x) + (obj.y * obj.y));
                    if (objDistance > radius) {
                        var mp = (1 / objDistance) * 100;
                        obj.x = -obj.x * mp;
                        obj.y = -obj.y * mp;
                        obj.incX = (Math.random() - 0.5) * obj.s;
                        obj.incY = (Math.random() - 0.5) * obj.s;
                    }
                }
            }

            clear = function() {
                ctx.clearRect(0,0,width,height);
                ctx.fillStyle = fillColor;
                ctx.fillRect(0, 0, width, height);
                ctx.strokeStyle = triColor;
                //ctx.strokeStyle = ('rgba(0,255,255,0.5)');
            }

            animate();
        }



        // Triangle Object
        function Triangle() {
            this.x = 0;
            this.y = 0;
            this.incX = 0;
            this.incy = 0;
            this.r = 1; // radius
            this.s = Math.random() * 10; // speed
        }
    };
}
				
				