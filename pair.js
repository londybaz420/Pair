const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
const path = require('path');
let router = express.Router();
const pino = require("pino");
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');
const PastebinAPI = require('pastebin-js');

// Improved Pastebin initialization with error handling
let pastebin;
try {
    pastebin = new PastebinAPI({
        'api_dev_key': '',
        'api_user_name': 'sarkarji1', // Add your Pastebin username
        'api_user_password': '@iamdadl1234' // Add your Pastebin password
    });
} catch (e) {
    console.error("Pastebin initialization failed:", e.message);
}

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

async function uploadToPastebin(filePath) {
    try {
        // Verify file exists and is valid
        if (!fs.existsSync(filePath)) {
            throw new Error("Credentials file not found");
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        if (!fileContent || fileContent.length === 0) {
            throw new Error("Credentials file is empty");
        }

        // Upload to Pastebin
        const pasteUrl = await pastebin.createPaste({
            text: fileContent,
            title: 'Sarkar-MD',
            format: 'json',
            privacy: 1 // Private
        });

        return pasteUrl.split('https://pastebin.com/')[1] || pasteUrl;
    } catch (error) {
        console.error("Pastebin upload error:", error);
        throw error;
    }
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    
    async function SARKAR_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            const randomItem = "Safari"; // Simplified browser selection
            
            let sock = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                generateHighQualityLinkPreview: true,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                syncFullHistory: false,
                browser: Browsers.macOS(randomItem)
            });

            if (!sock.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const custom = "SARKARMD";
                const code = await sock.requestPairingCode(num, custom);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            sock.ev.on('creds.update', saveCreds);
            sock.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;
                
                if (connection == "open") {
                    await delay(5000);
                    const rf = path.join(__dirname, 'temp', id, 'creds.json');
                    
                    try {
                        let pasteId;
                        let sessionPrefix;
                        
                        try {
                            pasteId = await uploadToPastebin(rf);
                            sessionPrefix = "bandaheali$"; // Prefix for Pastebin sessions
                        } catch (uploadError) {
                            console.error("Pastebin failed, using fallback method");
                            // Fallback: Read and send credentials directly
                            const creds = fs.readFileSync(rf, 'utf8');
                            pasteId = Buffer.from(creds).toString('base64');
                            sessionPrefix = "Sarkarmd$"; // Prefix for base64 sessions
                        }

                        const md = sessionPrefix + pasteId;
                        const code = await sock.sendMessage(sock.user.id, { text: md });
                        await sock.groupAcceptInvite('HAKfRRUNnk3G1jTeiXh5Zi');
                        await sock.newsletterFollow("120363315182578784@newsletter");
                        await sock.newsletterUnmute("120363315182578784@newsletter")
                        
                        const desc = `*Hello there SARKAR-MD User! ✅️*\n\n` +
                            `> Do not share your session id with anyone.\n\n` +
                            `*Thanks for using SARKAR-MD 😍*\n\n` +
                            `> Join WhatsApp Channel: https://whatsapp.com/channel/0029VajGHyh2phHOH5zJl73P\n\n` +
                            `> *© POWERED BY BANDAHEALI 🚀*`;
                        
                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "SARKAR-MD",
                                    thumbnailUrl: "https://files.catbox.moe/yd6y5b.jpg",
                                    sourceUrl: "https://whatsapp.com/channel/0029VajGHyh2phHOH5zJl73P",
                                    mediaType: 1,
                                    renderLargerThumbnail: true
                                }  
                            }
                        }, { quoted: code });
                        
                    } catch (e) {
                        console.error("Session handling error:", e);
                        const errorMsg = e.message.includes('rate limit') ? 
                            "Server busy. Please try again later." : 
                            `Error: ${e.message}`;
                        
                        await sock.sendMessage(sock.user.id, { text: errorMsg });
                        
                        const errorDesc = `*Don't Share with anyone this code use for deploy Shaban-MD*\n\n` +
                            `◦ *Github:* https://github.com/Sarkar-Bandaheali/Sarkar-MD`;
                        
                        await sock.sendMessage(sock.user.id, {
                            text: errorDesc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "SARKAR-MD",
                                    thumbnailUrl: "https://files.catbox.moe/yd6y5b.jpg",
                                    sourceUrl: "https://whatsapp.com/channel/0029VajGHyh2phHOH5zJl73P",
                                    mediaType: 2,
                                    renderLargerThumbnail: true,
                                    showAdAttribution: true
                                }  
                            }
                        });
                    } finally {
                        await delay(10);
                        await sock.ws.close();
                        await removeFile('./temp/' + id);
                        console.log(`👤 ${sock.user.id} Connected ✅ Restarting process...`);
                        process.exit();
                    }
                } else if (connection === "close" && lastDisconnect?.error?.output?.statusCode !== 401) {
                    await delay(10);
                    SARKAR_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.error("Service error:", err);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "Service Unavailable. Please try again." });
            }
        }
    }
    return await SARKAR_MD_PAIR_CODE();
});

module.exports = router;
