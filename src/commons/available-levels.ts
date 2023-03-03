import FreeTyping from '@/scenes/FreeTyping';
import FreeTyping_Arabic from '@/scenes/langs/FreeTyping-Arabic';
import Level101 from '@/scenes/levels/Level-101';
import Level102 from '@/scenes/levels/Level-102';
import SongsABC from '@/scenes/levels/songs/abc';
import SongsYaSvoboden from '@/scenes/levels/songs/ya-svoboden';

const scenes = [
  FreeTyping,
  Level101,
  Level102,
  SongsABC,
  SongsYaSvoboden,
  // FreeTyping_Arabic
]


var _scenesKeys:any = []

scenes.forEach(_ => {
  const key = _['KEY']
  _scenesKeys.push(key)
})


export default scenes
export var scenesKeys = _scenesKeys