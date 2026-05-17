import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";



const BottomNav = ({ active }) => {
  const navigate = useNavigate();

  return (
    <div className="bottom-bar show">

      <div
        className={`nav-item ${active === 0 ? "active" : ""}`}
        onClick={() => navigate("/home")}
      >

          <FontAwesomeIcon icon={faHouse} flip />

      </div>

      <div
        className={`nav-item ${active === 1 ? "active" : ""}`}
        onClick={() => navigate("/services")}
      >
        <FontAwesomeIcon icon={faDisplay} flip />
      </div>

      <div
        className={`nav-item ${active === 2 ? "active" : ""}`}
        onClick={() => navigate("/activity")}
      >
        <FontAwesomeIcon icon={faStore} fade />
      </div>

      <div
        className={`nav-item ${active === 3 ? "active" : ""}`}
        onClick={() => navigate("/profile")}
      >
        <FontAwesomeIcon icon={faCircleUser} bounce />
      </div>

      <div
        className="nav-indicator"
        style={{ left: `${active * 25}%` }}
      ></div>

    </div>
  );
};

export default BottomNav;