import BasicSceneWithKeyboardAndVoiceToReadLetters from "@/commons/BasicSceneWithVoiceToReadLetters";
import KeyBoard from "@/commons/Keyboard";

export default class FreeTyping extends BasicSceneWithKeyboardAndVoiceToReadLetters {
  constructor() {
    super("FreeTyping");
  }

  create() {
    // Setup the keyboard event
    this.keyboard.addKeydownHandler((key: string) => {
      this.letterSounds[key].play();
    });
  }
}
