const client = require("../whatsappClient");

async function sendSignupMessage(phone, username) {
    try {

        // 1. Clean + format number
        const formattedPhone = phone.includes("91")
            ? phone
            : "91" + phone;

        const chatId = formattedPhone + "@c.us";

        // 2. Direct send message (NO getNumberId)
        await client.sendMessage(chatId, `
🎉 Signup Successful!

Hello ${username}
Your account is created successfully 🚀
        `);

        console.log("WHATSAPP SENT ✔");

    } catch (err) {
        console.log("WHATSAPP ERROR:", err);
    }
}

module.exports = sendSignupMessage;