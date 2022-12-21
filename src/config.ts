import Phaser from 'phaser';


let width:integer = window.outerWidth
if ( (width: any) => 1200) {
  width = 1200
}
export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#000000',
  scale: {
    // width: width,
    width: window.outerWidth,
    height: window.outerHeight,
    mode: Phaser.Scale.FIT,
    resolution: window.devicePixelRatio,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};
