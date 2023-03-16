import GameScene from "@/components/GameScene";
import Lyrics from "@/components/songs/Lyrics";
import PlayerBullet from "@/components/songs/PlayerBullet";
import LoadingHelper from "@/commons/loading-helper";

export default class SongScene extends GameScene {
  protected currentQuestionIndex = 0;
  protected currentQuestionWordIndex = 0;
  protected questions: Array<string> = [];
  protected playerBulletGroup: Phaser.Physics.Arcade.Group | undefined;
  protected currentLyric: Lyrics | undefined;
  protected music: Phaser.Sound.BaseSound | undefined;
  protected progressText: Phaser.GameObjects.Text | undefined;

  //  Create our own EventEmitter instance
  public emitter = new Phaser.Events.EventEmitter();

  protected savingIndexKey;

  constructor(KEY: string, _lyrics: string, keyboardType: string) {
    super(KEY, keyboardType);

    // Remove symbols, line break ...etc non letters
    this.questions = _lyrics
      .replace(/(\.|\!|\,|\-|\(|\))/g, "")
      // Remove more than one space.
      .replace(/\ +/g, " ")
      .split("\n")
      .filter((_) => _.trim().length > 0)
      .map((_) => _.trim().toLocaleLowerCase());
    const q: Array<string> = [];

    this.questions.forEach((_) => {
      _.split(" ").forEach((__) => {
        q.push(__);
      });
    });

    this.questions = q;

    this.savingIndexKey = `songs-currentQuestionIndex-${KEY}`;

    const lastIndex = window.localStorage.getItem(this.savingIndexKey);

    if (lastIndex) {
    } else {
    }
  }

  // The main game logic handle here
  handleKeyPress(key: string) {
    this.currentLyric.handleKeyPress(key);
    // Play letter sounds
    // this.letterSounds[keya].play();
  }

  createLyric() {
    this.currentLyric = new Lyrics(
      this,
      this.questions[this.currentQuestionIndex]
    );
  }

  preload() {
    super.preload();

    new LoadingHelper(this);
    this.load.image("playerBullet", "assets/bullet.png");
    this.load.audio("player-fire", ["assets/sounds/player-fire.mp3"]);
  }

  getProgressTextString() {
    return `${this.currentQuestionIndex + 1} / ${this.questions.length - 1}`;
  }

  create() {
    super.create();

    this.progressText = this.add
      .text(this.cameras.main.width / 2, 45, this.getProgressTextString(), {
        font: "2em ",
        color: "gray",
      })
      .setOrigin(0.5);

    this.progressText.visible = false;

    this.playerBulletGroup = this.physics.add.group({
      removeCallback: (g) => {},
    });

    var playerFireSFX = this.sound.add("player-fire");

    const text = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "Click here to start",
        { font: "3em ", color: "gray" }
      )
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.progressText!.visible = true;
        this.music!.play({
          seek: 13.5,
          // seek: 100
        });
        // var gui = new window.dat.GUI();
        // var sm = gui.addFolder("Music Debug Panel");
        // sm.add(music, 'seek', 0, music.duration).step(0.01).listen();
        // // sm.add(this.currentLyric, 'y', 0, this.currentLyric.y).listen();
        // // sm.add(catAstroPhi, 'rate', 0.5, 2).listen();
        // // sm.add(catAstroPhi, 'detune', -1200, 1200).step(50).listen();
        // // sm.add(catAstroPhi, 'loop').listen();
        // // sm.add(catAstroPhi, 'play');
        // // sm.add(catAstroPhi, 'pause');
        // // sm.add(catAstroPhi, 'resume');
        // // sm.add(catAstroPhi, 'stop');
        // sm.open();

        this.createLyric();
        this.physics.add.collider(this.currentLyric, this.playerBulletGroup!);
        text.destroy();
      })
      .setOrigin(0.5);

    this.emitter.on("playerTypingCorrect", (tx: number, ty: number) => {
      const x = this.cameras.main.width / 2;
      const y = this.cameras.main.height - 100;
      playerFireSFX.play();
      new PlayerBullet(this, x, y, tx, ty);
    });

    this.emitter.on("currentLyricCompleted", (text: string) => {
      // console.log("text completed", text);
      this.currentQuestionIndex++;
      this.currentLyric.destroy();
      this.currentLyric = null;
      this.createLyric();
    });

    // Setup the keyboard event
    this.keyboard.addPointerupHandler((key: string) => {
      this.handleKeyPress(key);
    });
  }

  update() {
    this.progressText!.text = this.getProgressTextString();
    // if(!this.music) return
    // const seek = this.music.seek
    // // console.log(seek)
    // if(seek > 195) {
    //   var music = this.sound.add('ya-svoboden.mp3');
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
