import Phaser from 'phaser';

// The constant variables
const KEYS_PER_ROW = 11
const FONT_SIZE_OFFSET = 1

// The colors
const KEY_COLOR = 'green'
const KEY_COLOR_DOWN = 'gray'

import * as Russian from './keyboard-layouts/Russian'
import * as Arabic from './keyboard-layouts/Arabic'
import * as Spanish from './keyboard-layouts/Spanish'

export default class KeyBoard_Basic extends Phaser.GameObjects.Container {

  // To storage the key instance, for the color change
  private keyboardInstanceKeys: any = []
  private pointerupHandler: Function = () => {};
  public keyboardAxisY = 0
  constructor(
    scene: Phaser.Scene,
    language: string
  ) {
    super(scene)

    language = language.toLocaleLowerCase()

    var keysLayout: any;
    var keycodeToLetterMap: any;

    var config

    switch(language) {
      case 'arabic':
        config = Arabic
        keysLayout = Arabic.KEYS_LAYOUT
        keycodeToLetterMap = Arabic.KEYCODE_TO_LETTER_MAP
      break;
      case 'spanish':
        config = Spanish
        keysLayout = Spanish.KEYS_LAYOUT
        keycodeToLetterMap = Spanish.KEYCODE_TO_LETTER_MAP
      break;
      default:
      case 'russian':
        config = Russian
        keysLayout = Russian.KEYS_LAYOUT
        keycodeToLetterMap = Russian.KEYCODE_TO_LETTER_MAP
      break;
    }

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
    keysLayout.forEach( (_, row) => {
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
            this.pointerupHandler(__)
            key.setStyle({color: KEY_COLOR_DOWN})
          })
          .on('pointerup', () => {
            key.setStyle({color: KEY_COLOR})
          })
          .on('pointerout', () => {
            key.setStyle({color: KEY_COLOR})
          })

        this.keyboardInstanceKeys[__] = key

        this.add(key)
      })
    })
    const keyboardY = baseHeight - keyboardHeight - fontSize
    // console.log('keyboardY', keyboardY)
    this.keyboardAxisY = keyboardY
    // Move the keyboard container to screen bottom
    this.setY(keyboardY)

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
      const letter:string = keycodeToLetterMap[event.code]
      const keyInstance = this.keyboardInstanceKeys[letter]

      if(keyInstance && letter) {
        cb(letter, keyInstance)
      }
    }

    // var logger = '' // Only use for create the keymap in the top lol

    scene.input.keyboard.on('keydown',  (event: any) => handleKeyEvent(event, (letter: string, key: Phaser.GameObjects.Text) => {

      // logger += `'${event.code}' : '${event.key}',`

      try {
        this.pointerupHandler(letter)
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

  public addPointerupHandler (handler: Function) {
    this.pointerupHandler = handler
  }
}