import Phaser from 'phaser';

const KEYS_PER_ROW = 12
const FONT_SIZE_OFFSET = 5

type KeyBoardParams = {
  handleKeyPress?: Function
}

export default class KeyBoard extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    params: KeyBoardParams
  ) {
    super(scene)
    const keys = [
      'йцукенгшщзхъ'.split(''),
      'фывапролджэё'.split(''),
      '.ячсмитьбю..'.split(''),
    ]

    const baseWidth = scene.cameras.main.width
    const baseHeight = scene.cameras.main.height
    const fontSize = (scene.cameras.main.width / KEYS_PER_ROW) - FONT_SIZE_OFFSET
    const buttonSize = baseWidth / KEYS_PER_ROW
    var keyboardHeight = 0

    keys.forEach( (_, row) => {
      _.forEach((__, col) => {

        // TODO
        // Maybe create some button frame like real keyboard?

        // const button = scene.add.graphics();
        // var color = 0xffff00;
        // var thickness = 1;
        // var alpha = 1;
        // button.lineStyle(thickness, color, alpha);
        // let _x = col * buttonSize
        // let _y = ((row) * buttonSize)
        // button.strokeRect(_x, _y, buttonSize, buttonSize);
        // this.add(button)

        // let x = col * singleButtonWidth + spaceBetweenKeys
        // let y = (row * singleButtonHeight) + scene.cameras.main.height - 120

        let x = col * buttonSize + (buttonSize / 2)
        let y = (row * buttonSize) + (buttonSize / 2)


        // keyboardHeight will be the last y axis
        keyboardHeight = y

        // Dot just for sorting, so skip it
        if(__ === '.') return

        const key =
          scene.add.text(x, y, __, {font:`${fontSize}px PT Mono`, color: 'green'})
          .setOrigin(0.5)
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => {
            if(typeof params.handleKeyPress === 'function') {
              params.handleKeyPress(__)
            }
            key.setStyle({color: 'gray'})
          })
          .on('pointerup', () => {
            key.setStyle({color: 'green'})
          })

        this.add(key)
      })
    })

    // Move the keyboard container to screen bottom
    this.setY(baseHeight - keyboardHeight - fontSize)

    // Set the container to the scene
    this.scene.add.existing(this)

    // Only for physic keyboard
    scene.input.keyboard.on('keydown', function (event:any) {
      if(typeof params.handleKeyPress === 'function') {
        params.handleKeyPress(event.key)
      }
    });
  }
}