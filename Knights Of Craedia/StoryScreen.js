class StoryScreen extends Phaser.Scene {
  constructor() {
    //sets the name that the program will use for the current Scene.
    //this becomes important if we have multiple levels using the same template.
    super("StoryScreen");
  }
  preload() {
    //bringing in the media assets for the current level
    this.load.image('story', 'assets/story.png');

  }
  create() {
    //creating the starting point for the level, loading the assets into sprites, setting up controls for the enemies, and collision detection
    //this is where most of your code will be

    //background
    const rect = this.add.rectangle(0, 0, 1000, 1500, 0x7f7f7f, 1)
    this.add.image(0 + 30, 0 + 30, 'story').setOrigin(0, 0);

    //start button

    this.add.text(config.width / 2 - 150, config.height / 2 + 200, "Click anywhere to start", { fontFamily: 'Georgia, Times, serif', fontSize: '30px', fill: '#fee000' }).setOrigin(0, 0);

    //code to go to the start screen when the mouse is clicked
    this.input.on('pointerup', () => {
      this.scene.stop('StoryScreen');
      this.scene.start('Level');
    });
  }
  update() {
    //changes that happen on each screen refresh. This is mostly for player controls.
  }
}