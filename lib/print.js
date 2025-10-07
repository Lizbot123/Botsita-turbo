import { WAMessageStubType } from '@whiskeysockets/baileys'
import chalk from 'chalk'
import { watchFile } from 'fs'

const terminalImage = global.opts['img'] ? require('terminal-image') : ''
const { default: urlRegexFactory } = await import('url-regex-safe')
const urlRegex = urlRegexFactory({ strict: false })

const pink = chalk.hex('#FF69B4') // Color rosado

export default async function (m, conn = { user: {} }) {
  let _name = await conn.getName(m.sender)
  let sender = '+' + m.sender.replace('@s.whatsapp.net', '') + (_name ? ' ~ ' + _name : '')
  let chat = await conn.getName(m.chat)
  let img

  try {
    if (global.opts['img']) {
      img = /sticker|image/gi.test(m.mtype) ? await terminalImage.buffer(await m.download()) : false
    }
  } catch (e) {
    console.error(e)
  }

  let filesize = (m.msg ?
    m.msg.vcard ?
      m.msg.vcard.length :
      m.msg.fileLength ?
        m.msg.fileLength.low || m.msg.fileLength :
        m.msg.axolotlSenderKeyDistributionMessage ?
          m.msg.axolotlSenderKeyDistributionMessage.length :
          m.text ?
            m.text.length :
            0
    : m.text ? m.text.length : 0) || 0

  let user = global.db.data.users[m.sender]
  let chatName = chat ? (m.isGroup ? 'Grupo ~ ' + chat : 'Privado ~ ' + chat) : ''
  let me = '+' + (conn.user?.jid || '').replace('@s.whatsapp.net', '')
  const userName = conn.user.name || conn.user.verifiedName || "Desconocido"

  if (m.sender === conn.user?.jid) return

  console.log(`${pink.bold('╭─〔 🌸 𝙎𝙝𝙞𝙯𝙪𝙠𝙖 · 𝘼𝙄 〕─╮')}
${pink('│')}Bot: ${pink(me)} ~ ${pink(userName)} ${pink(global.conn.user.jid === conn.user.jid ? '(Principal)' : '(Sub-Bot)')}
${pink('│')}Fecha: ${pink(new Date(m.messageTimestamp ? 1000 * (m.messageTimestamp.low || m.messageTimestamp) : Date.now()).toLocaleDateString("es-ES", { timeZone: "America/Mexico_City", day: 'numeric', month: 'long', year: 'numeric' }))}
${pink('│')}Tipo de evento: ${pink(m.messageStubType ? WAMessageStubType[m.messageStubType] : 'Ninguno')}
${pink('│')}Peso del mensaje: ${pink(filesize + ' B')} [${pink(filesize === 0 ? 0 : (filesize / 1000 ** Math.floor(Math.log(filesize) / Math.log(1000))).toFixed(1))} ${pink(['B', 'KB', 'MB', 'GB', 'TB'][Math.floor(Math.log(filesize) / Math.log(1000))] || '')}]
${pink('│')}Remitente: ${pink(sender)}
${pink('│')}Chat ${m.isGroup ? 'Grupal' : 'Privado'}: ${pink(chat)}
${pink('│')}Tipo de mensaje: ${pink(m.mtype ? m.mtype.replace(/message$/i, '').replace('audio', m.msg?.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) : 'Desconocido')}
${pink.bold('╰─────────────────────╯')}
`)

  if (img) console.log(pink(img.trimEnd()))

  if (typeof m.text === 'string' && m.text) {
    let log = m.text.replace(/\u200e+/g, '')
    let mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~`])(?!`)(.+?)\1|```((?:.|[\n\r])+?)```|`([^`]+?)`)(?=\S?(?:[\s\n]|$))/g

    let mdFormat = (depth = 4) => (_, type, text, codeBlock, inlineCode) => {
      let types = {
        '_': 'italic',
        '*': 'bold',
        '~': 'strikethrough',
        '`': 'bgGray'
      }
      text = text || codeBlock || inlineCode
      let formatted = !types[type] || depth < 1 ? text : pink(chalk[types[type]](text.replace(/`/g, '').replace(mdRegex, mdFormat(depth - 1))))
      return formatted
    }

    log = log.replace(mdRegex, mdFormat(4))

    log = log.split('\n').map(line => {
      if (line.trim().startsWith('>')) {
        return pink(chalk.bgGray.dim(line.replace(/^>/, '┃')))
      } else if (/^([1-9]|[1-9][0-9])\./.test(line.trim())) {
        return line.replace(/^(\d+)\./, (match, number) => {
          const padding = number.length === 1 ? '  ' : ' '
          return pink(padding + number + '.')
        })
      } else if (/^[-*]\s/.test(line.trim())) {
        return pink(line.replace(/^[*-]/, '  •'))
      }
      return pink(line)
    }).join('\n')

    if (log.length < 1024)
      log = log.replace(urlRegex, (url, i, text) => {
        let end = url.length + i
        return i === 0 || end === text.length || (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) ? pink(url) : url
      })

    log = log.replace(mdRegex, mdFormat(4))

    const testi = await m.mentionedJid
    if (testi) {
      for (let user of testi) {
        const name = await conn.getName(user)
        log = log.replace('@' + user.split('@')[0], pink('@' + name))
      }
    }

    console.log(m.error != null ? pink(log) : m.isCommand ? pink(log) : pink(log))
  }

  if (m.messageStubParameters) {
    const names = await Promise.all(
      m.messageStubParameters.map(async jid => {
        jid = conn.decodeJid(jid)
        let name = await conn.getName(jid)
        return pink('+' + jid.replace('@s.whatsapp.net', '') + (name ? ' ~' + name : ''))
      })
    )
    console.log(pink(names.join(', ')))
  }

  if (/document/i.test(m.mtype)) console.log(pink(`🝮 ${m.msg.fileName || m.msg.displayName || 'Document'}`))
  else if (/ContactsArray/i.test(m.mtype)) console.log(pink(`᯼ ${' ' || ''}`))
  else if (/contact/i.test(m.mtype)) console.log(pink(`✎ ${m.msg.displayName || ''}`))
  else if (/audio/i.test(m.mtype)) {
    const duration = m.msg.seconds
    console.log(pink(`${m.msg.ptt ? '☄ (PTT ' : '𝄞 ('}AUDIO) ${Math.floor(duration / 60).toString().padStart(2, 0)}:${(duration % 60).toString().padStart(2, 0)}`))
  }

  console.log()
}

let file = global.__filename(import.meta.url)
watchFile(file, () => {
  console.log(pink("Update 'lib/print.js'"))
})