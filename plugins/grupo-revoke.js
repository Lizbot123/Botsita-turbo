let handler = async (m, { conn }) => {
  try {
    const grupoID = m.chat

    // 🛰️ Cancelar enlace actual
    await conn.groupRevokeInvite(grupoID)

    // 🔗 Generar nuevo enlace
    const nuevoEnlace = await conn.groupInviteCode(grupoID)
    const enlaceCompleto = 'https://chat.whatsapp.com/' + nuevoEnlace

    // 📡 Confirmación con estilo
    await conn.reply(m.sender, 
`✅ *Operación ejecutada con éxito, comandante.*

🔄 *Enlace de invitación anterior revocado.*
🔗 *Nuevo canal de acceso generado:*\n${enlaceCompleto}

🛰️ *Sistema Shizuka listo para nuevas instrucciones.*`, 
      m)
  } catch (error) {
    console.error(error)
    await m.reply(`⚠️ *Error en la operación de restablecimiento del enlace.*

📄 Detalles técnicos: ${error.message}
🔧 Asegúrate de que Shizuka tenga privilegios administrativos para completar esta orden.`)
  }
}

handler.help = ['revoke']
handler.tags = ['grupo']
handler.command = ['revoke', 'restablecer']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler