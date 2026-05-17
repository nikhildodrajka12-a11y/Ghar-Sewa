import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Repair = () => {
  const [data, setData] = useState([]);
  const location = useLocation();

  const category = location.pathname.replace("/", "").toLowerCase();

  const fetchPartners = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/partner/by-category/${category}`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, [category]);

  return (
    <div className="login-container">
      <div className="login-phone">

        <div className="login-screen home-scroll">

          {/* HEADER */}
          <div className="uber-header">
            <h2>{category.toUpperCase()}</h2>
          </div>

          {/* TITLE */}
          <div className="section-title big-title">
            Available Services
          </div>

          {/* NO DATA */}
          {data.length === 0 && (
            <p style={{ color: "white", textAlign: "center" }}>
              No partners available 😴
            </p>
          )}

          {/* DATA */}
          {data.map((p, i) => (
            <div key={i} className="service-card">
              <h3>{p.businessName}</h3>
              <p>👤 {p.fullName}</p>
              <p>📞 {p.phone}</p>
              <p>📍 {p.address}</p>
              <p>⭐ {p.experience} years experience</p>

              <button className="book-btn">Book Now</button>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Repair;