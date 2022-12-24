import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#000000',
  scale: {
    width: window.outerWidth,
    // height: window.outerHeight,
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
    // resolution: window.devicePixelRatio,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 1 / window.devicePixelRatio // Set the zoom to the inverse of the devicePixelRatio
  },
  dom: {
    createContainer: true
  },
  // audio: {
  //   disableWebAudio: true
  // }
};
