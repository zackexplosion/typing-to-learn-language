import Phaser from 'phaser';
import config from '@/config';
import LoadingScene from '@/scenes/Loading';
import levels from '@/commons/available-levels'

const game = new Phaser.Game(
  Object.assign(config, {
    scene: [
      LoadingScene,
      ...levels
    ]
  })
);

