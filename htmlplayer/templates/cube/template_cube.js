function TemplateCube(debug) {
    TemplateBase.call(this);



    this.m_field_background_color = "#000000";
    this.m_field_background_image = 'http://localhost/ds_widget/img/FernandoTogniBW.png';
    this.m_field_background_image_flag = true;


    this.initTemplateFields = function() {
        console.log('Init Template Fields');


    };

    this.initTemplateUI = function () {
        console.log('Init Template UI');
    };

    this.updateEditView = function(fullWidget) {
        console.log('Update Edit view');
        var bgimage = this.m_assetArray["w100-cube-background_image"]
        document.getElementById('canvas-container').style.backgroundColor = this.m_contentArray["background_color"]
        document.getElementById('canvas-container').style.backgroundImage = 'url('+ bgimage+')';
        var data = []

        data['image1'] = fullWidget.widget.dac_widget.content.image1
        data['image2'] = fullWidget.widget.dac_widget.content.image2
        data['image3'] = fullWidget.widget.dac_widget.content.image3
        data['image4'] = fullWidget.widget.dac_widget.content.image4
        data['image5'] = fullWidget.widget.dac_widget.content.image5
        data['image6'] = fullWidget.widget.dac_widget.content.image6

        data['imageOrText'] = this.m_contentArray.text_or_image

        data['text1'] = this.m_contentArray.text1
        data['text2'] = this.m_contentArray.text2
        data['text3'] = this.m_contentArray.text3
        data['text4'] = this.m_contentArray.text4
        data['text5'] = this.m_contentArray.text5
        data['text6'] = this.m_contentArray.text6

        data['text1_alignment'] = this.m_contentArray.text1_alignment
        data['text1_bold'] = this.m_contentArray.text1_bold
        data['text1_font'] = this.m_contentArray.text1_font
        data['text1_font_color'] = this.m_contentArray.text1_font_color
        data['text1_font_size'] = this.m_contentArray.text1_font_size
        data['text1_italic'] = this.m_contentArray.text1_italic
        data['rotation_style'] =  this.m_contentArray.rotating_style
        data['rotation_speed'] =  this.m_contentArray.rotating_speed
        rotation_style = data['rotation_style']
        rotation_speed = data['rotation_speed']

        this.m_widgetBackground = new WidgetBackground();

        //data.push(fullWidget.widget.dac_widget.content.dac_asset[0].location)
        //updateScene(data);
        //debugger;
        createScene1(scene,data,1)
        //animate(data["rotation_style"],data["rotation_speed)"]);



        // startTHREE(data);
    };

    this.initEditView = function(fullWidget) {
        console.log('editor init');

        this.m_fullWidget = fullWidget;
        this.m_wid = fullWidget.wid
        this.m_assetIdPrefix = "w"+this.m_wid+"-"+this.m_templateName+"-";
        this.m_contentArray = fullWidget["widget"]["dac_widget"]["content"];
        this.m_assetArray = fullWidget.widgetAsset;
        // console.log("initEditView  this.m_contentArray="+JSON.stringify(this.m_contentArray));
        var bgimage = this.m_assetArray["w100-cube-background_image"]
        document.getElementById('canvas-container').style.backgroundColor = this.m_contentArray["background_color"]
        document.getElementById('canvas-container').style.backgroundImage = 'url('+ bgimage+')';


        this.m_assetArray = fullWidget.widgetAsset;

        var data = []

        //debugger;
        data['image1'] = fullWidget.widget.dac_widget.content.image1
        data['image2'] = fullWidget.widget.dac_widget.content.image2
        data['image3'] = fullWidget.widget.dac_widget.content.image3
        data['image4'] = fullWidget.widget.dac_widget.content.image4
        data['image5'] = fullWidget.widget.dac_widget.content.image5
        data['image6'] = fullWidget.widget.dac_widget.content.image6

        data['imageOrText'] = this.m_contentArray.text_or_image

        data['text1'] = this.m_contentArray.text1
        data['text2'] = this.m_contentArray.text2
        data['text3'] = this.m_contentArray.text3
        data['text4'] = this.m_contentArray.text4
        data['text5'] = this.m_contentArray.text5
        data['text6'] = this.m_contentArray.text6
// debugger;
        data['text1_alignment'] = this.m_contentArray.text1_alignment
        data['text1_bold'] = this.m_contentArray.text1_bold
        data['text1_font'] = this.m_contentArray.text1_font
        data['text1_font_color'] = this.m_contentArray.text1_font_color
        data['text1_font_size'] = this.m_contentArray.text1_font_size
        data['text1_italic'] = this.m_contentArray.text1_italic
        data['rotation_style'] =  this.m_contentArray.rotating_style
        data['rotation_speed'] =  this.m_contentArray.rotating_speed
        rotation_style = data['rotation_style']
        rotation_speed = data['rotation_speed']

// text1_alignment:"center"
// text1_bold:false
// text1_font:"Calibri"
// text1_font_color:"3D85C6"
// text1_font_size:"90"
// text1_italic:true

        // data.push(fullWidget.widget.dac_widget.content.image1)
        // data.push(fullWidget.widget.dac_widget.content.image2)
        // data.push(fullWidget.widget.dac_widget.content.image3)
        // data.push(fullWidget.widget.dac_widget.content.image4)
        // data.push(fullWidget.widget.dac_widget.content.image5)
        // data.push(fullWidget.widget.dac_widget.content.image6)


        startTHREE(data);
    };

    this.determineObjInfo = function () {

    };

    this.playTemplate = function () {

    };
}
var rotation_speed
var rotation_style
var scene;
var cube;
var renderer;
var camera;
var currentScene = 1;
var nbScenes = 8;
var sceneDistance = 300;
var sceneTransitionT0;
var sceneTransitionV0;
var sceneTransitionDuration = 500;
var loader = new THREE.ColladaLoader();
loader.options.convertUpAxis= true;
loader.options.upAxis = 'Y';
var androidscale = new THREE.Vector3(3, 3, 3);
window.addEventListener('resize', resizeTHREE);

