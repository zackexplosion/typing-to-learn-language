import BasicScene from "@/components/BasicGameScene";

export default class Level101 extends BasicScene {
  private questions = this.russianAlphabets;
  private currentQuestionIndex = 0;

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
    super.create();

    // Initial questionObject
    this.questionObject?.setText(this.questions[this.currentQuestionIndex]);

    // Setup the keyboard event
    this.keyboard.addPointerupHandler((key: string) => {
      this.handleKeyPress(key);
    });
  }
}
