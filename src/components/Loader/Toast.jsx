function Toast({ animate, setAnimate, message, bgColour = 'darkslategray' }) {

  return (
    <div
        class="form-container"
        style={{
          transform: 'translateX(-120%)',
          animation: animate ? 'slideAnimation 2s ease-in-out forwards' : 'none',
          backgroundColor: bgColour,
          color: "#fff",
          fontSize: "large",
          position: "fixed",
          bottom: "13vh",
          zIndex: '100',
          width: "79.5%",
          transition: 'transform 2s ease-in-out',
        }}
        onAnimationEnd={() => setAnimate(false)}
      >
        {message}
      </div>
  );
}

export default Toast;
