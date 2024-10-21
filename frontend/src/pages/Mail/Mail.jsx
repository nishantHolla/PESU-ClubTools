import "./mail_style.css";
import { useSession } from "../../providers/session/Session";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Textarea/Textarea";
import Sidebar from "../../components/Sidebar/Sidebar";

function Mail() {
  const { user } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (location.pathname === "/u") {
      navigate(`/u/${user.uid}/projects`);
    }

    if (location.pathname === `/u/${user.uid}`) {
      navigate(`/u/${user.uid}/projects`);
    }
  }, []);

  return (
    <div className="mail-container">
      <div className="mail-container-left">
        <Input placeholder="Subject:" />
        <Textarea placeholder="Body:" />
      </div>
      <div className="mail-container-right">
        <Sidebar />
      </div>
    </div>
  );
}

export default Mail;
