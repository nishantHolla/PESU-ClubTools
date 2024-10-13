import Button from "../Button/Button";
import Password from "../Password/Password";
import { useState } from "react";

function DeleteModal({ success, failure, action, providerId }) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <div className="delete-modal">
      <h3 className="delete-heading">Delete Account</h3>
      <p>
        Deleting the account will delete all of your projects and saved
        templates. Please confirm your action since it can not be reversed.
      </p>
      {providerId === "password" && (
        <div className="delete-inputs">
          <Password
            className="delete-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      )}

      <div className="delete-actions">
        <Button
          className="delete-confirm button-danger"
          disabled={loading}
          onClick={() => {
            setLoading(true);
            action(password);
          }}
        >
          {loading ? "Loading" : "Confirm"}
        </Button>
        <Button
          className="delete-cancel"
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

export default DeleteModal;
