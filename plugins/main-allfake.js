import pkg from '@whiskeysockets/baileys';
import fs from 'fs';
import fetch from 'node-fetch';
import axios from 'axios';

const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg;

// Base handler
const handler = m => m;

/**
 * Procesa todos los mensajes entrantes.
 * @param {Object} m – mensaje
 * @param {Object} extras – debe contener { conn }
 */
handler.all = async function (m, extras = {}) {
  // Prioridad: extras.conn → global.conn
  const conn = extras.conn || global.conn;
  if (!conn) {
    console.error('handler.all: conn is undefined — aborting.');
    return;
  }

  // 🛡️ Prevención de mensajes duplicados
  if (!global._processedMessages) global._processedMessages = new Set();
  if (global._processedMessages.has(m.key.id)) return;
  global._processedMessages.add(m.key.id);

  // 📦 Helper para buffers
  global.getBuffer = async (url, options = {}) => {
    try {
      const res = await axios.get(url, {
        headers: {
          DNT: 1,
          'User-Agent': 'GoogleBot',
          'Upgrade-Insecure-Request': 1
        },
        responseType: 'arraybuffer',
        ...options
      });
      return res.data;
    } catch (e) {
      console.error('Error al bajar buffer:', e);
      return null;
    }
  };

  // 🔗 Datos globales
  global.creador     = 'Wa.me/5355699866';
  global.ofcbot      = conn.user?.jid.split('@')[0] || 'unknown';
  global.namechannel = '𝙎𝙝𝙞𝙯𝙪𝙠𝙖-𝘼𝙄 𝘾𝙝𝙖𝙣𝙣𝙚𝙡';
  global.namegrupo   = 'Shizuka-AI';
  global.namecomu    = 'Shizuka-AI';
  global.listo       = '*Aquí tienes *';
  global.fotoperfil  = await conn
    .profilePictureUrl(m.sender, 'image')
    .catch(() => 'https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/sss.jpg');

  // 📣 Configuración de newsletters
  global.canalIdM     = [
    '120363400241973967@newsletter',
    '120363400241973967@newsletter'
  ];
  global.canalNombreM = [
    'Shizuka-AI Channel',
    'Shizuka-AI Channel'
  ];
  global.channelRD    = await getRandomChannel();

  // 🗓️ Fecha y hora
  const d = new Date(Date.now() + 3600000);
  global.locale = 'es';
  global.dia    = d.toLocaleDateString(global.locale,   { weekday: 'long' });
  global.fecha  = d.toLocaleDateString('es',            { day: 'numeric', month: 'numeric', year: 'numeric' });
  global.mes    = d.toLocaleDateString('es',            { month: 'long' });
  global.año    = d.toLocaleDateString('es',            { year: 'numeric' });
  global.tiempo = d.toLocaleTimeString('en-US', {
    hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
  });

  // 🔥 Estados y emojis
  global.rwait   = '🔥';
  global.done    = '❤‍🔥';
  global.error   = '💔';
  global.msm     = '🚫';
  global.emoji   = '🌸';
  global.emoji2  = '✨';
  global.emoji3  = '♦';
  global.emoji4  = '🀄';
  global.emoji5  = '🌟';
  global.emojis  = pickRandom([
    global.emoji,
    global.emoji2,
    global.emoji3,
    global.emoji4,
    global.emoji5
  ]);
  global.wait    = '❍ Espera un momento...';

  // 🌐 Redes sociales aleatorias
  const canal     = 'https://whatsapp.com/channel/0029VbAVMtj2f3EFmXmrzt0v';
  const comunidad = 'https://chat.whatsapp.com/FKdA4geFvKVD17dP6O6MHt';
  const git       = 'https://github.com/Kone457';
  const github    = 'https://github.com/Kone457/Shizuka-AI';
  const correo    = 'c2117620@gmail.com';
  global.redes    = pickRandom([canal, comunidad, git, github, correo]);

  // 🖼️ Icono aleatorio (sin deprecation warning)
  const dbPath = './src/database/db.json';
  const db_    = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const links  = db_.links?.imagen || [];
  const rnd    = Math.floor(Math.random() * links.length);
  let iconsBuffer = null;
  if (links[rnd]) {
    try {
      const res         = await fetch(links[rnd]);
      const arrayBuffer = await res.arrayBuffer();
      iconsBuffer       = Buffer.from(arrayBuffer);
    } catch (e) {
      console.error('Error al bajar ícono:', e);
    }
  }
  global.icons = iconsBuffer;

  // 👋 Saludo según la hora
  const hour = d.getHours();
  if (hour < 3)          global.saludo = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃';
  else if (hour < 10)    global.saludo = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄';
  else if (hour < 15)    global.saludo = 'Lɪɴᴅᴏ Dɪᴀ 🌤';
  else if (hour < 18)    global.saludo = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆';
  else                   global.saludo = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃';

  // Datos de usuario y read-more
  global.nombre   = m.pushName || 'Anónimo';
  global.taguser  = '@' + m.sender.split('@')[0];
  const more      = String.fromCharCode(8206);
  global.readMore = more.repeat(850);

  // 🏷️ Plantillas para stickers
  global.packsticker  =
    `°.⎯⃘... Usuario: ${global.nombre}\n` +
    `Bot: ${conn.user.name || 'Shizuka-AI'}\n` +
    `Fecha: ${global.fecha}\n` +
    `Hora: ${global.tiempo}`;
  global.packsticker2 = `\n°.⎯⃘...\n${global.creador}`;

  // 📇 Contact card
  global.fkontak = {
    key: {
      participant: '0@s.whatsapp.net',
      ...(m.chat ? { remoteJid: '6285600793871-1614953337@g.us' } : {})
    },
    message: {
      contactMessage: {
        displayName: global.nombre,
        vcard: [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `N:XL;${global.nombre};;;`,
          `FN:${global.nombre}`,
          `item1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}`,
          'item1.X-ABLabel:Ponsel',
          'END:VCARD'
        ].join('\n'),
        jpegThumbnail: null,
        thumbnail: null,
        sendEphemeral: true
      }
    }
  };

  // 📑 Fake forward context
  global.fake = {
    contextInfo: {
      isForwarded: true,
      forwarded: {
        newsletterJid: global.channelRD.id,
        newsletterName: global.channelRD.name,
        serverMessageId: -1
      }
    }
  };

  // 📡 Canal de noticias con AdReply
  global.icono = pickRandom(['https://tinyurl.com/285a5ejf']);
  global.rcanal = {
    contextInfo: {
      isForwarded: true,
      forwarded: {
        newsletterJid: global.channelRD.id,
        newsletterName: global.channelRD.name,
        serverMessageId: 100
      },
      externalAdReply: {
        showAdAttribution: true,
        title: global.packsticker,
        body: global.creador,
        previewType: 'PHOTO',
        thumbnailUrl: global.icono,
        sourceUrl: global.redes,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  };
}; // ← fin de handler.all

export default handler;

/**
 * Elige un elemento aleatorio de una lista.
 */
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Obtiene un canal aleatorio para newsletter.
 */
async function getRandomChannel() {
  const idx = Math.floor(Math.random() * global.canalIdM.length);
  return { id: global.canalIdM[idx], name: global.canalNombreM[idx] };
}