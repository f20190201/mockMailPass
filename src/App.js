/* global chrome */
import React, { useEffect, useState } from 'react';
import FormGroup from './components/FormGroup';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGenerateCredentialsClicked, setIsGenerateCredentialsClicked] = useState(false);
  const [isValidDataSaved, setIsValidDataSaved] = useState(false);

  const generateRandomEmailOptions = {
    method: 'GET',
    url: 'https://temp-mail99.p.rapidapi.com/',
    params: {
      action: 'genRandomMailbox',
      count: '1'
    },
    headers: {
      'x-rapidapi-key': '98d3df4ce3msh8b1a778494b6043p14eafbjsn3f58f2ec6d93',
      'x-rapidapi-host': 'temp-mail99.p.rapidapi.com'
    }
  };

  function generatePassword(length = 12) {
    // Define the character sets
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
  
    // Ensure the password is at least 12 characters
    if (length < 12) {
      throw new Error('Password length must be at least 12 characters.');
    }
  
    // Function to get a random character from a given set
    function getRandomChar(set) {
      return set[Math.floor(Math.random() * set.length)];
    }
  
    // Create the password components
    let password = '';
    password += getRandomChar(lowercaseChars);
    password += getRandomChar(uppercaseChars);
    password += getRandomChar(digitChars);
    password += getRandomChar(specialChars);
  
    // Fill the remaining characters with a mix of all sets
    const allChars = lowercaseChars + uppercaseChars + digitChars + specialChars;
    for (let i = 4; i < length; i++) {
      password += getRandomChar(allChars);
    }
  
    // Shuffle the password to avoid predictable patterns
    password = password.split('').sort(() => Math.random() - 0.5).join('');
  
    return password;
  }

  const fillCredentials = async () => {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});;
    const activeTab = tabs[0];
    await chrome.tabs.sendMessage(activeTab.id, {action: 'fillCredentials', email, password});
  };

  const buttonDimensions = {
    height: '20vh',
    width: '100%',
  }

  const generateRandomEmail = async () => {
    setIsGenerateCredentialsClicked(true);
    setIsValidDataSaved(false);
    setIsEmailLoading(true);
    try {
      const response = await axios.request(generateRandomEmailOptions);
      setEmail(response.data[0]);
      await chrome.storage.sync.set({email: response.data[0], timestamp: Date.now()}, function() {
        console.log('email set!');
      })
      setPassword(generatePassword(12));
    } catch (error) {
      console.error(error);
    }
    setIsEmailLoading(false);
  };

  useEffect(() => {
    chrome.storage.sync.get(['email', 'timestamp'], (result) => {
    
    const currentTime = Date.now();
    const savedTime = result.timestamp;
    
    if(savedTime && (currentTime - savedTime) <= 600000) {
      setEmail(result.email);
      setIsGenerateCredentialsClicked(true);
      setIsValidDataSaved(true);
    } else {
      chrome.storage.sync.remove(['email', 'timestamp'], () => {
        console.log("entry successfully deleted");
      })
    }
    })
  }, [])

  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      minHeight: '92vh',
      minWidth: '90vw',
      overflowY: 'scroll',
      position: 'relative',

     }}>
      <h1 style={{marginBottom: '15%'}}>Mock Email and Password</h1>
      <div>
        <button class='btn' style={{...buttonDimensions}} onClick={generateRandomEmail}>Generate Fresh Credentials</button>
      </div>

      {isGenerateCredentialsClicked && <FormGroup isValidDataSaved={isValidDataSaved} fillCredentials={fillCredentials} email={email} isEmailLoading={isEmailLoading} password={password} />}

      <div>
        <button class='btn' style={{
          ...buttonDimensions, 
          marginTop: '10%'
          }} onClick={() => {}}>Already have an Email ID?</button>
      </div>
      
    </div>
  );
}

export default App;
