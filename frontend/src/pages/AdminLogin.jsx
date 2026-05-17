import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    // ✅ ADMIN CHECK
    if (
      username === "Admin@127" &&
      password === "Admin@127#"
    ) {

      setMsg("Admin Login Successful 🎉");
      setType("success");

      localStorage.setItem(
        "admin",
        JSON.stringify({
          username: "Admin@127"
        })
      );

      setTimeout(() => {
        navigate("/admin-home");
      }, 2000);

    } else {

      setMsg("Invalid Admin Credentials ❌");
      setType("error");

      // 🎭 SHAKE EFFECT
      document
        .getElementById("loginBox")
        .classList.add("shake");

      setTimeout(() => {

        document
          .getElementById("loginBox")
          .classList.remove("shake");

      }, 500);
    }
  };

  return (

    <div className="login-container">

      <div className="login-phone">

        <div
          className="login-screen"
          id="loginBox"
        >

          {/* 👻 GHOST */}
          <div className="ghost"></div>

          <h2>Admin Login</h2>

          <input
            placeholder="Admin Username"
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            placeholder="Admin Password"
            type="password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button onClick={handleLogin}>
            Login
          </button>

          {/* ✅ MESSAGE */}
          {msg && (
            <div className={`popup ${type}`}>
              {msg}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;