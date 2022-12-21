import Phaser from 'phaser';
import config from '@/config';
import LoadingScene from '@/scenes/Loading';
import FreeTyping from '@/scenes/FreeTyping';
import Level101 from '@/scenes/levels/Level-101';
import Level102 from '@/scenes/levels/Level-102';

const scenes = [
  FreeTyping,
  Level101,
  Level102
]

const game = new Phaser.Game(
  Object.assign(config, {
    scene: [
      LoadingScene,
      ...scenes
    ]
  })
);


// TODO
// Make a scene switch
// const select = document.createElement('select')

// select.id = 'scene-selector'

// scenes.forEach(_ => {
//   var option = document.createElement('option')
//   option.value = _.name
//   option.innerText = _.name

//   select.appendChild(option)
// })

// select.addEventListener('change', e => {
//   // console.log(e.target.value)
//   game.scene.start('FreeTyping')
//   // debugger
// })

// document.body.appendChild(select)