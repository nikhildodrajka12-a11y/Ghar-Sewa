const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    }
});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
    console.log("Scan QR");
});

client.on("ready", () => {
    console.log("WhatsApp Bot is ready!");
});

client.on("auth_failure", msg => {
    console.log("AUTH FAILED:", msg);
});

client.on("disconnected", (reason) => {
    console.log("Disconnected:", reason);
});

client.initialize();

module.exports = client;