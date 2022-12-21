import Phaser from "phaser";
import RussianAlphabets from "@/commons/russian-alphabets";
import KeyBoard from "./Keyboard";
type LetterSounds = {
  [key: string]: Phaser.Sound.BaseSound;
};

export default class BasicSceneWithVoiceToReadLetters extends Phaser.Scene {
  protected RussianAlphabets = RussianAlphabets
  protected letterSounds: LetterSounds = {}
  protected keyboard: KeyBoard

  constructor(name) {
    super(name);
  }

  preload() {
    for (let i = 0; i < RussianAlphabets.length; i++) {
      const _ = RussianAlphabets[i];
      this.letterSounds[_] = this.sound.add(_);
    }

    // Create the keyboard
    this.keyboard = new KeyBoard(this);
  }
}