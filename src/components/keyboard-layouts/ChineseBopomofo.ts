// Layout the keyboard with the array
export const KEYS_LAYOUT:string[][] = [
  'ㄅㄉˇˋㄓˊ˙ㄚㄞㄢㄦ'.split(''),
  'ㄆㄊㄍㄐㄔㄗㄧㄛㄟㄣ'.split(''),
  'ㄇㄋㄎㄑㄕㄘㄨㄜㄠㄤ'.split(''),
  'ㄈㄌㄏㄒㄖㄙㄩㄝㄡㄥ'.split(''),
]

export const KEYCODE_TO_LETTER_MAP: { [k: string]: string } = {'Digit1' : 'ㄅ','KeyQ' : 'ㄆ','KeyA' : 'ㄇ','KeyZ' : 'ㄈ','Digit2' : 'ㄉ','KeyW' : 'ㄊ','KeyS' : 'ㄋ','KeyX' : 'ㄌ','Digit3' : 'ˇ','KeyE' : 'ㄍ','KeyD' : 'ㄎ','KeyC' : 'ㄏ','Digit4' : 'ˋ','KeyR' : 'ㄐ','KeyF' : 'ㄑ','KeyV' : 'ㄒ','Digit5' : 'ㄓ','KeyT' : 'ㄔ','KeyG' : 'ㄕ','KeyB' : 'ㄖ','Digit6' : 'ˊ','KeyY' : 'ㄗ','KeyH' : 'ㄘ','KeyN' : 'ㄙ','Digit7' : '˙','KeyU' : 'ㄧ','KeyJ' : 'ㄨ','KeyM' : 'ㄩ','Digit8' : 'ㄚ','KeyI' : 'ㄛ','KeyK' : 'ㄜ','Comma' : 'ㄝ','Digit9' : 'ㄞ','KeyO' : 'ㄟ','KeyL' : 'ㄠ','Period' : 'ㄡ','Digit0' : 'ㄢ','KeyP' : 'ㄣ','Semicolon' : 'ㄤ','Slash' : 'ㄥ','Minus' : 'ㄦ'}

export const AUDIO_SPRITE_KEY: string = ''