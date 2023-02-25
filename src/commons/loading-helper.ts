export default class LoadingHelper {
  constructor(scene: Phaser.Scene) {
    var width = scene.cameras.main.width;
    var height = scene.cameras.main.height;
    var progressBar = scene.add.graphics();
    var progressBox = scene.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    var progressBarStartX = (width - 320) / 2;
    progressBox.fillRect(progressBarStartX, 270, 320, 50);

    var loadingText = scene.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        color: "green",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = scene.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        color: "#008000",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = scene.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        color: "#008000",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    scene.load.on("progress", function (value: number) {
      percentText.setText((value * 100).toFixed(0) + "%");
      progressBar.clear();
      progressBar.fillStyle(0x008000, 1);
      progressBar.fillRect(progressBarStartX + 10, 280, 300 * value, 30);
    });

    scene.load.on("fileprogress", function (file: any) {
      assetText.setText("Loading asset: " + file.key);
    });

    scene.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }
}