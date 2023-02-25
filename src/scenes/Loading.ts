import russianAlphabets from "@/commons/russian-alphabets";
import LoadingHelper from "@/commons/loading-helper";
import { scenesKeys } from '@/commons/available-levels'
export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  preload() {

    // TODO, Add debug config and check if loading datgui
    var url =
      "https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.7/dat.gui.min.js";
    this.load.plugin("datgui", url, true);


    // Remove the css loader, if it's exists
    const cssLoader = document.querySelector("#loading")
    if(cssLoader) {
      cssLoader.remove();
    }

    new LoadingHelper(this)

    // Load the voice of letters
    for (let i = 0; i < russianAlphabets.length; i++) {
      const _ = russianAlphabets[i];
      this.load.audio(_, `assets/sounds/letters/gen-${i + 6}.mp3`);
    }

    this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
    // Pre loading the font, won' display on screen
    this.add.text(0,0,'я', {font: '1px PT Mono'})

  }

  create() {

    var center_x = this.cameras.main.width / 2
    var center_y = this.cameras.main.height / 2

    this.add.text(center_x, 45 ,'Happy New Year!', {font: '3em ', color: 'gray'}).setOrigin(0.5, 0 )

    var tree = new Phaser.Geom.Triangle.BuildEquilateral(0, -250, 350);
    var trunk = new Phaser.Geom.Rectangle(0, 0, 80, 140);
    var baubles = new Phaser.Geom.Line(0, 0, 170, 60);
    var baubles2 = new Phaser.Geom.Line(0, 0, 310, 70);

    var particles = this.add.particles('flares');

    particles.createEmitter({
        frame: 'green',
        x: center_x, y: center_y,
        speed: 0,
        lifespan: 2000,
        quantity: 48,
        frequency: 2000,
        delay: 500,
        scale: { start: 0.3, end: 0.1 },
        blendMode: 'ADD',
        emitZone: { type: 'edge', source: tree, quantity: 48 }
    });

    particles.createEmitter({
        frame: 'blue',
        x: center_x - 35, y: center_y + 100,
        speed: 0,
        lifespan: 500,
        delay: 500,
        frequency: 0,
        quantity: 1,
        scale: 0.2,
        blendMode: 'ADD',
        emitZone: { type: 'edge', source: trunk, quantity: 48 }
    });

    particles.createEmitter({
        frame: 'red',
        x: center_x, y: center_y,
        lifespan: 500,
        quantity: 1,
        frequency: 200,
        scale: 0.6,
        blendMode: 'ADD',
        emitZone: { type: 'edge', source: tree, quantity: 12 }
    });

    particles.createEmitter({
        frame: { frames: [ 'red', 'yellow', 'blue' ], cycle: true },
        x: center_x - 55, y: 220,
        lifespan: 200,
        quantity: 1,
        frequency: 50,
        scale: 0.4,
        blendMode: 'ADD',
        emitZone: { type: 'edge', source: baubles, quantity: 10 }
    });

    particles.createEmitter({
        frame: { frames: [ 'red', 'yellow', 'blue' ], cycle: true },
        x: center_x - 120, y: 350,
        lifespan: 200,
        quantity: 1,
        frequency: 50,
        scale: 0.4,
        blendMode: 'ADD',
        emitZone: { type: 'edge', source: baubles2, quantity: 16 }
    });


    setTimeout(() => {
      const levelFromUrl = new URLSearchParams(window.location.search).get('level')
      var sceneToStart = "Level-101"

      if(levelFromUrl && scenesKeys.includes(levelFromUrl)) {
        sceneToStart = levelFromUrl
      } else if(localStorage && localStorage.currentLevel) {
        sceneToStart = localStorage.currentLevel
      }
      // else {
      //   sceneToStart = "Level-101"
      // }

      console.log('sceneToStart', sceneToStart)

      this.scene.start(sceneToStart);

    }, 1000)
  }
}
