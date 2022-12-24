import BasicScene from "@/components/BasicGameScene";

const LYRICS = `
Надо мною - тишина,
Небо полное дождя,
Дождь проходит сквозь меня,
Но боли больше нет.
Под холодный шепот звезд
Мы сожгли последний мост,
И все в бездну сорвалось.
Свободным стану я
От зла и от добра,
Моя душа была на лезвии ножа.
Я бы мог с тобою быть,
Я бы мог про все забыть,
Я бы мог тебя любить,
Но это лишь игра.
В шуме ветра за спиной
Я забуду голос твой,
И о той любви земной,
Что нас сжигала в прах,
И я сходил с ума...
В моей душе нет больше места для тебя!
Я свободен, словно птица в небесах,
Я свободен, я забыл, что значит страх.
Я свободен с диким ветром наравне,
Я свободен наяву, а не во сне!
Надо мною - тишина,
Небо полное огня,
Свет проходит сквозь меня,
И я свободен вновь.
Я свободен от любви,
От вражды и от молвы,
От предсказанной судьбы
И от земных оков,
От зла и от добра...
В моей душе нет больше места для тебя!
Я свободен, словно птица в небесах,
Я свободен, я забыл, что значит страх.
Я свободен с диким ветром наравне,
Я свободен наяву, а не во сне!
.
Я свободен, словно птица в небесах,
Я свободен, я забыл, что значит страх.
Я свободен с диким ветром наравне,
Я свободен наяву, а не во сне!
Я свободен, словно птица в небесах,
Я свободен, я забыл, что значит страх.
Я свободен с диким ветром наравне,
Я свободен наяву, а не во сне!
Я свободен!...
Я свободен!...
Я свободен!...
`;

export default class SongsYaSvoboden extends BasicScene {
  private currentQuestionIndex = 0;
  private currentQuestionWordIndex = 0;
  private questions: Array<string> = [];
  constructor() {
    super("Songs-YaSvoboden");

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
    var youtubePlayer = this.add
      .rexYoutubePlayer(0, 0, baseWidth, 200, {
        videoId: "QXDRPtufEbA",
      })
      .on("ready", function () {
        youtubePlayer.setPosition(baseWidth / 2, baseHeight - 250);
        youtubePlayer.setPlaybackTime(50)
        youtubePlayer.setVolume(0.5);
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
