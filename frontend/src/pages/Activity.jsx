import "../App.css";
import BottomNav from "../components/BottomNav";
import BackButton from "../components/BackButton";
import ChatButton from "../components/ChatButton";
import { useEffect, useState } from "react";
import axios from "axios";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";



const Activity = () => {

  const [data, setData] = useState([]);

  // ✅ dynamic phone (login ke baad save hona chahiye)
 const user = JSON.parse(localStorage.getItem("user"));

useEffect(() => {
  axios
    .get(`http://localhost:5000/api/booking/user/${user.name}`)
    .then((res) => setData(res.data))
    .catch((err) => console.log(err));
}, []);

  return (
    <div className="login-container">
      <div className="login-phone">

        <BackButton />

        {/* SCREEN */}
        <div className="login-screen home-scroll">

          {/* HEADER */}
          <div className="profile-header">
            <h2>My Activity</h2>
          </div>

          {/* NO DATA */}
          {data.length === 0 && (
            <p style={{ color: "white", textAlign: "center" }}>
              No bookings yet 😴
            </p>
          )}

          {/* BOOKINGS */}
          {data.map((b) => (
            <div className="service-card" key={b._id}>
              <p><FontAwesomeIcon icon={faCalendarDays} fade /> {b.date} - {b.time}</p>
              <p><FontAwesomeIcon icon={faLocationDot} bounce /> {b.address}</p>
              <p><FontAwesomeIcon icon={faCircleUser} bounce /> {b.customerName}</p>

              {/* 🔥 STATUS COLORS */}
              <p style={{
                color:
                  b.status === "pending" ? "orange" :
                  b.status === "confirmed" ? "green" :
                  "red"
              }}>
                Status: {b.status}
              </p>
            </div>
          ))}

        </div>

        <BottomNav active={2} />
        <ChatButton />

      </div>
    </div>
  );
};

export default Activity;