import React, { useState } from "react";
import Loader from "./Loader/Loader";
import CardList from "./Loader/Cards/CardList";
import Toast from '../components/Loader/Toast';


const FormGroup = ({ isValidDataSaved, email, isEmailLoading, password, fillCredentials }) => {

  const [showInbox, setShowInbox] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('successful!');

  return (
    <>
      <div
        className="form-container"
        style={{
          marginTop: "10%",
        }}
      >
        {isEmailLoading ? (
          <Loader />
        ) : (
          <div>
            {showToast && <Toast message={toastMessage}/>}
            <div className="form-group">
              <div className="input-with-button">
                <input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  value={email}
                  disabled
                />
                <button
                  className="copy-button"
                  onClick={() => {
                    navigator.clipboard.writeText(email).then(() => {
                      setToastMessage("Email successfully copied!");
                      setShowToast(true);
                      setTimeout(() => {setShowToast(false);}, 1000)
                    });
                  }}
                >
                  📋
                </button>
              </div>
            </div>
            <div className="form-group">
              <div className="input-with-button">
                <input
                  type="text"
                  id="password"
                  placeholder="Your password"
                  value={password}
                  disabled
                />
                <button
                  className="copy-button"
                  onClick={() => {
                    navigator.clipboard.writeText(password).then(() => {
                      setToastMessage("Successfully copied!");
                      setShowToast(true);
                      setTimeout(() => {setShowToast(false);}, 1000)
                    });
                  }}
                >
                  📋
                </button>
              </div>
            </div>
            <button
              class="btn"
              style={{
                height: "6vh",
                width: "53%",
                fontSize: "14px",
              }}
              onClick={() => {
                setShowInbox(true);
                fillCredentials();
              }}
            >
              Populate Credentials
            </button>
          </div>
        )}
      </div>

      {(showInbox || isValidDataSaved) && (
        <div
          className="form-container"
          style={{
            marginTop: "10%",
          }}
        >
          <h2 className="inbox-header" style={{ marginTop: "5px" }}>
            Inbox
          </h2>
          <CardList email={email} password={password} />
        </div>
      )}
    </>
  );
};

export default FormGroup;
