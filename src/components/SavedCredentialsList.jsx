import React from "react";
import "./Loader/Cards/CardList.css";
/* global chrome */

const SavedCredentialsList = ({
  setAnimate,
  setToastMessage,
  credentialsList,
}) => {
  return (
    <div class="card-list">
      <h2>All your past logins on this URL</h2>
      
      {credentialsList.length ? 
        credentialsList.map((credentials) => {
            return <div
            class="card"
            style={{
              flexDirection: "column",
              gap: "0px",
              height: "auto",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <p>{credentials.email}</p>
              <p>📋</p>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <p>{credentials.password}</p>
              <p>📋</p>
            </div>
          </div>
        }) : <h3>Sorry, no credentials exist for this URL yet</h3>  
    }
    </div>
  );
};

export default SavedCredentialsList;
