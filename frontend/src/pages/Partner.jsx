import "../App.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import BottomNav from "../components/BottomNav";
import BackButton from "../components/BackButton";
import ChatButton from "../components/PartnerChatButton";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faClock, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCircleDollarToSlot, faChartSimple } from "@fortawesome/free-solid-svg-icons";




const socket = io("http://localhost:5000");

const Partner = () => {

  const [bookings, setBookings] = useState([]);

  // ✅ LOGIN DATA
  const partnerauth = JSON.parse(
    localStorage.getItem("partnerauth")
  );

  useEffect(() => {

    if (!partnerauth) return;

    // ✅ USERNAME GET
    const username =
      partnerauth.username ||
      partnerauth.name;

    // ✅ FETCH BOOKINGS
    axios
      .get(
        `http://localhost:5000/api/booking/partner/${username}`
      )
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // ✅ REALTIME BOOKING
    socket.on("new-booking", (data) => {

      if (data.partnerUsername === username) {

        setBookings((prev) => [data, ...prev]);

        new Audio("/notify.mp3").play();
      }
    });

    return () => {
      socket.off("new-booking");
    };

  }, []);

  return (
    <div className="login-container">

      <div className="login-phone">

        <BackButton />

        <div className="login-screen home-scroll">

          {/* HEADER */}
          <div className="profile-header">
            <h2>Partner Dashboard</h2>
          </div>

          {/* EMPTY */}
          {bookings.length === 0 && (
            <p style={{ color: "white", textAlign: "center" }}>
              No bookings yet 😴
            </p>
          )}

          {/* BOOKINGS */}
          {bookings.map((b) => (

            <div className="service-card" key={b._id}>

              <p><FontAwesomeIcon icon={faCircleUser} bounce /> Customer: {b.customerName}</p>

              <p><FontAwesomeIcon icon={faUser} beat /> Username: {b.username}</p>
              

              <p><FontAwesomeIcon icon={faCalendarDays} fade /> Date: {b.date}</p>

              <p><FontAwesomeIcon icon={faClock} shake /> Time: {b.time}</p>

              <p><FontAwesomeIcon icon={faLocationDot} bounce /> Address: {b.address}</p>

              <p><FontAwesomeIcon icon={faPhone} shake /> Phone: {b.phone}</p>

              <p><FontAwesomeIcon icon={faCircleDollarToSlot} flip/> Payment: {b.paymentMethod}</p>

              <p><FontAwesomeIcon icon={faChartSimple} beatFade/> Status: {b.status}</p>

              {/* ACCEPT */}
              {b.status === "pending" && (
                <button
                  onClick={async () => {

                    await axios.get(
                      `http://localhost:5000/api/booking/accept/${b._id}`
                    );

                    setBookings((prev) =>
                      prev.map((item) =>
                        item._id === b._id
                          ? { ...item, status: "confirmed" }
                          : item
                      )
                    );
                  }}
                >
                  Accept ✅
                </button>
              )}

              {/* ON THE WAY */}
              {b.status === "confirmed" && (
                <button
                  onClick={async () => {

                    await axios.get(
                      `http://localhost:5000/api/booking/start/${b._id}`
                    );

                    setBookings((prev) =>
                      prev.map((item) =>
                        item._id === b._id
                          ? { ...item, status: "onway" }
                          : item
                      )
                    );
                  }}
                >
                  On The Way 🚗
                </button>
              )}

              {/* COMPLETE */}
              {b.status === "onway" && (
                <button
                  onClick={async () => {

                    await axios.get(
                      `http://localhost:5000/api/booking/complete/${b._id}`
                    );

                    setBookings((prev) =>
                      prev.map((item) =>
                        item._id === b._id
                          ? { ...item, status: "completed" }
                          : item
                      )
                    );
                  }}
                >
                  Complete 🎉
                </button>
              )}

            </div>
          ))}

        </div>

        <BottomNav active={2} />

        <ChatButton />

      </div>
    </div>
  );
};

export default Partner;