import "./userPanel_style.css";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../providers/session/Session";
import { useStatus } from "../../providers/status/Status";
import { useModal } from "../../providers/modal/Modal";
import DeleteModal from "./DeleteModal";
import Button from "../Button/Button";

function UserPanel() {
  const navigate = useNavigate();
  const { user, logout, deleteAccount } = useSession();
  const { setStatus } = useStatus();
  const { setModal } = useModal();

  const handleLogout = async () => {
    const logoutSuccess = () => {
      navigate("/");
    };

    const logoutFail = (error) => {
      console.log(error);
      setStatus("error", "Something went wrong. Check console.");
    };

    logout(logoutSuccess, logoutFail);
  };

  const handleDeletAccount = async () => {
    setStatus(null, null);
    const providerId = user.providerData[0]?.providerId;
    const deleteSuccess = () => {
      setModal(null);
      navigate("/");
    };

    const deleteFailure = (e) => {
      if (e && e.code === "auth/invalid-credential") {
        setStatus("error", "Incorrect password");
      }
      setModal(null);
    };

    const action = (password) => {
      if (providerId === "google.com") {
        deleteAccount(null, deleteSuccess, deleteFailure);
      } else if (providerId === "password") {
        deleteAccount(password, deleteSuccess, deleteFailure);
      }
    };

    setModal(
      <DeleteModal
        success={deleteSuccess}
        failure={deleteFailure}
        action={action}
        providerId={providerId}
      />,
    );
  };

  return (
    <div className="userPanel-component">
      <h3>{user.displayName}</h3>
      <div className="userPanel-actions">
        <Button className="userPanel-logout" onClick={handleLogout}>
          Log out
        </Button>
        <Button
          className="userPanel-delete-account"
          onClick={handleDeletAccount}
        >
          Delete account
        </Button>
      </div>
    </div>
  );
}

export default UserPanel;
