import Phaser from "phaser";
import russianAlphabets from "@/commons/russian-alphabets";
import KeyBoard from "./Keyboard";
import { scenesKeys } from '@/commons/available-levels'
type LetterSounds = {
  [key: string]: Phaser.Sound.BaseSound;
};

export default class BasicSceneWithVoiceToReadLetters extends Phaser.Scene {
  protected russianAlphabets = russianAlphabets
  protected letterSounds: LetterSounds = {}
  protected keyboard!: KeyBoard
  protected currentLevel: string = ''
  constructor(name: string) {
    super(name);
    this.currentLevel = name
  }

  preload() {

  }

  create () {

    // Set current level browser's local storage, use in Loading.ts. Makes easier to development lol
    if(localStorage) {
      localStorage.currentLevel = this.currentLevel
    }

    for (let i = 0; i < russianAlphabets.length; i++) {
      const _ = russianAlphabets[i];
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

    const scenes = scenesKeys

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
      const levelName = e.target.value
      // stop all sound before scene changed
      this.sound.stopAll()
      this.scene.start(levelName)
    })

    document.body.appendChild(select)
  }

  // update( ) {

  // }
}