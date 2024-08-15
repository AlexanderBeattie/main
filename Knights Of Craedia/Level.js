class Level extends Phaser.Scene {
  constructor() {
    //sets the name that the program will use for the current level.
    //this becomes important if we have multiple levels using the same template.
    super("Level");
  }

  preload() {
    //bringing in the media assets for the current level

    //background
    this.load.image('background', 'assets/background.png');


    //sprites
    this.load.image('zombie', 'assets/zombie.png');
    this.load.image('knight', 'assets/knight.png');
    this.load.image('multiplier', 'assets/multiplier.png');
    this.load.image('fireball', 'assets/fireball.png');

    //player spritesheets
    this.load.spritesheet('knightStab', 'assets/knightStab.png', { frameWidth: 52, frameHeight: 73 });

    this.load.spritesheet('knightIdle', 'assets/idleSheet.png', { frameWidth: 60, frameHeight: 60 });

    //zombie animations
    this.load.spritesheet('zombWalk', 'assets/zombieWalk.png', { frameWidth: 43, frameHeight: 34 });

    //ability animations
    this.load.spritesheet('fballAnim', 'assets/fireballSheet.png', { frameWidth: 75, frameHeight: 400 });



    //sounds
    this.load.audio("attackSound", "assets/attackSound.mp3");
    this.load.audio("zombDeath", "assets/zombDeath.mp3");
    this.load.audio("gameOver", "assets/gameOver.wav");
    this.load.audio("backgroundMusic", "assets/backgroundMusic.mp3");

    //ui assets
    this.load.image('noHp', 'assets/noHealth.png');
    this.load.image('fullHp', 'assets/fullHealth.png');
    this.load.image('twoLives', 'assets/twoLives.png');
    this.load.image('oneLife', 'assets/oneLife.png');
  }

  create() {
    //creating the starting point for the level, loading the assets into sprites, setting up controls for the enemies, and collision detection
    //this is where most of your code will be
    // targets for zombies

    gameState.target = this.physics.add.existing(this.add.rectangle(config.width / 2 + 5, 420, 500, 20, 0x7f7f7f, 1));

    gameState.target.body.immovable = true;
    gameState.target.body.allowGravity = false;


    //bg
    this.add.image(0, 0, 'background').setOrigin(0, 0);

    //bg audio
    gameState.bgMusic = this.sound.add('backgroundMusic', { volume: 0.3 });
    gameState.bgMusic.play();

    //UI

    //score
    gameState.score = 0
    gameState.scoreText = this.add.text(config.width / 2 + 50, 1, `Score:${gameState.score}`, { fontSize: '30px', backgroundColor: '#34568B', fill: '#FF6F61', fontStyle: 'bold' });
    gameState.scoreText.setDepth(1);


    //multiplier
    gameState.multiCount = 1
    gameState.multiText = this.add.text(config.width / 2 + 60, 30, `${gameState.multiCount}x Multplier`, { fontSize: '15px', backgroundColor: '#34568B', fill: '#FF6F61', fontStyle: 'bold' });
    gameState.multiText.setDepth(1);

    //hp
    gameState.lives = 3
    gameState.healthBar = this.add.image(config.width / 2 - 110, 25, 'fullHp')
    gameState.healthBar.setDepth(1);


    //player
    gameState.player = this.physics.add.sprite(config.width / 2 + 45, config.height / 2 + 10, 'knight').setScale(1.5);

    gameState.player.body.immovable = true;
    gameState.player.body.allowGravity = false;

    // animation create
    this.anims.create({
      key: 'zombWalk',
      frames: this.anims.generateFrameNumbers('zombWalk'),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'knightStab',
      frames: this.anims.generateFrameNumbers('knightStab'),
      frameRate: 15,
      repeat: 0.5
    });

    this.anims.create({
      key: 'knightIdle',
      frames: this.anims.generateFrameNumbers('knightIdle'),
      frameRate: 0,
      repeat: -1
    });

    this.anims.create({
      key: 'fballAnim',
      frames: this.anims.generateFrameNumbers('fballAnim'),
      frameRate: 24,
      repeat: 3
    });

    //sounds
    gameState.attackSound = this.sound.add('attackSound');
    gameState.zombDeath = this.sound.add('zombDeath');
    gameState.gameOver = this.sound.add('gameOver');
    gameState.backMusic = this.sound.add('backgroundMusic', { loop: true });

    //map cursor keys
    gameState.keys = this.input.keyboard.createCursorKeys();

    //player movement controls
    gameState.keys.one = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    gameState.keys.two = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    gameState.keys.three = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    gameState.keys.four = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);

    // barrier collider
    const barrier = this.physics.add.staticGroup((this.add.rectangle(0, config.height / 2 + 65, 1000, 1, 0x7f7f7f, 1)))

    //collectibles    

    // multiplier generator
    const multipliers = this.physics.add.group()
    gameState.multiGenLoop = this.time.addEvent({
      delay: Phaser.Math.Between(3000, 15000),
      callback: () => {
        var laneNum = Phaser.Math.Between(1, 4);
        if (laneNum == 1) {
          multipliers.create(85, -10, 'multiplier');
          gameState.multiGenLoop['delay'] = Phaser.Math.Between(15000, 30000);
        }
        else if (laneNum == 2) {
          multipliers.create(195, -10, 'multiplier');
          gameState.multiGenLoop['delay'] = Phaser.Math.Between(15000, 30000);
        }
        else if (laneNum == 3) {
          multipliers.create(305, -10, 'multiplier');
          gameState.multiGenLoop['delay'] = Phaser.Math.Between(15000, 30000);
        }
        else if (laneNum == 4) {
          multipliers.create(415, -10, 'multiplier');
          gameState.multiGenLoop['delay'] = Phaser.Math.Between(15000, 30000);
        }
      },
      callbackScope: this,
      loop: true
    })

    this.physics.add.collider(multipliers, barrier, (m, b) => { m.destroy() });

    // fireball genenerator
    const fireballs = this.physics.add.group()
    gameState.fireballGenLoop = this.time.addEvent({
      delay: Phaser.Math.Between(3000, 15000),
      callback: () => {
        var laneNum = Phaser.Math.Between(1, 4);
        if (laneNum == 1) {
          fireballs.create(85, -10, 'fireball');
          gameState.fireballGenLoop['delay'] = Phaser.Math.Between(15000, 30000);
        }
        else if (laneNum == 2) {
          fireballs.create(195, -10, 'fireball');
          gameState.fireballGenLoop['delay'] = Phaser.Math.Between(15000, 30000);
        }
        else if (laneNum == 3) {
          fireballs.create(305, -10, 'fireball');
          gameState.fireballGenLoop['delay'] = Phaser.Math.Between(15000, 30000);
        }
        else if (laneNum == 4) {
          fireballs.create(415, -10, 'fireball');
          gameState.fireballGenLoop['delay'] = Phaser.Math.Between(15000, 30000);
        }
      },
      callbackScope: this,
      loop: true
    })
    this.physics.add.collider(fireballs, barrier, (f, b) => { f.destroy() });

    //ENEMIES

    // zombie generator
    gameState.zombies = this.physics.add.group({
      immovable: true,
      allowGravity: true
    });

    gameState.zombieGenLoop = this.time.addEvent({
      delay: 1000,
      callback: () => {
        var laneNum = Phaser.Math.Between(1, 4);
        if (laneNum == 1) {
          gameState.zombies.create(85, -10, 'zombie').anims.play('zombWalk');
          gameState.zombieGenLoop['delay'] = Phaser.Math.Between(485, 789);
        }
        else if (laneNum == 2) {
          gameState.zombies.create(195, -10, 'zombie').anims.play('zombWalk');
          gameState.zombieGenLoop['delay'] = Phaser.Math.Between(255, 956);
        }
        else if (laneNum == 3) {
          gameState.zombies.create(305, -10, 'zombie').anims.play('zombWalk');
          gameState.zombieGenLoop['delay'] = Phaser.Math.Between(157, 916);
        }
        else if (laneNum == 4) {
          gameState.zombies.create(415, -10, 'zombie').anims.play('zombWalk');
          gameState.zombieGenLoop['delay'] = Phaser.Math.Between(92, 904);
        }
      },
      callbackScope: this,
      loop: true
    })

    //player multi collider
    this.physics.add.collider(gameState.player, multipliers, (player, multi) => {
      multi.destroy();
      gameState.multiCount += 1
      gameState.multiText.setText(`${gameState.multiCount}x Multplier`);
    });

    //group
    gameState.explosions = this.physics.add.group({
      immovable: true,
      allowGravity: false
    })

    //player fireball collider
    this.physics.add.collider(gameState.player, fireballs, (player, fireball) => {
      fireball.destroy();
      var temp = gameState.explosions.create(gameState.player.x + 10, gameState.player.y - 150, 'fballAnim').anims.play('fballAnim', false)
      temp.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        temp.destroy();
      })
    });

    //explosion and zombie collider
    this.physics.add.overlap(gameState.zombies, gameState.explosions, (zombie, e) => {
      zombie.destroy()
      gameState.score = gameState.score + (1 * gameState.multiCount)
      gameState.scoreText.setText(`Score: ${gameState.score}`);
    })


    //player zomb collider
    this.physics.add.collider(gameState.player, gameState.zombies, (player, zombie) => {
      gameState.player.anims.play('knightStab', true);
      gameState.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        gameState.player.anims.play('knightIdle', true);
      })
      gameState.zombDeath.play();
      zombie.destroy();
      gameState.score = gameState.score + (1 * gameState.multiCount)
      gameState.scoreText.setText(`Score: ${gameState.score}`);
      gameState.zombiefactor = gameState.zombiefactor - 150
    });

    // zomb health loss (target & zombie collider)
    this.physics.add.collider(gameState.target, gameState.zombies, (t, zombie) => {
      zombie.destroy();
      gameState.lives = gameState.lives - 1;
      if (gameState.lives == 2) {
        gameState.healthBar.setTexture('twoLives');
      }
      else if (gameState.lives == 1) {
        gameState.healthBar.setTexture('oneLife');
      }
      else if (gameState.lives == 0) {
        gameState.healthBar.setTexture('noHp');
        gameState.bgMusic.stop();
        gameState.gameOver.play();

        this.physics.pause();
        gameState.multiGenLoop.destroy();
        gameState.fireballGenLoop.destroy();
        gameState.zombieGenLoop.destroy();

        this.add.text(config.width / 2 - 90, 180, ' GAME OVER! ', { fontSize: '30px', fill: '#111111', fill: 'white', backgroundColor: 'blue' });
        this.input.on('pointerup', () => {
          gameState.bgMusic.stop();
          this.scene.stop('Level');
          this.scene.start('EndScreen')
        })
          ;
      }
    })
  }

  update() {
    //changes that happen on each screen refresh. This is mostly for player controls.

    //player controls go here
    if (Phaser.Input.Keyboard.JustDown(gameState.keys.one)) {
      gameState.player.setPosition(75, config.height / 2 + 10)
    }
    else if (Phaser.Input.Keyboard.JustDown(gameState.keys.two)) {
      gameState.player.setPosition(185, config.height / 2 + 10)
    }
    else if (Phaser.Input.Keyboard.JustDown(gameState.keys.three)) {
      gameState.player.setPosition(config.width / 2 + 45, config.height / 2 + 10)
    }
    else if (Phaser.Input.Keyboard.JustDown(gameState.keys.four)) {
      gameState.player.setPosition(410, config.height / 2 + 10)
    }


  }
}
