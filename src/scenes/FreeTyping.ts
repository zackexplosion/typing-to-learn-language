import BasicGameScene from '@/components/BasicGameScene';

export default class FreeTyping extends BasicGameScene {
  constructor() {
    super("FreeTyping");
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
