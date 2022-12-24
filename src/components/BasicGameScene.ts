import GameScene from "@/components/GameScene";

export default class BasicGameScene extends GameScene {
  protected questionObject: Phaser.GameObjects.Text | undefined;
  protected answerObject: Phaser.GameObjects.Text | undefined;
  protected answerObject2: Phaser.GameObjects.Text | undefined;

  create() {
    super.create();

    // Create the main question text object
    this.questionObject = this.add
      .text(
        this.cameras.main.width / 2,
        150,
        '',
        {
          font: `25em PT Mono`, color: "green",
          wordWrap: { width: this.cameras.main.width}
        }
      )
      .setOrigin(0.5);

    this.answerObject = this.add
      .text(
        this.cameras.main.width / 2,
        150,
        '',
        {
          font: `25em PT Mono`, color: "gray",
          wordWrap: { width: this.cameras.main.width}
        }
      )
      .setOrigin(0.5);
  }
}
