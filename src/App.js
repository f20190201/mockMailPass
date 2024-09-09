/* global chrome */
import React, { useEffect, useRef, useState } from "react";
import FormGroup from "./components/FormGroup";
import axios from "axios";
import Toast from "./components/Loader/Toast";
import BottomBar from "./components/BottomBar";
import SavedCredentialsList from "./components/SavedCredentialsList";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [onLandingPage, setOnLandingPage] = useState(true);
  const [isGenerateCredentialsClicked, setIsGenerateCredentialsClicked] =
    useState(false);
  const [isValidDataSaved, setIsValidDataSaved] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const bgColourRef = useRef(null);
  const [credentialsFilledObj, setCredentialsFilledObj] = useState({
    email: true,
    password: true,
  });

  const generateRandomEmailOptions = {
    method: "GET",
    url: "https://temp-mail99.p.rapidapi.com/",
    params: {
      action: "genRandomMailbox",
      count: "1",
    },
    headers: {
      "x-rapidapi-key": "98d3df4ce3msh8b1a778494b6043p14eafbjsn3f58f2ec6d93",
      "x-rapidapi-host": "temp-mail99.p.rapidapi.com",
    },
  };

  function generatePassword(length = 12) {
    // Define the character sets
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digitChars = "0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    // Ensure the password is at least 12 characters
    if (length < 12) {
      throw new Error("Password length must be at least 12 characters.");
    }

    // Function to get a random character from a given set
    function getRandomChar(set) {
      return set[Math.floor(Math.random() * set.length)];
    }

    // Create the password components
    let password = "";
    password += getRandomChar(lowercaseChars);
    password += getRandomChar(uppercaseChars);
    password += getRandomChar(digitChars);
    password += getRandomChar(specialChars);

    // Fill the remaining characters with a mix of all sets
    const allChars =
      lowercaseChars + uppercaseChars + digitChars + specialChars;
    for (let i = 4; i < length; i++) {
      password += getRandomChar(allChars);
    }

    // Shuffle the password to avoid predictable patterns
    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    return password;
  }

  const fetchSavedCredentials = (url) => {
    chrome.storage.sync.get([url], (result) => {
      return result;
    })
  }

  const addCredentialToLocalStorage = (url) => {
    const sanitizedUrl = url.split("/")[2]; 
    let savedCredentials = fetchSavedCredentials(sanitizedUrl);
    savedCredentials = savedCredentials ? savedCredentials[sanitizedUrl] : [];
    chrome.storage.sync.set({
      [sanitizedUrl]: [{
        email: email,
        password: password
      } , ...savedCredentials]
    })
  }

  const fillCredentials = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const activeTab = tabs[0];
    const { credentialsSet } = await chrome.tabs.sendMessage(activeTab.id, {
      action: "fillCredentials",
      email,
      password,
    });
    addCredentialToLocalStorage(activeTab.url);
    setCredentialsFilledObj(credentialsSet);
  };

  const buttonDimensions = {
    height: "20vh",
    width: "100%",
  };

  const generateRandomEmail = async () => {
    setIsGenerateCredentialsClicked(true);
    setIsValidDataSaved(false);
    setIsEmailLoading(true);
    try {
      const response = await axios.request(generateRandomEmailOptions);
      setEmail(response.data[0]);
      const generatedPassword = generatePassword(12);
      await chrome.storage.sync.set(
        {
          email: response.data[0],
          timestamp: Date.now(),
          password: generatedPassword,
        },
        function () {
          console.log("email set!");
        }
      );
      setPassword(generatedPassword);
    } catch (error) {
      console.error(error);
    }
    setIsEmailLoading(false);
  };

  useEffect(() => {
    chrome.storage.sync.get(["email", "timestamp", "password"], (result) => {
      const currentTime = Date.now();
      const savedTime = result.timestamp;

      if (savedTime && currentTime - savedTime <= 600000) {
        setEmail(result.email);
        setIsGenerateCredentialsClicked(true);
        setPassword(result.password);
        setIsValidDataSaved(true);
      } else {
        chrome.storage.sync.remove(["email", "timestamp", "password"], () => {
          console.log("entry successfully deleted");
        });
      }
    });
    
  }, []);

  useEffect(() => {
    const { email, password } = credentialsFilledObj;
    if (!email && !password) {
      setToastMessage("Error in autofilling credentials");
    } else if (!email) {
      setToastMessage("Error in autofilling Email");
    } else if (!password) {
      setToastMessage("Error in autofilling password");
    }

    if (!email || !password) {
      bgColourRef.current = "red";
      setAnimate(true);
    }
  }, [credentialsFilledObj]);

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        minHeight: "92vh",
        minWidth: "90vw",
        overflowY: "scroll",
        position: "relative",
      }}
    >
      {onLandingPage && <div>
      <div
        style={{
          marginBottom: "12%",
          height: "13vh",
          width: "113%",
          translate: "-6% -31%",
          background: "#000c47",
          color: "white",
          fontSize: "29px",
          paddingTop: "9%",
          fontWeight: "700",
          borderRadius: "0 0 38px 37px",
          boxShadow: "0 0 12px 0 #36454f",
        }}
      >
        Mock Email And Password
      </div>
      <div>
        <button
          class="btn"
          style={{ ...buttonDimensions }}
          onClick={generateRandomEmail}
        >
          Generate Fresh Credentials
        </button>
      </div>

      {isGenerateCredentialsClicked && (
        <FormGroup
          isValidDataSaved={isValidDataSaved}
          fillCredentials={fillCredentials}
          email={email}
          isEmailLoading={isEmailLoading}
          password={password}
          setAnimate={setAnimate}
          setToastMessage={setToastMessage}
          bgColourRef={bgColourRef}
        />
      )}

      <div>
        <button
          class="btn"
          style={{
            ...buttonDimensions,
            marginTop: "10%",
          }}
          onClick={() => {}}
        >
          Already have an Email ID?
        </button>
      </div>
      </div>}
      
      {
        !onLandingPage && <SavedCredentialsList credentialsList={[]} setAnimate={setAnimate} setToastMessage={setToastMessage}  />
      }

      <Toast
        animate={animate}
        setAnimate={setAnimate}
        message={toastMessage}
        bgColour={bgColourRef.current ? bgColourRef.current : undefined}
      />
      <BottomBar
        setOnLandingPage={setOnLandingPage}
        onLandingPage={onLandingPage}
      />
    </div>
  );
}

export default App;
