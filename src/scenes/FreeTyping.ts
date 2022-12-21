import BasicSceneWithKeyboardAndVoiceToReadLetters from "@/commons/BasicSceneWithVoiceToReadLetters";
import KeyBoard from "@/commons/Keyboard";

export default class FreeTyping extends BasicSceneWithKeyboardAndVoiceToReadLetters {
  constructor() {
    super("FreeTyping");
  }

  create() {
    super.create()
    // Setup the keyboard event
    this.keyboard.addPointerupHandler((key: string) => {
      this.letterSounds[key].play();
    });
  }
}
