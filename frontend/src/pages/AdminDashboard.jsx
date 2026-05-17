import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatButton from "../components/ChatButton";
import BackButton from "../components/BackButton";

import {
  FaHome,
  FaChartBar,
  FaClipboardList,
  FaCog
} from "react-icons/fa";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleUser,
  faEnvelope,
  faScrewdriverWrench,
  faBuilding,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {

  const [partners, setPartners] = useState([]);

  const navigate = useNavigate();

  // ✅ GET ALL PARTNERS
  const getPartners = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/partner/all"
      );

      setPartners(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {

    getPartners();

  }, []);

  return (

    <div className="login-container">

      <div className="login-phone">

        <div className="login-screen home-scroll">

          {/* HEADER */}
          <div className="profile-header">
            <BackButton />

            <h2>
              Admin Dashboard
            </h2>

          </div>

          {/* EMPTY */}
          {partners.length === 0 ? (

            <h3
              style={{
                textAlign: "center",
                marginTop: "40px",
                color: "white"
              }}
            >
              No Partners Found 😴
            </h3>

          ) : (

            partners.map((partner) => (

              <div
                key={partner._id}
                className="admin-partner-card"
                onClick={() =>
                  navigate(
                    `/admin/partner/${partner._id}`
                  )
                }
              >

                {/* TOP */}
                <div className="admin-card-top">

                  <h3>
                    <FontAwesomeIcon
                      icon={faBuilding}
                      bounce
                    />
                    {" "}
                    {partner.businessName}
                  </h3>

                  <FontAwesomeIcon
                    icon={faArrowRight}
                    fade
                    className="admin-arrow"
                  />

                </div>

                {/* DETAILS */}
                <p>
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    bounce
                  />
                  {" "}
                  {partner.fullName}
                </p>

                <p>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    fade
                  />
                  {" "}
                  {partner.email}
                </p>

                <p>
                  <FontAwesomeIcon
                    icon={faScrewdriverWrench}
                    beat
                  />
                  {" "}
                  {partner.category}
                </p>

              </div>
              
            ))


            
          )}

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
  <div
    className="nav-item"
    onClick={() => navigate("/adminanalysis")}
  >

    <FaChartBar />

  </div>

  {/* PARTNERS */}
  <div
    className="nav-item active"
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
 <ChatButton />
      </div>

    </div>
  );
};

export default AdminDashboard;