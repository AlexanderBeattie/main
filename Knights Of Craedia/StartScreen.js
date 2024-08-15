class StartScreen extends Phaser.Scene {
  constructor() {
    //sets the name that the program will use for the current Scene.
    //this becomes important if we have multiple levels using the same template.
    super("StartScreen");
  }
  preload() {
    //bringing in the media assets for the current level
    this.load.image('start', 'assets/startScreen.png');
    this.load.image('startButton', 'assets/button.png');
  }
  create() {
    //creating the starting point for the level, loading the assets into sprites, setting up controls for the enemies, and collision detection
    //this is where most of your code will be

    //background
    this.add.image(0, 0, 'start').setOrigin(0, 0);

    //Game title
    this.add.text(config.width / 2 - 220, config.height / 2 - 245, "Knights Of Craedia", { fontFamily: 'Georgia, Times, serif', fontStyle: 'bold', fontSize: '45px', fill: '#5D3FD3', fontStyle: 'bold' }).setOrigin(0, 0);



    //highscore box and text
    const hs = this.add.sprite(config.width / 2, config.height / 2 - 52, 'startButton').setScale(1)

    hs.scaleX = 1.2

    this.add.text(config.width / 2 - 145, config.height / 2 - 75, `High Score: ${gameState.highScore}`, { fontFamily: 'Georgia, Times, serif', fontStyle: 'bold', fontSize: '38px', fill: '#5D3FD3' }).setOrigin(0, 0);


    //start button
    const button = this.add.sprite(config.width / 2, config.height / 2 + 50, 'startButton').setScale(1.25).setInteractive();
    button.on('pointerup', () => {
      this.scene.stop('StartScreen');
      this.scene.start('StoryScreen');
    });
    this.add.text(config.width / 2 - 85, config.height / 2 + 10, "Start", { fontFamily: 'Georgia, Times, serif', fontStyle: 'bold', fontSize: '70px', fill: '#5D3FD3' }).setOrigin(0, 0);

    //credits button
    const button2 = this.add.sprite(config.width / 2, config.height / 2 + 160, 'startButton').setScale(1).setInteractive();
    button2.on('pointerup', () => {
      this.scene.stop('StartScreen');
      this.scene.start('Credits');
    });
    this.add.text(config.width / 2 - 110, config.height / 2 +130, "Credits", { fontFamily: 'Georgia, Times, serif', fontStyle: 'bold', fontSize: '60px', fill: '#5D3FD3' }).setOrigin(0, 0);

  }
  update() {
    //changes that happen on each screen refresh. This is mostly for player controls.
  }
}