//-----------------------------------------------------------------------------------

function startTHREE(data)
{
    //arrowVisibility();

    var container = document.getElementById('canvas-container');
    renderer = new THREE.WebGLRenderer ( {antialias: true, alpha: true});
    renderer.setSize(container.clientWidth, container.clientHeight);

    // THREE.js creates the 3D <canvas> element for you
    container.appendChild(renderer.domElement);

    // make it pretty (black and transparent)
    renderer.setClearColor(0x000000, 0);
    renderer.clear();

    // CAMERA: field of view (angle), aspect ratio, near, far
    var aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(35, aspect, 1, 3000);
    camera.position.copy(cameraPositionsForScene(currentScene));

    scene = new THREE.Scene();

    createLights(scene);
    createScene1(scene,data);

    function animate()
    {
        var t = new Date().getTime();
        var scale;
        var initial_value = 1100;
        if(parseInt(rotation_speed) == 0)
        {
            t = 0;
        }else
        {
            initial_value = initial_value - (parseInt(rotation_speed) * 100)
        }
        scene.traverse(function(obj) {
            if (obj instanceof THREE.Object3D)
            {
                switch (obj.name)
                {
                    case "scene-1-lambert-cube":
                        obj.position.set(0,0,0);
                        // console.log("get time");
                        // console.log(t);
                        switch (rotation_style)
                        {
                            case "style1":
                                obj.rotation.set((t/initial_value), (0), (0));
                                break;
                            case "style2":
                                obj.rotation.set((0), (t/initial_value), (0));
                                break;
                            case "style3":
                                obj.rotation.set((0), (0), (t/initial_value));
                                break;
                            case "style4":
                                obj.rotation.set(-(t/initial_value), (0), (0));
                                break;
                            case "style5":
                                obj.rotation.set((0), -(t/initial_value), (0));
                                break;
                            case "style6":
                                obj.rotation.set((0), (0), -(t/initial_value));
                                break;
                            case "style7":
                                obj.rotation.set((t/initial_value), (t/initial_value),(t/initial_value));
                                break;
                            case "style8":
                                obj.rotation.set(-(t/initial_value), -(t/initial_value),-(t/initial_value));
                                break;
                        }

                        break;

                }
                for (var i=0; i<nbScenes; i++)
                {
                    if (obj.name.startsWith("scene-" + i))
                    {
                        obj.position.add(new THREE.Vector3(i*sceneDistance, 0, 0));
                    }
                }

                // move camera if in transition
                if (sceneTransitionT0 !== undefined && sceneTransitionV0 !== undefined)
                {
                    // parameter between 0 and 1, ease-in speed profile
                    var s = (t - sceneTransitionT0)/sceneTransitionDuration;
                    if (s<=1)
                    {
                        // V = s * V1 + (1-s) * V0
                        s = Math.sqrt(1-(s-1)*(s-1)); // ease-in speed profile
                        var v = new THREE.Vector3();
                        v.copy(sceneTransitionV0);
                        v.multiplyScalar(1-s);
                        var w = cameraPositionsForScene(currentScene);
                        w.multiplyScalar(s);
                        camera.position.addVectors(v, w);
                    }
                    else
                    {
                        sceneTransitionT0 = undefined;
                        sceneTransitionV0 = undefined;
                    }
                }
            }
        })

        renderer.render(scene, camera);

        // let the browser decide the tempo
        requestAnimationFrame(animate);
    }
    // ANIMATION LOOP
    animate(data["rotation_style"],data["rotation_speed)"]);
}


