import React, { useState } from "react";
import Loader from "./Loader/Loader";
import CardList from "./Loader/Cards/CardList";
import Toast from "../components/Loader/Toast";

const FormGroup = ({
  isValidDataSaved,
  email,
  isEmailLoading,
  password,
  fillCredentials,
  setAnimate,
  setToastMessage,
  bgColourRef
}) => {
  const [showInbox, setShowInbox] = useState(false);
  const [isRefetchClicked, setIsRefetchClicked] = useState(false);

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
                    navigator.clipboard.writeText(email).then(async() => {
                      setToastMessage("Email ID successfully copied!");
                      bgColourRef.current = undefined;
                      await Promise.resolve(setAnimate(true));
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
                    navigator.clipboard.writeText(password).then(async() => {
                      setToastMessage("Password successfully copied!");
                      bgColourRef.current = undefined;
                      await Promise.resolve(setAnimate(true));
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
            position: "relative",
          }}
        >
          <button
            class="btn"
            onClick={() => {
              setIsRefetchClicked(true);
            }}
            style={{
              fontSize: "14px",
              position: "absolute",
              top: "3vh",
              right: "3%",
              scale: '0.85'
            }}
          >
            Refetch
          </button>
          <h2 className="inbox-header" style={{ marginTop: "5px" }}>
            Inbox
          </h2>
          <CardList isRefetchClicked={isRefetchClicked} setIsRefetchClicked={setIsRefetchClicked} email={email} password={password} />
        </div>
      )}
    </>
  );
};

export default FormGroup;
