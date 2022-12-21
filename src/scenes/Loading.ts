export default class LoadingScene extends Phaser.Scene {
  questions = 'абвглеёжзийклмнопрстчфхцчшщъыьэюя'.split('')

  constructor() {
    super({ key: 'LoadingScene' })
  }

  preload() {
    // Remove the css loader
    document.querySelector('#loading')!.remove()

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    var progressBarStartX = (width - 320) / 2
    progressBox.fillRect(progressBarStartX , 270, 320, 50);

    var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(progressBarStartX + 10, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
        assetText.setText('Loading asset: ' + file.key);
    });
    this.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
    });

    for(let i = 0; i < this.questions.length; i++) {
      const _ = this.questions[i]
      this.load.audio(_, `assets/sounds/letters/gen-${i + 6}.mp3`)
    }

    // this.load.image('logo', 'zenvalogo.png');
    // for (var i = 0; i < 5000; i++) {
    //     this.load.image('logo'+i, 'zenvalogo.png');
    // }
  }

  create() {
    // this.loadingBar.finish()
    // this.loadingBar.setVisible(false)
    this.scene.start('GameScene')
  }
}
