const gameState = { score: 0, highScore: 0, fontSettings: { fontFamily: 'Georgia, Times, serif', fontSize: '40px', fill: '#5D3FD3' } };

const config = {
  parent: 'game',
  type: Phaser.AUTO,
  width: 500,
  height: 600,
  backgroundColor: '#f9f9f9',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 100
      },
      debug: false
    }
  },
  scene: [
    StartScreen, StoryScreen, EndScreen, Level, Credits
  ]
};

const game = new Phaser.Game(config);
