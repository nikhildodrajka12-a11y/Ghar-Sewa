import "../App.css";
import BottomNav from "../components/PartnerBottomNav";
import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
import ChatButton from "../components/PartnerChatButton";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPhone,
  faCreditCard,
  faLocationDot,
  faGear,
  faRightFromBracket,
  faCircleUser,
  faEnvelope,
  faHandshake
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {

  const [partnerauth, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const storedUser = JSON.parse(
      localStorage.getItem("partnerauth")
    );

    setUser(storedUser);

  }, []);

  return (

    <div className="login-container">

      <div className="login-phone">

        <BackButton />

        <div className="login-screen home-scroll">

          {/* HEADER */}
          <div className="profile-header">

            <h2>
              My Profile
            </h2>

          </div>

          {/* PROFILE CARD */}
          <div className="profile-card modern-profile-card">

            <img
              src="https://i.pravatar.cc/100"
              alt="partnerauth"
              className="profile-img"
            />

            <h3>

              <FontAwesomeIcon
                icon={faCircleUser}
                bounce
              />

              {" "}
              {partnerauth?.name || "Guest"}

            </h3>

            <p>

              <FontAwesomeIcon
                icon={faEnvelope}
                fade
              />

              {" "}
              {partnerauth?.email || "No Email"}

            </p>

          </div>

          {/* OPTIONS */}
          <div className="profile-options">

            <div className="profile-modern-item">

              <FontAwesomeIcon
                icon={faPhone}
                shake
                className="profile-modern-icon"
              />

              <p>
                My Bookings
              </p>

            </div>

            <div
              className="profile-modern-item"
              onClick={() =>
                navigate("/partner-register")
              }
            >

              <FontAwesomeIcon
                icon={faHandshake}
                beat
                className="profile-modern-icon"
              />

              <p>
                Connect with Fixora
              </p>

            </div>

            <div className="profile-modern-item">

              <FontAwesomeIcon
                icon={faCreditCard}
                flip
                className="profile-modern-icon"
              />

              <p>
                Payments
              </p>

            </div>

            <div className="profile-modern-item">

              <FontAwesomeIcon
                icon={faLocationDot}
                bounce
                className="profile-modern-icon"
              />

              <p>
                Saved Address
              </p>

            </div>

            <div
              className="profile-modern-item"
              onClick={() =>
                navigate("/settings")
              }
            >

              <FontAwesomeIcon
                icon={faGear}
                spin
                className="profile-modern-icon"
              />

              <p>
                Settings
              </p>

            </div>

            {/* LOGOUT */}
            <div
              className="profile-modern-item logout-modern"
              onClick={() => {

                localStorage.removeItem(
                  "partnerauth"
                );

                window.location.href =
                  "/login";
              }}
            >

              <FontAwesomeIcon
                icon={faRightFromBracket}
                beatFade
                className="logout-modern-icon"
              />

              <p>
                Logout
              </p>

            </div>

          </div>

        </div>

        {/* NAVBAR */}
        <BottomNav active={3} />

        <ChatButton />

      </div>

    </div>
  );
};

export default Profile;