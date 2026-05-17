import "../App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    mobile: "",
    countryCode: "+91",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");     // ✅ NEW
  const [type, setType] = useState("");   // success / error

  const navigate = useNavigate();

  const validate = () => {
    let err = {};

const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|[a-zA-Z0-9.-]+\.ac\.in)$/;
   if (!emailRegex.test(form.email)) {
  err.email = "Enter valid email address";
}

    const mobileRegex = /^[789][0-9]{9}$/;

if (!mobileRegex.test(form.mobile)) {
  err.mobile = "Enter the valid Mobile number ";
}

 const usernameRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/;
if (!usernameRegex.test(form.username)) {
  err.username =
    "Username must be at least 5 characters with 1 capital letter and 1 number";
}

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{7,}$/;
    if (!passwordRegex.test(form.password)) {
      err.password =
        "Password must be 7+ chars with 1 capital, 1 number & 1 special character";
    }




    if (form.password !== form.confirmPassword) {
      err.password = "Passwords do not match";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) {
      // 🎭 shake on validation error
      document.getElementById("signupBox").classList.add("shake");
      setTimeout(() => {
        document.getElementById("signupBox").classList.remove("shake");
      }, 500);
      return;
    }

    const res = await axios.post(
      "http://localhost:5000/api/partner-auth/signup",
      form
    );

   if (!res.data.success) {
setErrors({ username: res.data.message });
      // ❌ error UI
  setMsg(res.data.message);
      setType("error");

      document.getElementById("signupBox").classList.add("shake");
      setTimeout(() => {
        document.getElementById("signupBox").classList.remove("shake");
      }, 500);

    } else {
      // ✅ success UI
      setMsg("Signup Successful 🎉");
      setType("success");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

     

  return (
    <div className="login-container">
      <div className="login-phone">
        <div className="login-screen" id="signupBox">

          {/* 👻 Ghost */}
          <div className="ghost"></div>

          <h2>Signup</h2>

          <input
            placeholder="Username"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />
          <p className="error-text">{errors.username}</p>

          <input
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <p className="error-text">{errors.email}</p>

          <select
            onChange={(e) =>
              setForm({ ...form, countryCode: e.target.value })
            }
          >
            <option value="+91">India (+91)</option>
            <option value="+1">USA (+1)</option>
            <option value="+44">UK (+44)</option>
          </select>

          <input
            placeholder="Mobile Number"
            onChange={(e) =>
              setForm({ ...form, mobile: e.target.value })
            }
          />
          <p className="error-text">{errors.mobile}</p>

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword: e.target.value,
              })
            }
          />
          <p className="error-text">{errors.password}</p>

          <button onClick={handleSignup}>Signup</button>

          {/* ✅ UI MESSAGE */}
          {msg && <div className={`popup ${type}`}>{msg}</div>}

        </div>
      </div>
    </div>
  );
};

export default Signup;