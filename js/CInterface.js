function CInterface(){
    var _oLifeText;
    var _oButExit;
    var _oScoreText;
    var _oCountText;
    var _oLifeIcon;
    var _oAudioToggle;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosLife;
    var _pStartPosLifeIcon;
    var _pStartPosScore;
    var _pStartPosFullscreen;
    var _pStartPosCount;

    this._init = function(){
        // _pStartPosLifeIcon = {x:20,y:20};
        // _oLifeIcon = new createBitmap(s_oSpriteLibrary.getSprite('life'));
        // _oLifeIcon.x = 20;
        // _oLifeIcon.y = 20;
        // s_oStage.addChild(_oLifeIcon);

        _pStartPosLife = {x:540,y:705};
        _oLifeText = new createjs.Text(" 60","25px "+FONT_GAME, "#c6511c");
        _oLifeText.x = _pStartPosLife.x;
        _oLifeText.y = _pStartPosLife.y;
        _oLifeText.textAlign = "center";
        _oLifeText.textBaseline = "middle";
        s_oStage.addChild(_oLifeText);

        _pStartPosCount = {x:730,y:705};
        _oCountText = new createjs.Text("0","25px "+FONT_GAME, "#c6511c");
        _oCountText.x = _pStartPosCount.x;
        _oCountText.y = _pStartPosCount.y;
        _oCountText.textAlign = "center";
        _oCountText.textBaseline = "middle";
        s_oStage.addChild(_oCountText);

        _pStartPosScore = {x:910,y:705};
	_oScoreText = new createjs.Text("0","25px "+FONT_GAME, "#c6511c");
        _oScoreText.x = _pStartPosScore.x;
        _oScoreText.y = _pStartPosScore.y;
        _oScoreText.textAlign = "center";
        _oScoreText.textBaseline = "middle";
        s_oStage.addChild(_oScoreText);

        // var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        // _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};
        // _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        // _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        // if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
        //
        //     var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
        //     _pStartPosAudio = {x: _pStartPosExit.x - oSprite.width/2 - 10, y: (oSprite.height/2) + 10};
        //     _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive,s_oStage);
        //     _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        //
        //     _pStartPosFullscreen = {x:_pStartPosAudio.x - oSprite.width/2 - 10,y:_pStartPosAudio.y};
        // }else{
        //     _pStartPosFullscreen = {x: _pStartPosExit.x - oSprite.width - 10, y: (oSprite.height/2) + 10};
        // }

        // var doc = window.document;
        // var docEl = doc.documentElement;
        // _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        // _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        //
        // if(ENABLE_FULLSCREEN === false){
        //     _fRequestFullScreen = false;
        // }
        //
        // if (_fRequestFullScreen && screenfull.enabled){
        //     oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
        //
        //
        //     _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
        //     _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        // }

        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };

    this.refreshButtonPos = function(iNewX,iNewY){
        //_oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        // if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
        //     _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        // }
        // if (_fRequestFullScreen && screenfull.enabled){
        //     _oButFullscreen.setPosition(_pStartPosFullscreen.x - iNewX,_pStartPosFullscreen.y + iNewY);
        // }

        // _oLifeIcon.x = _pStartPosLifeIcon.x + iNewX;
        // _oLifeIcon.y = _pStartPosLifeIcon.y + iNewY;
        _oLifeText.x = _pStartPosLife.x + iNewX;
        _oLifeText.y = _pStartPosLife.y + iNewY;
        _oScoreText.y = _pStartPosScore.y + iNewY;
    };

    this.unload = function(){
        _oButExit.unload();
        _oButExit = null;

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }

        s_oInterface = null
    };

    this.loseLife = function(iLives){
        _oLifeText.text = "X"+iLives;
    };
    this.loseLife2 = function(iLives){
        _oLifeText.text = " " +iLives;
    };
    this.losecountnum = function(iLives){
        _oCountText.text = " " +iLives;
    };

    this.refreshScore = function(iScore){
        _oScoreText.text = iScore;
    };

    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen && screenfull.enabled){
		_oButFullscreen.setActive(s_bFullscreen);
	}
    };

    this._onFullscreenRelease = function(){
        if(s_bFullscreen) {
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}

	sizeHandler();
    };

    this._onExit = function(){
        s_oGame.onExit();
    };

    s_oInterface = this;

    this._init();

    return this;
}

var s_oInterface = null;
