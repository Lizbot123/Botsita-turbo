// 🌊 Generador de texto submarino

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg'; // Miniatura fija en la tarjeta

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🌊 *Escribe el texto que quieres convertir en estilo submarino.*\nEjemplo:\n${usedPrefix + command} Vreden`,
      footer: '🧜‍♂️ Underwater Text Maker por Vreden API',
      contextInfo: {
        externalAdReply: {
          title: 'Generador de texto submarino',
          body: 'Transforma palabras en arte acuático',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://api.vreden.my.id'
        }
      }
    }, { quoted: m });
    return;
  }

  try {
    let api = `https://api.vreden.my.id/api/maker/ephoto/underwatertext?text=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    let json = await res.json();

    if (!json?.result || !json.result.startsWith('http')) {
      return m.reply(`❌ No se pudo generar la imagen para: ${text}`);
    }

    conn.sendMessage(m.chat, {
      image: { url: json.result },
      caption: `🌊 *Texto submarino generado:*\n🔤 *Texto:* ${text}`,
      footer: '🚀 Imagen creada vía Vreden API',
      contextInfo: {
        externalAdReply: {
          title: text,
          body: 'Estilo submarino aplicado',
          thumbnailUrl: thumbnailCard,
          sourceUrl: json.result
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al generar la imagen.\n📛 Detalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['subtext', 'textsubmarino', 'subtext'];
export default handler;