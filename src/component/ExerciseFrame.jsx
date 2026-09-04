import React from 'react'
import { frameUrl } from '../services/exerciseImages'

/*
  Dibuja un frame del catalogo.

  Los SVG de workout-guide vienen con fill="#fff": puestos en un <img> se ven
  en el tema oscuro y desaparecen en el claro. Por eso se usan como mascara
  CSS y el color lo pone el fondo del div, que sale de los tokens del tema.
  Asi el mismo archivo sirve en los dos temas.
*/
export const ExerciseFrame = ({ slug, index = 1, size = 64, className = '', tone = 'ink' }) => {
    const url = frameUrl(slug, index)

    if (!url) {
        return (
            <div
                className={`shrink-0 rounded-lg bg-sunken border border-line ${className}`}
                style={{ width: size, height: size }}
                aria-hidden="true"
            />
        )
    }

    const color = tone === 'accent' ? 'var(--color-accent)' : 'var(--color-ink)'

    return (
        <div
            className={`shrink-0 ${className}`}
            style={{
                width: size,
                height: size,
                backgroundColor: color,
                WebkitMaskImage: `url("${url}")`,
                maskImage: `url("${url}")`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
            }}
            role="img"
            aria-label={`Ilustración del ejercicio, pose ${index}`}
        />
    )
}
