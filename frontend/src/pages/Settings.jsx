import "../App.css";
import BottomNav from "../components/BottomNav";
import BackButton from "../components/BackButton";
import ChatButton from "../components/ChatButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBell,
  faLock,
  faMoon,
  faGlobe,
  faCircleQuestion,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

const Settings = () => {

  return (

    <div className="login-container">

      <div className="login-phone">

        <BackButton />

        <div className="login-screen home-scroll">

          {/* 🔝 HEADER */}
          <div className="profile-header">

            <h2>
              Settings
            </h2>

          </div>

          {/* ⚙️ SETTINGS OPTIONS */}
          <div className="profile-options">

            <div className="settings-card">

              <FontAwesomeIcon
                icon={faBell}
                shake
                className="settings-icon"
              />

              <p>
                Notifications
              </p>

            </div>

            <div className="settings-card">

              <FontAwesomeIcon
                icon={faLock}
                beat
                className="settings-icon"
              />

              <p>
                Privacy & Security
              </p>

            </div>

            <div className="settings-card">

              <FontAwesomeIcon
                icon={faMoon}
                fade
                className="settings-icon"
              />

              <p>
                Dark Mode
              </p>

            </div>

            <div className="settings-card">

              <FontAwesomeIcon
                icon={faGlobe}
                spin
                className="settings-icon"
              />

              <p>
                Language
              </p>

            </div>

            <div className="settings-card">

              <FontAwesomeIcon
                icon={faCircleQuestion}
                bounce
                className="settings-icon"
              />

              <p>
                Help & Support
              </p>

            </div>

            <div className="settings-card logout-card">

              <FontAwesomeIcon
                icon={faRightFromBracket}
                beatFade
                className="settings-icon logout-icon"
              />

              <p>
                Logout
              </p>

            </div>

          </div>

        </div>

        <BottomNav active={3} />

        <ChatButton />

      </div>

    </div>
  );
};

export default Settings;