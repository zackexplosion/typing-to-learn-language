// import { getDirFromAngle } from '@/utils'
import GameScene from "@/components/GameScene";
import LoadingHelper from "@/commons/loading-helper";
//  Create our own EventEmitter instance
var emitter = new Phaser.Events.EventEmitter();

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

const BULLET_SPEED = 400

export class PlayerBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    tx: number,
    ty: number
  ) {
    // const { player } = scene
    super(scene, x, y, 'playerBullet')
    // this.scale = 0.5
    // const { tx, ty } = getDirFromAngle(player.angle)
    // this.scale = 0.8
    // this.x = x + (tx * settings.PEOPLE_SIZE / 2 * 2)
    // this.y = y + (ty * settings.PEOPLE_SIZE / 2 * 2)

    this.setAngle(90)

    if (scene.playerBulletGroup) {
      scene.playerBulletGroup.add(this)
    }

    // this.body.reset(this.x, this.y)
    // this.setVelocity(-tx * BULLET_SPEED, -ty * BULLET_SPEED)
    this.setVelocity(0, -BULLET_SPEED)


    scene.add.existing(this)



    // console.log('mass', this.getmass)
  }
}

class Lyrics extends Phaser.GameObjects.Container {
  private text:string;
  private currentQuestionWordIndex:number = 0;

  private inputedLyric;
  public speed = 100
  private hittenCount = 0;
  constructor(
    scene: Phaser.Scene,
    text: string
  ) {
    super(scene);

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
          emitter.emit('lyricCompleted', text)
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
    console.log('lyricBoundsY', lyricBoundsY)
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
      emitter.emit('playerTypingCorrect', this.x, this.y)
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

export default class SongsYaSvoboden extends GameScene {
  private currentQuestionIndex = 0;
  private currentQuestionWordIndex = 0;
  private questions: Array<string> = [];
  private playerBulletGroup: Phaser.Physics.Arcade.Group
  private currentLyric;
  private music;
  constructor() {
    super("Songs-YaSvoboden");

    // Remove symbols, line break ...etc non letters
    this.questions = LYRICS.replace(/(\.|\!|\,|\-)/g, "")
      // Remove more than one space.
      .replace(/\ +/g, " ")
      .split("\n")
      .filter((_) => _.trim().length > 0)
      .map((_) => _.trim().toLocaleLowerCase());
    const q: Array<string> = []

    this.questions.forEach(_ => {
      _.split(' ').forEach(__ => {
        q.push(__)
      })
    })

    this.questions = q
  }

  // The main game logic handle here
  handleKeyPress(key: string) {
    this.currentLyric.handleKeyPress(key)
    // Play letter sounds
    // this.letterSounds[keya].play();
  }

  createLyric() {
    this.currentLyric = new Lyrics(this, this.questions[this.currentQuestionIndex])
  }

  preload() {
    super.preload();

    new LoadingHelper(this)
    this.load.image('playerBullet', 'assets/bullet.png')
    this.load.audio('the-song', [
      'assets/sounds/music/ya-svoboden.mp3'
    ]);
  }

  create() {
    super.create();

    this.playerBulletGroup = this.physics.add.group({
      removeCallback: (g) => {
      },
    })

    var music = this.sound.add('the-song');

    const text =
    this.add
      .text(this.cameras.main.width / 2, this.cameras.main.height / 2, "Click to start")
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () =>{
        music.play({
          seek: 14,
          // seek: 100
        });
        var gui = new window.dat.GUI();
        var sm = gui.addFolder("Music Debug Panel");
        sm.add(music, 'seek', 0, music.duration).step(0.01).listen();
        // sm.add(this.currentLyric, 'y', 0, this.currentLyric.y).listen();
        // sm.add(catAstroPhi, 'rate', 0.5, 2).listen();
        // sm.add(catAstroPhi, 'detune', -1200, 1200).step(50).listen();
        // sm.add(catAstroPhi, 'loop').listen();
        // sm.add(catAstroPhi, 'play');
        // sm.add(catAstroPhi, 'pause');
        // sm.add(catAstroPhi, 'resume');
        // sm.add(catAstroPhi, 'stop');
        sm.open();

        this.music = music

        this.createLyric()
        this.physics.add.collider(this.currentLyric, this.playerBulletGroup)
        text.destroy()
      })
      .setOrigin(0.5)


    emitter.on('playerTypingCorrect', (tx:number, ty: number) => {
      const x =  this.cameras.main.width / 2
      const y = this.cameras.main.height - 100
      new PlayerBullet(this, x, y, tx, ty)
    })

    emitter.on('lyricCompleted', (text:string) => {
      console.log('text completed', text)
      this.currentQuestionIndex++
      this.currentLyric.destroy()
      this.currentLyric = null
      this.createLyric()
    })

    // Setup the keyboard event
    this.keyboard.addPointerupHandler((key: string) => {
      this.handleKeyPress(key);
    });
  }

  update() {

    // if(!this.music) return
    // const seek = this.music.seek
    // // console.log(seek)
    // if(seek > 195) {
    //   var music = this.sound.add('the-song');
    //   music.play({
    //     seek: 10,
    //     // seek: 100
    //   })

    //   this.music = music;
    //   var gui = new window.dat.GUI();
    //   var sm = gui.addFolder("Music Debug Panel");
    //   sm.add(music, 'seek', 0, music.duration).step(0.01).listen();
    //   // sm.add(this.currentLyric, 'y', 0, this.currentLyric.y).listen();
    //   // sm.add(catAstroPhi, 'rate', 0.5, 2).listen();
    //   // sm.add(catAstroPhi, 'detune', -1200, 1200).step(50).listen();
    //   // sm.add(catAstroPhi, 'loop').listen();
    //   // sm.add(catAstroPhi, 'play');
    //   // sm.add(catAstroPhi, 'pause');
    //   // sm.add(catAstroPhi, 'resume');
    //   // sm.add(catAstroPhi, 'stop');
    //   sm.open();
    // }

  }

}
