import "./mail_style.css";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Textarea/Textarea";
import MailSidebar from "./MailSidebar";

function Mail() {

  return (
    <div className="mail-container">
      <div className="mail-container-left">
        <Input placeholder="Subject:" />
        <Textarea placeholder="Body:" />
      </div>
      <div className="mail-container-right">
        <MailSidebar />
      </div>
    </div>
  );
}

export default Mail;
