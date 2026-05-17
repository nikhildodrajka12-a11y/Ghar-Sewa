import "../App.css";  
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/partner-auth/login", {
        username: username.trim(),
        password,
      });

      if (!res.data.success) {

        // ❌ removed alert
        // alert(res.data.message);

        // ✅ SAME LOGIC (just UI instead of alert)
        setMsg(res.data.message);
        setType("error");

        // 🎭 shake effect
        document.getElementById("loginBox").classList.add("shake");
        setTimeout(() => {
          document.getElementById("loginBox").classList.remove("shake");
        }, 500);

      } else {

        // ❌ removed alert
        // alert("Login Successful");

        // ✅ SAME LOGIC
        setMsg("Login Successful 🎉");
        setType("success");
 // ✅ SAVE USER
  localStorage.setItem("partnerauth", JSON.stringify(res.data.user));

  // ✅ IMPORTANT (booking history ke liye)
localStorage.setItem("partnerauth", JSON.stringify(res.data.user));
        setTimeout(() => {
          navigate("/partnerhome");
        }, 2000);
      }

    } catch (error) {
      console.log(error);

      // ❌ removed alert
      // alert("Server error");

      setMsg("Server error");
      setType("error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-phone">
        <div className="login-screen" id="loginBox">

          {/* 👻 Ghost */}
          <div className="ghost"></div>

          <h2>Login</h2>

          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>

          {/* ✅ UI MESSAGE */}
          {msg && <div className={`popup ${type}`}>{msg}</div>}

          <p>
            New user? <Link to="/partnersignup">Signup here</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;