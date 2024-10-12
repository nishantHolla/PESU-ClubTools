import "./modal_style.css";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  return (
    <ModalContext.Provider value={{ setModal }}>
      {modal && (
        <div className="modal-component">
          <div className="modal-box">{modal}</div>
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