function createScene1(scene,data,update)
{
    update = update || 0;
    //var texture = new THREE.TextureLoader().load( 'http://localhost/ds_widget/textures/00.jpg' );
    //var abc = this.content.image1
    //var a = this.m_fullWidget.widgetAsset['w100-announcement-background_image']
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMAGES////
    var hello = "hello";
    var images = [
        new THREE.MeshLambertMaterial({
            ambient: 0xffffff,
            map: THREE.ImageUtils.loadTexture(  data['image1'] ) }),
        new THREE.MeshLambertMaterial({
            ambient: 0xffffff,
            map: THREE.ImageUtils.loadTexture( data['image2'] ) }),
        new THREE.MeshLambertMaterial({
            ambient: 0xffffff,
            map: THREE.ImageUtils.loadTexture( data['image3'] ) }),
        new THREE.MeshLambertMaterial({
            ambient: 0xffffff,
            map: THREE.ImageUtils.loadTexture( data['image4'] ) }),
        new THREE.MeshLambertMaterial({
            ambient: 0xffffff,
            map: THREE.ImageUtils.loadTexture( data['image5']  ) }),
        new THREE.MeshLambertMaterial( {
            ambient: 0xffffff,
            map: THREE.ImageUtils.loadTexture( data['image6']  ) })
    ];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////TEXTSS


// text1_alignment:"center"
// text1_bold:false
// text1_font:"Calibri"
// text1_font_color:"3D85C6"
// text1_font_size:"90"
// text1_italic:true
    // data['text1_alignment'] = this.m_contentArray.text1_alignment
    // data['text1_bold'] = this.m_contentArray.text1_bold
    // data['text1_font'] = this.m_contentArray.text1_font
    // data['text1_font_color'] = this.m_contentArray.text1_font_color
    // data['text1_font_size'] = this.m_contentArray.text1_font_size
    // data['text1_italic'] = this.m_contentArray.text1_italic


    var dynamicTexture1  = new THREEx.DynamicTexture(512,512)
    dynamicTexture1.context.font = "bolder " + data['text1_font_size'] + "px Verdana";
    dynamicTexture1.texture.anisotropy = renderer.getMaxAnisotropy()
    dynamicTexture1.clear('white').drawText(data['text1'], undefined, 256, 'red')
    var materialText1    = new THREE.MeshBasicMaterial({
        map : dynamicTexture1.texture
    })

    var dynamicTexture2  = new THREEx.DynamicTexture(512,512)
    dynamicTexture2.context.font = "bolder 90px Verdana";
    dynamicTexture2.texture.anisotropy = renderer.getMaxAnisotropy()
    dynamicTexture2.clear('cyan')
        .drawText(data['text2'], undefined, 256, 'red')

    var materialText2    = new THREE.MeshBasicMaterial({
        map : dynamicTexture2.texture
    })

    var dynamicTexture3  = new THREEx.DynamicTexture(512,512)
    dynamicTexture3.context.font = "bolder 90px Verdana";
    dynamicTexture3.texture.anisotropy = renderer.getMaxAnisotropy()
    dynamicTexture3.clear('cyan')
        .drawText(data['text3'], undefined, 256, 'red')

    var materialText3    = new THREE.MeshBasicMaterial({
        map : dynamicTexture3.texture
    })

    var dynamicTexture4  = new THREEx.DynamicTexture(512,512)
    dynamicTexture4.context.font = "bolder 90px Verdana";
    dynamicTexture4.texture.anisotropy = renderer.getMaxAnisotropy()
    dynamicTexture4.clear('cyan')
        .drawText(data['text4'], undefined, 256, 'red')

    var materialText2    = new THREE.MeshBasicMaterial({
        map : dynamicTexture4.texture
    })

    var dynamicTexture5  = new THREEx.DynamicTexture(512,512)
    dynamicTexture5.context.font = "bolder 90px Verdana";
    dynamicTexture5.texture.anisotropy = renderer.getMaxAnisotropy()
    dynamicTexture5.clear('cyan')
        .drawText(data['text5'], undefined, 256, 'red')

    var materialText5    = new THREE.MeshBasicMaterial({
        map : dynamicTexture5.texture
    })




    var dynamicTexture6  = new THREEx.DynamicTexture(512,512)
    dynamicTexture6.context.font = "italic bolder " + "90" + "px " + "Arial";

    var image  = document.createElement('img')
    image.src  = data['image6'],
    dynamicTexture6.drawImage( image,0, 0)

    //third argument is 
    //128 when valign top
    //256 when valign middle
    //500 when valign bottom

    //right/left alignment
    //2nd argument
    // undefined = middle
    // 10 = right side
    //160 = left side


  
    dynamicTexture6.drawText(data['text6'], 160, 500, '#ffff00')

    var materialText6    = new THREE.MeshBasicMaterial({
        map : dynamicTexture6.texture
    })





    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var dynamicTexture  = new THREEx.DynamicTexture(512,512)
    dynamicTexture.context.font = "bolder 90px Verdana";
    dynamicTexture.clear('cyan')
        .drawText('abcdef', undefined, 256, 'red')
    var materialtt    = new THREE.MeshBasicMaterial({
        map : dynamicTexture.texture
    })
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///text
    var text = [
        new THREE.MeshLambertMaterial({
            ambient: 0xffffff,
            map: dynamicTexture1.texture }),
        new THREE.MeshLambertMaterial({
            ambient: 0xffffff,
            map: dynamicTexture2.texture }),
        new THREE.MeshLambertMaterial({
            ambient: 0xffffff,
            map: dynamicTexture3.texture }),
        new THREE.MeshLambertMaterial({
            ambient: 0xffffff,
            map: dynamicTexture4.texture }),
        new THREE.MeshLambertMaterial({
            ambient: 0xffffff,
            map: dynamicTexture5.texture }),
        new THREE.MeshLambertMaterial({
            ambient: 0xffffff,
            map: dynamicTexture6.texture }),

    ];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (update == 1){
        scene.remove(cube);
    }


    var geo = new THREE.BoxGeometry(100, 100, 100); // w, h, d
    //var mat = new THREE.MeshLambertMaterial({ map: texture });

    if (data['imageOrText'] == 'image'){
        cube = new THREE.Mesh(geo,new THREE.MeshFaceMaterial (images) )}
    else{
        cube = new THREE.Mesh(geo,new THREE.MeshFaceMaterial (text) )}


    //var cube    = new THREE.Mesh( geo, materialText );
    cube.name = "scene-1-lambert-cube";
    scene.add(cube);
}

