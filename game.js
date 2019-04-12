var part = 0; //the section of the game which it is in
var color = '66, 100, 200'; //bg color
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

var StartButton; //white start button
var Stage; //cactus bg
var FlatMirror; //mirror sprite
var Sun; //sun animation
var GoButton; //red go button
var Panels = [0]; //list of all the panel objects
var x; //cursor x
var y; //cursor y
var locx = []; //list of panel x locations
var locy = []; //list of panel y locations
var mirrornum = -1; //number of mirrors placed
var canplace = true; // true means mirrors can be placed
var sunx = 800; // sun start x
var suny = 0; // sun start y
var onGoButton = false;
var sunset = -256;
function preload() {
    this.load.path = 'assets/'; // this.load goes right to /assets
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
  moremirrors = this.add.text(125,300,'').setFontSize(45).setColor('black').setFontFamily('Superscript');
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
    if (part == 2 && canplace && !onGoButton){
      locx.push(cursor.x);
      locy.push(cursor.y);
      mirrornum = mirrornum + 1;
      Panels[mirrornum] = this.add.sprite(locx[mirrornum],locy[mirrornum],'FlatMirror').setRotation(3*(Math.PI)/2+Math.atan((locy[mirrornum]-suny)/(locx[mirrornum]-sunx)));
    }
  },this);
  GoButton.on('pointerover', function(){
    GoButton.setTint(0xA9A9A9);
    onGoButton = true;
  });
  GoButton.on('pointerout', function(){
    if (part == 2){
    GoButton.clearTint();
    onGoButton = false;
    moremirrors.text = '';
  }
  });
  GoButton.on('pointerdown', function(){
    if (Panels[0] == 0){
      moremirrors.text = 'Please Place a Mirror!';
    }else{
    part = 3;
    canplace = false;
    GoButton.setTint(0xA9A9A9);
    }
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
    if (sunx < 100){
      sunset--;
      suny++;
      Stage.tint = sunset;
    }
    if (suny > 250){
      part = 4;
    }
    FlatMirror.setVisible(false);
    help.destroy();
    sunx--;
    for (var i = 0; i< Panels.length; i++){
      var thispanel = Panels[i];
      var angleRad = 3*(Math.PI)/2+Math.atan((locy[i]-suny)/(locx[i]-sunx));
      if (locx[i] >= sunx){
        thispanel.setRotation(angleRad+Math.PI);
      }else{
        thispanel.setRotation(angleRad);
    }
    Sun.setPosition(sunx,suny);
    }
  }
  if (part == 4){
    GoButton.destroy();
  }
}
