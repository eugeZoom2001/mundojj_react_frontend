import React from "react";
import "../components/ModalBorrar.css";
function ModalBorrar({ confirmAction, cancelModalBorrar, texto }) {
  return (
    <div className="modal">
      <p className="message">{texto}</p>
      <div className="options">
        <button className="btn" onClick={confirmAction}>
          Si
        </button>
        <button className="btn" autoFocus onClick={cancelModalBorrar}>
          No
        </button>
      </div>
    </div>
  );
}

export default ModalBorrar;
