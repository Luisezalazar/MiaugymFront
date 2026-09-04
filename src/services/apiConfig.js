/*
  URL base de la API, resuelta en un solo lugar.

  Antes cada pantalla leia `import.meta.env.VITE_BASE_URL` por su cuenta (ocho
  archivos). Si el .env faltaba, la variable quedaba `undefined` y las peticiones
  salian a `/undefined/register/login`, que devuelve un 404 sin ninguna pista de
  cual era el problema real.

  Ahora hay un unico punto con respaldo y un aviso claro en consola.
*/

const FALLBACK = 'http://localhost:3000/api'

const configurada = import.meta.env.VITE_BASE_URL

if (!configurada) {
    console.warn(
        `[MiauGym] Falta VITE_BASE_URL. Se usa ${FALLBACK}. ` +
        'En desarrollo: copiar Front/.env.template a Front/.env y reiniciar Vite. ' +
        'En produccion: definirla en el panel del host (es una variable de build).'
    )
}

export const BASE_URL = configurada || FALLBACK
