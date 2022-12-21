import BasicSceneWithKeyboardAndVoiceToReadLetters from "@/commons/BasicSceneWithVoiceToReadLetters";

export default class Level102 extends BasicSceneWithKeyboardAndVoiceToReadLetters {
  questions = this.RussianAlphabets;
  currentQuestionIndex = 0;
  questionObject: Phaser.GameObjects.Text | undefined;

  constructor() {
    super("Level-102");
  }

  preload() {
    // must call!
    super.preload();
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
    // shuffle the questions
    this.questions = new Phaser.Math.RandomDataGenerator().shuffle(
      this.questions
    );

    // Create the main question text object
    this.questionObject = this.add
      .text(
        this.cameras.main.width / 2,
        150,
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
