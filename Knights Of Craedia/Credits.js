class Credits extends Phaser.Scene {
  constructor() {
    //sets the name that the program will use for the current scene.
    //this becomes important if we have multiple levels using the same template.
    super("Credits");
  }
  preload() {
    //bringing in the media assets for the current level
  }
  create() {

    //background
    const rect = this.add.rectangle(0, 0, 1000, 1500, 'yellow', 1)

    //Text for credits
    this.add.text(config.width / 2, config.height / 2 - 200, ' Knights of Craedia', { fontSize: '40px', fill: '#5D3FD3' }).setOrigin(0.5, 0.5);

    this.add.text(config.width / 2, config.height / 2  - 100, 'Game created by Alex Beattie ', { fontSize: '20px', fill: '#5D3FD3' }).setOrigin(0.5, 0.5);

    this.add.text(config.width / 2, config.height / 2 - 40, 'Graphic assets created by Alex Beattie ', { fontSize: '20px', fill: '#5D3FD3' }).setOrigin(0.5, 0.5);

    this.add.text(config.width / 2, config.height / 2 + 10, 'licensed for use under CC 0 and CC BY. ', { fontSize: '20px', fill: '#5D3FD3' }).setOrigin(0.5, 0.5);

    this.add.text(config.width / 2, config.height / 2 + 40, ' Copyright 2022 ', { fontSize: '20px', fill: '#5D3FD3' }).setOrigin(0.5, 0.5);

    this.add.text(config.width / 2, config.height / 2 + 80, 'Click to return to the menu ', { fontSize: '20px', fill: 'white' }).setOrigin(0.5, 0.5);
    //add code to go back to the start screen when the mouse is clicked
    this.input.on('pointerup', () => {
      this.scene.stop('Credits');
      this.scene.start('StartScreen');
    });
    //creating the starting point for the level, loading the assets into sprites, setting up controls for the enemies, and collision detection
    //this is where most of your code will be
  }
  update() {
    //changes that happen on each screen refresh. This is mostly for player controls.
  }
}