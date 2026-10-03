// ============================================================
//  Personalización de la tarjeta
//  Los datos cortos se leen de variables de entorno (.env).
//  Los textos largos se editan directamente en este archivo.
// ============================================================

const env = import.meta.env

// Devuelve el valor de la variable o el fallback si está vacía
const read = (key, fallback = '') => {
    const value = env[key]
    return typeof value === 'string' && value.trim() !== '' ? value.trim() : fallback
}

const parseDate = (value) => {
    if (!value) return null
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date
}

// ---------- Datos básicos ----------

export const recipientName = read('VITE_RECIPIENT_NAME', 'Mi Amor')
export const senderName = read('VITE_SENDER_NAME')

// Fecha desde la que cuenta el contador. Si no se define, el contador se oculta.
export const startDate = parseDate(read('VITE_START_DATE'))
export const counterTitle = read('VITE_COUNTER_TITLE', '💕 Tiempo juntos 💕')

export const pageTitle = `💕 Para ${recipientName} - San Valentín 💕`

// ---------- Multimedia (rutas dentro de /public o URLs) ----------
// Deja cualquiera vacía para ocultar esa sección.

export const songUrl = read('VITE_SONG_URL', '/Manuel Medrano - Donde Nadie Pueda Ir - Manuel Medrano.mp3')

export const cardGif = read(
    'VITE_CARD_GIF_URL',
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExemp0aHNoeHpsNmg5cnJhYzk3MmF2ZHdlcXU2NTc2dThhOXFqenZwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eHvTEDvKPjdc4ovRUb/giphy.gif'
)

export const cardPhoto = {
    src: read('VITE_CARD_PHOTO'),
    caption: read('VITE_CARD_PHOTO_CAPTION', `${recipientName} & Yo 💖`),
}

export const letterPhoto = {
    src: read('VITE_LETTER_PHOTO'),
    caption: read('VITE_LETTER_PHOTO_CAPTION', 'Tú y yo, siempre juntos 💕'),
}

// ---------- Textos ----------

export const cardMessage = `${recipientName}, en este San Valentín quiero decirte lo mucho que te quiero. Gracias por cada momento compartido, por tu paciencia y por hacer mis días más bonitos. Espero seguir compartiendo mucho más contigo.`

export const letterLines = [
    `${recipientName},`,
    '',
    'Quería escribirte estas líneas',
    'para recordarte lo importante',
    'que eres para mí.',
    '',
    'Gracias por cada risa,',
    'por cada conversación',
    'y por cada momento a tu lado.',
    '',
    'Contigo todo es más bonito',
    'y no hay lugar en el que',
    'prefiera estar.',
    '',
    'Te quiero mucho. ❤️',
    '',
    'Con todo mi amor,',
    `${senderName || 'Yo'} 💕`,
]

export const secretMessages = {
    doubleTap: {
        title: '¡Mensaje Secreto! 💕',
        message: 'Cada día que pasa me doy cuenta de lo afortunado que soy de tenerte. Eres mi persona favorita en el mundo. Te amo más de lo que las palabras pueden expresar. 💖',
        emoji: '🥰',
    },
    kisses: {
        title: '¡10 Besitos para ti! 💋',
        message: 'Cada uno de estos besos representa lo mucho que te quiero. Pronto te los daré todos en persona... 😘💕',
        emoji: '💋',
    },
    surprise: {
        title: '¡Sorpresa Especial! ⭐',
        message: 'Has estado aquí por 4 minutos... Eso me hace muy feliz 🥺 Gracias por tomarte el tiempo de leer todo esto. Significa el mundo para mí. Te quiero con todo mi corazón. 💖',
        emoji: '🌟',
    },
}
