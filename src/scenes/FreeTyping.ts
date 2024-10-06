import GameScene from "@/components/GameScene";
const KEY = "FreeTyping"
const AVAILABLE_LANGS: {[k:string]: string}[] = [
  {
    label: "Russian",
    value: 'russian',
  },
  {
    label: "Chinese Bopomofo",
    value: 'chinese-bopomofo',
  }
]
export default class FreeTyping extends GameScene {
  protected questionObject: Phaser.GameObjects.Text | undefined;
  protected answerObject: Phaser.GameObjects.Text | undefined;
  protected answerObject2: Phaser.GameObjects.Text | undefined;
  private currentLang: string = 'russian'

  static KEY = KEY

  constructor() {
    super(KEY);
  }

  init(data: any){
    // console.log('data', data)
    if(data.langName) {
      this.currentLang = data.langName
    }
  }

  create() {
    console.log('created', this.currentLang)
    super.create(this.currentLang);

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

    // Setup the keyboard event
    this.keyboard.addPointerupHandler((key: string) => {
      this.questionObject?.setText(key)
      this.letterSounds?.play(key);
    });

    if(document.querySelector('#lang-selector')){
      document.querySelector('#lang-selector')?.remove()
    }

    const select = document.createElement('select')
    select.id = 'lang-selector'

    AVAILABLE_LANGS.forEach(_ => {
      var option = document.createElement('option')
      option.value = _.value
      option.innerText = _.label

      if(this.currentLang === _.value) {
        option.selected = true
      }

      select.appendChild(option)
    })

    select.addEventListener('change', (e:any) => {
      const langName = e.target.value
      // stop all sound before scene changed
      this.sound.stopAll()
      this.scene.start(KEY, {langName})
    })

    document.body.appendChild(select)
  }
}
