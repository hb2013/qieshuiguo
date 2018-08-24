function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;

    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;

    this.initContainer = function(){
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);

	s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);
            $('body').on('contextmenu', '#canvas', function(e){ return false; });
        }
        createjs.Touch.enable(s_oStage);

        s_iPrevTime = new Date().getTime();

	createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(35);

        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }

        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };

    this.preloaderReady = function(){
        this._loadImages();

	if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }

	_bUpdate = true;
    };

    this.soundLoaded = function(){
         _iCurResource++;
         var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

         _oPreloader.refreshLoader(iPerc);
         if(_iCurResource === RESOURCE_TO_LOAD){
            this._onRemovePreloader();
         }
    };

    this._initSounds = function(){
        var aSoundsInfo = new Array();
        aSoundsInfo.push({path: './sounds/',filename:'explosion',loop:false,volume:1, ingamename: 'explosion'});
        aSoundsInfo.push({path: './sounds/',filename:'click',loop:false,volume:1, ingamename: 'click'});
        aSoundsInfo.push({path: './sounds/',filename:'gameover',loop:false,volume:1, ingamename: 'gameover'});
        aSoundsInfo.push({path: './sounds/',filename:'fruit_slice_1',loop:false,volume:1, ingamename: 'fruit_slice_1'});
        aSoundsInfo.push({path: './sounds/',filename:'fruit_slice_2',loop:false,volume:1, ingamename: 'fruit_slice_2'});
        aSoundsInfo.push({path: './sounds/',filename:'fruit_slice_3',loop:false,volume:1, ingamename: 'fruit_slice_3'});
        aSoundsInfo.push({path: './sounds/',filename:'bomb_fuse',loop:false,volume:1, ingamename: 'bomb_fuse'});
        aSoundsInfo.push({path: './sounds/',filename:'boing_fruit',loop:false,volume:1, ingamename: 'boing_fruit'});
        aSoundsInfo.push({path: './sounds/',filename:'combo',loop:false,volume:1, ingamename: 'combo'});
        aSoundsInfo.push({path: './sounds/',filename:'soundtrack',loop:true,volume:1, ingamename: 'soundtrack'});

        RESOURCE_TO_LOAD += aSoundsInfo.length;

        s_aSounds = new Array();
        for(var i=0; i<aSoundsInfo.length; i++){
            s_aSounds[aSoundsInfo[i].ingamename] = new Howl({
                                                            src: [aSoundsInfo[i].path+aSoundsInfo[i].filename+'.mp3', aSoundsInfo[i].path+aSoundsInfo[i].filename+'.ogg'],
                                                            autoplay: false,
                                                            preload: true,
                                                            loop: aSoundsInfo[i].loop,
                                                            volume: aSoundsInfo[i].volume,
                                                            onload: s_oMain.soundLoaded()
                                                        });
        }

    };


    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("but_play","./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game","./small/game-bg.png");
        s_oSpriteLibrary.addSprite("gameover_bg","./sprites/gameover_bg.png");
        s_oSpriteLibrary.addSprite("wei-success","./small/wei-success.png");
        s_oSpriteLibrary.addSprite("wei-false","./small/wei-false.png");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("help_bg","./sprites/help_bg.png");
        s_oSpriteLibrary.addSprite("hit_area","./sprites/hit_area.png");
        s_oSpriteLibrary.addSprite("bomb","./sprites/bomb.png");
        s_oSpriteLibrary.addSprite("bomb_ray","./sprites/bomb_ray.png");
        s_oSpriteLibrary.addSprite("life","./sprites/life.png");
        s_oSpriteLibrary.addSprite("miss","./sprites/miss.png");
        s_oSpriteLibrary.addSprite("but_credits","./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("logo_ctl","./sprites/logo_ctl.png");

        for(var i=0;i<NUM_FRUITS;i++){
            s_oSpriteLibrary.addSprite("fruit_"+i,"./sprites/fruit_"+i+".png");
            s_oSpriteLibrary.addSprite("stain_"+i,"./sprites/stain_"+i+".png");
        }

        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };

    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);

        if(_iCurResource === RESOURCE_TO_LOAD){
            this._onRemovePreloader();
        }
    };

    this._onAllImagesLoaded = function(){

    };


    this._onRemovePreloader = function(){
        _oPreloader.unload();
        s_oSoundTrack = playSound("soundtrack", SOUNDTRACK_VOLUME,true);

        this.gotoMenu();
    };

    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoGame = function(){
        _oGame = new CGame(_oData);

        _iState = STATE_GAME;
    };

    this.gotoHelp = function(){
        _oHelp = new CHelpPanel();
        _iState = STATE_HELP;
    };

    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            Howler.mute(true);
        }

    };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            if(s_bAudioActive){
                Howler.mute(false);
            }
        }

    };

    this._update = function(event){
        if(_bUpdate === false){
                return;
        }

        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;

        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }

        if(_iState === STATE_GAME){
            _oGame.update();
        }

        s_oStage.update(event);

    };

    s_oMain = this;


    _oData = oData;
    ENABLE_FULLSCREEN = oData.fullscreen;
    ENABLE_CHECK_ORIENTATION = oData.check_orientation;

    this.initContainer();

    $(".formbtn").click(function(){
      s_oMain.gotoGame();$(".pagediv").hide();
      return false;
      var reg = /^1\d{10}$/;  //定义正则表达式
      if(!$("#username").val()){swal("","请输入姓名", "error");return false;}
      if(!$("#phone").val()){swal("","请输入电话", "error");return false;}
      //if(!reg.test($("#phone").val())){swal("","手机号码不正确", "error");return false;}
      if(!$("#city").val()){swal("","请输入省份", "error");return false;}
      GetData("action=save&username="+$("#username").val()+"&phone="+$("#phone").val()+"&city="+$("#city").val()+"&danwei="+$("#danwei").val(),function(json){
        if(json.error){swal("",json.error, "error");return false;}
        swal("","提交成功", "success");
      });
    });
    $(".p1-start-btn").click(function(){
      $(".p1-form").show();
    });
    $(".prule-btn").click(function(){
      $(".p1-rule").show();
    });
    $(".p1-rule").click(function(){
      $(".p1-rule").hide();
    });
}
var s_bMobile;
var s_bAudioActive = true;
var s_bFullscreen = false;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oCanvas;
var s_oSpriteLibrary;
var s_oSoundTrack = null;
var s_aSounds;
function GetData(postjson,backcall){
  var url='http://izhanghui.com/conf/705b7e17ad6db1a/app/lsqsg18';
  $.ajax({
    type: "POST",
    url: url,
    data:postjson,
    dataType: "json",
    success: function (json) {
      backcall(json);
    }
  });
}
