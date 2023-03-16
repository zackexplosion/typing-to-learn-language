import SongScene from "./SongScene";

export default class Lyrics extends Phaser.GameObjects.Container {
  private text:string;
  private currentQuestionWordIndex:number = 0;

  private inputedLyric;
  public speed = 100
  private hittenCount = 0;

  private scene: SongScene;
  constructor(
    scene: SongScene,
    text: string
  ) {
    super(scene);

    this.scene = scene

    this.text = text
    const fontSize = `${(scene.cameras.main.width / text.length).toFixed(0)}px`

    const lyric = scene.add
      .text(
        0,
        0,
        this.text,
        {
          font: `${fontSize} PT Mono`, color: "green",
          wordWrap: { width: scene.cameras.main.width}
        }
      )
      .setOrigin(0.5);

      this.inputedLyric = scene.add
      .text(
        0,
        0,
        "",
        {
          font: `${fontSize} PT Mono`, color: "gray",
          wordWrap: { width: scene.cameras.main.width}
        }
      )
      .setOrigin(0.5);


      scene.physics.add.collider(scene.playerBulletGroup, this, (lyric, bullet) => {

        bullet.destroy()

        this.hittenCount++

        // console.log('lyric.body.velocity.y', lyric.body.velocity.y)

        // override the velocity
        lyric.body.velocity.y = lyric.speed / this.currentQuestionWordIndex+1

        if (this.hittenCount === this.inputedLyric.text.length) {
          scene.emitter.emit('currentLyricCompleted', text)
        }
      })

    this.setSize(lyric.width, lyric.height)
    this.x = scene.cameras.main.width / 2
    this.y = 100
    this.add(lyric)
    this.add(this.inputedLyric)

    var selfWithPhysics = scene.physics.add.existing(this)
    selfWithPhysics.body.setVelocityY(this.speed)
    selfWithPhysics.body.setCollideWorldBounds(true)
    // console.log('scene.keyboard.keyboardAxisY', scene.keyboard.keyboardAxisY)
    const offsetBoundsY = -300
    const lyricBoundsY = scene.cameras.main.height
    selfWithPhysics.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, offsetBoundsY, scene.cameras.main.width, lyricBoundsY))
    this.scene.add.existing(this)
  }

  handleKeyPress(key: string) {
    // If player click wrong button, doing nothing
    const currentQuestionWord = this.text;
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
          // padding space for text render
          if (currentQuestionWord[index] === " ") {
            ans += " ";
          } else {
            ans += "\t";
          }
        }
      }

      this.inputedLyric?.setText(ans);
      this.currentQuestionWordIndex++;
      this.scene.emitter.emit('playerTypingCorrect', this.x, this.y)
    }

    // if (this.currentQuestionWordIndex === currentQuestionWord.length) {
    //   // this.destroy()
    //   this.emitLyricCompleted()
    //   // this.currentQuestionWordIndex = 0;
    //   // this.currentQuestionIndex++;
    //   // this.questionObject?.setText(this.questions[this.currentQuestionIndex]);
    //   // this.answerObject?.setText("");
    // }
  }
}