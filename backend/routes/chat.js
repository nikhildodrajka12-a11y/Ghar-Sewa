const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const { message } = req.body;

    console.log("USER MESSAGE:", message);

    const response = await axios.post(
      "http://127.0.0.1:11434/api/generate",
      {
        model: "phi3",
        prompt: message,
        stream: false
      }
    );

    console.log(response.data);

    res.json({
      reply: response.data.response
    });

  } catch (err) {

    console.log("OLLAMA ERROR:");
    console.log(err.message);

    res.status(500).json({
      reply: "AI Error ❌"
    });
  }
});

module.exports = router;