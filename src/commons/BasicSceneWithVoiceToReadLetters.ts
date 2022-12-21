import Phaser from "phaser";
import RussianAlphabets from "@/commons/russian-alphabets";
import KeyBoard from "./Keyboard";
type LetterSounds = {
  [key: string]: Phaser.Sound.BaseSound;
};

export default class BasicSceneWithVoiceToReadLetters extends Phaser.Scene {
  protected RussianAlphabets = RussianAlphabets
  protected letterSounds: LetterSounds = {}
  protected keyboard!: KeyBoard
  protected currentLevel: string = ''
  constructor(name: string) {
    super(name);
    this.currentLevel = name
  }

  setup() {

  }

  create () {
    for (let i = 0; i < RussianAlphabets.length; i++) {
      const _ = RussianAlphabets[i];
      this.letterSounds[_] = this.sound.add(_);
    }

    // Create the keyboard
    this.keyboard = new KeyBoard(this);

    // this.add.text(5, 5, this.currentLevel, {color: '#333'})

    // TODO
    // Find a better way to do this

    if(document.querySelector('#scene-selector')){
      document.querySelector('#scene-selector')?.remove()
    }

    const select = document.createElement('select')

    select.id = 'scene-selector'

    const scenes = [
      'FreeTyping',
      'Level-101',
      'Level-102',
    ]

    scenes.forEach(_ => {
      var option = document.createElement('option')
      option.value = _
      option.innerText = _

      if(this.currentLevel === _) {
        option.selected = true
      }


      select.appendChild(option)
    })

    select.addEventListener('change', (e:any) => {
      this.scene.start(e.target.value)
    })

    document.body.appendChild(select)
  }

  // update( ) {

  // }
}