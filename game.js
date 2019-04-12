var part = 0;
var color = '66, 100, 200';
var config = {
  type:Phaser.AUTO,
  width:800,
  height:600,
  backgroundColor: 'rgb('+color+')',
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var solar = new Phaser.Game(config);

var StartButton;
var Stage;
var FlatMirror;
var Sun;
var GoButton;
var Panels = [];
var x;
var y;
var locx = [];
var locy = [];
var mirrornum = -1;
var canplace = true;
var sunx = 800;
var suny = 0;
var panelcount = -1;
function preload() {
    this.load.path = 'assets/';
    this.load.image('StartButton','StartButton.png');
    this.load.image('StartButtonPressed','StartButtonPressed.png');
    this.load.image('Stage','Stage.png');
    this.load.image('FlatMirror','FlatMirror.png');
    this.load.image('Stage','Stage.png');
    this.load.image('FlatMirror','FlatMirror.png');
    this.load.image('Sun1','Sun1.png');
    this.load.image('Sun2','Sun2.png');
    this.load.image('GoButton','GoButton.png')

}

function create(){

  StartButton = this.add.sprite(400,300,'StartButton').setScale(1.5).setInteractive();
  Stage = this.add.sprite(400,300,'Stage').setVisible(false);
  FlatMirror = this.add.sprite(400,300,'FlatMirror').setVisible(false);
  GoButton = this.add.sprite(700,500,'GoButton').setScale(2).setInteractive().setVisible(false);
  this.anims.create({
    key: 'sun',
    frames: [
      {key: 'Sun1'},
      {key: 'Sun2'},
    ],
    frameRate: 4,
    repeat: -1
  });
  Sun = this.add.sprite(650,150,'sun').setScale(4).play('sun');
  StartButton.on('pointerover', function(){
    StartButton.setTexture('StartButtonPressed');
  });
  StartButton.on('pointerout', function(){
    StartButton.setTexture('StartButton');
  });
  StartButton.on('pointerdown',function(){
    part = 1;
  });
  this.input.on('pointerdown',function(cursor){
    if (part == 2 && canplace){
      locx.push(cursor.x);
      locy.push(cursor.y);
      mirrornum = mirrornum + 1;
      panelcount = panelcount +1;
      Panels[panelcount] = this.add.sprite(locx[mirrornum],locy[mirrornum],'FlatMirror').setRotation(3*(Math.PI)/2+Math.atan((locy[mirrornum]-suny)/(locx[mirrornum]-sunx)));
    }
  },this);
  GoButton.on('pointerover', function(){
    GoButton.setTint(0xA9A9A9);
  });
  GoButton.on('pointerout', function(){
    GoButton.clearTint();
  });
  GoButton.on('pointerdown', function(){
    part = 3;
  });
}
function update(){
  x = this.input.x;
  y = this.input.y;
  if (part == 1){
    help = this.add.text(100,550,'').setFontSize(45).setColor('black').setFontFamily('Superscript');
    StartButton.destroy();
    Stage.setVisible(true);
    FlatMirror.setVisible(true);
    Sun.setPosition(sunx,suny);
    GoButton.setVisible(true);
    part = 2;
  }
  if  (part == 2){
    help.text = 'Good Spot to Build';
    FlatMirror.setPosition(x,y);
    FlatMirror.setTintFill(0x008000);
    canplace = true;
    for (var i = 0; i<= locx.length; i++){
      if (Math.abs(locx[i]-x)<30 && Math.abs(locy[i]-y)<30){
        FlatMirror.setTintFill(0xFF0000);
        canplace = false;
        help.text = 'Too Close!'
      }
    }
  }
  if (part == 3){
    FlatMirror.setVisible(false);
    help.destroy();
    sunx--;
    Sun.setPosition(sunx,suny)
    for (var i = 0; i< Panels.length; i++){
      thispanel = Panels[i];
      thispanel.setRotation(3*(Math.PI)/2+Math.atan((locy[i]-suny)/(locx[i]-sunx)));
    }
  }

}
