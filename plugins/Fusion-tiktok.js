import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg';

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🎥 *Escribe el nombre de un TikTok para buscar.*\nEjemplo:\n${usedPrefix + command} Copyright Coding`,
      footer: '🔍 Buscando video vía Vreden API',
      contextInfo: {
        externalAdReply: {
          title: 'TikTok Downloader',
          body: 'Encuentra y descarga TikToks por nombre',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://api.vreden.my.id'
        }
      }
    }, { quoted: m });
  }

  try {
    const searchRes = await fetch(`https://api.vreden.my.id/api/search/tiktok?query=${encodeURIComponent(text)}`);
    const searchJson = await searchRes.json();
    const videos = searchJson?.result?.videos;

    if (!videos?.length) {
      return m.reply(`❌ No se encontraron TikToks para: ${text}`);
    }

    const selected = videos[0];
    const tiktokLink = `https://www.tiktok.com/@/video/${selected.video_id}`;

    const dlRes = await fetch(`https://delirius-apiofc.vercel.app/download/tiktok?url=${encodeURIComponent(tiktokLink)}`);
    const dlJson = await dlRes.json();

    const mediaUrl = dlJson?.data?.meta?.media?.[0]?.org;
    if (!dlJson?.status || !mediaUrl) {
      return m.reply(`⚠️ No se pudo descargar el TikTok. Intenta con otro término.`);
    }

    const caption = `
🎬 *${selected.title || dlJson.data.title}*
👤 Autor: ${dlJson.data.author?.nickname || 'Desconocido'}
📅 Publicado: ${dlJson.data.published || 'Sin fecha'}
💬 Comentarios: ${dlJson.data.comment}
❤️ Likes: ${dlJson.data.like}
🔁 Reproducciones: ${dlJson.data.repro}
`;

    await conn.sendMessage(m.chat, {
      image: { url: selected.cover || thumbnailCard },
      caption,
      footer: '📲 Video obtenido vía Vreden + Delirius API',
      contextInfo: {
        externalAdReply: {
          title: 'TikTok Video',
          body: 'Descarga completada',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://vreden.my.id' // reemplaza texto decorativo inválido
        }
      }
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      video: { url: mediaUrl },
      mimetype: 'video/mp4',
      fileName: `tiktok_${selected.video_id}.mp4`
    }, { quoted: m });

  } catch (err) {
    console.error('💥 Error en TikTok plugin:', err);
    m.reply(`❌ Error al procesar tu búsqueda.\n📛 ${err.message}`);
  }
};

handler.command = ['tt2', 'tiktokdl', 'buscatiktok'];
export default handler;
