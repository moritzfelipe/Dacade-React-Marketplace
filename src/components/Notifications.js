import React from "react";

function LoadingNotification({ message }) {
  return (
    <div className="alert alert-warning sticky-top mt-2" role="alert">
      <span id="notification">⌛ {message}</span>
    </div>
  );
}

function ErrorNotification({ message }) {
  return (
    <div className="alert alert-danger sticky-top mt-2" role="alert">
      <span id="notification">⌛ {message}</span>
    </div>
  );
}

function SuccessNotification({ message }) {
  return (
    <div className="alert alert-success sticky-top mt-2" role="alert">
      <span id="notification">⌛ {message}</span>
    </div>
  );
}

export { LoadingNotification, ErrorNotification, SuccessNotification };
