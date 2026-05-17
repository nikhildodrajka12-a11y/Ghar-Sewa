import "../App.css";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useState } from "react";
import ChatButton from "../components/ChatButton";


const user = JSON.parse(localStorage.getItem("partnerauth"));

const PartnerRegister = () => {
  const user = JSON.parse(
    localStorage.getItem("partnerauth")
  );
  const [form, setForm] = useState({
     username: user?.name || "",
    businessName: "",
    fullName: "",
    phone: "",
 email: user?.email || "",
     address: "",
    category: "",
    services: [],
    description: "",
    hours: "",
    radius: "",
    pricing: "",
    experience: "",
    license: "",
    password: "",
    payout: "",
    bank: ""
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (service) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  // ✅ VALIDATION FUNCTION (FIXED POSITION)
  const validate = () => {
    let newErrors = {};

    if (!form.businessName) newErrors.businessName = "Required";
    if (!form.fullName) newErrors.fullName = "Required";

    if (!form.phone || !/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Enter valid 10 digit number";
    }

    if (!form.email || !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(form.email)) {
      newErrors.email = "Enter valid Gmail";
    }

    if (!form.address) newErrors.address = "Required";
    if (!form.category) newErrors.category = "Required";
    if (form.services.length === 0) newErrors.services = "Select at least one";
    if (!form.password) newErrors.password = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ SUBMIT

const shake = () => {
  const box = document.getElementById("partnerBox");

  if (!box) return;

  box.classList.remove("shake");  // remove first
  void box.offsetWidth;           // 🔥 force reflow
  box.classList.add("shake");     // add again

  setTimeout(() => {
    box.classList.remove("shake");
  }, 500);
};


const handleSubmit = async () => {
  if (!validate()) {
    setMsg("some thing is missing ❌");
    setType("error");
    shake();
    return;
  }

      category: form.category.toLowerCase()

  try {
    const res = await axios.post("http://localhost:5000/api/partner/register", form);

    if (!res.data.success) {

      // ❌ error case
      setMsg(res.data.message);
      setType("error");

      // 🎭 shake effect
      shake();

    } else {

      // ✅ success case
      setMsg("Registration Successful 🚀");
      setType("success");

      console.log(res.data);

    }

  } catch (err) {
    console.log(err);

    setMsg("Server error ❌");
    setType("error");

    shake();
  }
};

  return (
    <div className="login-container">
      <div className="login-phone">

        <BackButton />

        {/* 🔥 IMPORTANT ID */}
        <div className="login-screen home-scroll" id="partnerBox"           >

          <div className="profile-header">
            <h2>Become a Partner</h2>
          </div>

          {/* 🔹 SECTION 1 */}
          <div className="profile-card">
            <h3>Basic Info</h3>
             <input
  name="username"
  value={form.username}
  readOnly
  disabled
/>
            <input
              name="businessName"
              placeholder="Business Name"
              onChange={handleChange}
              className={errors.businessName && "error-input"}
            />
            {errors.businessName && <p className="error-text">{errors.businessName}</p>}

            <input
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              className={errors.fullName && "error-input"}
            />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}

            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              maxLength="10"
              className={errors.phone && "error-input"}
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}

          <input
  name="email"
  value={form.email}
  readOnly
  disabled
  className={errors.email && "error-input"}
/>
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className={errors.address && "error-input"}
            />
            {errors.address && <p className="error-text">{errors.address}</p>}

            <select
              name="category"
              onChange={handleChange}
              className={errors.category && "error-input"}
            >
              <option value="">Service Category</option>
              <option>Plumber</option>
              <option>Cleaning</option>
              <option>Electrician</option>
              <option>Repair</option>
            </select>
            {errors.category && <p className="error-text">{errors.category}</p>}
          </div>

          {/* 🔹 SECTION 2 */}
          <div className="profile-card">
            <h3>Services</h3>

            <div className="checkbox-group">
              {["Installation", "Repair", "Consultation"].map((item) => (
                <label key={item} className="checkbox-item">
                  <input type="checkbox" onChange={() => handleCheckbox(item)} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
            {errors.services && <p className="error-text">{errors.services}</p>}

            <input name="description" placeholder="Service Description" onChange={handleChange} />
            <input name="hours" placeholder="Working Hours" onChange={handleChange} />
            <input name="radius" placeholder="Service Radius (km)" onChange={handleChange} />

            <select name="pricing" onChange={handleChange}>
              <option>Pricing Model</option>
              <option>Fixed</option>
              <option>Hourly</option>
              <option>Quote</option>
            </select>

            <input name="experience" placeholder="Years of Experience" onChange={handleChange} />
          </div>

          {/* 🔹 SECTION 3 */}
          <div className="profile-card">
            <h3>Verification</h3>

            <select name="licenseType" onChange={handleChange}>
              <option>Select ID Type</option>
              <option>License</option>
              <option>Aadhar</option>
              <option>Passport</option>
            </select>

            <input name="license" placeholder="Enter ID Number" onChange={handleChange} />

            <input type="file" accept=".pdf" />

            <label>
              <input type="checkbox" /> I agree for background check
            </label>
          </div>

          {/* 🔹 SECTION 4 */}
          <div className="profile-card">
            <h3>Account Setup</h3>

            <input
              name="password"
              type="password"
              placeholder="Set Password"
              onChange={handleChange}
              className={errors.password && "error-input"}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}

            <select name="payout" onChange={handleChange}>
              <option>Payout Method</option>
              <option>UPI</option>
              <option>Bank</option>
              <option>Wallet</option>
            </select>

            <input name="accountNumber" placeholder="Account Number" onChange={handleChange} />
            <input name="upi" placeholder="UPI ID" onChange={handleChange} />

            <label>Upload UPI QR (.jpg)</label>
            <input type="file" accept=".jpg,.jpeg,.png" />

            <button onClick={handleSubmit}>
              Submit Application 🚀
            </button>

            {msg && <div className={`popup ${type}`}>{msg}</div>}
          </div>

        </div>
        <ChatButton />

      </div>
    </div>
  );
};

export default PartnerRegister;