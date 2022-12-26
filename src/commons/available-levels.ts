import FreeTyping from '@/scenes/FreeTyping';
import Level101 from '@/scenes/levels/Level-101';
import Level102 from '@/scenes/levels/Level-102';
import SongsABC from '@/scenes/levels/songs/abc';
import SongsYaSvoboden from '@/scenes/levels/songs/ya-svoboden';

const scenes = [
  FreeTyping,
  Level101,
  Level102,
  SongsABC,
  SongsYaSvoboden
]

export const scenesKeys: Array<string> = [
  'FreeTyping',
  'Level-101',
  'Level-102',
  'Songs-ABC',
  'Songs-YaSvoboden'
]


export default scenes