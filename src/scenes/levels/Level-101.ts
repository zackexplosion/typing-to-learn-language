import BasicSceneWithKeyboardAndVoiceToReadLetters from "@/commons/BasicSceneWithVoiceToReadLetters";

export default class Level101 extends BasicSceneWithKeyboardAndVoiceToReadLetters {
  private questions = this.RussianAlphabets;
  private currentQuestionIndex = 0;
  private questionObject: Phaser.GameObjects.Text | undefined;

  constructor() {
    super("Level-101");
  }

  // The main game logic handle here
  handleKeyPress(key: string) {
    // If player click wrong button, doing nothing
    if (key !== this.questions[this.currentQuestionIndex]) return;

    // Make sounds when player click the correct letter
    this.letterSounds[key].play();

    // Increase the question index
    this.currentQuestionIndex++;

    // TODO
    // Maybe we can just go next level when player finish current level?

    // Reset the index when not letters left
    if (this.currentQuestionIndex === this.questions.length) {
      this.scene.start("Level-102");
      return;
      // this.currentQuestionIndex = 0;
    }

    // Setup next question
    this.questionObject?.setText(this.questions[this.currentQuestionIndex]);
  }

  create() {
    for (let i = 0; i < this.questions.length; i++) {
      const _ = this.questions[i];
      this.letterSounds[_] = this.sound.add(_);
    }

    // Create the main question text object
    this.questionObject = this.add
      .text(
        this.cameras.main.width / 2,
        100,
        this.questions[this.currentQuestionIndex],
        { font: `25em PT Mono`, color: "green" }
      )
      .setOrigin(0.5);

    // Setup the keyboard event
    this.keyboard.addKeydownHandler((key: string) => {
      this.handleKeyPress(key);
    });
  }
}
