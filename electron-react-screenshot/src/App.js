import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
function App() {
  let intervalId = null;
  const [disable, setDisabled] = useState(false);
  const startCapture = () => {
    //  console.log("clicked start");
    if (intervalId != null) {
      return;
    }
    ipcRenderer.send("takeScreenShot");
    intervalId = setInterval(() => {
      ipcRenderer.send("takeScreenShot");
      console.log("image captured");
    }, 10000);
    useEffect(() => {
      setDisabled(false);
    });
  };

  const stopCapture = () => {
    clearInterval(intervalId);
    console.log("capture stoped", intervalId);
    intervalId = null;
  };

  return (
    <div className="App">
      <p className="text-muted text-uppercase fs-1">
        Screen Capture Application
      </p>

      <p className="text-muted fst-italic">
        This application capture screen for every 5mins
      </p>
      <Button
        variant="success"
        size="lg"
        className="px-5"
        disabled={false}
        onClick={startCapture}
      >
        Start Capture
      </Button>
      <Button variant="danger" size="lg" className="px-5" onClick={stopCapture}>
        Stop Capture
      </Button>
    </div>
  );
}

export default App;
