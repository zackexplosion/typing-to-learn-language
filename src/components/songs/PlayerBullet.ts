const BULLET_SPEED = 400

export default class PlayerBullet extends Phaser.Physics.Arcade.Sprite {
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