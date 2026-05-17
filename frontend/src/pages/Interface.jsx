import "../App.css";  
import { useNavigate } from "react-router-dom";

const Interface = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="phone">
        <div className="screen">

          {/* Center Content */}
          <div className="center-content">

            <video
              className="video"
              src="/interface.mp4"
              autoPlay
              loop
              muted
            />

            <h2 className="title">Welcome to Fixora 🚀</h2>
            <p className="subtitle">Your trusted service partner</p>

          </div>

          {/* Bottom Button */}
          <div className="bottom">
            <button onClick={() => navigate("/login")}>
              Get Started
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Interface;