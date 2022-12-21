import Phaser from 'phaser';

export default class Demo extends Phaser.Scene {
  questions = 'абвглеёжзийклмнопрстчфхцчшщъыьэюя'.split('')
  letterSounds: Phaser.Sound.BaseSound[] = []
  // currentQuestionIndex = this.questions.length - 1
  currentQuestionIndex = 0
  questionObject: Phaser.GameObjects.Text | undefined
  constructor() {
    super('GameScene');
  }

  preload () {

    for(let i = 0; i < this.questions.length; i++) {
      const _ = this.questions[i]
      this.load.audio(_, `assets/sounds/letters/gen-${i + 6}.mp3`)
    }
  }

  handleKeyPress(key: string) {
    if(key === this.questions[this.currentQuestionIndex]) {
      this.letterSounds[key].play()
      this.currentQuestionIndex++

      // reset the index!
      if(this.currentQuestionIndex === this.questions.length) {
        this.currentQuestionIndex = 0
      }
      this.questionObject?.setText( this.questions[this.currentQuestionIndex])
    }else {
      // console.log('wrong!')
    }
  }

  create() {
    for(let i = 0; i < this.questions.length; i++) {
      const _ = this.questions[i]
      this.letterSounds[_] = this.sound.add(_)
    }


    const question = this.add.text(this.cameras.main.width /2, 100, this.questions[this.currentQuestionIndex], { fontSize: '10em', color: 'green'});
    question.setOrigin(0.5)
    this.questionObject = question

    const keys = [
      'йцукенгшщзхъ'.split(''),
      'фывапролджэё'.split(''),
      '.ячсмитьбю..'.split(''),
    ]

    const keyboardContainer = this.add.container()

    var singleButtonWidth = this.cameras.main.width / keys[0].length
    const singleButtonHeight = 40
    keys.forEach( (_, row) => {
      _.forEach((__, col) => {
        let x = col * singleButtonWidth + 10
        let y = (row * singleButtonHeight) + this.cameras.main.height - 120
        if(__ === '.') return
        const key = this.add.text(x, y, __, { fontSize: '3.5em', color: 'green'});
        key.setOrigin(0.5)
        // key.setInteractive();
        key.setInteractive({ useHandCursor: true })
        key.on('pointerdown', () => {
          this.handleKeyPress(__)
          key.setStyle({color: 'red'})
        })
        key.on('pointerup', () => {
          key.setStyle({color: 'green'})
        })

        keyboardContainer.add(key)
      })
    })
  }
}


