import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 


global.botNumber = '' //Ejemplo: 123456789

//-----------------------------

global.owner = [

  ['5219518476051', '🜲 Propietario 🜲', true],

  ['+261271484104740@lid'],

  ['261271484104740'],

  ['+261271484104740'], 

  ['5219518476051']

];

//-----------------------------

global.mods = ['5219518476051']
global.suittag = ['5219518476051'] 
global.prems = []

//-----------------------------

global.libreria = 'Baileys'
global.baileys = 'V 6.7.16' 
global.vs = '1.0'
global.nameqr = 'Botsita-turbo'
global.namebot = 'Botsita-turbo'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 


//-----------------------------

global.packname = '「Botsita-turbo」'
global.botname = 'Botsita-turbo'
global.wm = 'Botsita-turbo'
global.author = 'Power By Mariela'
global.dev = '© 𝙋𝙤𝙬𝙚𝙧-𝙗𝙮-Mariela°'
global.textbot = 'Botsita-turbo 𝙋𝙤𝙬𝙚𝙧 𝙗𝙮 Mariela '
global.etiqueta = 'Mariela'


//-----------------------------

global.moneda = 'Nakfas'
global.welcom1 = `

 *🕸️ Registro del sistema:* 
> *"Su presencia ha sido registrada en nuestro sistema. Perfil de corrupción: 68%. Bienvenido a la matriz."*

*🕷️ Reglas de supervivencia:*  
- No aceptes dulces del bot (son veneno digital)  
- Los mensajes de la madrugada son ley  
- Si ves tu nombre en rojo... huye inmediatamente  

*💀 Dato siniestro:* 
> *El 97% de los que entran no vuelven a ser humanos.*

*🕷️ Disfruta tu estancia... mientras puedas.* `

global.welcom2 = `
> *Los datos de su paso por este lugar han sido erradicados.*  
> *No existe copias de seguridad... o eso creemos.*

*🕸️ Reporte de eliminación:*  
✖️ Chat history: *deleted*  
✖️ Relaciones: *purged*  
✖️ Recuerdos: *corrupted*

*☠️ Advertencia para los sobrevivientes:* 
> *"No preguntéis por ello... o seréis el próximo."*`

global.banner = 'https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Shizuka.jpg'
global.avatar = 'https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/v2.jpg'

//-----------------------------

global.gp1 = 'https://whatsapp.com/channel/0029Vaein6eInlqIsCXpDs3y'
global.comunidad1 = 'https://whatsapp.com/channel/0029Vaein6eInlqIsCXpDs3y'
global.channel = 'https://whatsapp.com/channel/0029Vaein6eInlqIsCXpDs3y'
global.channel2 = 'https://whatsapp.com/channel/0029Vaein6eInlqIsCXpDs3y'
global.md = 'https://github.com/Lizbot123/Botsita-turbo'
global.correo = 'lisbethperez2214@gmail.com'
global.cn ='https://whatsapp.com/channel/0029Vaein6eInlqIsCXpDs3y';

//-----------------------------


global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363400241973967@newsletter',
}
global.multiplier = 70

//----------------------------

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//----------------------------

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
