import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaMoneyBillWave,
  FaHome,
  FaChartBar,
  FaCog
} from "react-icons/fa";

const AdminAnalysis = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState(0);
  const [partners, setPartners] = useState(0);
  const [bookings, setBookings] = useState(0);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      // USERS
      const userRes = await axios.get(
        "http://localhost:5000/api/user/all"
      );

      // PARTNERS
      const partnerRes = await axios.get(
        "http://localhost:5000/api/partner/all"
      );

      // BOOKINGS
      const bookingRes = await axios.get(
        "http://localhost:5000/api/booking/all"
      );

      setUsers(userRes.data.length);

      setPartners(partnerRes.data.length);

      setBookings(bookingRes.data.length);

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <div className="login-container">

      <div className="login-phone">

        <div className="login-screen home-scroll">

          {/* HEADER */}
          <div className="profile-header">

            <h2>
              Admin Analytics
            </h2>

          </div>

          {/* ANALYTICS CARDS */}
          <div className="admin-analysis-grid">

            {/* USERS */}
            <div className="admin-analysis-card">

              <div className="analysis-icon blue-bg">
                <FaUsers />
              </div>

              <h1>{users}</h1>

              <p>Total Users</p>

            </div>

            {/* PARTNERS */}
            <div className="admin-analysis-card">

              <div className="analysis-icon pink-bg">
                <FaUserTie />
              </div>

              <h1>{partners}</h1>

              <p>Total Partners</p>

            </div>

            {/* BOOKINGS */}
            <div className="admin-analysis-card">

              <div className="analysis-icon green-bg">
                <FaClipboardList />
              </div>

              <h1>{bookings}</h1>

              <p>Total Bookings</p>

            </div>

            {/* REVENUE */}
            <div className="admin-analysis-card">

              <div className="analysis-icon yellow-bg">
                <FaMoneyBillWave />
              </div>

              <h1>₹45K</h1>

              <p>Total Revenue</p>

            </div>

          </div>

          {/* GRAPH */}
          <div className="admin-chart-card">

            <div className="chart-header">

              <h3>
                Booking Analytics
              </h3>

            </div>

            <img
              src="https://quickchart.io/chart?c={type:'bar',data:{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],datasets:[{label:'Bookings',data:[12,19,9,15,22,30,18],backgroundColor:'rgba(255,255,255,0.7)'}]}}"
              alt="chart"
              className="admin-chart-img"
            />

          </div>

          {/* RECENT REPORT */}
          <div className="profile-card">

            <h2 className="section-title">
              Weekly Report
            </h2>

            <p>
              ✅ 120+ successful bookings
            </p>

            <p>
              ✅ 45 active partners
            </p>

            <p>
              ✅ ₹45,000 revenue generated
            </p>

            <p>
              ✅ 92% customer satisfaction
            </p>

          </div>

        </div>

        {/* BOTTOM NAV */}
        <div className="bottom-bar">

          {/* HOME */}
          <div
            className="nav-item"
            onClick={() => navigate("/admin-home")}
          >

            <FaHome />

          </div>

          {/* ANALYTICS */}
          <div className="nav-item active">

            <FaChartBar />

          </div>

          {/* PARTNERS */}
          <div
            className="nav-item"
            onClick={() => navigate("/admin/dashboard")}
          >

            <FaClipboardList />

          </div>

          {/* SETTINGS */}
          <div
            className="nav-item"
            onClick={() => navigate("/settings")}
          >

            <FaCog />

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminAnalysis;