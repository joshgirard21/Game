//alert("Welcome!");
var go = 0;
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
var StartButton
var Stage
var FlatMirror
function preload() {
    this.load.path = 'assets/';
    this.load.image('StartButton','StartButton.png');
    this.load.image('StartButtonPressed','StartButtonPressed.png');
    this.load.image('Stage','Stage.png');
    this.load.image('FlatMirror','FlatMirror.png');
    this.load.image('Stage','Stage.png');
    this.load.image('FlatMirror','FlatMirror.png');

    Xtext = this.add.text(100,100,'X coord is:');
    Ytext = this.add.text(100,150,'Y coord is:');
}

function create(){

  StartButton = this.add.sprite(400,300,'StartButton').setScale(1.5).setInteractive();

  StartButton.inputEnabled = true;
  StartButton.on('pointerover', function(){
    StartButton.setTexture('StartButtonPressed');
  });
  StartButton.on('pointerout', function(){
    StartButton.setTexture('StartButton');
  });
  StartButton.on('pointerdown',function(){
    go = 1;
  });

}
function update(){
  x = this.input.mousePointer.x;
  y = this.input.mousePointer.y;
  Xtext.text = 'X coord is:'+x;
  Ytext.text = 'Y coord is:'+y;
  if (go == 1){
    StartButton.destroy();
    Stage = this.add.sprite(400,300,'Stage');
    FlatMirror = this.add.sprite(x,y,'FlatMirror');

  }
}
