color = '66, 20, 150';
var config = {
  type:Phaser.AUTO,
  width:100%,
  height:100%,
  backgroundColor: 'rgb('+color+')',
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var solar = new Phaser.Game(config);

function preload() {

    this.load.path = 'assets/'
    this.load.image('StartButton','StartButton.png')
    this.load.image('StartButtonPressed','StartButtonPressed.png')
    Xtext = this.add.text(100,100,'X coord is:');
    Ytext = this.add.text(100,150,'Y coord is:');
}

function create(){

  var StartButton = this.add.sprite(400,300,'StartButton').setScale(2).setInteractive();

  StartButton.on('pointerover', function(){
    StartButton.setTexture('StartButtonPressed');
  });
  StartButton.on('pointerout', function(){
    StartButton.setTexture('StartButton');
  });
  this.input.on('pointermove', function (cursor){
    x = cursor.x;
    y = cursor.y;
    Xtext.text = 'X coord is:'+x;
    Ytext.text = 'Y coord is:'+y;
  }, this);
}

function update(delta) {

}
