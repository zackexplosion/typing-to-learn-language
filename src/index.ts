import Phaser from 'phaser';
import config from '@/config';
import LoadingScene from '@/scenes/Loading';
import FreeTyping from '@/scenes/FreeTyping';
import Level101 from '@/scenes/levels/Level-101';
import Level102 from '@/scenes/levels/Level-102';

const scenes = [
  FreeTyping,
  Level101,
  Level102
]

const game = new Phaser.Game(
  Object.assign(config, {
    scene: [
      LoadingScene,
      ...scenes
    ]
  })
);

