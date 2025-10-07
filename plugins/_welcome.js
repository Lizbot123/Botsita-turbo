import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return

  const chat = global.db.data.chats[m.chat]
  const user = m.messageStubParameters[0]
  const nombre = await conn.getName(user) || 'Miembro'
  const avatar = await conn.profilePictureUrl(user, 'image').catch(_ => 'https://qu.ax/xuLKH.jpg')
  const groupName = groupMetadata.subject || 'el grupo'

  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo"
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    participant: "0@s.whatsapp.net"
  }

  // 📥 BIENVENIDA
  if (chat.welcome && m.messageStubType == 27) {
    const miembro = participants.length + 1
    const url = `https://api.popcat.xyz/v2/welcomecard?background=https://qu.ax/WRqRM.jpg&text1=${encodeURIComponent(nombre)}&text2=${encodeURIComponent(`Bienvenido a ${groupName}`)}&text3=${encodeURIComponent(`Miembro ${miembro}`)}&avatar=${encodeURIComponent(avatar)}`
    const res = await fetch(url)
    const imgBienvenida = Buffer.from(await res.arrayBuffer())

    const caption = `
🎉 *@${user.split('@')[0]} se ha unido a ${groupName}*  
Bienvenido 🐾  
> Eres el miembro número ${miembro}
`.trim()

    await conn.sendMessage(m.chat, {
      image: imgBienvenida,
      caption,
      contextInfo: { mentionedJid: [user] }
    }, { quoted: fkontak })
  }

  // 📤 DESPEDIDA
  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    const miembro = participants.length - 1
    const url = `https://api.popcat.xyz/v2/welcomecard?background=https://qu.ax/SttTr.jpg&text1=${encodeURIComponent(nombre)}&text2=${encodeURIComponent(`Ha salido de ${groupName}`)}&text3=${encodeURIComponent(`Quedan ${miembro} miembros`)}&avatar=${encodeURIComponent(avatar)}`
    const res = await fetch(url)
    const imgDespedida = Buffer.from(await res.arrayBuffer())

    const caption = `
👋 *@${user.split('@')[0]} ha salido de ${groupName}*  
Nos despedimos con cariño 🐾  
> Ahora somos ${miembro} miembros
`.trim()

    await conn.sendMessage(m.chat, {
      image: imgDespedida,
      caption,
      contextInfo: { mentionedJid: [user] }
    }, { quoted: fkontak })
  }
}