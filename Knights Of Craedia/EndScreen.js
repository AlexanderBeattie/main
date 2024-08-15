class EndScreen extends Phaser.Scene {
  constructor() {
    //sets the name that the program will use for the current Scene.
    //this becomes important if we have multiple levels using the same template.
    super("EndScreen");
  }
  preload() {
    //bringing in the media assets for the current level
    this.load.image('end', 'assets/endScreen.jpeg');
    this.load.image('startButton', 'assets/button.png');
  }
  create() {
    //creating the starting point for the level, loading the assets into sprites, setting up controls for the enemies, and collision detection
    //this is where most of your code will be

    //background
    this.add.image(0, 0, 'end').setOrigin(0, 0);

    //high score

    if (gameState.score > gameState.highScore) {
      gameState.highScore = Number(gameState.score);
      this.add.text(config.width / 2, 100, `New High Score: ${gameState.score}`, { fontFamily: 'Georgia, Times, serif', fontStyle: 'bold', fontSize: '40px', fill: '#5D3FD3' }).setOrigin(0.5, 0.5);
    }
    else {
      this.add.text(config.width / 2, 100, `Your Score Was:  ${gameState.score}`, { fontFamily: 'Georgia, Times, serif', fontStyle: 'bold', fontSize: '40px', fill: '#5D3FD3' }).setOrigin(0.5, 0.5);
    }

    //Game title
    this.add.text(config.width / 2, 250, " GAME OVER ", { fontFamily: 'Georgia, Times, serif', fontStyle: 'bold', fontSize: '60px', fill: '#5D3FD3', backgroundColor: 'pink ' }).setOrigin(0.5, 0.5);

    //menu button
    const button = this.add.sprite(config.width / 2 - 110, config.height / 2 + 70, 'startButton').setInteractive();
    button.scaleX=0.75;
    button.scaleY=1.5;
    button.on('pointerup', () => {
      this.scene.stop('EndScreen');
      this.scene.start('StartScreen');
    });
    this.add.text(config.width / 2 - 200, config.height / 2 + 30, "Menu", { fontFamily: 'Georgia, Times, serif', fontStyle: 'bold', fontSize: '60px', fill: '#5D3FD3' }).setOrigin(0, 0);

    //replay button
    const button1 = this.add.sprite(config.width / 2 + 110, config.height / 2 + 70, 'startButton').setInteractive();
    button1.scaleX=0.75;
    button1.scaleY=1.5;
    button1.on('pointerup', () => {
      this.scene.stop('EndScreen');
      this.scene.start('StoryScreen');
    });
    this.add.text(config.width / 2 + 10 , config.height / 2 + 30, "Replay", { fontFamily: 'Georgia, Times, serif', fontStyle: 'bold', fontSize: '60px', fill: '#5D3FD3' }).setOrigin(0, 0);
  }
  update() {
    //changes that happen on each screen refresh. This is mostly for player controls.
  }
}