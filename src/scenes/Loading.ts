import russianAlphabets from "@/commons/russian-alphabets";

export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  preload() {
    // Remove the css loader
    document.querySelector("#loading")!.remove();

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    var progressBarStartX = (width - 320) / 2;
    progressBox.fillRect(progressBarStartX, 270, 320, 50);

    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        color: "green",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        color: "#008000",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        color: "#008000",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", function (value: number) {
      percentText.setText((value * 100).toFixed(0) + "%");
      progressBar.clear();
      progressBar.fillStyle(0x008000, 1);
      progressBar.fillRect(progressBarStartX + 10, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", function (file: any) {
      assetText.setText("Loading asset: " + file.key);
    });

    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    // Load the voice of letters
    for (let i = 0; i < russianAlphabets.length; i++) {
      const _ = russianAlphabets[i];
      this.load.audio(_, `assets/sounds/letters/gen-${i + 6}.mp3`);
    }

    // Pre loading the font, won' display on screen
    this.add.text(0,0,'я', {font: '1px PT Mono'})
  }

  create() {
    if(localStorage && localStorage.currentLevel) {
      this.scene.start(localStorage.currentLevel);
    } else {
      this.scene.start("Level-101");
    }
  }
}
