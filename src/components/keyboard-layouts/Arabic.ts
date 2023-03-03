// Layout the keyboard with the array
export const KEYS_LAYOUT = [
  'йцукенгшщзх'.split(''),
  'фывапролджэ'.split(''),
  'ячсмитьбюъё'.split(''),
]

// TODO
// Maybe need another hash for uppercase too?
// const KEYCODE_TO_RUSSIAN_LETTER_MAP:any = {81 : 'й',87 : 'ц',69 : 'у',82 : 'к',84 : 'е',89 : 'н',85 : 'г',73 : 'ш',79 : 'щ',80 : 'з',219 : 'х',221 : 'ъ',222 : 'э',186 : 'ж',76 : 'д',75 : 'л',74 : 'о',72 : 'р',71 : 'п',70 : 'а',68 : 'в',83 : 'ы',65 : 'ф',90 : 'я',88 : 'ч',67 : 'с',86 : 'м',66 : 'и',78 : 'т',77 : 'ь',188 : 'б',190 : 'ю',192 : 'ё'}
export const KEYCODE_TO_LETTER_MAP:any = {'KeyA' : 'ф','Backquote' : 'ё','KeyQ' : 'й','KeyW' : 'ц','KeyS' : 'ы','KeyX' : 'ч','KeyZ' : 'я','KeyC' : 'с','KeyD' : 'в','KeyE' : 'у','KeyR' : 'к','KeyF' : 'а','KeyV' : 'м','KeyB' : 'и','KeyG' : 'п','KeyT' : 'е','KeyY' : 'н','KeyH' : 'р','KeyN' : 'т','KeyM' : 'ь','KeyJ' : 'о','KeyU' : 'г','KeyI' : 'ш','KeyK' : 'л','Comma' : 'б','Period' : 'ю','KeyL' : 'д','KeyO' : 'щ','KeyP' : 'з','Semicolon' : 'ж','Quote' : 'э','BracketLeft' : 'х','BracketRight' : 'ъ'}
