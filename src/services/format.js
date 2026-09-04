/*
  Formato del peso de un ejercicio.

  El campo se guarda como texto libre y en la base conviven tres formas:
    "40"        -> le falta la unidad
    "60kg"      -> ya la trae, no hay que duplicarla
    "corporal"  -> no lleva unidad (peso corporal, banda, etc.)

  Por eso no alcanza con concatenar " kg": solo se agrega cuando el valor es
  un numero pelado, y si ya venia con la unidad se normaliza el espaciado.
*/
export const formatWeight = (weight) => {
    const raw = String(weight ?? '').trim()
    if (!raw) return ''

    // Numero solo: "40" / "7,5" / "7.5"
    if (/^\d+([.,]\d+)?$/.test(raw)) return `${raw} kg`

    // Numero con la unidad pegada o mal espaciada: "60kg" / "60 KGS"
    const conUnidad = /^(\d+([.,]\d+)?)\s*kgs?$/i.exec(raw)
    if (conUnidad) return `${conUnidad[1]} kg`

    // Cualquier otra cosa se muestra tal cual: "corporal", "banda", etc.
    return raw
}
