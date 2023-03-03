import BasicGameScene from '@/components/BasicGameScene';
const KEY = "FreeTyping"
export default class FreeTyping extends BasicGameScene {
  static KEY = KEY
  constructor() {
    super(KEY);
  }

  create() {
    super.create()

    // Setup the keyboard event
    this.keyboard.addPointerupHandler((key: string) => {
      this.questionObject?.setText(key)
      this.letterSounds[key].play();
    });
  }
}
