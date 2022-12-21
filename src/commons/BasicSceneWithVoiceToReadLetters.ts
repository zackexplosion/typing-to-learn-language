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

    this.add.text(5, 5, this.currentLevel, {color: '#333'})

    if(this.sound.locked)
    {
        var text = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Tap to start');
        text.x -= Math.round(text.width/2);
        text.y -= Math.round(text.height/2);

        this.sound.once('unlocked', function (soundManager)
        {
            text.visible = false;
          console.log('sound unlock')
            // setup.call(this);

        }, this);
    }
    else
    {
        // setup.call(this);
    }
  }

  // update( ) {

  // }
}