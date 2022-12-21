import Phaser from 'phaser';

type KeyBoardParams = {
  handleKeyPress?: Function
}

// The constant variables
const KEYS_PER_ROW = 11
const FONT_SIZE_OFFSET = 5

// The colors
const KEY_COLOR = 'green'
const KEY_COLOR_DOWN = 'gray'

// Layout the keyboard with the array
const KEYS_LAYOUT = [
  // 'йцукенгшщзхъ'.split(''),
  // 'фывапролджэё'.split(''),
  // '.ячсмитьбю..'.split(''),
  'йцукенгшщзх'.split(''),
  'фывапролджэ'.split(''),
  'ячсмитьбюъё'.split(''),
]

// TODO
// Maybe need another hash for uppercase too?
// const KEYCODE_TO_RUSSIAN_LETTER_MAP:any = {81 : 'й',87 : 'ц',69 : 'у',82 : 'к',84 : 'е',89 : 'н',85 : 'г',73 : 'ш',79 : 'щ',80 : 'з',219 : 'х',221 : 'ъ',222 : 'э',186 : 'ж',76 : 'д',75 : 'л',74 : 'о',72 : 'р',71 : 'п',70 : 'а',68 : 'в',83 : 'ы',65 : 'ф',90 : 'я',88 : 'ч',67 : 'с',86 : 'м',66 : 'и',78 : 'т',77 : 'ь',188 : 'б',190 : 'ю',192 : 'ё'}
const KEYCODE_TO_RUSSIAN_LETTER_MAP:any = {'KeyA' : 'ф','Backquote' : 'ё','KeyQ' : 'й','KeyW' : 'ц','KeyS' : 'ы','KeyX' : 'ч','KeyZ' : 'я','KeyC' : 'с','KeyD' : 'в','KeyE' : 'у','KeyR' : 'к','KeyF' : 'а','KeyV' : 'м','KeyB' : 'и','KeyG' : 'п','KeyT' : 'е','KeyY' : 'н','KeyH' : 'р','KeyN' : 'т','KeyM' : 'ь','KeyJ' : 'о','KeyU' : 'г','KeyI' : 'ш','KeyK' : 'л','Comma' : 'б','Period' : 'ю','KeyL' : 'д','KeyO' : 'щ','KeyP' : 'з','Semicolon' : 'ж','Quote' : 'э','BracketLeft' : 'х','BracketRight' : 'ъ'}

export default class KeyBoard extends Phaser.GameObjects.Container {

  // To storage the key instance, for the color change
  private keyboardInstanceKeys: any = []
  private keydownHandler: Function = () => {};

  constructor(
    scene: Phaser.Scene,
    params?: KeyBoardParams
  ) {
    super(scene)

    // Will use for moving the keyboard to the bottom of screen.
    var keyboardHeight = 0

    // Just some alias
    const baseWidth = scene.cameras.main.width
    const baseHeight = scene.cameras.main.height

    // Letters size in the keyboard, count by the screen width and some constant variables in top.
    const fontSize = (scene.cameras.main.width / KEYS_PER_ROW) - FONT_SIZE_OFFSET

    // The virtual button size, won't show out for now.
    const buttonSize = baseWidth / KEYS_PER_ROW

    // Loop the keys layout
    KEYS_LAYOUT.forEach( (_, row) => {
      _.forEach((__, col) => {

        // TODO
        // Style
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


        // The axis of keys
        let x = col * buttonSize + (buttonSize / 2)
        let y = (row * buttonSize) + (buttonSize / 2)

        // keyboardHeight will be the last y axis
        keyboardHeight = y

        // Dot just for sorting, so skip it
        if(__ === '.') return

        const key =
          scene.add.text(x, y, __, {font:`${fontSize}px PT Mono`, color: KEY_COLOR})
          .setOrigin(0.5)
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => {
            this.keydownHandler(__)
            key.setStyle({color: KEY_COLOR_DOWN})
          })
          .on('pointerup', () => {
            key.setStyle({color: KEY_COLOR})
          })

        this.keyboardInstanceKeys[__] = key

        this.add(key)
      })
    })

    // Move the keyboard container to screen bottom
    this.setY(baseHeight - keyboardHeight - fontSize)

    // Set the container to the scene
    this.scene.add.existing(this)


    // **************************
    // *
    // Following code Only for physic keyboards
    // *
    // **************************
    // *
    // To make this work with any input method.
    // We need key code map to russian-pc keyboard layout.
    // *

    const handleKeyEvent = (event: KeyboardEvent, cb: Function) => {
      const letter:string = KEYCODE_TO_RUSSIAN_LETTER_MAP[event.code]
      const keyInstance = this.keyboardInstanceKeys[letter]

      if(keyInstance && letter) {
        cb(letter, keyInstance)
      }
    }

    // var logger = '' // Only use for create the keymap in the top lol

    scene.input.keyboard.on('keydown',  (event: any) => handleKeyEvent(event, (letter: string, key: Phaser.GameObjects.Text) => {

      // logger += `'${event.code}' : '${event.key}',`

      try {
        this.keydownHandler(letter)
      } catch (error) {
        console.error(error)
      }
      key.setStyle({color: KEY_COLOR_DOWN})

      // console.log(logger)
    }));

    scene.input.keyboard.on('keyup',  (event: any) => handleKeyEvent(event, (letter: string, key: Phaser.GameObjects.Text) => {
      key.setStyle({color: KEY_COLOR})
    }));
  }

  public addKeydownHandler (handler: Function) {
    this.keydownHandler = handler
  }
}