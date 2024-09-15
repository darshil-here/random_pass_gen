import React, { useState, useCallback, useEffect } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [lowerAllowed, setLowerAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [upperAllowed, setUpperAllowed] = useState(true); // Define upperAllowed
  const [copyButtonText, setCopyButtonText] = useState("COPY PASSWORD");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "";

    if (upperAllowed) {
      str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+-=[]{}|;':,.<>/?";
    }
    if (lowerAllowed) {
      str += "abcdefghijklmnopqrstuvwxyz";
    }

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, lowerAllowed, upperAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, lowerAllowed, upperAllowed]);

  const handleCopyPassword = () => {
    window.navigator.clipboard.writeText(password); // Copy the password to the clipboard
    setCopyButtonText("COPIED!"); // Change button text to "COPIED!"

    // Revert the button text and styles back after 2 seconds
    setTimeout(() => {
      setCopyButtonText("COPY PASSWORD");
    }, 2000);
  };

  return (
    <div className="relative bg-gradient-to-r from-slate-900 to-slate-700 font-spaceGrotesk font-normal flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      {/* Header radio */}
      <h1 className="text-2xl font-light text-white mb-4 text-center">
        RANDOM PASSWORD GENERATOR
      </h1>

      {/* Password Display */}
      <div className="mx-6 flex items-center w-full max-w-md space-x-2 mb-4 bg-white p-4 rounded-lg shadow">
        <input
          type="text"
          value={password}
          placeholder="password"
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
      </div>

      {/* Password Customization */}
      <div className="bg-white p-4 rounded-lg shadow w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Customize your password
        </h2>

        <div className="flex items-center justify-between mb-4">
          <label htmlFor="length" className="text-gray-600">
            Password Length
          </label>
          <span className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center">
            {length}
          </span>
        </div>

        {/* Slider */}
        <input
          type="range"
          min="8"
          max="25"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-full mb-4"
        />

        {/* Options */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-4">
          <label htmlFor="upperInput" className="flex items-center">
            <input
              defaultChecked={true}
              id="upperInput"
              type="checkbox"
              className="mr-2"
              onChange={() => {
                setUpperAllowed((prev) => !prev);
              }}
            />
            Uppercase
          </label>
          <label htmlFor="lowerInput" className="flex items-center">
            <input
              defaultChecked={lowerAllowed}
              id="lowerInput"
              type="checkbox"
              className="mr-2"
              onChange={() => {
                setLowerAllowed((prev) => !prev);
              }}
            />
            Lowercase
          </label>

          <label htmlFor="numberInput" className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            Numbers
          </label>
          <label htmlFor="charInput" className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            Characters
          </label>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopyPassword}
          className={`w-full py-2 rounded-md text-white 
      ${
        copyButtonText === "COPIED!"
          ? "bg-green-600 hover:bg-green-700"
          : "bg-red-600 hover:bg-red-700"
      }`}
        >
          {copyButtonText}
        </button>
      </div>

      <footer className="mx-6 absolute bottom-7 text-sm text-white font-light mb-4 text-center">
        made by{" "}
        <a
          className="underline underline-offset-4"
          href="https://github.com/darshil-here"
        >
          darshil
        </a>{" "}
        with two cups of coffees & ❤️
      </footer>
    </div>
  );
};

export default PasswordGenerator;
