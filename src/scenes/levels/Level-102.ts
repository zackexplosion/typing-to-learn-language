import BasicGameScene from "@/components/BasicGameScene";

export default class Level102 extends BasicGameScene {
  questions = this.russianAlphabets;
  currentQuestionIndex = 0;

  constructor() {
    super("Level-102");
  }


  // The main game logic handle here
  handleKeyPress(key: string) {
    // If player click wrong button, doing nothing
    if (key !== this.questions[this.currentQuestionIndex]) return;

    // Make sounds when player click the correct letter
    this.letterSounds[key].play();

    // Increase the question index
    this.currentQuestionIndex++;

    // Reset the index when not letters left
    if (this.currentQuestionIndex === this.questions.length) {
      this.currentQuestionIndex = 0;
      return;
    }

    // Setup next question
    this.questionObject?.setText(this.questions[this.currentQuestionIndex]);
  }

  create() {
    super.create();

    // shuffle the questions
    this.questions = new Phaser.Math.RandomDataGenerator().shuffle(
      this.questions
    );

    this.questionObject?.setText(this.questions[this.currentQuestionIndex]);


    // Setup the keyboard event
    this.keyboard.addPointerupHandler((key: string) => {
      this.handleKeyPress(key);
    });
  }
}