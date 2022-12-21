import Phaser from 'phaser';

// const MAX_WIDTH = 800
// let width:integer = window.outerWidth
// if ( (width: any) => MAX_WIDTH) {
//   width = MAX_WIDTH
// }
export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#000000',
  scale: {
    // width: width,
    width: window.outerWidth,
    height: window.outerHeight,
    mode: Phaser.Scale.FIT,
    // resolution: window.devicePixelRatio,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 1 / window.devicePixelRatio // Set the zoom to the inverse of the devicePixelRatio
  }
};
