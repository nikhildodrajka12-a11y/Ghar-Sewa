import "../App.css";
import { useState } from "react";
import BackButton from "../components/BackButton";

const Chat = () => {

  const user =
    JSON.parse(localStorage.getItem("partnerauth")) ;

  const username = user?.name || user?.username || "Guest";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // ✅ OLLAMA MESSAGE FUNCTION
  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = {
      text: input,
      user: true
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;

    setInput("");

    try {

      const res = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: currentInput
          })
        }
      );

      const data = await res.json();

      const botMessage = {
        text: data.reply,
        user: false
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (err) {

      setMessages((prev) => [
        ...prev,
        {
          text: "AI Server Error ❌",
          user: false
        }
      ]);
    }
  };

  return (

    <div className="login-container">

      <div className="login-phone">

        <div className="login-screen home-scroll chat-main">

          {/* HEADER */}
          <div className="chat-header">

            <BackButton />

            <h2>Fixora AI</h2>

            <div className="profile-circle">
              {username.charAt(0).toUpperCase()}
            </div>

          </div>

          {/* EMPTY SCREEN */}
          {messages.length === 0 && (

            <div className="welcome-box">

              <p className="small-hi">
                Hi {username}
              </p>

              <h1>
                Where should we start?
              </h1>

              <div className="quick-actions">

                <button>🖼️ Create image</button>

                <button>⚡ Explore Services</button>

                <button>🎵 Create music</button>

                <button>📝 Write anything</button>

              </div>

            </div>
          )}

          {/* CHAT AREA */}
          <div className="messages-area">

            {messages.map((m, i) => (

              <div
                key={i}
                className={`message ${
                  m.user ? "user-msg" : "bot-msg"
                }`}
              >
                {m.text}
              </div>

            ))}

          </div>

          {/* INPUT */}
          <div className="bottom-input">

            <button className="plus-btn">
              ＋
            </button>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Fixora"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              className="send-btn"
              onClick={sendMessage}
            >
              ➤
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Chat;