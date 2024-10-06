import Phaser from 'phaser';

// The constant variables
const KEYS_PER_ROW = 11
const FONT_SIZE_OFFSET = 1

// The colors
const KEY_COLOR = 'green'
const KEY_COLOR_DOWN = 'gray'

import * as Russian from './keyboard-layouts/Russian'
import * as Spanish from './keyboard-layouts/Spanish'
import * as ChineseBopomofo from './keyboard-layouts/ChineseBopomofo'

export default class KeyBoardBasic extends Phaser.GameObjects.Container {

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

    var keysLayout: string[][];
    var keycodeToLetterMap: any;

    var config

    switch(language) {
      case 'chinese-bopomofo':
        config = ChineseBopomofo
      break;
      case 'spanish':
        config = Spanish
      break;
      default:
      case 'russian':
        config = Russian
      break;
    }

    keysLayout = config.KEYS_LAYOUT
    keycodeToLetterMap = config.KEYCODE_TO_LETTER_MAP

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
    keysLayout.forEach( (row, rowIndex) => {
      row.forEach((col, colIndex) => {

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
        let x = colIndex * buttonSize + (buttonSize / 2)
        let y = (rowIndex * buttonSize) + (buttonSize / 2)

        // keyboardHeight will be the last y axis
        keyboardHeight = y

        // Dot just for sorting, so skip it
        if(col === '.') return

        const key =
          scene.add.text(x, y, col, {font:`${fontSize}px PT Mono`, color: KEY_COLOR})
          .setOrigin(0.5)
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => {
            this.pointerupHandler(col)
            key.setStyle({color: KEY_COLOR_DOWN})
          })
          .on('pointerup', () => {
            key.setStyle({color: KEY_COLOR})
          })
          .on('pointerout', () => {
            key.setStyle({color: KEY_COLOR})
          })

        this.keyboardInstanceKeys[col] = key

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
      // cb(letter, keyInstance)
    }

    // var logger = '' // Only use for create the key map in the top lol

    scene.input.keyboard.on('keydown',  (event: KeyboardEvent) => handleKeyEvent(event, (letter: string, key: Phaser.GameObjects.Text) => {

      // logger += `'${event.code}' : '${event.key}',`
      // console.log(logger)
      key.setStyle({color: KEY_COLOR_DOWN})
    }));

    scene.input.keyboard.on('keyup',  (event: KeyboardEvent) => handleKeyEvent(event, (letter: string, key: Phaser.GameObjects.Text) => {
      try {
        this.pointerupHandler(letter)
      } catch (error) {
        console.error(error)
      }
      key.setStyle({color: KEY_COLOR})
    }));
  }

  public addPointerupHandler (handler: Function) {
    this.pointerupHandler = handler
  }
}