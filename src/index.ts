import Phaser from 'phaser';
import config from '@/config';
import LoadingScene from '@/scenes/Loading';
import Level101 from '@/scenes/levels/Level-101';
import Level102 from '@/scenes/levels/Level-102';

// import * as Levels from '@/scenes/levels/*';

new Phaser.Game(
  Object.assign(config, {
    scene: [
      LoadingScene,
      Level101,
      Level102
    ]
  })
);
