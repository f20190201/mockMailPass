/* global chrome */

function setValue(element, value) {
    let nativeValueSetter = Object.getOwnPropertyDescriptor(element.__proto__, 'value').set;
    nativeValueSetter.call(element, value);
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('blur', { bubbles: true }));
  }

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fillCredentials") {
    const { email, password } = request;
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');

    console.log({emailInput, passwordInput});

    if (emailInput) {
    setValue(emailInput, email);
      console.log("Email input filled:", email);
    }
    if (passwordInput) {
        setValue(passwordInput, password);
      console.log("Password input filled:", password);
    }

    sendResponse({ status: "success" });
  }
});
