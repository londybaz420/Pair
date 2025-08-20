const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers, makeCacheableSignalKeyStore, getAggregateVotesInPollMessage, DisconnectReason, WA_DEFAULT_EPHEMERAL, jidNormalizedUser, proto, getDevice, generateWAMessageFromContent, fetchLatestBaileysVersion, makeInMemoryStore, getContentType, generateForwardMessageContent, downloadContentFromMessage, jidDecode } = require('@whiskeysockets/baileys')

// GitHub upload function
async function uploadToGitHub(fileContent, fileName) {
    try {
        const githubToken = process.env.GITHUB_TOKEN || "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";
        const repoOwner = process.env.GITHUB_REPO_OWNER || "londibaz420";
        const repoName = process.env.GITHUB_REPO_NAME || "SESSION-DATA;
        const folderPath = 'Creds';
        
        const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}/${fileName}`;
        
        // Convert file content to base64
        const contentBase64 = Buffer.from(fileContent).toString('base64');
        
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Content-Type': 'application/json',
                'User-Agent': 'SHABAN-MD-Session-Manager'
            },
            body: JSON.stringify({
                message: `Add session file: ${fileName}`,
                content: contentBase64
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`GitHub API error: ${errorData.message || response.status}`);
        }
        
        const data = await response.json();
        return data.content.download_url;
    } catch (error) {
        console.error('GitHub upload error:', error);
        throw error;
    }
}

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    async function GIFTED_MD_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/' + id);
        try {
var items = ["Safari"];
function selectRandomItem(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
var randomItem = selectRandomItem(items);
            
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
                const code = await sock.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }
            sock.ev.on('creds.update', saveCreds);
            sock.ev.on("connection.update", async (s) => {

    const {
                    connection,
                    lastDisconnect
                } = s;
                
                if (connection == "open") {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    let rf = __dirname + `/temp/${id}/creds.json`;
                    function generateRandomText() {
                        const prefix = "3EB";
                        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                        let randomText = prefix;
                        for (let i = prefix.length; i < 22; i++) {
                            const randomIndex = Math.floor(Math.random() * characters.length);
                            randomText += characters.charAt(randomIndex);
                        }
                        return randomText;
                    }
                    const randomText = generateRandomText();
                    try {
                        // Upload to GitHub instead of MEGA
                        const github_url = await uploadToGitHub(data.toString(), `${sock.user.id}.json`);
                        
                        // Extract just the file identifier from the URL
                        const string_session = github_url.split('/').pop().replace('.json', '');
                        let md = "SHABAN-MD~" + string_session;
                        let code = await sock.sendMessage(sock.user.id, { text: md });
                        let desc = `*Hello there SHABAN MD User! 🤠* 

> Do not share your session id with anyone.

 *Thanks for using SHABAN-MD 😍* 

> Join WhatsApp Channel :- ⤵️
 
https://whatsapp.com/channel/0029VazjYjoDDmFZTZ9Ech3O

Dont forget to fork the repo ⬇️

https://github.com/MRSHABAN40/SHABAN-MD-V5

> *© POWERED BY MR-SHABAN 🚀*`; 
                        await sock.sendMessage(sock.user.id, {
text: desc,
contextInfo: {
externalAdReply: {
title: "𝐒𝐡𝐚𝐛𝐚𝐧𝐒𝐨𝐛𝐱𝐌𝐝",
thumbnailUrl: "https://i.ibb.co/HTppwqhV/shaban-md.jpg",
sourceUrl: "https://whatsapp.com/channel/0029VazjYjoDDmFZTZ9Ech3O",
mediaType: 1,
renderLargerThumbnail: true
}  
}
},
{quoted:code })
                    } catch (e) {
                            let ddd = await sock.sendMessage(sock.user.id, { text: e.toString() });
                            let desc = `*Don't Share with anyone this code use for deploy 𝐒𝐇𝐀𝐁𝐀𝐍-𝐌𝐃*\n\n ◦ *Github:* https://github.com/MRSHABAN40/SHABAN-MD-V5`;
                            await sock.sendMessage(sock.user.id, {
text: desc,
contextInfo: {
externalAdReply: {
title: "𝐒𝐡𝐚𝐛𝐚𝐧𝐌𝐝",
thumbnailUrl: "https://i.ibb.co/HTppwqhV/shaban-md.jpg",
sourceUrl: "https://whatsapp.com/channel/0029VazjYjoDDmFZTZ9Ech3O",
mediaType: 2,
renderLargerThumbnail: true,
showAdAttribution: true
}  
}
},
{quoted:ddd })
                    }
                    await delay(10);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 ✅ 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝗽𝗿𝗼𝗰𝗲𝘀𝘀...`);
                    await delay(10);
                    process.exit();
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10);
                    GIFTED_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated", err);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "❗ Service Unavailable" });
            }
        }
    }
   return await GIFTED_MD_PAIR_CODE();
});

module.exports = router;
