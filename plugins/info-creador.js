let handler = async (m, { conn }) => {
  const suittag = '5219518476051' // Número del creador
  const botname = 'Botsita-turbo'
  const github = 'https://github.com/Lizbot123/Botsita-turbo'
  const canal = 'https://whatsapp.com/channel/0029Vaein6eInlqIsCXpDs3y'
  const packname = 'Botsita-turbo'
  const dev = 'Mariela'
  const numero = `+${suittag}`

  await m.react('📇')

  // Obtener biografías (si fallan, se usa "Sin Biografía")
  const bioOwnerData = await conn.fetchStatus(`${suittag}@s.whatsapp.net`).catch(() => ({ status: 'Sin Biografía' }))
  const bioBotData = await conn.fetchStatus(conn.user.jid).catch(() => ({ status: 'Sin Biografía' }))

  const bio = bioOwnerData?.status?.toString() || 'Sin Biografía'
  const bioBot = bioBotData?.status?.toString() || 'Sin Biografía'

  const mensaje = `
╭─| *𝓘𝓷𝓯𝓸𝓻𝓶𝓪𝓬𝓲𝓸𝓷 𝓭𝓮𝓵 𝓒𝓻𝓮𝓪𝓭𝓸𝓻* |─╮
│ 🧑‍💻 *Nombre:* ${dev}
│ 📱 *Número:* ${numero}
│ 🤖 *Bot:* ${botname}
│ 🌐 *GitHub:* ${github}
│ 📣 *Canal:* ${canal}
╰──────────────────╯


`.trim()

  await conn.sendMessage(m.chat, {
    text: mensaje,
    mentions: [`${suittag}@s.whatsapp.net`, conn.user.jid]
  }, { quoted: m })
}

handler.help = ['owner', 'creador']
handler.tags = ['info']
handler.command = ['owner', 'creator', 'creador', 'dueño']

export default handler
