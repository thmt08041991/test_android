/* 
 * author : Minh Tuan - developer of joomlavi.com
 */
//for ready when DOM repair
var ready = function (f) {
        (/complete|loaded|interactive/.test(document.readyState)) ? f() : setTimeout(ready, 9, f);
    };
//clone a json object

 //end
var myFn = {
    extend : function(obj) {
    Array.prototype.slice.call(arguments, 1).forEach(function(source) {
        if (source) {
            for (var prop in source) {
                if (source[prop].constructor === Object) {
                    if (!obj[prop] || obj[prop].constructor === Object) {
                        obj[prop] = obj[prop] || {};
                        extend(obj[prop], source[prop]);
                    } else {
                        obj[prop] = source[prop];
                    }
                } else {
                    obj[prop] = source[prop];
                }
            }
        }
    });
    return obj;
    },
    create : function(o, filter) {
      function defaultFilter(val) { return true; }
      function c(o, filter) {
        for (var i in o) {
          if (filter(o[i])) this[i] = o[i];
        }
      }
      if (arguments.length === 1) filter = defaultFilter;
      return new c(o, filter);
    },
    isObject : function(o){
        return typeof o === "object" ? true : false;
    }
};
joomlavi = {
    canvas : null,
    stages : null,
    createjs : null,
    selectors : null,
    imageObj : [],
    bitmapObj:[],
    containerObj : [],
    Init : function(createjs,selector,o){
        this.canvas = document.getElementById(selector);
        var settings = myFn.extend(this.settings,o);
        this.canvas.width = this.settings.w;
        this.canvas.height= this.settings.h;
        this.createjs = createjs;
        this.selectors = selector;
        this.stages = new this.createjs.Stage(this.canvas);
        //console.log(this.stages.canvas.style.width = "100%");
        //push object to array
        this.pushToObj();  
    },
    pushToObj : function(){
        var OImg = this.imageObj,
            OCont= this.containerObj,
            OBit = this.bitmapObj;
        
        for (var i = 0 ; i < this.settings.sources.length ; i++){
            OImg[i] = document.createElement('img');
            OImg[i].src = this.settings.sources[i].src;
            OCont[i] = new this.createjs.Container();
            OBit[i] = new this.createjs.Bitmap(OImg[i]);
            OBit[i].scaleX = this.canvas.width/OImg[i].width;
            OBit[i].scaleY = this.canvas.height/OImg[i].height;
            OCont[i].addChild(OBit[i]);
            this.setControl(OCont[i]);
            OCont[i].cache(0,0,this.canvas.width,this.canvas.height);
            this.stages.addChild(OCont[i]);
        };
    },
    setControl : function(OCont){
        OCont.onPress = function(evt){
            var offset = {x:evt.target.x-evt.stageX, y:evt.target.y-evt.stageY};
                    evt.onMouseMove = function(ev) {
                    ev.target.x = ev.stageX+offset.x;
                    //ev.target.y = ev.stageY+offset.y;                      
                };
        };
    },
    settings : {
        type      : '',
        w : null,
        h : null,
        sources : [ {src : 'images/1.jpg',title: '1.jpg',description : '1.jpg test'},
                    {src : 'images/2.jpg',title: '2.jpg',description : '2.jpg test'},
                    {src : 'images/3.jpg',title: '3.jpg',description : '3.jpg test'},
                    {src : 'images/4.jpg',title: '4.jpg',description : '4.jpg test'},
                    {src : 'images/5.jpg',title: '5.jpg',description : '5.jpg test'},
                    {src : 'images/6.jpg',title: '6.jpg',description : '6.jpg test'}]
    },
    Start : function(){
        //setting the drag and drop
        //start the stage
        createjs.Ticker.setFPS(60);
        this.createjs.Ticker.addListener(this.stages);
        this.stages.update();
    },
    tick: function(){
        console.log("abcde");
    }
   
};

