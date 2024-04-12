import React, { useEffect } from "react";
import "./alert.css";
const Alert = ({ alertContent, closeAlert, color }) => {
  useEffect(() => {
    setTimeout(() => {
      closeAlert();
    }, 2500);
  });
  return (
    <div className="alert" style={{ color }}>
      <p>{alertContent}</p>
    </div>
  );
};

export default Alert;
