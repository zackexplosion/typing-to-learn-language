import GameScene from '@/components/GameScene'

const KEY = "FreeTyping-Arabic"

export default class FreeTyping extends GameScene {
  protected questionObject: Phaser.GameObjects.Text | undefined;
  static KEY = KEY
  constructor() {
    super(KEY);
  }

  create() {
    super.create()

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

    // Setup the keyboard event
    this.keyboard.addPointerupHandler((key: string) => {
      this.questionObject?.setText(key)
    });
  }
}
