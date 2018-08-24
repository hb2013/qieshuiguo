function CEndPanel(){

    var _oBg;
    var _oScoreText;
    var _oMsgText;
    var _oRestartBut;
    var _oGroup;
    var _success;
    var _false;

    this._init = function(){

        _oBg = createBitmap(s_oSpriteLibrary.getSprite('gameover_bg'));
        _oBg.x = 0;
        _oBg.y = 0;


        _oMsgText = new createjs.Text("","80px "+FONT_GAME, "#FFCC00");
        _oMsgText.x = CANVAS_WIDTH/2;
        _oMsgText.y = (CANVAS_HEIGHT/2)-132;
        _oMsgText.textAlign = "center";
        _oMsgText.shadow = new createjs.Shadow("#000", 2, 2, 2);

        _oScoreText = new createjs.Text("","50px "+FONT_GAME, "#FFCC00");
        _oScoreText.x = CANVAS_WIDTH/2;
        _oScoreText.y = (CANVAS_HEIGHT/2) + 52;
        _oScoreText.shadow = new createjs.Shadow("#000", 2, 2, 2);
        _oScoreText.textAlign = "center";


        // _success = new createBitmap(s_oSpriteLibrary.getSprite('wei-success'));
        // _success.x = 255;
        // _success.y = 259;
        // _success.addEventListener(ON_MOUSE_UP, this._onButRestartRelease, this);
        // s_oStage.addChild(_success);

    };

    this.unload = function(){
        _oGroup.off("mousedown",this._onExit);
    };

    this._initListener = function(){
        _oGroup.on("mousedown",this._onExit);
    };

    this.show = function(iScore){
      if(iScore<6000){
        var oSprite = s_oSpriteLibrary.getSprite('wei-false');
      }else{
        var oSprite = s_oSpriteLibrary.getSprite('wei-success');
      }
      _oRestartBut = new CTextButton((CANVAS_WIDTH/2),CANVAS_HEIGHT/2,oSprite,' ',FONT_GAME,"#ffc600",60,false);
      _oRestartBut.addEventListener(ON_MOUSE_UP, this._onButRestartRelease, this);
      _oGroup = new createjs.Container();
      _oGroup.visible=false;
      _oGroup.addChild(_oRestartBut.getSprite());
      s_oStage.addChild(_oGroup);

        _oMsgText.text = TEXT_GAMEOVER;
        _oScoreText.text = TEXT_SCORE +": "+iScore;

        _oGroup.visible = true;

        $(s_oMain).trigger("save_score",iScore);
        $(s_oMain).trigger("show_interlevel_ad");
    };

    this._onExit = function(){
        _oGroup.off("mousedown",this._onExit);
        s_oStage.removeChild(_oGroup);

        s_oGame.onExit();
    };

    this._onButRestartRelease = function(){
        s_oStage.removeAllChildren();

        $(s_oMain).trigger("restart_level",1);
        s_oMain.gotoGame();
    };

    this._init();

    return this;
}
