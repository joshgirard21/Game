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
var Tower;
var Cloud;
var Cloud2;
var TowerObj;
var Panels = [0]; //list of all the panel objects
var Line = [];
var Emitter = [];
var alpha = 0;
var sunray;
var thisline;
var x; //cursor x
var y; //cursor y
var locx = []; //list of panel x locations
var locy = []; //list of panel y locations
var towerx = 0;
var towery;
var mirrornum = -1; //number of mirrors placed
var canplace = true; // true means mirrors can be placed
var sunx = 800; // sun start x
var suny = 0; // sun start y
var onGoButton = false;
var sunset = 1;
var cloudx = -100;
var cloudy = 500;
var cloud2x = 800;
var cloud2y = 400;
var graphics;
var bet = false;
var totalpower = 12*(800+300);
var instruct;

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
    this.load.image('GoButton','GoButton.png');
    this.load.image('Tower','CollectorTower.png');
    this.load.image('Cloud','cloud.png');
    this.load.image('SunRay','sunray.png');
    this.load.image('Electron','electron.png');

}
function create(){
  Cloud2 = this.add.sprite(cloud2x,cloud2y,'Cloud').setScale(2).setRotation(Math.PI).setAlpha(.6);
  Cloud = this.add.sprite(cloudx,cloudy,'Cloud').setScale(3);
  StartButton = this.add.sprite(400,300,'StartButton').setScale(1.5).setInteractive();
  Stage = this.add.sprite(400,300,'Stage').setVisible(false);
  moremirrors = this.add.text(100,300,'').setFontSize(45).setColor('black').setFontFamily('Superscript');
  FlatMirror = this.add.sprite(400,300,'FlatMirror').setVisible(false);
  GoButton = this.add.sprite(700,500,'GoButton').setScale(2).setInteractive().setVisible(false);
  Tower = this.add.sprite(0,0,'Tower').setVisible(false);
  for (var i = 0; i <12; i++){
    Line[i] = this.add.graphics();
  }
  graphics = this.add.graphics();
  sunray = this.add.particles('SunRay');
  electron = this.add.particles('Electron');
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
    if (part == 2 && canplace && !onGoButton && Panels.length < 12){
      instruct.setText('');
      locx.push(cursor.x);
      locy.push(cursor.y);
      mirrornum = mirrornum + 1;
      Panels[mirrornum] = this.add.sprite(locx[mirrornum],locy[mirrornum],'FlatMirror').setRotation(3*(Math.PI)/2+Math.atan((locy[mirrornum]-suny)/(locx[mirrornum]-sunx)));
      if (mirrornum == 11){
        part = 2.5;
      }
    }
    if (part == 2.75 && canplace){
      FinalTower = this.add.sprite(cursor.x,cursor.y,'Tower');
      towerx = cursor.x;
      towery = cursor.y;
      TowerObj = this.add.sprite(towerx,towery,'Tower').setTintFill(0xFF0000).setAlpha(0);
      part = 2.8;
    }
  },this);
  GoButton.on('pointerover', function(){
    GoButton.setTint(0xA9A9A9);
    onGoButton = true;
    canplace = false;
  });
  GoButton.on('pointerout', function(){
    if (part == 2 || part == 2.75 || part == 2.8){
    GoButton.clearTint();
    onGoButton = false;
    moremirrors.text = '';
  }
  });
  GoButton.on('pointerdown', function(){
    if (Panels[0] == 0 || towerx == 0){
      moremirrors.text = 'Place Mirrors & Collector!';
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
  if (part == 0){
    cloudx = cloudx+1.5;
    cloud2x--;
    Cloud.setPosition(cloudx,cloudy);
    Cloud2.setPosition(cloud2x,cloud2y);
    if (cloudx >1000){
      cloudx = -200;
    }
    if (cloud2x < -150){
      cloud2x = 1000;
    }
  }
  if (part == 1){
    help = this.add.text(100,550,'').setFontSize(45).setColor('black').setFontFamily('Superscript');
    Cloud.destroy();
    Cloud2.destroy();
    StartButton.destroy();
    Stage.setVisible(true);
    FlatMirror.setVisible(true);
    Sun.setPosition(sunx,suny);
    GoButton.setVisible(true);
    instruct = this.add.text(100,200,'Click to add solar panels (twelve of them) and then once for a collector tower').setWordWrapWidth(600).setFontSize(45).setColor('black').setFontFamily('Superscript');
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
        help.text = 'Too Close!';
      }
    }
  }
  if (part == 2.5){
    Tower.setVisible(true);
    FlatMirror.setVisible(false);
    for (var i = 0; i< Panels.length; i++){
      Emitter[i] = sunray.createEmitter();
      thisRay = Emitter[i];
      thisRay.setPosition(locx[i],locy[i]);
      thisRay.setSpeed(50);
      thisRay.setScale({start:.6, end: 0});
      thisRay.setLifespan(1000);
      thisRay.setBlendMode('ADD');
    }
    part = 2.75;
  }
  if (part == 2.75){
    Tower.setPosition(x,y);
    help.text = 'Good Spot to Build';
    Tower.setTintFill(0x008000);
    canplace = true;
    for (var i = 0; i<= locx.length; i++){
      if (Math.abs(locx[i]-x)<30 && Math.abs(locy[i]-y)<30){
        Tower.setTintFill(0xFF0000);
        canplace = false;
        help.text = 'Too Close!';
      }
      if(onGoButton){
        canplace = false;
        Tower.setTintFill(0xFF0000);
      }
    }
  }
  if (part == 2.8){
    canplace = false;
    Tower.setVisible(false);
    instruct.setText('Press the go button to start the day!');
    instruct.setPosition(200,400);
  }
  if (part == 3){
    instruct.setText('');
    alpha += .0008;
    TowerObj.setAlpha(alpha);
    for (var i = 0; i <12; i++){
      thisline = Line[i];
      thisline.clear();
      thisline.lineStyle(10,0xffff00);
      thisline.beginPath(); thisline.moveTo(sunx,suny); thisline.lineTo(locx[i],locy[i]); thisline.closePath(); thisline.strokePath();
      thispanel = Panels[i];
      if (!bet){
        thispanel.clearTint();
      }
        }
    if (sunx < 100){
      sunset = sunset - .0014;
      suny++;
      Stage.alpha = sunset;
    }
    if (suny > 250){
      part = 5;
    }
    FlatMirror.setVisible(false);
    help.destroy();
    sunx--;
    for (var i = 0; i< Panels.length; i++){
      var thispanel = Panels[i];
      var thetaRad = Math.atan((locy[i]-suny)/(locx[i]-sunx));
      var phiRad = Math.atan((locy[i]-towery)/(locx[i]-towerx));
      if (locx[i] < sunx){
        thispanel.setRotation(thetaRad-Math.PI/2);
      }else if(locx[i] >= sunx){
        thispanel.setRotation(thetaRad+Math.PI/2)
      }
    Sun.setPosition(sunx,suny);
    dist = Math.sqrt((locx[i]-towerx)*(locx[i]-towerx)+(locy[i]-towery)*(locy[i]-towery));
    thisRay = Emitter[i];
    life = 1000*dist/50;
    thisRay.setLifespan(life);
    if (locx[i] < towerx){
      thisRay.setAngle(phiRad*180/Math.PI);
    }else{
      thisRay.setAngle(phiRad*180/Math.PI+180);
    }
      for (var k = 0; k< Panels.length; k++){
        if (k!=i){
        between(locx[i],locy[i],locx[k],locy[k],sunx,suny);
      }
    }
      if (bet){
        thispanel.setTintFill('0xFF0000');
        bet = false;
        totalpower--
      }
    }
  }
  if (part == 5){
    GoButton.destroy();
    for (var i = 0; i <12; i++){
    thisline = Line[i];
    thisline.destroy();
    thisRay = Emitter[i];
    thisRay.setLifespan(0);
    }
    part = 6;
  }
  if (part == 6){
    TowerObj.alpha = alpha;
    alpha-=.005;
    if(alpha<=.005){
      part = 7;
    }
  }
  if (part == 7){
    angle = 180*(Math.atan((600-towery)/(400-towerx)))/Math.PI;
    if(towerx >400){
      angle = angle + 180
    }
    energy = sunray.createEmitter();
    energy.setAngle(angle);
    energy.setPosition(towerx,towery);
    energy.setSpeed(250);
    energy.setFrequency(500);
    energy.setScale({start: 1, end: .2});
    energy.setLifespan(5000);
    energy.setBlendMode('ADD');
    electricity = electron.createEmitter();
    electricity.setPosition(390,550);
    electricity.setSpeed(100);
    electricity.setScale(.8);
    electricity.setLifespan(900);
    electricity.setBlendMode('ADD');
    electricity.setFrequency(500);
    part = 8;
  }
  if (part ==8){
    maxX = Math.max.apply(Math, locx);
    maxY = Math.max.apply(Math, locy);
    minX = Math.min.apply(Math, locx);
    minY = Math.min.apply(Math, locy);
    graphics.fillStyle(0x000000, .5);
    graphics.fillRoundedRect(minX, minY, maxX-minX, maxY-minY, 32);
    for (var i = 0; i< Panels.length; i++){
    }
    part = 9;
  }
  if (part == 9){
    for (var i = 0; i< Panels.length; i++){
      thispanel = Panels[i];
      thisemitter = Emitter[i];
      thisemitter.setScale(0);
      thispanel.setAlpha(.3);
    }
    FinalTower.setAlpha(.3);
    MW = parseFloat(100*totalpower/((maxX-minX)*(maxY-minY))).toFixed(2);
    instruct.setPosition(10,10);
    instruct.setText('You generated: '+MW+' Mega Watts per square Kilometer! Sweet!');
    part = 10;
  }
}
function between(x1,y1,x2,y2,x3,y3){
  c = Math.hypot(x3-x1,y3-y1);
  a = Math.hypot(x2-x1,y2-y1);
  b = Math.hypot(x3-x2,y3-y2);
  if (Math.abs(a+b-c) < 20){
    bet = true;
  }
}
