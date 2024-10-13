import "./userPanel_style.css";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../providers/session/Session";
import { useStatus } from "../../providers/status/Status";
import { useModal } from "../../providers/modal/Modal";
import DeleteModal from "./DeleteModal";
import ChangeModal from "./ChangeModal";
import Button from "../Button/Button";

function UserPanel() {
  const navigate = useNavigate();
  const { user, logout, deleteAccount, changePassword } = useSession();
  const { setStatus } = useStatus();
  const { setModal } = useModal();
  const providerId = user.providerData[0]?.providerId;

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

  const handleChangePassword = async () => {
    setStatus(null, null);

    const changeSuccess = () => {
      setModal(null);
      setStatus("success", "Password changed", 3000);
    };

    const changeFailure = (e) => {
      setModal(null);

      if (e && e.code === "auth/invalid-credential") {
        setStatus("error", "Incorrect password", 3000);
      } else {
        setStatus("warning", "Password was not changed", 3000);
      }
    };

    const action = (currentPassword, newPassword) => {
      changePassword(
        currentPassword,
        newPassword,
        changeSuccess,
        changeFailure,
      );
    };

    setModal(
      <ChangeModal
        success={changeSuccess}
        failure={changeFailure}
        action={action}
      />,
    );
  };

  const handleDeletAccount = async () => {
    setStatus(null, null);
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
        {providerId === "password" && (
          <Button
            className="userPanel-change-password"
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        )}
        <Button className="userPanel-logout" onClick={handleLogout}>
          Log out
        </Button>
        <Button
          className="userPanel-delete-account button-danger"
          onClick={handleDeletAccount}
        >
          Delete account
        </Button>
      </div>
    </div>
  );
}

export default UserPanel;
