/*
  URLs de los frames del catalogo de ejercicios.

  Las imagenes son SVG de workout-guide servidos por jsDelivr. No se guardan
  en la base: alcanza con el slug para armarlas.

  Ilustraciones: CC BY-SA 4.0 por Bryl Lim, derivadas de Everkinetic.
  https://github.com/bryllim/workout-guide
*/

/*
  Se fija a un commit y no a @main: apuntando a la rama, cualquier cambio en el
  repositorio de origen cambiaria las ilustraciones de la app sin aviso, o las
  romperia si mueven los archivos. Para actualizar, cambiar el SHA a mano y
  verificar que las imagenes siguen ahi.

  Commit: aac5992 (26/08/2026)
*/
const COMMIT = 'aac599224bb9780305239607ef98540b7e0ce389'
const CDN = `https://cdn.jsdelivr.net/gh/bryllim/workout-guide@${COMMIT}/packages/workout-guide/assets`

/** URL de un frame puntual (1, 2 o 3). */
export const frameUrl = (slug, index = 1) =>
    slug ? `${CDN}/${slug}/frame-${index}.svg` : null

/** Las tres poses del movimiento, de inicio a fin. */
export const allFrames = (slug, frameCount = 3) =>
    slug ? Array.from({ length: frameCount }, (_, i) => frameUrl(slug, i + 1)) : []
