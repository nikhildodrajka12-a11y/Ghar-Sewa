import { useNavigate, useLocation } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ❌ Home pe hide
  if (location.pathname === "/home") return null;

  return (
    <div className="back-btn" onClick={() => navigate(-1)}>
      ←
    </div>
  );
};

export default BackButton;