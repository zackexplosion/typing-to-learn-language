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
  // audio: {
  //   disableWebAudio: true
  // }
};
