import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatButton from "../components/ChatButton";


import {
  FaUsers,
  FaUserTie,
  FaUserFriends,
  FaCog,
  FaClipboardList,
  FaChartBar,
  FaHome
} from "react-icons/fa";

const AdminHome = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState(1250);
  const [clients, setClients] = useState(980);
  const [partners, setPartners] = useState(270);

  useEffect(() => {

    fetchCounts();

  }, []);

  const fetchCounts = async () => {

    try {

      const userRes = await axios.get(
        "http://localhost:5000/api/user/all"
      );

      const partnerRes = await axios.get(
        "http://localhost:5000/api/partner/all"
      );

      setUsers(userRes.data.length || 1250);

      setClients(userRes.data.length || 980);

      setPartners(partnerRes.data.length || 270);

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
              Admin Dashboard
            </h2>

          </div>

          {/* STATS */}
          <div className="admin-stats-grid">

            <div className="service-card admin-stat-card">

              <div className="admin-card-top">

                <FaUsers className="admin-stat-icon" />

                <span className="admin-badge">
                  +12%
                </span>

              </div>

              <h1>{users}</h1>

              <p>Total Users</p>

            </div>

            <div className="service-card admin-stat-card">

              <div className="admin-card-top">

                <FaUserFriends className="admin-stat-icon blue-icon" />

                <span className="admin-badge blue-badge">
                  +8%
                </span>

              </div>

              <h1>{clients}</h1>

              <p>Total Clients</p>

            </div>

            <div className="service-card admin-stat-card">

              <div className="admin-card-top">

                <FaUserTie className="admin-stat-icon pink-icon" />

                <span className="admin-badge pink-badge">
                  +5%
                </span>

              </div>

              <h1>{partners}</h1>

              <p>Total Partners</p>

            </div>

            <div className="service-card admin-stat-card">

              <div className="admin-card-top">

                <div className="admin-rupee">
                  ₹
                </div>

                <span className="admin-badge green-badge">
                  +20%
                </span>

              </div>

              <h1>₹25K</h1>

              <p>Total Revenue</p>

            </div>

          </div>

          {/* GRAPH */}
          <div className="service-card admin-chart-card">

            <div className="chart-header">

              <h3>
                Revenue Analytics
              </h3>

            </div>

            <img
              src="https://quickchart.io/chart?c={type:'line',data:{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],datasets:[{label:'Revenue',data:[12,19,9,25,18,30,28],borderColor:'rgb(255,255,255)',fill:false}]}}"
              alt="chart"
              className="admin-chart-img"
            />

          </div>

          {/* RECENT ACTIVITY */}
          <div className="service-card">

            <h3 className="recent-title">
              Recent Activity
            </h3>

            <div className="recent-item">
              ✅ New Partner Joined
            </div>

            <div className="recent-item">
              📦 12 New Orders Today
            </div>

            <div className="recent-item">
              💰 Revenue Increased by 20%
            </div>

            <div className="recent-item">
              ⭐ 45 New Customers Added
            </div>

          </div>

        </div>

        {/* BOTTOM NAV */}
        <div className="bottom-bar">

          <div className="nav-item active">

            <FaHome />

          </div>

          <div
            className="nav-item"
            onClick={() => navigate("/adminanalysis")}
          >

            <FaChartBar />

          </div>

          <div
            className="nav-item"
            onClick={() => navigate("/admin/dashboard")}
          >

            <FaClipboardList />

          </div>

          <div
            className="nav-item"
            onClick={() => navigate("/settings")}
          >

            <FaCog />

          </div>

        </div>
 <ChatButton />

      </div>

    </div>
  );
};

export default AdminHome;