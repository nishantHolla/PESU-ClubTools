import { createContext, useContext, useState } from "react";
import "./status_style.css";
import Icon from "../../components/Icon/Icon";

const StatusContext = createContext(null);

export function StatusProvider({ children }) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("warning");
  const [projectStatus, setProjectStatus] = useState([]);

  const setStatus = (type, message, timeout) => {
    setType(type);
    setMessage(message);

    if (timeout) {
      clearTimeout(timeout);
      setTimeout(() => {
        setMessage("");
      }, timeout);
    }
  };

  return (
    <StatusContext.Provider value={{ setStatus }}>
      <div
        className="status-component"
        data-visible={message ? "1" : "0"}
        data-type={type || "none"}
        onClick={() => setMessage("")}
      >
        <Icon type={`eva:${type}`} />
        {message}
      </div>
      {children}
    </StatusContext.Provider>
  );
}

export function useStatus() {
  return useContext(StatusContext);
}
