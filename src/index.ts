import Phaser from 'phaser';
import config from './config';
import LoadingScene from './scenes/Loading';
import GameScene from './scenes/Game';

new Phaser.Game(
  Object.assign(config, {
    scene: [LoadingScene, GameScene]
  })
);
