import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#000000',
  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
    mode: Phaser.Scale.FIT,
    resolution: window.devicePixelRatio,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 1 / window.devicePixelRatio // Set the zoom to the inverse of the devicePixelRatio
    // zoom: 0.1
  },
  dom: {
    createContainer: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      // debug: new Boolean(process.env.PHYSIC_DEBUG) || false,
      // debug: true,
      // gravity: { y: 10 }
      // debug: true,
      // debugShowBody: true,
      // debugShowStaticBody: true,
      // debugShowVelocity: true,
      // debugVelocityColor: 0xffff00,
      // debugBodyColor: 0x0000ff,
      // debugStaticBodyColor: 0xffffff,
    },
  },
  // audio: {
  //   disableWebAudio: true
  // }
};
