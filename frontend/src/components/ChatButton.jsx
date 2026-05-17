import { useNavigate } from "react-router-dom";

const ChatButton = () => {
  const navigate = useNavigate();

  return (
    <div className="chat-float" onClick={() => navigate("/chat")}>
      💬
    </div>
  );
};

export default ChatButton;