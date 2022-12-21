import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#000000',
  scale: {
    width: window.outerWidth,
    height: window.outerHeight,
    mode: Phaser.Scale.FIT,
    // resolution: window.devicePixelRatio,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 1 / window.devicePixelRatio // Set the zoom to the inverse of the devicePixelRatio
  },
  // audio: {
  //   disableWebAudio: true
  // }
};
