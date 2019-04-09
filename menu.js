class menu extends Phaser.Scene {
  constructor () {
    super({key:"menu"});
  }
  preload() {
    this.load.image('StartButton','assets/StartButton.png');
  }
  create() {
    solar.stage.backgroundColor = 'blue'
  }
  update(delta) {

  }
}
