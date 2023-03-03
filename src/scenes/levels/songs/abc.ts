import BasicScene from "@/components/BasicGameScene";
import russianAlphabets from "@/commons/russian-alphabets";
const LYRICS = `
${russianAlphabets.join('\n')}
${russianAlphabets.join('\n').toUpperCase()}
`;
const KEY = 'Songs-ABC'
export default class SongsABC extends BasicScene {
  static KEY = KEY
  private currentQuestionIndex = 0;
  private currentQuestionWordIndex = 0;
  private questions: Array<string> = [];
  constructor() {
    super(KEY);

    // Remove symbols, line break ...etc non letters
    this.questions = LYRICS.replace(/(\.|\!|\,|\-)/g, "")
      // Remove more than one space.
      .replace(/\ +/g, " ")
      .split("\n")
      .filter((_) => _.trim().length > 0)
      .map((_) => _.trim().toLocaleLowerCase());

    // console.log(this.questions)
  }

  // The main game logic handle here
  handleKeyPress(key: string) {
    this.letterSounds[key].play();

    // If player click wrong button, doing nothing
    const currentQuestionWord = this.questions[this.currentQuestionIndex];
    let q =
      currentQuestionWord[this.currentQuestionWordIndex].toLocaleLowerCase();
    let ans = "";

    // skip space
    if (q === " ") {
      this.currentQuestionWordIndex++;
      q =
        currentQuestionWord[this.currentQuestionWordIndex].toLocaleLowerCase();
    }

    if (key === q) {
      for (let index = 0; index < currentQuestionWord.length; index++) {
        if (index <= this.currentQuestionWordIndex) {
          ans += currentQuestionWord[index];
        } else {
          if (currentQuestionWord[index] === " ") {
            ans += " ";
          } else {
            ans += "\t";
          }
        }
      }

      this.answerObject?.setText(ans);
      this.currentQuestionWordIndex++;
    }

    if (this.currentQuestionWordIndex === currentQuestionWord.length) {
      this.currentQuestionWordIndex = 0;
      this.currentQuestionIndex++;
      this.questionObject?.setText(this.questions[this.currentQuestionIndex]);
      this.answerObject?.setText("");
    }
  }

  preload() {
    super.preload();
    var url =
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexyoutubeplayerplugin.min.js";
    this.load.plugin("rexyoutubeplayerplugin", url, true);
  }

  create() {
    super.create();


    var baseWidth = this.cameras.main.width;
    var baseHeight = this.cameras.main.height;


    const ansY = baseWidth / 1.33 + 130
    this.questionObject?.setY(ansY)
    this.answerObject?.setY(ansY)

    console.log('baseWidth', baseWidth)
    var youtubePlayer = this.add
      .rexYoutubePlayer(0, 0, baseWidth, baseWidth / 1.33, {
        videoId: "4BkYp_E_ES4",
      })
      .on("ready", function () {
        youtubePlayer.setPosition(baseWidth / 2, 145);
        // youtubePlayer.setPlaybackTime(55)
        // youtubePlayer.setVolume(0.5);
        youtubePlayer.play();
      });

    this.answerObject?.setScale(0.2);

    // Initial questionObject
    this.questionObject?.setScale(0.2);
    this.questionObject?.setText(this.questions[this.currentQuestionIndex]);

    // Setup the keyboard event
    this.keyboard.addPointerupHandler((key: string) => {
      this.handleKeyPress(key);
    });
  }
}
