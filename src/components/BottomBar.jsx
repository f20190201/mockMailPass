import React from "react";

const BottomBar = ({onLandingPage, setOnLandingPage}) => {
  return (
    <div
      style={{
        height: "10vh",
        width: "113%",
        translate: "-6%",
        position: "fixed",
        bottom: "0px",
        zIndex: "100",
        display: "flex",
      }}
    >
      <button
        onClick={() => {
            setOnLandingPage(true);
        }}
        style={{
          width: "45%",
          fontSize: "large",
          border: "none",
          cursor: "pointer",
          backgroundColor: `${onLandingPage ? '#000c47' : ''}`,
          color: `${onLandingPage ? '#fff' : ''}`,
        }}
      >
        New Credentials
      </button>
      <button
      onClick={() => {
        setOnLandingPage(false);
      }}
        style={{
          width: "45%",
          fontSize: "large",
          border: "none",
          cursor: "pointer",
          backgroundColor: `${onLandingPage ? '' : '#000c47'}`,
          color: `${onLandingPage ? '' : '#fff'}`,
        }}
      >
        Saved Credentials
      </button>
    </div>
  );
};

export default BottomBar;