function createLights(scene)
{
    var light1 = new THREE.DirectionalLight(0xffffff, 0.6); // color, intens.
    light1.position.set(-1, -1, 0.3); // SW directional light

    var light2 = new THREE.PointLight(0xffffff, 0.6); // color, intens.
    light2.position.set(200, 200, 300); // NE point light

    var light3 = new THREE.DirectionalLight(0xffffff, 0.5); // color, intens.
    light3.position.set(0, 0, 1); // frontal light

    scene.add(light1);
    scene.add(light2);
    scene.add(light3); // add them all
}

//-----------------------------------------------------------------------------------

function resizeTHREE()
{
    var container = document.getElementById('canvas-container');
    if (container !== undefined && renderer !== undefined && camera !== undefined)
    {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect   = container.clientWidth/ container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.clear();
    }
}

//-----------------------------------------------------------------------------------

function cameraPositionsForScene(sceneNumber)
{
    var v = new THREE.Vector3();
    v.x = sceneNumber * sceneDistance;
    v.z = 300;
    return v;
}

//-----------------------------------------------------------------------------------

if (typeof String.prototype.startsWith != 'function')
{
    String.prototype.startsWith = function (str)
    {
        return this.slice(0, str.length) == str;
    };
}

function updateScene(data)
{

    var materials = [
        new THREE.MeshLambertMaterial({
            ambient: 0xffffff,
            map: THREE.ImageUtils.loadTexture(  data['image1'] ) }),
        new THREE.MeshLambertMaterial({
            ambient: 0xffffff,
            map: THREE.ImageUtils.loadTexture( data['image2'] ) }),
        new THREE.MeshLambertMaterial({
            ambient: 0xffffff,
            map: THREE.ImageUtils.loadTexture( data['image3'] ) }),
        new THREE.MeshLambertMaterial({
            ambient: 0xffffff,
            map: THREE.ImageUtils.loadTexture( data['image4'] ) }),
        new THREE.MeshLambertMaterial({
            ambient: 0xffffff,
            map: THREE.ImageUtils.loadTexture( data['image5']  ) }),
        new THREE.MeshLambertMaterial( {
            ambient: 0xffffff,
            map: THREE.ImageUtils.loadTexture( data['image6']  ) })
    ];

    //var material = new THREE.MeshBasicMaterial( { map: texture } );
    scene.remove(cube);
    var geo = new THREE.BoxGeometry(100, 100, 100); // w, h, d
    //  var mat = new THREE.MeshLambertMaterial({ map: texture });
    cube = new THREE.Mesh(geo, new THREE.MeshFaceMaterial(materials));
    cube.name = "scene-1-lambert-cube";
    scene.add(cube);
}




TemplateCube.prototype = Object.create(TemplateBase.prototype);