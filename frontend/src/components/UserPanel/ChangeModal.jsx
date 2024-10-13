import Button from "../Button/Button";
import { MIN_PASSWORD_LENGTH } from "../../lib/constants";
import Password from "../Password/Password";
import { useEffect, useState } from "react";
import { useStatus } from "../../providers/status/Status";

function ChangeModal({ success, failure, action }) {
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [validity, setValidity] = useState(0);
  const { setStatus } = useStatus();

  useEffect(() => {
    if (currentPassword.length < MIN_PASSWORD_LENGTH) {
      setStatus(
        "error",
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
      );
      setValidity(1);
    } else if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setStatus(
        "error",
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
      );
      setValidity(2);
    } else if (newPasswordConfirm.length < MIN_PASSWORD_LENGTH) {
      setStatus(
        "error",
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
      );
      setValidity(3);
    } else if (newPassword !== newPasswordConfirm) {
      setStatus("error", `Passwords do not match`);
      setValidity(3);
    } else {
      setStatus(null, null);
      setValidity(4);
    }
  }, [currentPassword, newPassword, newPasswordConfirm]);

  return (
    <div className="change-modal">
      <h3 className="change-heading">Change Password</h3>
      <p>
        Enter your current password and the new password that you want to set.
      </p>
      <div className="change-inputs">
        <Password
          className={`change-password-current ${validity === 1 && "change-error"}`}
          placeholder="Enter your current password"
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value);
          }}
        />
        <Password
          className={`change-password-new ${validity === 2 && "change-error"}`}
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <Password
          className={`change-password-new-confirm ${validity === 3 && "change-error"}`}
          placeholder="Confirm your new password"
          value={newPasswordConfirm}
          icon="eva:check"
          onChange={(e) => {
            setNewPasswordConfirm(e.target.value);
          }}
        />
      </div>
      <div className="change-actions">
        <Button
          className="change-confirm"
          disabled={loading || validity !== 4}
          onClick={() => {
            if (validity !== 4) return;
            setLoading(true);
            action(currentPassword, newPassword);
          }}
        >
          {loading ? "Loading" : "Confirm"}
        </Button>
        <Button
          className="change-cancel"
          onClick={() => {
            failure();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default ChangeModal;
