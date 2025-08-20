const { makeid } = require('./gen-id');
const express = require('express');
const QRCode = require('qrcode');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers,
    jidNormalizedUser
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    
    async function SHABAN_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            var items = ["Safari"];
            function selectRandomItem(array) {
                var randomIndex = Math.floor(Math.random() * array.length);
                return array[randomIndex];
            }
            var randomItem = selectRandomItem(items);
            
            let sock = makeWASocket({
                auth: state,
                printQRInTerminal: false,
                logger: pino({ level: "silent" }),
                browser: Browsers.macOS("Desktop"),
            });
            
            sock.ev.on('creds.update', saveCreds);
            sock.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect, qr } = s;
                
                if (qr) await res.end(await QRCode.toBuffer(qr));
                
                if (connection == "open") {
                    await delay(5000);
                    let rf = __dirname + `/temp/${id}/creds.json`;
                    
                    try {
                        // Read the session file and convert to base64
                        const sessionData = fs.readFileSync(rf, 'utf8');
                        const base64Session = Buffer.from(sessionData).toString('base64');
                        let md = "Sarkarmd$" + base64Session;
                        
                        let code = await sock.sendMessage(sock.user.id, { text: md });
                        
                        let desc = `*Hello there Sarkar-MD User! ✅️* 

> Do not share your session id with anyone.

*Thanks for using Sarkar-MD* 

> Join WhatsApp Channel :- ⤵️
https://whatsapp.com/channel/0029VajGHyh2phHOH5zJl73P

Dont forget to fork the repo ⬇️
https://github.com/Sarkar-Bandaheali/Sarkar-MD

> *© Powered BY Bandaheali*`;
                        
                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "SESSION CONNECTED",
                                    thumbnailUrl: "https://files.catbox.moe/yd6y5b.jpg",
                                    sourceUrl: "https://whatsapp.com/channel/0029VajGHyh2phHOH5zJl73P",
                                    mediaType: 1,
                                    renderLargerThumbnail: true
                                }  
                            }
                        }, { quoted: code });
                        
                    } catch (e) {
                        let ddd = await sock.sendMessage(sock.user.id, { text: `Error: ${e.message}` });
                        
                        let desc = `*Hello there SARKAR-MD User! 👋🏻* 
> Error occurred while generating session

> Join WhatsApp Channel :- ⤵️
https://whatsapp.com/channel/0029VajGHyh2phHOH5zJl73P`;
                        
                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: " 𝐄𝐑𝐑𝐎𝐑 𝐎𝐂𝐂𝐔𝐑𝐑𝐄𝐃",
                                    thumbnailUrl: "https://files.catbox.moe/yd6y5b.jpg",
                                    sourceUrl: "https://whatsapp.com/channel/0029VajGHyh2phHOH5zJl73P",
                                    mediaType: 2,
                                    renderLargerThumbnail: true
                                }  
                            }
                        }, { quoted: ddd });
                    }
                    
                    await delay(10);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 ✅ 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝗽𝗿𝗼𝗰𝗲𝘀𝘀...`);
                    await delay(10);
                    process.exit();
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10);
                    SHABAN_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restarted", err);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "❗ Service Unavailable" });
            }
        }
    }
    await SHABAN_MD_PAIR_CODE();
});

setInterval(() => {
    console.log("☘️ 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝗽𝗿𝗼𝗰𝗲𝘀𝘀...");
    process.exit();
}, 180000); // 3 minutes

module.exports = router;
